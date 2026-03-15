import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skoobi Labs",
  description:
    "Skoobi Labs builds mobile apps for iPhone and Android. Thoughtful, polished, and built to delight.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#08080F",
          color: "rgba(255,255,255,0.85)",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
