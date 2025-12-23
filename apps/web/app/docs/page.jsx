export default function Docs() {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  return (
    <main style={{ padding: 24, maxWidth: 920, margin: "0 auto" }}>
      <h1 style={{ marginTop: 0 }}>API Docs</h1>
      <p>
        Open Swagger UI:
        <br />
        <a href={`${api}/docs`} target="_blank" rel="noreferrer">{api}/docs</a>
      </p>
    </main>
  );
}
