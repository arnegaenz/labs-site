"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
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
      capture_pageview: false,
      capture_pageleave: true,
      loaded: (ph) => {
        ph.register({
          surface: "labs",
          distribution: process.env.NODE_ENV === "production" ? "prod" : "dev",
        });
      },
    });
  }, []);

  return (
    <>
      <PageviewTracker />
      {children}
    </>
  );
}

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    if (typeof window === "undefined") return;
    const url = searchParams && searchParams.toString().length > 0
      ? `${pathname}?${searchParams.toString()}`
      : pathname;
    posthog.capture("$pageview", { $current_url: window.location.origin + url });
  }, [pathname, searchParams]);

  return null;
}
