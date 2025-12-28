
import NeonShell from "../_ui/NeonShell";
import { pageBg, container, section, h1, h2, muted, card, grid, btnPrimary, btnSecondary, hr } from "../_ui/neonStyles";

export const metadata = {
  title: "Pricing | RadiantCastOS",
  description: "Choose a plan. Start free, upgrade as you scale."
};

const plans = [
  {
    name: "Free",
    price: "£0",
    tagline: "Launch one station and validate your audience.",
    features: [
      "1 station (placeholder limit)",
      "Basic player + HLS output",
      "Limited listeners/bitrate (placeholder)",
      "Community support",
      "Core security (JWT)",
    ],
    cta: { href: "/register", label: "Start free", primary: true },
  },
  {
    name: "Pro",
    price: "£XX / month",
    highlight: true,
    tagline: "For creators and teams scaling reliably.",
    features: [
      "Multiple stations (placeholder)",
      "Higher bitrate + more listeners (placeholder)",
      "Advanced analytics (foundation)",
      "Custom domain support",
      "Priority support",
      "Automation + routing policies",
    ],
    cta: { href: "/dashboard?upgrade=pro", label: "Upgrade to Pro", primary: true },
  },
  {
    name: "Business",
    price: "Custom",
    tagline: "Enterprise controls and operational guarantees.",
    features: [
      "SSO + team roles (placeholder)",
      "SLA + dedicated capacity",
      "Audit logs (placeholder)",
      "Private networking + hardened posture",
      "Dedicated onboarding",
    ],
    cta: { href: "#", label: "Contact sales (placeholder)", primary: false },
  },
];

export default function Pricing() {
  return (
    <div style={pageBg}>
      <NeonShell active="pricing" />
      <main style={{ ...container(1100), ...section }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ ...h1 }}>Pricing designed for momentum</h1>
          <p style={{ ...muted, maxWidth: 820, margin: "18px auto 0", fontSize: 18, lineHeight: 1.7 }}>
            Start on Free. Upgrade when you need higher throughput, multi-station control, custom domains, and analytics.
            Replace prices, limits, and feature names with your final commercial model.
          </p>
        </div>

        <div style={hr} />

        <div style={{ ...grid, alignItems: "stretch" }}>
          {plans.map((p) => (
            <div
              key={p.name}
              style={{
                ...card,
                outline: p.highlight ? "1px solid rgba(125,249,255,0.8)" : "none",
                boxShadow: p.highlight ? "0 0 0 1px rgba(125,249,255,0.25) inset, 0 0 40px rgba(125,249,255,0.08)" : card.boxShadow,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                <h2 style={{ ...h2, fontSize: 26 }}>{p.name}</h2>
                <div style={{ fontSize: 22, fontWeight: 800 }}>{p.price}</div>
              </div>
              <p style={{ ...muted, marginTop: 10 }}>{p.tagline}</p>

              <ul style={{ ...muted, lineHeight: 1.9, marginTop: 16 }}>
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>

              <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href={p.cta.href} style={p.cta.primary ? btnPrimary : btnSecondary}>{p.cta.label}</a>
                {p.name === "Pro" ? <a href="/get-started" style={btnSecondary}>See setup</a> : null}
              </div>

              {p.highlight ? (
                <p style={{ marginTop: 16, fontSize: 12, opacity: 0.75 }}>
                  Recommended for production use once you validate market fit.
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <div style={{ ...card, marginTop: 28 }}>
          <h3 style={{ marginTop: 0 }}>Billing integration (placeholder)</h3>
          <p style={{ ...muted, marginBottom: 0, lineHeight: 1.7 }}>
            This project is structured to support Stripe checkout + billing portal. When you’re ready, we’ll connect:
            plan selection → checkout session → webhook → subscription status → UI gating.
          </p>
        </div>
      </main>
    </div>
  );
}
