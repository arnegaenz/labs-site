import * as Sentry from '@sentry/nextjs';

/**
 * Server-side instrumentation for labs.skoobi.com.
 *
 * Per `_ops/decisions-2026-05-03.md` D-002. SDK no-ops when DSN unset.
 */
export async function register() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return;

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    Sentry.init({
      dsn,
      tracesSampleRate: 0.1,
      sendDefaultPii: false,
      environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
    });
  } else if (process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init({
      dsn,
      tracesSampleRate: 0.1,
      sendDefaultPii: false,
      environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
    });
  }
}

export const onRequestError = Sentry.captureRequestError;
