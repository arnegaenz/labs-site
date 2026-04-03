'use client';

export default function PrivacyPage() {
  return (
    <>
      <style jsx global>{`
        .privacy-page {
          max-width: 720px;
          margin: 0 auto;
          padding: 3rem 1.5rem;
          line-height: 1.7;
        }
        .privacy-page h1 {
          font-size: 2rem;
          font-weight: 700;
          color: rgba(255,255,255,0.95);
          margin-bottom: 0.5rem;
        }
        .privacy-page .updated {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.3);
          margin-bottom: 2.5rem;
        }
        .privacy-page h2 {
          font-size: 1.2rem;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .privacy-page p,
        .privacy-page li {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.65);
          margin-bottom: 0.75rem;
        }
        .privacy-page ul {
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .privacy-page a {
          color: #00D4FF;
          text-decoration: none;
        }
        .privacy-page a:hover {
          text-decoration: underline;
        }
        .privacy-page .back {
          display: inline-block;
          margin-top: 3rem;
          font-size: 0.85rem;
          color: #00E5A0;
        }
      `}</style>

      <div className="privacy-page">
        <h1>Privacy Policy</h1>
        <p className="updated">Last updated: April 1, 2026</p>

        <p>
          SkoobiLabs (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) builds mobile applications including
          HearZ, HearVerse, and Connections Buddy. This policy describes how we handle your information
          across all SkoobiLabs apps.
        </p>

        <h2>Information We Collect</h2>
        <p>Our apps are designed to work with minimal data collection:</p>
        <ul>
          <li>
            <strong>Account information:</strong> If you choose to create an account (via Apple Sign-In,
            Google, or email), we store your email address and authentication credentials securely
            through Supabase. You can use our apps without creating an account.
          </li>
          <li>
            <strong>Usage analytics:</strong> We collect anonymous usage data such as which features are
            used, playback events, and general app performance metrics. This helps us improve the
            experience. This data is processed through PostHog and cannot identify you personally.
          </li>
          <li>
            <strong>Preferences:</strong> Your settings (playback speed, voice preference, reading
            position, text size) are stored locally on your device.
          </li>
          <li>
            <strong>Subscription status:</strong> If you subscribe to a Pro plan, your subscription
            is managed by RevenueCat and Apple/Google. We receive your subscription status but not
            your payment details.
          </li>
        </ul>

        <h2>Information We Do Not Collect</h2>
        <ul>
          <li>We do not record audio or access your microphone.</li>
          <li>We do not track your location.</li>
          <li>We do not sell or share personal data with third parties.</li>
          <li>We do not collect data from children (see below).</li>
        </ul>

        <h2>Audio Playback</h2>
        <p>
          HearZ and HearVerse use AI text-to-speech technology (OpenAI) to read content aloud. Text is
          sent to our secure server to generate audio, which is cached for faster playback. No personal
          data is included in these requests — only the article or Bible chapter text.
        </p>

        <h2>Advertising</h2>
        <p>
          Free-tier users may see ads served by Google AdMob. AdMob may collect device identifiers and
          usage data as described in{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google&apos;s Privacy Policy
          </a>. We configure ads to show only age-appropriate content (G-rated). Pro subscribers do not
          see any ads.
        </p>

        <h2>Third-Party Services</h2>
        <p>Our apps use the following third-party services, each with their own privacy policies:</p>
        <ul>
          <li><strong>Supabase:</strong> Authentication and account management</li>
          <li><strong>RevenueCat:</strong> Subscription management</li>
          <li><strong>Google AdMob:</strong> Advertising (free tier only)</li>
          <li><strong>PostHog:</strong> Anonymous usage analytics</li>
          <li><strong>Sentry:</strong> Crash reporting and error tracking</li>
          <li><strong>OpenAI:</strong> Text-to-speech audio generation</li>
          <li><strong>Expo / EAS:</strong> App updates and build distribution</li>
        </ul>

        <h2>Data Storage</h2>
        <p>
          User preferences, reading progress, and cached content are stored locally on your device.
          If you create an account, your email and authentication data are stored securely on Supabase
          servers. You can delete your account at any time by contacting us.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Our apps are not directed at children under 13. We do not knowingly collect information from
          children.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Any changes will be reflected on this page
          with an updated date.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this privacy policy, contact us at{" "}
          <a href="mailto:ask@skoobilabs.com">ask@skoobilabs.com</a>.
        </p>

        <a href="/" className="back">&larr; Back to Skoobi Labs</a>
      </div>
    </>
  );
}
