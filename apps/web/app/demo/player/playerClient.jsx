
"use client";

import NeonShell from "../../_ui/NeonShell";
import { pageBg, container, section, h1, muted, card, btnPrimary, btnSecondary, input, label, hr } from "../../_ui/neonStyles";
import { useMemo, useState } from "react";

export default function PlayerDemoClient() {
  const [url, setUrl] = useState("https://example.com/stream.m3u8"); // TODO: replace with real HLS URL
  const embed = useMemo(() => url.trim(), [url]);

  return (
    <div style={pageBg}>
      <NeonShell />
      <main style={{ ...container(980), ...section }}>
        <h1 style={{ ...h1, marginBottom: 14 }}>Player demo</h1>
        <p style={{ ...muted, maxWidth: 820, fontSize: 18, lineHeight: 1.7 }}>
          This is a UX placeholder for your public station player. When you go live, this page can be driven by
          station slug and render HLS, metadata, and share/embed controls.
        </p>

        <div style={hr} />

        <div style={card}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
            <div style={label}>HLS URL (placeholder)</div>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://.../index.m3u8"
              style={input}
            />
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
              <button
                onClick={() => setUrl("https://example.com/stream.m3u8")}
                style={{ ...btnSecondary, cursor: "pointer" }}
              >
                Reset
              </button>
              <a href="/stations/demo-fm" style={btnPrimary}>View station (placeholder)</a>
            </div>
          </div>

          <div style={{ marginTop: 18, padding: 16, borderRadius: 16, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(0,0,0,0.22)" }}>
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Embedded player (placeholder)</div>

            <audio controls style={{ width: "100%" }} src={embed} />

            <p style={{ ...muted, marginTop: 12, fontSize: 13, lineHeight: 1.7 }}>
              Note: Native browser playback depends on stream format. For full HLS support everywhere, you may embed
              an HLS-capable player later (future upgrade hook).
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
