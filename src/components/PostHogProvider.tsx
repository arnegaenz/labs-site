"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

/**
 * Web-side PostHog initialization for labs.skoobi.com.
 *
 * Per `_ops/decisions-2026-05-03.md` D-003.
 *
 * Reuses the studio's shared PostHog project key. Events are tagged with
 * `surface: 'labs'` so they can be split out of any user-cohort analysis
 * tied to a specific app.
 */

const POSTHOG_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ||
  "phc_hjzPzWQXrSXdsln8GjTjh66EprdHpraatuOQAE0AO3j";
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

let initialized = false;

export function PostHogClient({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (initialized) return;
    if (typeof window === "undefined") return;
    initialized = true;
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: "identified_only",
      // "history_change" = posthog-js captures the initial pageview AND
      // SPA navigations itself. The old manual PageviewTracker child fired
      // its capture BEFORE this parent effect ran init (React runs child
      // effects first), so the initial $pageview was silently dropped —
      // the site logged pageleaves with no pageviews (found 2026-07-08).
      capture_pageview: "history_change",
      capture_pageleave: true,
      loaded: (ph) => {
        ph.register({
          surface: "labs",
          distribution: process.env.NODE_ENV === "production" ? "prod" : "dev",
        });
      },
    });
  }, []);

  return <>{children}</>;
}
