
"use client";

import NeonShell from "../../_ui/NeonShell";
import { pageBg, container, section, h1, muted, card, grid, btnPrimary, input, label } from "../../_ui/neonStyles";
import { useState } from "react";

export default function NewStationClient() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [mode, setMode] = useState("hybrid");

  return (
    <div style={pageBg}>
      <NeonShell />
      <main style={{ ...container(980), ...section }}>
        <h1 style={{ ...h1, marginBottom: 12 }}>Create a station</h1>
        <p style={{ ...muted, maxWidth: 760, fontSize: 18, lineHeight: 1.7 }}>
          This is a placeholder wizard foundation. Next step is wiring this form to your API endpoint for station creation.
        </p>

        <div style={{ ...grid, marginTop: 22, gridTemplateColumns: "1fr 1fr" }}>
          <div style={card}>
            <div style={label}>Station name</div>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. NeonWave FM" style={input} />
            <div style={{ ...label, marginTop: 14 }}>Slug</div>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="e.g. neonwave-fm" style={input} />
            <div style={{ ...label, marginTop: 14 }}>Mode</div>
            <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ ...input, appearance: "none" }}>
              <option value="live">Live</option>
              <option value="autodj">AutoDJ</option>
              <option value="hybrid">Hybrid</option>
            </select>

            <button
              onClick={() => alert("TODO: Wire to API. This is a placeholder.")}
              style={{ ...btnPrimary, width: "100%", marginTop: 16, cursor: "pointer" }}
            >
              Create station (placeholder)
            </button>
          </div>

          <div style={card}>
            <h3 style={{ marginTop: 0 }}>What happens next</h3>
            <ul style={{ ...muted, lineHeight: 1.9, margin: 0 }}>
              <li>Your station record is created in the control plane database.</li>
              <li>You connect Live and/or AutoDJ sources.</li>
              <li>The router worker generates HLS output.</li>
              <li>You publish your player and start collecting analytics.</li>
            </ul>
            <p style={{ ...muted, marginTop: 14, fontSize: 13 }}>
              Future hooks: team roles, station templates, AI-assisted scheduling, content tagging.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
