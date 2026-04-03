import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import Anthropic from "@anthropic-ai/sdk";

/**
 * App Store Review Monitor
 *
 * Polls the App Store Connect API for new reviews across all SkoobiLabs apps,
 * stores them in Supabase, and uses Claude to draft responses.
 *
 * Called via Vercel Cron (daily) or manually.
 *
 * Setup:
 * 1. Generate App Store Connect API key (Keys → App Store Connect API)
 * 2. Set env vars: ASC_ISSUER_ID, ASC_KEY_ID, ASC_PRIVATE_KEY
 * 3. Add cron to vercel.json: { "path": "/api/webhooks/store-reviews", "schedule": "0 12 * * *" }
 *
 * App Store Connect API docs:
 * https://developer.apple.com/documentation/appstoreconnectapi/list_all_customer_reviews_for_an_app
 */

const APPS = [
  { appId: "6760101081", tag: "hearz", name: "HearZ" },
  { appId: "6761432386", tag: "hearverse", name: "HearVerse" },
  // Add more apps here as they launch
];

// Generate JWT for App Store Connect API
async function generateASCToken(): Promise<string> {
  const issuerId = process.env.ASC_ISSUER_ID;
  const keyId = process.env.ASC_KEY_ID;
  const privateKey = process.env.ASC_PRIVATE_KEY;

  if (!issuerId || !keyId || !privateKey) {
    throw new Error("App Store Connect API credentials not configured");
  }

  // JWT header
  const header = {
    alg: "ES256",
    kid: keyId,
    typ: "JWT",
  };

  // JWT payload — token valid for 20 minutes
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: issuerId,
    iat: now,
    exp: now + 1200,
    aud: "appstoreconnect-v1",
  };

  // Sign with ES256 using Web Crypto API
  const encoder = new TextEncoder();

  const headerB64 = btoa(JSON.stringify(header)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const payloadB64 = btoa(JSON.stringify(payload)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const signingInput = `${headerB64}.${payloadB64}`;

  // Import the private key (PEM → CryptoKey)
  const pemContent = privateKey
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");
  const keyBuffer = Uint8Array.from(atob(pemContent), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    keyBuffer,
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    { name: "ECDSA", hash: "SHA-256" },
    cryptoKey,
    encoder.encode(signingInput)
  );

  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${signingInput}.${sigB64}`;
}

async function fetchReviews(appId: string, token: string) {
  const url = `https://api.appstoreconnect.apple.com/v1/apps/${appId}/customerReviews?sort=-createdDate&limit=20`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ASC API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.data || [];
}

type ReviewAnalysis = {
  aurora_take: string;
  draft_response: string;
};

async function analyzeReview(
  anthropic: Anthropic,
  appName: string,
  review: { title: string; body: string; rating: number; reviewer: string }
): Promise<ReviewAnalysis> {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are Aurora, CTO of SkoobiLabs — a mobile app studio. You're reviewing an App Store review for ${appName}.

Your job:
1. Analyze the review strategically — what does this tell us? Is it a known issue? Does it affect our brand? Is there an opportunity here?
2. Draft the best possible public response.

Context about our apps:
- HearZ: Audio news reader for elderly users. AI voices read articles aloud.
- HearVerse: Bible audio reader for elderly users. KJV, verse-level navigation, Marantz hi-fi theme.
- Both apps target elderly users — accessibility and simplicity are our brand.
- Known issue: TTS audio volume is quieter than typical media (backend normalization on backlog).
- Known issue: Only KJV translation available, ASV coming soon.
- We're a small indie studio (SkoobiLabs). Genuine, not corporate.

Review by ${review.reviewer}:
Rating: ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}
Title: ${review.title || "(no title)"}
Body: ${review.body || "(no body)"}

Respond ONLY with valid JSON:
{
  "aurora_take": "2-3 sentences: your strategic analysis as CTO. Why you'd respond this way. Connect to what you know about the product, the audience, known issues, or brand positioning.",
  "draft_response": "The actual response to post publicly. Warm, genuine, under 100 words. Sign as '— SkoobiLabs Team'"
}`,
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text.trim() : "";
  const cleaned = text.replace(/^```json\n?/, "").replace(/\n?```$/, "");

  try {
    return JSON.parse(cleaned);
  } catch {
    return {
      aurora_take: "Could not parse analysis — needs manual review.",
      draft_response: "",
    };
  }
}

export async function POST(request: NextRequest) {
  // Auth check
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && token !== cronSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const results: Record<string, any> = {};

  try {
    const ascToken = await generateASCToken();

    for (const app of APPS) {
      try {
        const reviews = await fetchReviews(app.appId, ascToken);
        let newCount = 0;
        let draftedCount = 0;

        for (const review of reviews) {
          const attrs = review.attributes;
          const reviewId = review.id;

          // Check if we already processed this review
          const { data: existing } = await supabase
            .from("store_reviews")
            .select("id")
            .eq("store_review_id", reviewId)
            .limit(1);

          if (existing && existing.length > 0) continue;

          // Aurora analyzes every review — strategic take + draft response
          const analysis = await analyzeReview(anthropic, app.name, {
            title: attrs.title || "",
            body: attrs.body || "",
            rating: attrs.rating || 0,
            reviewer: attrs.reviewerNickname || "A user",
          });

          // Store the review with Aurora's analysis
          await supabase.from("store_reviews").insert({
            store_review_id: reviewId,
            app_tag: app.tag,
            store: "apple",
            rating: attrs.rating,
            title: attrs.title,
            body: attrs.body,
            reviewer: attrs.reviewerNickname,
            review_date: attrs.createdDate,
            territory: attrs.territory,
            aurora_take: analysis.aurora_take,
            draft_response: analysis.draft_response || null,
            response_status: "draft",
          });

          newCount++;
          if (analysis.draft_response) draftedCount++;
        }

        results[app.tag] = {
          total_fetched: reviews.length,
          new: newCount,
          drafts: draftedCount,
        };
      } catch (appErr) {
        results[app.tag] = {
          error: appErr instanceof Error ? appErr.message : "Unknown error",
        };
      }
    }

    return NextResponse.json({ ok: true, results });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ status: "ok", service: "store-review-monitor" });
}
