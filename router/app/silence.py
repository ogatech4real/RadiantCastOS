import asyncio
import re
from dataclasses import dataclass
from typing import Optional

SILENCE_START_RE = re.compile(r"silence_start: (?P<ts>[-0-9\.]+)")
SILENCE_END_RE = re.compile(r"silence_end: (?P<ts>[-0-9\.]+) \| silence_duration: (?P<dur>[-0-9\.]+)")

@dataclass
class SilenceState:
    in_silence: bool = False
    silence_start_ts: Optional[float] = None

async def watch_silence(live_url: str, silence_db: str, min_d: float, on_failover):
    """Run ffmpeg silencedetect on the live source and call on_failover() if silence persists."""
    cmd = [
        "ffmpeg",
        "-hide_banner",
        "-loglevel", "info",
        "-i", live_url,
        "-af", f"silencedetect=n={silence_db}:d={min_d}",
        "-f", "null",
        "-"
    ]
    proc = await asyncio.create_subprocess_exec(*cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
    state = SilenceState()

    async def read_lines(stream):
        while True:
            line = await stream.readline()
            if not line:
                break
            yield line.decode(errors="ignore").strip()

    try:
        async for line in read_lines(proc.stderr):
            # Look for silence start/end
            m1 = SILENCE_START_RE.search(line)
            if m1:
                state.in_silence = True
                try:
                    state.silence_start_ts = float(m1.group("ts"))
                except Exception:
                    state.silence_start_ts = None
                continue

            m2 = SILENCE_END_RE.search(line)
            if m2:
                state.in_silence = False
                state.silence_start_ts = None
                continue

            # Router's main loop will also enforce failover seconds using wall-clock checks.
    finally:
        if proc.returncode is None:
            proc.terminate()
            try:
                await asyncio.wait_for(proc.wait(), timeout=3)
            except asyncio.TimeoutError:
                proc.kill()
                await proc.wait()
