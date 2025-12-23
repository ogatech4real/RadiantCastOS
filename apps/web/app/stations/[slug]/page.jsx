"use client";

import { useEffect, useMemo, useState } from "react";
import Hls from "hls.js";

function apiBase() {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
}

export default function StationPage({ params }) {
  const slug = params.slug;
  const [station, setStation] = useState(null);
  const [err, setErr] = useState(null);

  const hlsUrl = useMemo(() => {
    if (station?.hls_url) return station.hls_url;
    return `http://localhost:8080/hls/${slug}/index.m3u8`;
  }, [station, slug]);

  useEffect(() => {
    const run = async () => {
      try {
        const r = await fetch(`${apiBase()}/stations/${slug}`);
        if (!r.ok) throw new Error(`API error ${r.status}`);
        setStation(await r.json());
      } catch (e) {
        setErr(String(e));
      }
    };
    run();
  }, [slug]);

  useEffect(() => {
    const audio = document.getElementById("player");
    if (!audio || !hlsUrl) return;

    if (audio.canPlayType("application/vnd.apple.mpegurl")) {
      audio.src = hlsUrl;
      return;
    }
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(audio);
      return () => hls.destroy();
    }
  }, [hlsUrl]);

  return (
    <main style={{ padding: 24, maxWidth: 920, margin: "0 auto" }}>
      <a href="/" style={{ display: "inline-block", marginBottom: 16 }}>← Back</a>
      <h1 style={{ marginTop: 0 }}>{station?.name || slug}</h1>

      {err ? (
        <p style={{ color: "crimson" }}>{err}</p>
      ) : (
        <p style={{ color: "#666" }}>
          Playing HLS: <code>{hlsUrl}</code>
        </p>
      )}

      <audio id="player" controls style={{ width: "100%", marginTop: 12 }} />

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 18 }}>Notes</h2>
        <ul style={{ lineHeight: 1.6 }}>
          <li>This Next.js app deploys on Vercel.</li>
          <li>The FastAPI control plane must be deployed separately (Render/Fly/Cloud Run).</li>
          <li>The Stream Router is a long-running FFmpeg worker and must be deployed on containers/VPS.</li>
        </ul>
      </section>
    </main>
  );
}
