
import NeonShell from "./_ui/NeonShell";
import { pageBg, container, section, sectionAlt, h1, h2, muted, grid, card, btnPrimary, btnSecondary, hr, pill } from "./_ui/neonStyles";

export const metadata = {
  title: "RadiantCastOS | AI-native Radio Platform",
  description: "Create, manage, and scale online radio stations with AI-aware routing and modern streaming delivery."
};

export default function Home() {
  return (
    <div style={pageBg}>
      <NeonShell />
      <main>
        <section style={section}>
          <div style={{ ...container(1200), paddingTop: 34, paddingBottom: 8 }}>
            <div style={pill}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "#7df9ff", boxShadow: "0 0 18px rgba(125,249,255,0.75)" }} />
              <span>Bold AI-tech • multi-station • production-ready</span>
            </div>

            <h1 style={{ ...h1, marginTop: 18 }}>Build and broadcast your radio station in minutes</h1>

            <p style={{ ...muted, maxWidth: 820, fontSize: 20, lineHeight: 1.7, marginTop: 16 }}>
              RadiantCastOS is an AI-native, cloud-first radio platform. Live streaming, AutoDJ,
              smart routing, analytics, and secure scaling — all in one control plane.
            </p>

            <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
              <a href="/get-started" style={btnPrimary}>Get started</a>
              <a href="/pricing" style={btnSecondary}>View pricing</a>
              <a href="/demo/player" style={btnSecondary}>See player demo</a>
            </div>

            <div style={hr} />

            <div style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: 13, opacity: 0.82 }}>
              <span>✅ Supabase-backed identity + data</span>
              <span>✅ Fly deployable API control plane</span>
              <span>✅ Router worker foundation</span>
              <span>✅ Security-first posture</span>
            </div>
          </div>
        </section>

        <section style={sectionAlt}>
          <div style={container(1200)}>
            <h2 style={{ ...h2, textAlign: "center", marginBottom: 26 }}>Why RadiantCastOS</h2>
            <div style={grid}>
              {[
                ["AI-aware stream routing", "Automatic source switching, silence detection, and resilient playback."],
                ["Live + AutoDJ", "Hybrid broadcasting with failover and scheduled content."],
                ["HLS delivery", "Globally compatible delivery with modern playback."],
                ["Observability built-in", "Health checks, metrics, and future analytics hooks."],
                ["Security-first", "JWT, role-based access, and hardened edges."],
                ["Multi-station ready", "Run one station or hundreds from the same platform."]
              ].map(([title, desc]) => (
                <div key={title} style={card}>
                  <h3 style={{ marginTop: 0, marginBottom: 8 }}>{title}</h3>
                  <p style={{ ...muted, margin: 0, lineHeight: 1.7 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={section}>
          <div style={container(1200)}>
            <h2 style={{ ...h2, textAlign: "center", marginBottom: 18 }}>How it works</h2>
            <p style={{ ...muted, textAlign: "center", maxWidth: 860, margin: "0 auto 28px", lineHeight: 1.7 }}>
              A clean, scalable workflow that upgrades smoothly into advanced routing, billing, and analytics.
            </p>
            <div style={{ ...grid, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              {[
                ["1) Register", "Create your account and enter the control plane."],
                ["2) Create station", "Pick a name, slug, and mode (Live / AutoDJ / Hybrid)."],
                ["3) Connect sources", "Attach live inputs, AutoDJ playlists, and fallback sources."],
                ["4) Go live", "Publish a player link, embed it, and track listener stats."]
              ].map(([t, d]) => (
                <div key={t} style={card}>
                  <div style={{ fontWeight: 900, marginBottom: 8 }}>{t}</div>
                  <div style={{ ...muted, lineHeight: 1.7 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={sectionAlt}>
          <div style={container(1200)}>
            <h2 style={{ ...h2, textAlign: "center", marginBottom: 26 }}>Pricing</h2>
            <div style={grid}>
              <div style={card}>
                <h3 style={{ marginTop: 0 }}>Free</h3>
                <p style={muted}>1 station · Limited listeners · Community support</p>
                <p style={{ fontSize: 28, margin: "16px 0", fontWeight: 900 }}>£0</p>
                <a href="/register" style={btnPrimary}>Start free</a>
              </div>
              <div style={{ ...card, outline: "1px solid rgba(125,249,255,0.8)" }}>
                <h3 style={{ marginTop: 0 }}>Pro</h3>
                <p style={muted}>Multi-station · Higher bitrate · Analytics · Custom domain</p>
                <p style={{ fontSize: 28, margin: "16px 0", fontWeight: 900 }}>£XX / month</p>
                <a href="/pricing" style={btnPrimary}>Compare plans</a>
              </div>
              <div style={card}>
                <h3 style={{ marginTop: 0 }}>Business</h3>
                <p style={muted}>SSO · SLA · Dedicated routing · Audit logs</p>
                <p style={{ fontSize: 28, margin: "16px 0", fontWeight: 900 }}>Custom</p>
                <a href="/pricing" style={btnSecondary}>Talk to sales</a>
              </div>
            </div>
          </div>
        </section>

        <section style={section}>
          <div style={{ ...container(1200), textAlign: "center" }}>
            <h2 style={{ ...h2, marginBottom: 14 }}>Launch your station today</h2>
            <p style={{ ...muted, maxWidth: 680, margin: "0 auto 26px", lineHeight: 1.7 }}>
              Start free. Upgrade when you’re ready. Built to scale with you.
            </p>
            <a href="/get-started" style={btnPrimary}>Get started</a>
          </div>
        </section>
      </main>
    </div>
  );
}
