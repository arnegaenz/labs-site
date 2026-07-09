import type { Metadata } from "next";
import { Suspense } from "react";
import { PostHogClient } from "@/components/PostHogProvider";
import "./globals.css";

const DESCRIPTION =
  "SkoobiLabs designs, builds, hosts, and runs custom software for businesses that can't justify an enterprise vendor — and shouldn't have to. Single-tenant infrastructure, encryption, staging environments, a real monthly report, and a human on call. Builds from $2,500.";

export const metadata: Metadata = {
  metadataBase: new URL("https://skoobilabs.com"),
  title: "SkoobiLabs — Big-company software. Small-company price.",
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "SkoobiLabs — Big-company software. Small-company price.",
    description: DESCRIPTION,
    url: "https://skoobilabs.com",
    siteName: "SkoobiLabs",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SkoobiLabs — Big-company software. Small-company price." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkoobiLabs — Big-company software. Small-company price.",
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

// Structured data for search + answer engines: who we are, what we sell,
// what it costs. Machine-readable mirror of the homepage claims.
const JSONLD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SkoobiLabs",
  url: "https://skoobilabs.com",
  slogan: "Big-company software. Small-company price.",
  description: DESCRIPTION,
  email: "ask@skoobilabs.com",
  areaServed: "United States",
  address: { "@type": "PostalAddress", addressLocality: "Edmonds", addressRegion: "WA", addressCountry: "US" },
  makesOffer: [
    { "@type": "Offer", name: "Essential — a focused, one-purpose tool", priceSpecification: { "@type": "PriceSpecification", minPrice: 2500, priceCurrency: "USD" } },
    { "@type": "Offer", name: "Professional — interactive, data-backed, integrated", priceSpecification: { "@type": "PriceSpecification", minPrice: 5000, priceCurrency: "USD" } },
    { "@type": "Offer", name: "Advanced — full app with auth, multi-user, dashboards", priceSpecification: { "@type": "PriceSpecification", minPrice: 10000, priceCurrency: "USD" } },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
        />
        <Suspense fallback={null}>
          <PostHogClient>{children}</PostHogClient>
        </Suspense>
      </body>
    </html>
  );
}
