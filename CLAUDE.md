# Labs Site

The web presence for Skoobi Labs at labs.skoobi.com.

## Design language

This product follows the SkoobiLabs Workbench direction. Brand POV and studio token spec auto-load below — authoritative for any visual or voice change:

@../BRAND.md
@../platform/DESIGN.md

## Tech Stack
- Next.js 15 (App Router) with TypeScript
- React 19
- @supabase/supabase-js
- Hosting: Vercel
- Original static HTML files kept as reference (index.html, privacy.html)

## Infrastructure
- Domains: **skoobilabs.com is the primary** (Vercel production URL) + labs.skoobi.com. The old note that skoobilabs.com 301s away is stale — it serves this site.
- GitHub: arnegaenz/labs-site
- Vercel project: labs-site

## What This Site Does
- **Positions SkoobiLabs as a software company: 'Big-company software. Small-company price.'** (hero rewritten 2026-07-08 — the word 'freelance' is BANNED on this site; it torpedoes B2B client diligence, which is real traffic now that client tools live at *.skoobilabs.com)
- Page order (2026-07-08): hero → trust grid (single-tenant, encryption, observability, staging, monthly report, human on call — every claim true per D-035/D-038/OBSERVABILITY.md) → pricing → in-production strip (clients anonymous until they approve naming) → SkoobiBuild story → own products (SkoobiSlate, Hear line)
- The personality stays (bus, wink lines) — sass punches UP at enterprise vendors, never at potential clients
- Features the bus animation (brand/splash.html) as hero
- App cards for ConnectionsHelper and HearZ
- "More coming soon" messaging
- /privacy — Privacy policy page
- /marketing — Marketing Engine dashboard (UI shell, no API integration yet)
- /api/marketing/campaigns — CRUD skeleton (GET returns [], POST returns 501)
- /api/marketing/insights — Placeholder GET returning zeroed metrics

## Directory Structure
```
src/app/
  layout.tsx           — Root layout (dark bg, system fonts, metadata)
  page.tsx             — Home page (bus animation, app cards)
  privacy/page.tsx     — Privacy policy
  marketing/
    layout.tsx         — Sidebar nav (Dashboard, Campaigns, Insights, Attribution, Settings)
    page.tsx           — Dashboard with stat cards, empty table, action buttons
  api/marketing/
    campaigns/route.ts — GET/POST skeleton
    insights/route.ts  — GET placeholder
```

## Brand
- Colors: #00E5A0 (mint), #00D4FF (cyan), #8B5CF6 (purple)
- Background: #08080F
- Logo: VW minibus (brand assets in /SkoobiLabs/brand/)

## App Store Links
- HearVerse App Store download button on homepage: https://apps.apple.com/app/id6761432386
- Added April 2026 for AdMob app-ads.txt verification and user acquisition

## app-ads.txt
- Served at labs.skoobi.com/app-ads.txt (also at skoobi.com and www.skoobi.com)
- Content: `google.com, pub-2092614136459898, DIRECT, f08c47fec0942fa0`
- Required by AdMob for ad serving verification

## Sibling Projects
- ConnectionsHelper: /SkoobiLabs/ConnectionsHelper (iOS app)
- HearZee: /SkoobiLabs/HearZee — **legacy, retired 2026-04-26**; active HearZ is in Hear monorepo
- Skoobi platform: /development/SkoobiLabs/skoobi (skoobi.com)
- Hear monorepo: /SkoobiLabs/Hear (HearVerse + HearZ)

## Backend dependency
- `/api/analytics` proxies to `https://hear-api.arneg-fb8.workers.dev/api/analytics/summary`. Switched 2026-04-26 from the legacy `hearzee-api` worker (deleted) to the active `hear-api` post-monorepo migration. Endpoint shape is identical.
