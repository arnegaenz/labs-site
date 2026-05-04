import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {};

export default withSentryConfig(nextConfig, {
  org: "skoobi-labs",
  project: "labs-site",
  silent: !process.env.CI,
  sourcemaps: { deleteSourcemapsAfterUpload: true },
  disableLogger: true,
});
