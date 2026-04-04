'use client';

export default function DeleteAccountPage() {
  return (
    <>
      <style jsx global>{`
        .delete-page {
          max-width: 720px;
          margin: 0 auto;
          padding: 3rem 1.5rem;
          line-height: 1.7;
        }
        .delete-page h1 {
          font-size: 2rem;
          font-weight: 700;
          color: rgba(255,255,255,0.95);
          margin-bottom: 0.5rem;
        }
        .delete-page .updated {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.3);
          margin-bottom: 2.5rem;
        }
        .delete-page h2 {
          font-size: 1.2rem;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .delete-page p,
        .delete-page li {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.65);
          margin-bottom: 0.75rem;
        }
        .delete-page ul {
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .delete-page a {
          color: #00D4FF;
          text-decoration: none;
        }
        .delete-page a:hover {
          text-decoration: underline;
        }
        .delete-page .back {
          display: inline-block;
          margin-top: 3rem;
          font-size: 0.85rem;
          color: #00E5A0;
        }
      `}</style>

      <div className="delete-page">
        <h1>Delete Your Account &amp; Data</h1>
        <p className="updated">SkoobiLabs &mdash; HearVerse, HearZ, and all SkoobiLabs apps</p>

        <p>
          We respect your right to control your data. You can request deletion of your
          account and all associated data at any time.
        </p>

        <h2>How to request deletion</h2>
        <p>
          Send an email to{" "}
          <a href="mailto:ask@skoobilabs.com?subject=Delete%20My%20Account">ask@skoobilabs.com</a>{" "}
          with the subject line &ldquo;Delete My Account&rdquo; and include the email address
          associated with your account. We will process your request within 7 business days.
        </p>

        <h2>What gets deleted</h2>
        <ul>
          <li>Your account and authentication credentials</li>
          <li>Any subscription or purchase history stored on our servers</li>
          <li>Analytics data associated with your account</li>
          <li>All personal information we hold about you</li>
        </ul>

        <h2>What is stored only on your device</h2>
        <p>
          The following data is stored locally on your device and is not on our servers.
          Uninstalling the app removes it automatically:
        </p>
        <ul>
          <li>Reading progress and bookmarks</li>
          <li>Listening session history</li>
          <li>App preferences (voice, speed, theme)</li>
          <li>Cached audio files</li>
        </ul>

        <h2>Third-party data</h2>
        <p>
          If you used Apple Sign-In or Google Sign-In, you may also want to revoke access
          from your Apple or Google account settings. Subscription billing is managed by
          Apple or Google and is subject to their data policies.
        </p>

        <h2>Contact</h2>
        <p>
          Questions? Email us at{" "}
          <a href="mailto:ask@skoobilabs.com">ask@skoobilabs.com</a>.
        </p>

        <a href="/" className="back">&larr; Back to Skoobi Labs</a>
      </div>
    </>
  );
}
