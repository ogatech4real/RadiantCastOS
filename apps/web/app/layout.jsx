export const metadata = {
  title: "RadiantCastOS",
  description: "AI-native internet radio hosting platform"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
