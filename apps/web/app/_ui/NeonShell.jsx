
import Link from "next/link";
import { container, colors } from "./neonStyles";

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      style={{
        color: "rgba(230,241,255,0.86)",
        textDecoration: "none",
        padding: "8px 10px",
        borderRadius: 10,
        border: "1px solid transparent",
      }}
    >
      {children}
    </Link>
  );
}

export default function NeonShell() {
  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(10px)",
          background: "rgba(5,7,13,0.72)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            ...container(1200),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 24px",
          }}
        >
          <Link href="/" style={{ textDecoration: "none", color: colors.fg, fontWeight: 800, letterSpacing: "0.02em" }}>
            RadiantCastOS
            <span style={{ marginLeft: 10, fontSize: 12, opacity: 0.7 }}>AI radio platform</span>
          </Link>

          <nav style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <NavLink href="/get-started">Get started</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/docs">Docs</NavLink>
            <NavLink href="/demo/player">Demo</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/login">Login</NavLink>
          </nav>
        </div>
      </header>
    </>
  );
}
