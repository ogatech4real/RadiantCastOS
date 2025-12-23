import asyncio
import time
from dataclasses import dataclass
from typing import Optional

import httpx

from app.config import settings
from app.ffmpeg import FFmpegJob, start_hls_job, stop_job
from app.http_server import start_http_server
from app.metrics import ROUTER_STATION_SWITCHES, ROUTER_STATION_RUNNING, ROUTER_LOOP_LATENCY

@dataclass
class StationCtx:
    station_id: str
    slug: str
    desired_source: str = "autodj"
    current_source: str = "autodj"
    silence_started_wall: Optional[float] = None
    job: Optional[FFmpegJob] = None

def source_to_url(source: str) -> str:
    if source == "live":
        return settings.live_source_url
    if source == "autodj":
        return settings.autodj_source_url
    return settings.fallback_source_url

def auth_headers() -> dict:
    return {"Authorization": f"Bearer {settings.router_service_token}"}

async def get_station_by_slug(client: httpx.AsyncClient, slug: str) -> dict:
    r = await client.get(f"{settings.api_base_url}/stations/{slug}")
    r.raise_for_status()
    return r.json()

async def get_runtime(client: httpx.AsyncClient, station_id: str) -> dict:
    r = await client.get(f"{settings.api_base_url}/stations/{station_id}/runtime", headers=auth_headers())
    r.raise_for_status()
    return r.json()

async def set_current_source(client: httpx.AsyncClient, station_id: str, source: str) -> None:
    r = await client.post(
        f"{settings.api_base_url}/stations/{station_id}/current-source",
        headers=auth_headers(),
        json={"desired_source": source},
    )
    r.raise_for_status()

async def ensure_hls(ctx: StationCtx) -> None:
    desired_url = source_to_url(ctx.current_source)
    out_dir = f"{settings.hls_root}/{ctx.slug}"
    if ctx.job and ctx.job.source == desired_url and ctx.job.proc.returncode is None:
        return
    await stop_job(ctx.job)
    ctx.job = await start_hls_job(
        source_url=desired_url,
        out_dir=out_dir,
        segment_seconds=settings.hls_segment_seconds,
        list_size=settings.hls_list_size,
    )

async def is_live_silent(live_url: str) -> bool:
    cmd = [
        "ffmpeg",
        "-hide_banner",
        "-loglevel", "info",
        "-t", str(settings.silence_min_seconds + 1.0),
        "-i", live_url,
        "-af", f"silencedetect=n={settings.silence_db}:d={settings.silence_min_seconds}",
        "-f", "null",
        "-"
    ]
    proc = await asyncio.create_subprocess_exec(*cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
    _, err = await proc.communicate()
    return "silence_start" in err.decode(errors="ignore")

async def station_loop(slug: str, sem: asyncio.Semaphore):
    async with sem:
        async with httpx.AsyncClient(timeout=12.0) as client:
            st = await get_station_by_slug(client, slug)
            station_id = str(st["id"])
            ctx = StationCtx(station_id=station_id, slug=slug)
            ROUTER_STATION_RUNNING.labels(station_id).set(1)

            rt = await get_runtime(client, station_id)
            ctx.desired_source = rt["desired_source"]
            ctx.current_source = rt.get("current_source") or ctx.desired_source

            await ensure_hls(ctx)
            try:
                await set_current_source(client, station_id, ctx.current_source)
            except Exception:
                pass

            print(f"[router] {slug} started source={ctx.current_source}")

            while True:
                t0 = time.time()

                try:
                    rt = await get_runtime(client, station_id)
                    ctx.desired_source = rt["desired_source"]
                except Exception as e:
                    print(f"[router] {slug}: runtime poll failed: {e}")

                if ctx.current_source != ctx.desired_source:
                    ctx.current_source = ctx.desired_source
                    ctx.silence_started_wall = None
                    await ensure_hls(ctx)
                    try:
                        await set_current_source(client, station_id, ctx.current_source)
                    except Exception:
                        pass
                    ROUTER_STATION_SWITCHES.labels(station_id).inc()
                    print(f"[router] {slug}: switched -> {ctx.current_source}")

                if ctx.current_source == "live":
                    silent = await is_live_silent(settings.live_source_url)
                    now = time.time()
                    if silent:
                        if ctx.silence_started_wall is None:
                            ctx.silence_started_wall = now
                        elif (now - ctx.silence_started_wall) >= settings.silence_failover_seconds:
                            ctx.current_source = "autodj"
                            ctx.silence_started_wall = None
                            await ensure_hls(ctx)
                            try:
                                await set_current_source(client, station_id, ctx.current_source)
                            except Exception:
                                pass
                            ROUTER_STATION_SWITCHES.labels(station_id).inc()
                            print(f"[router] {slug}: live silent -> failover autodj")
                    else:
                        ctx.silence_started_wall = None

                if ctx.job and ctx.job.proc.returncode is not None:
                    ctx.current_source = "fallback"
                    await ensure_hls(ctx)
                    try:
                        await set_current_source(client, station_id, ctx.current_source)
                    except Exception:
                        pass
                    ROUTER_STATION_SWITCHES.labels(station_id).inc()
                    print(f"[router] {slug}: ffmpeg exited -> fallback")

                ROUTER_LOOP_LATENCY.labels(station_id).observe(time.time() - t0)
                await asyncio.sleep(settings.poll_seconds)

async def router_loop():
    start_http_server(settings.router_http_host, settings.router_http_port)
    print(f"[router] http server :{settings.router_http_port}")

    slugs = settings.slugs()
    if not slugs:
        raise RuntimeError("Set STATION_SLUGS / station_slugs")

    sem = asyncio.Semaphore(settings.max_concurrent_stations)
    tasks = [asyncio.create_task(station_loop(slug, sem)) for slug in slugs]
    await asyncio.gather(*tasks)

if __name__ == "__main__":
    asyncio.run(router_loop())
