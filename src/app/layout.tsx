import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
