
export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "radial-gradient(1200px 600px at 10% -10%, rgba(0,255,255,0.15), transparent), radial-gradient(800px 400px at 90% 10%, rgba(180,0,255,0.18), transparent), #05070d",
      color: "#e6f1ff",
      overflowX: "hidden"
    }}>
      <section style={{ padding: "96px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{
          fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
          lineHeight: 1.05,
          marginBottom: 24,
          background: "linear-gradient(90deg, #7df9ff, #c77dff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Build and broadcast your radio station in minutes
        </h1>
        <p style={{ maxWidth: 720, fontSize: 20, opacity: 0.9 }}>
          RadiantCastOS is an AI-native, cloud-first radio platform. Live streaming, AutoDJ,
          smart routing, analytics, and secure scaling — all in one control plane.
        </p>
        <div style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
          <a href="/register" style={primaryBtn}>Create free station</a>
          <a href="/pricing" style={secondaryBtn}>View pricing</a>
        </div>
      </section>

      <section style={section}>
        <h2 style={sectionTitle}>Why RadiantCastOS</h2>
        <div style={grid}>
          {[
            ["AI-aware stream routing", "Automatic source switching, silence detection, and resilient playback."],
            ["Live + AutoDJ", "Hybrid broadcasting with failover and scheduled content."],
            ["HLS delivery", "Low-latency, globally compatible streaming."],
            ["Observability built-in", "Health checks, metrics, and future analytics hooks."],
            ["Security-first", "JWT, role-based access, and hardened edges."],
            ["Multi-station ready", "Run one station or hundreds from the same platform."]
          ].map(([title, desc]) => (
            <div key={title} style={card}>
              <h3 style={{ marginBottom: 8 }}>{title}</h3>
              <p style={{ opacity: 0.85 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={sectionAlt}>
        <h2 style={sectionTitle}>How it works</h2>
        <ol style={{ maxWidth: 800, margin: "0 auto", fontSize: 18, lineHeight: 1.8 }}>
          <li>Register and access your dashboard</li>
          <li>Create a station and choose Live, AutoDJ, or Hybrid mode</li>
          <li>Connect your source or upload content</li>
          <li>Go live and share your stream globally</li>
        </ol>
      </section>

      <section style={section}>
        <h2 style={sectionTitle}>Pricing</h2>
        <div style={grid}>
          <div style={card}>
            <h3>Free</h3>
            <p>1 station · Limited listeners · Community support</p>
            <p style={price}>£0</p>
            <a href="/register" style={primaryBtn}>Start free</a>
          </div>
          <div style={{ ...card, outline: "1px solid #7df9ff" }}>
            <h3>Pro</h3>
            <p>Multiple stations · Higher bitrate · Advanced analytics</p>
            <p style={price}>£XX / month</p>
            <a href="/billing" style={primaryBtn}>Upgrade to Pro</a>
          </div>
          <div style={card}>
            <h3>Business</h3>
            <p>SSO · SLA · Dedicated routing · Audit logs</p>
            <p style={price}>Custom</p>
            <a href="#" style={secondaryBtn}>Contact sales</a>
          </div>
        </div>
      </section>

      <section style={{ padding: "96px 24px", textAlign: "center" }}>
        <h2 style={sectionTitle}>Launch your station today</h2>
        <p style={{ maxWidth: 640, margin: "0 auto 32px", opacity: 0.9 }}>
          Start free. Upgrade when you’re ready. Built to scale with you.
        </p>
        <a href="/register" style={primaryBtn}>Get started</a>
      </section>
    </main>
  );
}

const section = { padding: "96px 24px", maxWidth: 1200, margin: "0 auto" };
const sectionAlt = { ...section, background: "rgba(255,255,255,0.02)" };
const sectionTitle = { fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: 32, textAlign: "center" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 };
const card = {
  padding: 24,
  borderRadius: 16,
  background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
  backdropFilter: "blur(8px)"
};
const price = { fontSize: 28, margin: "16px 0" };
const primaryBtn = {
  padding: "14px 22px",
  borderRadius: 999,
  background: "linear-gradient(90deg, #7df9ff, #c77dff)",
  color: "#05070d",
  fontWeight: 600,
  textDecoration: "none"
};
const secondaryBtn = {
  padding: "14px 22px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.3)",
  color: "#e6f1ff",
  textDecoration: "none"
};
