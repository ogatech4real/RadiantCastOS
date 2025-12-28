
import NeonShell from "../_ui/NeonShell";
import { pageBg, container, section, h1, muted, card, btnPrimary, input, label, hr } from "../_ui/neonStyles";

export const metadata = {
  title: "Register | RadiantCastOS",
  description: "Placeholder page."
};

export default function Page() {
  return (
    <div style={pageBg}>
      <NeonShell />
      <main style={{ ...container(760), ...section }}>
        <h1 style={ ...h1, marginBottom: 10 }>Register</h1>
        <p style={ ...muted, fontSize: 18, lineHeight: 1.7 }>
          Placeholder page. Wire this to Supabase Auth and your billing provider when ready.
        </p>

        <div style={hr} />

        <div style={...card}>
          <div style={display:"grid", gap: 10}>
            <div style={label}>Email</div>
            <input placeholder="you@domain.com" style={input} />
            <div style={label}>Password</div>
            <input placeholder="••••••••" type="password" style={input} />
            <a href="/dashboard" style={...btnPrimary, marginTop: 10, justifyContent:"center"}>Continue (placeholder)</a>
          </div>
        </div>
      </main>
    </div>
  );
}
