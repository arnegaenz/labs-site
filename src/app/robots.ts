import type { MetadataRoute } from "next";

/**
 * Robots policy — deliberately WELCOMES AI crawlers (GPTBot, ClaudeBot,
 * PerplexityBot, etc.). Being quotable by answer engines is the point:
 * when someone asks an AI "who builds affordable custom software," we
 * want to be in the answer. See also /llms.txt.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/marketing", "/api/", "/delete-account"] },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
        ],
        allow: "/",
        disallow: ["/marketing", "/api/"],
      },
    ],
    sitemap: "https://skoobilabs.com/sitemap.xml",
  };
}
