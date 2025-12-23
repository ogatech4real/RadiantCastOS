import asyncio
import os
import signal
from dataclasses import dataclass
from typing import Optional

@dataclass
class FFmpegJob:
    proc: asyncio.subprocess.Process
    source: str

async def start_hls_job(source_url: str, out_dir: str, segment_seconds: int, list_size: int) -> FFmpegJob:
    os.makedirs(out_dir, exist_ok=True)
    index_path = os.path.join(out_dir, "index.m3u8")

    # We keep it simple: input -> AAC -> HLS
    # -re for stable pacing with file/lavfi sources; it's OK for HTTP too in dev.
    cmd = [
        "ffmpeg",
        "-hide_banner",
        "-loglevel", "warning",
        "-re",
        "-i", source_url,
        "-c:a", "aac",
        "-b:a", "128k",
        "-ac", "2",
        "-ar", "44100",
        "-f", "hls",
        "-hls_time", str(segment_seconds),
        "-hls_list_size", str(list_size),
        "-hls_flags", "delete_segments+independent_segments",
        "-hls_segment_filename", os.path.join(out_dir, "seg_%05d.ts"),
        index_path,
    ]
    proc = await asyncio.create_subprocess_exec(*cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
    return FFmpegJob(proc=proc, source=source_url)

async def stop_job(job: Optional[FFmpegJob]) -> None:
    if not job:
        return
    proc = job.proc
    if proc.returncode is not None:
        return
    try:
        proc.send_signal(signal.SIGTERM)
    except ProcessLookupError:
        return
    try:
        await asyncio.wait_for(proc.wait(), timeout=5)
    except asyncio.TimeoutError:
        try:
            proc.kill()
        except ProcessLookupError:
            pass
        await proc.wait()
