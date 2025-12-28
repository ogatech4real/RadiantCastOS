
import NeonShell from "../_ui/NeonShell";
import Link from "next/link";
import { pageBg, container, section, h2, muted, card, grid, btnPrimary, btnSecondary, hr } from "../_ui/neonStyles";

export const metadata = {
  title: "Dashboard | RadiantCastOS",
  description: "Control plane dashboard (placeholder foundation)."
};

export default function Dashboard() {
  return (
    <div style={pageBg}>
      <NeonShell />
      <main style={{ ...container(1200), ...section }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ ...h2 }}>Dashboard</h2>
            <p style={{ ...muted, marginTop: 10, maxWidth: 760, lineHeight: 1.7 }}>
              This is a production-ready dashboard foundation with upgrade hooks. Wire it to Supabase Auth + your API
              for real data. For now, placeholders are used intentionally.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/stations/new" style={btnPrimary}>Create station</Link>
            <Link href="/pricing" style={btnSecondary}>Upgrade</Link>
          </div>
        </div>

        <div style={hr} />

        <div style={grid}>
          <div style={card}>
            <h3 style={{ marginTop: 0 }}>Your plan</h3>
            <p style={{ ...muted, marginTop: 10 }}>Free (placeholder)</p>
            <p style={{ ...muted, marginTop: 10, lineHeight: 1.7 }}>
              Limits and entitlements will be enforced by the API and reflected in UI gating.
            </p>
            <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/pricing" style={btnPrimary}>View plans</Link>
              <Link href="/billing" style={btnSecondary}>Manage billing (placeholder)</Link>
            </div>
          </div>

          <div style={card}>
            <h3 style={{ marginTop: 0 }}>Stations</h3>
            <p style={{ ...muted, marginTop: 10 }}>0 stations connected (placeholder)</p>
            <div style={{ marginTop: 14 }}>
              <Link href="/stations/new" style={btnPrimary}>Create your first station</Link>
            </div>
            <p style={{ ...muted, marginTop: 14, fontSize: 13 }}>
              Future: station list, quick actions, and routing health indicators.
            </p>
          </div>

          <div style={card}>
            <h3 style={{ marginTop: 0 }}>System status</h3>
            <ul style={{ ...muted, lineHeight: 1.9, marginTop: 10 }}>
              <li>API: Healthy (placeholder)</li>
              <li>Router: Pending deployment (placeholder)</li>
              <li>HLS: Ready (placeholder)</li>
              <li>Metrics: Enabled (private) (placeholder)</li>
            </ul>
            <p style={{ ...muted, marginBottom: 0, fontSize: 13 }}>
              Future: real-time health and incident history.
            </p>
          </div>
        </div>

        <div style={{ ...card, marginTop: 24 }}>
          <h3 style={{ marginTop: 0 }}>Next steps</h3>
          <div style={{ ...grid, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", marginTop: 14 }}>
            {[
              ["Connect Supabase Auth", "Add login gating and persist user sessions across the dashboard."],
              ["Enable subscriptions", "Stripe checkout + webhooks + plan gating."],
              ["Activate router worker", "Multi-station router with source switching, silence detection, and metrics."],
              ["Analytics", "Listener counts, engagement funnels, and playback quality metrics."]
            ].map(([t, d]) => (
              <div key={t} style={{ padding: 14, borderRadius: 16, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(0,0,0,0.18)" }}>
                <div style={{ fontWeight: 800 }}>{t}</div>
                <div style={{ ...muted, marginTop: 8, lineHeight: 1.7 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
