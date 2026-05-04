import * as Sentry from '@sentry/nextjs';

/**
 * Client-side instrumentation for labs.skoobi.com.
 * Per `_ops/decisions-2026-05-03.md` D-002. SDK no-ops when DSN unset.
 */
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0.1,
    sendDefaultPii: false,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV || 'development',
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
