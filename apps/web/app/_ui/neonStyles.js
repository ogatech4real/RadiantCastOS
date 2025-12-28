
export const colors = {
  bg: "#05070d",
  fg: "#e6f1ff",
  dim: "rgba(230,241,255,0.78)",
  cyan: "#7df9ff",
  violet: "#c77dff",
  border: "rgba(255,255,255,0.12)",
  cardTop: "rgba(255,255,255,0.08)",
  cardBottom: "rgba(255,255,255,0.03)",
};

export const pageBg = {
  minHeight: "100vh",
  background:
    "radial-gradient(1200px 600px at 10% -10%, rgba(0,255,255,0.18), transparent), " +
    "radial-gradient(900px 450px at 92% 12%, rgba(180,0,255,0.20), transparent), " +
    "radial-gradient(700px 420px at 40% 120%, rgba(0,255,255,0.10), transparent), " +
    colors.bg,
  color: colors.fg,
  overflowX: "hidden",
};

export const container = (maxWidth = 1200) => ({
  maxWidth,
  margin: "0 auto",
  padding: "0 24px",
});

export const section = { padding: "84px 0" };
export const sectionAlt = { padding: "84px 0", background: "rgba(255,255,255,0.02)" };

export const h1 = {
  fontSize: "clamp(2.6rem, 6vw, 4.4rem)",
  lineHeight: 1.05,
  margin: 0,
  letterSpacing: "-0.02em",
  background: "linear-gradient(90deg, #7df9ff, #c77dff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export const h2 = {
  fontSize: "clamp(1.9rem, 4vw, 3.0rem)",
  lineHeight: 1.15,
  margin: 0,
  letterSpacing: "-0.02em",
};

export const muted = { opacity: 0.88, color: colors.dim };

export const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 22,
};

export const card = {
  borderRadius: 18,
  padding: 22,
  border: `1px solid ${colors.border}`,
  background: `linear-gradient(180deg, ${colors.cardTop}, ${colors.cardBottom})`,
  backdropFilter: "blur(10px)",
  boxShadow: "0 0 0 1px rgba(125,249,255,0.08) inset",
};

export const pill = {
  display: "inline-flex",
  gap: 8,
  alignItems: "center",
  borderRadius: 999,
  padding: "8px 12px",
  border: `1px solid ${colors.border}`,
  background: "rgba(255,255,255,0.04)",
  fontSize: 12,
  letterSpacing: "0.02em",
  textTransform: "uppercase",
};

export const btnPrimary = {
  padding: "12px 18px",
  borderRadius: 999,
  background: "linear-gradient(90deg, #7df9ff, #c77dff)",
  color: colors.bg,
  fontWeight: 700,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid rgba(255,255,255,0.08)",
};

export const btnSecondary = {
  padding: "12px 18px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.28)",
  color: colors.fg,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255,255,255,0.03)",
};

export const input = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: `1px solid ${colors.border}`,
  background: "rgba(0,0,0,0.35)",
  color: colors.fg,
  outline: "none",
};

export const label = {
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  opacity: 0.75,
};

export const hr = {
  border: 0,
  height: 1,
  background: "linear-gradient(90deg, transparent, rgba(125,249,255,0.25), transparent)",
  margin: "26px 0",
};
