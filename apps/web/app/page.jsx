export default function Home() {
  return (
    <main style={{ padding: 24, maxWidth: 920, margin: "0 auto" }}>
      <h1 style={{ marginTop: 0 }}>RadiantCastOS</h1>
      <p>Multi-tenant internet radio hosting platform scaffold.</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a href="/stations/demo-fm" style={{ padding: 10, border: "1px solid #ddd", borderRadius: 10 }}>
          Open demo station page
        </a>
        <a href="/docs" style={{ padding: 10, border: "1px solid #ddd", borderRadius: 10 }}>
          API docs (control plane)
        </a>
      </div>
      <p style={{ marginTop: 16, color: "#666" }}>
        Configure <code>NEXT_PUBLIC_API_BASE_URL</code> on Vercel to your deployed API URL.
      </p>
    </main>
  );
}
