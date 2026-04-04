'use client';

export default function HearVersePage() {
  return (
    <>
      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          background: #08080F;
          color: rgba(255,255,255,0.85);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          overflow-x: hidden;
        }

        /* --- NAV --- */
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2.5rem;
          position: relative;
          z-index: 20;
        }
        .nav-logo {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
        }
        .nav-logo:hover { color: rgba(255,255,255,0.5); }
        .nav-download {
          padding: 8px 20px;
          background: #FFB300;
          color: #000;
          font-weight: 700;
          font-size: 0.8rem;
          border-radius: 10px;
          text-decoration: none;
          transition: transform 0.2s;
        }
        .nav-download:hover { transform: translateY(-1px); }

        /* --- HERO --- */
        .hv-hero {
          text-align: center;
          padding: 4rem 2rem 5rem;
          position: relative;
          overflow: hidden;
        }
        .hv-hero::before {
          content: '';
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255,179,0,0.1) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 0;
          filter: blur(60px);
        }
        .hv-hero-content {
          position: relative;
          z-index: 1;
        }
        .hv-hero-icon {
          width: 100px;
          height: 100px;
          border-radius: 24px;
          box-shadow: 0 8px 40px rgba(255,179,0,0.2);
          margin: 0 auto 1.5rem;
          display: block;
        }
        .hv-hero h1 {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: -1.5px;
          line-height: 1.1;
          margin-bottom: 1rem;
        }
        .hv-hero h1 em {
          font-style: normal;
          color: #FFB300;
        }
        .hv-hero .lead {
          font-size: 1.25rem;
          color: rgba(255,255,255,0.45);
          max-width: 480px;
          margin: 0 auto 2.5rem;
          line-height: 1.6;
        }

        /* --- PHONE SHOWCASE --- */
        .hv-phone-section {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          padding: 0 2rem 5rem;
          position: relative;
          z-index: 1;
        }
        .hv-phone {
          width: 220px;
          flex-shrink: 0;
        }
        .hv-phone img {
          width: 100%;
          border-radius: 28px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          border: 2px solid rgba(255,255,255,0.08);
        }
        .hv-phone-center img {
          box-shadow: 0 24px 80px rgba(255,179,0,0.15), 0 20px 60px rgba(0,0,0,0.5);
          border-color: rgba(255,179,0,0.12);
        }
        .hv-phone-side {
          opacity: 0.5;
          transform: scale(0.9) translateY(20px);
        }

        /* --- FEATURES --- */
        .hv-features {
          padding: 5rem 2rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .hv-features h2 {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          color: #FFFFFF;
          letter-spacing: -0.5px;
          margin-bottom: 3rem;
        }
        .hv-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .hv-feature-card {
          text-align: center;
          padding: 2rem 1.5rem;
        }
        .hv-feature-icon {
          font-size: 2.2rem;
          margin-bottom: 1rem;
        }
        .hv-feature-card h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #FFB300;
          margin-bottom: 0.6rem;
        }
        .hv-feature-card p {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.6;
        }

        /* --- HOW IT WORKS --- */
        .hv-how {
          padding: 5rem 2rem;
          max-width: 700px;
          margin: 0 auto;
        }
        .hv-how h2 {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          color: #FFFFFF;
          letter-spacing: -0.5px;
          margin-bottom: 3rem;
        }
        .hv-steps {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .hv-step {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
        }
        .hv-step-num {
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 12px;
          background: rgba(255,179,0,0.1);
          border: 1px solid rgba(255,179,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 800;
          color: #FFB300;
        }
        .hv-step-text h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 0.3rem;
        }
        .hv-step-text p {
          font-size: 0.92rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.6;
        }

        /* --- PRICING --- */
        .hv-pricing {
          padding: 5rem 2rem;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        .hv-pricing h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: -0.5px;
          margin-bottom: 0.8rem;
        }
        .hv-pricing .pricing-sub {
          font-size: 1rem;
          color: rgba(255,255,255,0.4);
          margin-bottom: 2.5rem;
        }
        .hv-pricing-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.2rem;
        }
        .hv-price-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 2rem 1.5rem;
          transition: border-color 0.3s, transform 0.2s;
        }
        .hv-price-card:hover {
          transform: translateY(-3px);
        }
        .hv-price-card-featured {
          border-color: rgba(255,179,0,0.3);
          background: rgba(255,179,0,0.05);
        }
        .hv-price-card-featured:hover {
          border-color: rgba(255,179,0,0.5);
        }
        .hv-price-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 0.8rem;
        }
        .hv-price-featured-label {
          color: #FFB300;
        }
        .hv-price-amount {
          font-size: 2.4rem;
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: -1px;
        }
        .hv-price-period {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.3);
          margin-bottom: 1rem;
        }
        .hv-price-detail {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.35);
          line-height: 1.5;
        }

        /* --- CTA --- */
        .hv-cta {
          text-align: center;
          padding: 4rem 2rem 6rem;
        }
        .hv-cta h2 {
          font-size: 2.2rem;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: -0.5px;
          margin-bottom: 1rem;
        }
        .hv-cta p {
          font-size: 1rem;
          color: rgba(255,255,255,0.35);
          margin-bottom: 2rem;
        }
        .hv-cta .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 18px 36px;
          background: #FFB300;
          color: #000;
          font-weight: 700;
          font-size: 1.05rem;
          border-radius: 14px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hv-cta .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(255,179,0,0.35);
        }
        .hv-cta .cta-btn svg { width: 22px; height: 22px; }

        /* --- FOOTER --- */
        .hv-footer {
          text-align: center;
          padding: 2rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .hv-footer p {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.15);
        }
        .hv-footer a {
          color: rgba(255,255,255,0.25);
          text-decoration: none;
          margin: 0 0.8rem;
        }
        .hv-footer a:hover { color: rgba(255,255,255,0.5); }

        @media (max-width: 700px) {
          .hv-phone-section { gap: 0.8rem; }
          .hv-phone { width: 150px; }
          .hv-phone-side { display: none; }
          .hv-features-grid { grid-template-columns: 1fr; gap: 1rem; }
          .hv-pricing-cards { grid-template-columns: 1fr; }
          .hv-step { gap: 1rem; }
        }
      `}</style>

      {/* Nav */}
      <nav className="nav">
        <a href="/" className="nav-logo">SkoobiLabs</a>
        <a href="https://apps.apple.com/app/hearverse/id6761432386" className="nav-download" target="_blank" rel="noopener noreferrer">
          Download
        </a>
      </nav>

      {/* Hero */}
      <section className="hv-hero">
        <div className="hv-hero-content">
          <img src="/icons/hearverse.png" alt="HearVerse" className="hv-hero-icon" />
          <h1>The Bible,<br />read aloud <em>beautifully</em></h1>
          <p className="lead">
            Two warm AI voices. Every chapter. Just tap play and listen.
          </p>
        </div>
      </section>

      {/* Phone Screenshots */}
      <section className="hv-phone-section">
        <div className="hv-phone hv-phone-side">
          <img src="/screenshots/plan.jpg" alt="Reading Plan" />
        </div>
        <div className="hv-phone hv-phone-center">
          <img src="/screenshots/nowplaying.jpg" alt="Now Playing" />
        </div>
        <div className="hv-phone hv-phone-side">
          <img src="/screenshots/profile.jpg" alt="Profile" />
        </div>
      </section>

      {/* Features */}
      <section className="hv-features">
        <h2>Everything you need to listen</h2>
        <div className="hv-features-grid">
          <div className="hv-feature-card">
            <div className="hv-feature-icon">&#x1F4D6;</div>
            <h3>The Whole Bible</h3>
            <p>1,189 chapters across all 66 books. KJV and ASV translations, with more coming.</p>
          </div>
          <div className="hv-feature-card">
            <div className="hv-feature-icon">&#x1F399;</div>
            <h3>Two AI Voices</h3>
            <p>Choose a warm male or female voice. Not robotic — natural, clear, and reverent.</p>
          </div>
          <div className="hv-feature-card">
            <div className="hv-feature-icon">&#x1F4CB;</div>
            <h3>Reading Plans</h3>
            <p>3 months to 2 years. We mix Old and New Testament daily so you finish both together.</p>
          </div>
          <div className="hv-feature-card">
            <div className="hv-feature-icon">&#x1F4CD;</div>
            <h3>Verse Navigation</h3>
            <p>See exactly which verse is playing. Jump forward or back without losing your place.</p>
          </div>
          <div className="hv-feature-card">
            <div className="hv-feature-icon">&#x1F525;</div>
            <h3>Streaks &amp; Stats</h3>
            <p>Track your listening. See chapters completed, daily streaks, and your 66-book progress.</p>
          </div>
          <div className="hv-feature-card">
            <div className="hv-feature-icon">&#x1F3B6;</div>
            <h3>Beautiful Player</h3>
            <p>A full-screen hi-fi design inspired by vintage Marantz receivers. It just feels right.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="hv-how">
        <h2>Simple as it should be</h2>
        <div className="hv-steps">
          <div className="hv-step">
            <div className="hv-step-num">1</div>
            <div className="hv-step-text">
              <h3>Pick a book</h3>
              <p>Tap the book name on the player to browse all 66 books. Genesis to Revelation.</p>
            </div>
          </div>
          <div className="hv-step">
            <div className="hv-step-num">2</div>
            <div className="hv-step-text">
              <h3>Tap play</h3>
              <p>One big button. The chapter starts reading aloud immediately. No setup, no accounts required.</p>
            </div>
          </div>
          <div className="hv-step">
            <div className="hv-step-num">3</div>
            <div className="hv-step-text">
              <h3>Keep listening</h3>
              <p>Chapters auto-advance. Come back tomorrow and you&apos;re right where you left off. Or start a reading plan and let us guide you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="hv-pricing">
        <h2>Free to start. Pro to focus.</h2>
        <p className="pricing-sub">
          Every chapter is free. Pro removes ads for uninterrupted listening.
        </p>
        <div className="hv-pricing-cards">
          <div className="hv-price-card">
            <div className="hv-price-label">Monthly</div>
            <div className="hv-price-amount">$2.99</div>
            <div className="hv-price-period">per month</div>
            <div className="hv-price-detail">Cancel anytime</div>
          </div>
          <div className="hv-price-card hv-price-card-featured">
            <div className="hv-price-label hv-price-featured-label">Best Value</div>
            <div className="hv-price-amount">$12.99</div>
            <div className="hv-price-period">per year</div>
            <div className="hv-price-detail">Save 64% vs monthly</div>
          </div>
          <div className="hv-price-card">
            <div className="hv-price-label">Lifetime</div>
            <div className="hv-price-amount">$29.99</div>
            <div className="hv-price-period">one-time</div>
            <div className="hv-price-detail">Pay once, yours forever</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="hv-cta">
        <h2>Start listening today</h2>
        <p>Available now on iPhone and iPad. Android coming soon.</p>
        <a href="https://apps.apple.com/app/hearverse/id6761432386" className="cta-btn" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
          Download on the App Store
        </a>
      </section>

      {/* Footer */}
      <footer className="hv-footer">
        <p>
          <a href="/">SkoobiLabs</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </p>
        <p style={{ marginTop: '0.5rem' }}>&copy; 2026 SkoobiLabs</p>
      </footer>
    </>
  );
}
