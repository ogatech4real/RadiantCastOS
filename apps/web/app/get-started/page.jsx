
import NeonShell from "../_ui/NeonShell";
import { pageBg, container, section, h1, h2, muted, card, grid, btnPrimary, btnSecondary, hr } from "../_ui/neonStyles";

export const metadata = {
  title: "Get Started | RadiantCastOS",
  description: "Start building your station with a guided setup."
};

export default function GetStarted() {
  return (
    <div style={pageBg}>
      <NeonShell active="get-started" />
      <main style={{ ...container(1100), ...section }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-flex", gap: 10, alignItems: "center", padding: "8px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "#7df9ff", boxShadow: "0 0 18px rgba(125,249,255,0.75)" }} />
            <span style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.8 }}>Guided setup</span>
          </div>
          <h1 style={{ ...h1, marginTop: 16 }}>Go from zero to live in 10 minutes</h1>
          <p style={{ ...muted, maxWidth: 820, margin: "18px auto 0", fontSize: 18, lineHeight: 1.7 }}>
            This page is a future-proof onboarding foundation. Replace placeholders with your actual flow,
            or wire each step directly to your control plane API.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 26, flexWrap: "wrap" }}>
            <a href="/register" style={btnPrimary}>Create account</a>
            <a href="/stations/new" style={btnSecondary}>Create station</a>
          </div>
        </div>

        <div style={hr} />

        <section>
          <h2 style={{ ...h2, textAlign: "center" }}>Your launch checklist</h2>
          <div style={{ ...grid, marginTop: 28 }}>
            {[
              ["Create an account", "Sign up and verify your email. Add team members later (Business tier placeholder)."],
              ["Create a station", "Choose a unique slug, region, and streaming mode (Live / AutoDJ / Hybrid)."],
              ["Connect a source", "Point to an Icecast/RTMP source or upload content for AutoDJ (placeholder)."],
              ["Enable routing + failover", "Activate silence detection and fallback source switching (router worker)."],
              ["Publish your player", "Embed the player or share your public URL. Add a custom domain later (Pro)."],
              ["Upgrade when needed", "Unlock multi-station, analytics, custom domain, and higher bitrate."]
            ].map(([t, d]) => (
              <div key={t} style={{ ...card, position: "relative" }}>
                <h3 style={{ margin: "0 0 10px" }}>{t}</h3>
                <p style={{ ...muted, margin: 0, lineHeight: 1.7 }}>{d}</p>
              </div>
            ))}
          </div>
        </section>

        <div style={{ ...card, marginTop: 34 }}>
          <h3 style={{ marginTop: 0 }}>Next upgrade hooks (foundation)</h3>
          <ul style={{ ...muted, lineHeight: 1.9, margin: 0 }}>
            <li>Stripe checkout + billing portal (placeholders live in /dashboard and /pricing)</li>
            <li>Feature gating: plan limits enforced in API + reflected in UI</li>
            <li>AI enhancements: auto-tagging, content scheduling suggestions, anomaly detection</li>
            <li>Observability: router health, station heartbeat, listener analytics and retention</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
