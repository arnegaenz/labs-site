# Labs Site

The web presence for Skoobi Labs at labs.skoobi.com.

## Tech Stack
- Next.js 15 (App Router) with TypeScript
- React 19
- @supabase/supabase-js
- Hosting: Vercel
- Original static HTML files kept as reference (index.html, privacy.html)

## Infrastructure
- Domain: labs.skoobi.com (CNAME → cname.vercel-dns.com)
- Redirect: skoobilabs.com → labs.skoobi.com (301, GoDaddy)
- GitHub: arnegaenz/labs-site
- Vercel project: labs-site

## What This Site Does
- Showcases SkoobiLabs as a mobile app studio
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

## Sibling Projects
- ConnectionsHelper: /SkoobiLabs/ConnectionsHelper (iOS app)
- HearZee: /SkoobiLabs/HearZee (cross-platform app)
- Skoobi platform: /development/Skoobi (skoobi.com)
