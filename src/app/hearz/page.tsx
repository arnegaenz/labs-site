'use client';

export default function HearZPage() {
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
        .nav-badge {
          padding: 8px 20px;
          background: rgba(0,212,255,0.12);
          color: #00D4FF;
          font-weight: 700;
          font-size: 0.8rem;
          border-radius: 10px;
          border: 1px solid rgba(0,212,255,0.2);
        }

        /* --- HERO --- */
        .hz-hero {
          text-align: center;
          padding: 4rem 2rem 5rem;
          position: relative;
          overflow: hidden;
        }
        .hz-hero::before {
          content: '';
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 0;
          filter: blur(60px);
        }
        .hz-hero-content {
          position: relative;
          z-index: 1;
        }
        .hz-hero-icon {
          width: 100px;
          height: 100px;
          border-radius: 24px;
          box-shadow: 0 8px 40px rgba(0,212,255,0.2);
          margin: 0 auto 1.5rem;
          display: block;
        }
        .hz-hero h1 {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: -1.5px;
          line-height: 1.1;
          margin-bottom: 1rem;
        }
        .hz-hero h1 em {
          font-style: normal;
          color: #00D4FF;
        }
        .hz-hero .lead {
          font-size: 1.25rem;
          color: rgba(255,255,255,0.45);
          max-width: 480px;
          margin: 0 auto 2.5rem;
          line-height: 1.6;
        }

        /* --- PHONE SHOWCASE --- */
        .hz-phone-section {
          display: flex;
          justify-content: center;
          padding: 0 2rem 5rem;
          position: relative;
          z-index: 1;
        }
        .hz-phones {
          display: flex;
          justify-content: center;
          gap: 2rem;
          align-items: flex-start;
        }
        .hz-phone {
          width: 240px;
          flex-shrink: 0;
        }
        .hz-phone img {
          width: 100%;
          border-radius: 28px;
          box-shadow: 0 24px 80px rgba(0,212,255,0.15), 0 20px 60px rgba(0,0,0,0.5);
          border: 2px solid rgba(0,212,255,0.12);
        }

        /* --- FEATURES --- */
        .hz-features {
          padding: 5rem 2rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .hz-features h2 {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          color: #FFFFFF;
          letter-spacing: -0.5px;
          margin-bottom: 3rem;
        }
        .hz-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .hz-feature-card {
          text-align: center;
          padding: 2rem 1.5rem;
        }
        .hz-feature-icon {
          font-size: 2.2rem;
          margin-bottom: 1rem;
        }
        .hz-feature-card h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #00D4FF;
          margin-bottom: 0.6rem;
        }
        .hz-feature-card p {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.6;
        }

        /* --- HOW IT WORKS --- */
        .hz-how {
          padding: 5rem 2rem;
          max-width: 700px;
          margin: 0 auto;
        }
        .hz-how h2 {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          color: #FFFFFF;
          letter-spacing: -0.5px;
          margin-bottom: 3rem;
        }
        .hz-steps {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .hz-step {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
        }
        .hz-step-num {
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 12px;
          background: rgba(0,212,255,0.1);
          border: 1px solid rgba(0,212,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 800;
          color: #00D4FF;
        }
        .hz-step-text h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 0.3rem;
        }
        .hz-step-text p {
          font-size: 0.92rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.6;
        }

        /* --- PRICING --- */
        .hz-pricing {
          padding: 5rem 2rem;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        .hz-pricing h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: -0.5px;
          margin-bottom: 0.8rem;
        }
        .hz-pricing .pricing-sub {
          font-size: 1rem;
          color: rgba(255,255,255,0.4);
          margin-bottom: 2.5rem;
        }
        .hz-pricing-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.2rem;
          max-width: 500px;
          margin: 0 auto;
        }
        .hz-price-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 2rem 1.5rem;
          transition: border-color 0.3s, transform 0.2s;
        }
        .hz-price-card:hover {
          transform: translateY(-3px);
        }
        .hz-price-card-featured {
          border-color: rgba(0,212,255,0.3);
          background: rgba(0,212,255,0.05);
        }
        .hz-price-card-featured:hover {
          border-color: rgba(0,212,255,0.5);
        }
        .hz-price-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 0.8rem;
        }
        .hz-price-featured-label {
          color: #00D4FF;
        }
        .hz-price-amount {
          font-size: 2.4rem;
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: -1px;
        }
        .hz-price-period {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.3);
          margin-bottom: 1rem;
        }
        .hz-price-detail {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.35);
          line-height: 1.5;
        }

        /* --- CTA --- */
        .hz-cta {
          text-align: center;
          padding: 4rem 2rem 6rem;
        }
        .hz-cta h2 {
          font-size: 2.2rem;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: -0.5px;
          margin-bottom: 1rem;
        }
        .hz-cta p {
          font-size: 1rem;
          color: rgba(255,255,255,0.35);
          margin-bottom: 2rem;
        }
        .hz-cta .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 18px 36px;
          background: #00D4FF;
          color: #000;
          font-weight: 700;
          font-size: 1.05rem;
          border-radius: 14px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hz-cta .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,212,255,0.35);
        }

        /* --- FOOTER --- */
        .hz-footer {
          text-align: center;
          padding: 2rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .hz-footer p {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.15);
        }
        .hz-footer a {
          color: rgba(255,255,255,0.25);
          text-decoration: none;
          margin: 0 0.8rem;
        }
        .hz-footer a:hover { color: rgba(255,255,255,0.5); }

        @media (max-width: 700px) {
          .hz-phones { gap: 1rem; }
          .hz-phone { width: 160px; }
          .hz-features-grid { grid-template-columns: 1fr; gap: 1rem; }
          .hz-pricing-cards { grid-template-columns: 1fr; }
          .hz-step { gap: 1rem; }
        }
      `}</style>

      {/* Nav */}
      <nav className="nav">
        <a href="/" className="nav-logo">SkoobiLabs</a>
        <span className="nav-badge">Coming Soon</span>
      </nav>

      {/* Hero */}
      <section className="hz-hero">
        <div className="hz-hero-content">
          <img src="/icons/hearnews.png" alt="HearNewZ" className="hz-hero-icon" />
          <h1>Hear<em>Z</em></h1>
          <p className="lead">
            Your feed, out loud.
          </p>
        </div>
      </section>

      {/* Phone Screenshots */}
      <section className="hz-phone-section">
        <div className="hz-phones">
          <div className="hz-phone">
            <img src="/screenshots/hearnews-discover.png" alt="HearNewZ Discover" />
          </div>
          <div className="hz-phone">
            <img src="/screenshots/hearnews-library.png" alt="HearNewZ Library" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="hz-features">
        <h2>News that speaks for itself</h2>
        <div className="hz-features-grid">
          <div className="hz-feature-card">
            <div className="hz-feature-icon">&#x1F4F0;</div>
            <h3>50+ Sources</h3>
            <p>Curated articles from the best publishers, automatically refreshed every day.</p>
          </div>
          <div className="hz-feature-card">
            <div className="hz-feature-icon">&#x1F399;</div>
            <h3>AI Voices</h3>
            <p>Six natural-sounding voices powered by OpenAI. Not robotic — actually pleasant to listen to.</p>
          </div>
          <div className="hz-feature-card">
            <div className="hz-feature-icon">&#x1F9E0;</div>
            <h3>Smart Recommendations</h3>
            <p>The more you listen, the smarter your feed gets. Netflix-style matching for news.</p>
          </div>
          <div className="hz-feature-card">
            <div className="hz-feature-icon">&#x1F49C;</div>
            <h3>Care Feeds</h3>
            <p>Curate a custom feed for a loved one. Send a link — they tap it and they&apos;re listening.</p>
          </div>
          <div className="hz-feature-card">
            <div className="hz-feature-icon">&#x1F4DD;</div>
            <h3>Teleprompter</h3>
            <p>Follow along as words highlight in sync with the voice. Read and listen at the same time.</p>
          </div>
          <div className="hz-feature-card">
            <div className="hz-feature-icon">&#x1F3B6;</div>
            <h3>Hi-Fi Player</h3>
            <p>Vintage Marantz-inspired receiver design. Beautiful, tactile, and fun to use.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="hz-how">
        <h2>Dead simple</h2>
        <div className="hz-steps">
          <div className="hz-step">
            <div className="hz-step-num">1</div>
            <div className="hz-step-text">
              <h3>Open the app</h3>
              <p>HearZ starts playing immediately. No setup, no feed management.</p>
            </div>
          </div>
          <div className="hz-step">
            <div className="hz-step-num">2</div>
            <div className="hz-step-text">
              <h3>Vote on articles</h3>
              <p>Skip what you don&apos;t like, love what you do. Your feed learns.</p>
            </div>
          </div>
          <div className="hz-step">
            <div className="hz-step-num">3</div>
            <div className="hz-step-text">
              <h3>Share with family</h3>
              <p>Create a Care Feed for someone you love. They get a curated experience instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="hz-pricing">
        <h2>Free to listen. Pro to focus.</h2>
        <p className="pricing-sub">
          Every article is free with ads. Pro removes them for uninterrupted listening.
        </p>
        <div className="hz-pricing-cards">
          <div className="hz-price-card">
            <div className="hz-price-label">Free</div>
            <div className="hz-price-amount">$0</div>
            <div className="hz-price-period">forever</div>
            <div className="hz-price-detail">All sources, all voices, with ads</div>
          </div>
          <div className="hz-price-card hz-price-card-featured">
            <div className="hz-price-label hz-price-featured-label">Pro</div>
            <div className="hz-price-amount">TBD</div>
            <div className="hz-price-period">coming soon</div>
            <div className="hz-price-detail">Ad-free listening, priority features</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="hz-cta">
        <h2>Coming soon to iPhone and Android</h2>
        <p>HearZ is in active development. Stay tuned.</p>
        <a href="/" className="cta-btn">
          Back to SkoobiLabs
        </a>
      </section>

      {/* Footer */}
      <footer className="hz-footer">
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
