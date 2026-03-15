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
        <p className="updated">Last updated: March 7, 2026</p>

        <p>
          Skoobi Labs (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) builds mobile applications including
          HearZ and Connections Buddy. This policy describes how we handle your information.
        </p>

        <h2>Information We Collect</h2>
        <p>Our apps are designed to work with minimal data collection:</p>
        <ul>
          <li>
            <strong>Usage data:</strong> We may collect anonymous usage analytics such as which features
            are used and general app performance metrics. This data cannot identify you personally.
          </li>
          <li>
            <strong>Preferences:</strong> Your settings (selected topics, playback speed, voice
            preference, theme) are stored locally on your device.
          </li>
          <li>
            <strong>Article data:</strong> Articles you listen to are cached locally on your device for
            offline access.
          </li>
        </ul>

        <h2>Information We Do Not Collect</h2>
        <ul>
          <li>We do not collect personal information such as your name, email address, or phone number.</li>
          <li>We do not record audio or access your microphone.</li>
          <li>We do not track your location.</li>
          <li>We do not sell or share any data with third parties.</li>
        </ul>

        <h2>Audio Playback</h2>
        <p>
          HearZ uses text-to-speech technology to read articles aloud. All audio is generated on your
          device. No audio is recorded, stored, or transmitted.
        </p>

        <h2>Third-Party Services</h2>
        <p>Our apps may use the following third-party services:</p>
        <ul>
          <li>
            <strong>Expo / EAS:</strong> For app updates and build distribution.
          </li>
        </ul>
        <p>These services have their own privacy policies that govern their use of data.</p>

        <h2>Data Storage</h2>
        <p>
          All user preferences and cached content are stored locally on your device. We do not maintain
          user accounts or store personal data on our servers.
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
