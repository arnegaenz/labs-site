'use client';

export default function SkoobiDoPage() {
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
          background: #10B981;
          color: #000;
          font-weight: 700;
          font-size: 0.8rem;
          border-radius: 10px;
          text-decoration: none;
          transition: transform 0.2s;
        }
        .nav-download:hover { transform: translateY(-1px); }

        /* --- HERO --- */
        .sd-hero {
          text-align: center;
          padding: 6rem 2rem 5rem;
          position: relative;
          overflow: hidden;
        }
        .sd-hero::before {
          content: '';
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 0;
          filter: blur(60px);
        }
        .sd-hero-content {
          position: relative;
          z-index: 1;
        }
        .sd-hero-check {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          display: block;
        }
        .sd-hero h1 {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: -1.5px;
          line-height: 1.1;
          margin-bottom: 1rem;
        }
        .sd-hero h1 em {
          font-style: normal;
          color: #10B981;
        }
        .sd-hero .lead {
          font-size: 1.25rem;
          color: rgba(255,255,255,0.45);
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* --- FEATURES --- */
        .sd-features {
          padding: 5rem 2rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .sd-features h2 {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          color: #FFFFFF;
          letter-spacing: -0.5px;
          margin-bottom: 3rem;
        }
        .sd-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .sd-feature-card {
          text-align: center;
          padding: 2rem 1.5rem;
        }
        .sd-feature-icon {
          font-size: 2.2rem;
          margin-bottom: 1rem;
        }
        .sd-feature-card h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #10B981;
          margin-bottom: 0.6rem;
        }
        .sd-feature-card p {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.6;
        }

        /* --- HOW IT WORKS --- */
        .sd-how {
          padding: 5rem 2rem;
          max-width: 700px;
          margin: 0 auto;
        }
        .sd-how h2 {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          color: #FFFFFF;
          letter-spacing: -0.5px;
          margin-bottom: 3rem;
        }
        .sd-steps {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .sd-step {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
        }
        .sd-step-num {
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 12px;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 800;
          color: #10B981;
        }
        .sd-step-text h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 0.3rem;
        }
        .sd-step-text p {
          font-size: 0.92rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.6;
        }

        /* --- PRICING --- */
        .sd-pricing {
          padding: 5rem 2rem;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        .sd-pricing h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: -0.5px;
          margin-bottom: 0.8rem;
        }
        .sd-pricing .pricing-sub {
          font-size: 1rem;
          color: rgba(255,255,255,0.4);
          margin-bottom: 2.5rem;
        }
        .sd-price-card {
          display: inline-block;
          background: rgba(16,185,129,0.05);
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 20px;
          padding: 2.5rem 3rem;
          transition: border-color 0.3s, transform 0.2s;
        }
        .sd-price-card:hover {
          transform: translateY(-3px);
          border-color: rgba(16,185,129,0.4);
        }
        .sd-price-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #10B981;
          margin-bottom: 0.8rem;
        }
        .sd-price-amount {
          font-size: 2.4rem;
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: -1px;
        }
        .sd-price-period {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.3);
          margin-top: 0.3rem;
        }

        /* --- CTA --- */
        .sd-cta {
          text-align: center;
          padding: 4rem 2rem 6rem;
        }
        .sd-cta h2 {
          font-size: 2.2rem;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: -0.5px;
          margin-bottom: 1rem;
        }
        .sd-cta p {
          font-size: 1rem;
          color: rgba(255,255,255,0.35);
          margin-bottom: 2rem;
        }
        .sd-cta .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 18px 36px;
          background: #10B981;
          color: #000;
          font-weight: 700;
          font-size: 1.05rem;
          border-radius: 14px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .sd-cta .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(16,185,129,0.35);
        }

        /* --- FOOTER --- */
        .sd-footer {
          text-align: center;
          padding: 2rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .sd-footer p {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.15);
        }
        .sd-footer a {
          color: rgba(255,255,255,0.25);
          text-decoration: none;
          margin: 0 0.8rem;
        }
        .sd-footer a:hover { color: rgba(255,255,255,0.5); }

        @media (max-width: 700px) {
          .sd-features-grid { grid-template-columns: 1fr; gap: 1rem; }
          .sd-step { gap: 1rem; }
        }
      `}</style>

      {/* Nav */}
      <nav className="nav">
        <a href="/" className="nav-logo">SkoobiLabs</a>
      </nav>

      {/* Hero */}
      <section className="sd-hero">
        <div className="sd-hero-content">
          <span className="sd-hero-check" role="img" aria-label="checkmark">&#x2713;</span>
          <h1>Skoobi<em>Do</em></h1>
          <p className="lead">
            Get things done. For real.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="sd-features">
        <h2>Built for focus, not fiddling</h2>
        <div className="sd-features-grid">
          <div className="sd-feature-card">
            <div className="sd-feature-icon">&#x1F4E5;</div>
            <h3>GTD Methodology</h3>
            <p>Capture everything into your inbox. Process into actionable states. Never let a task slip through the cracks.</p>
          </div>
          <div className="sd-feature-card">
            <div className="sd-feature-icon">&#x2600;</div>
            <h3>Smart Today View</h3>
            <p>See only what matters right now. Quick wins separated from deep work, with blocked tasks tucked away.</p>
          </div>
          <div className="sd-feature-card">
            <div className="sd-feature-icon">&#x1F517;</div>
            <h3>Dependency Tracking</h3>
            <p>Tasks can depend on other tasks. Blocked items stay out of your way until they&apos;re ready.</p>
          </div>
          <div className="sd-feature-card">
            <div className="sd-feature-icon">&#x1F3A8;</div>
            <h3>5 Color Themes</h3>
            <p>Emerald, Amber, Violet, Ocean, Rose. Pick the accent that matches your mood.</p>
          </div>
          <div className="sd-feature-card">
            <div className="sd-feature-icon">&#x1F525;</div>
            <h3>Insights &amp; Streaks</h3>
            <p>Daily stats, completion trends, and streaks that motivate you to keep going.</p>
          </div>
          <div className="sd-feature-card">
            <div className="sd-feature-icon">&#x1F4C1;</div>
            <h3>Projects &amp; Lists</h3>
            <p>Group tasks into multi-step projects or discrete lists. See progress at a glance.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="sd-how">
        <h2>Three steps. That&apos;s it.</h2>
        <div className="sd-steps">
          <div className="sd-step">
            <div className="sd-step-num">1</div>
            <div className="sd-step-text">
              <h3>Capture</h3>
              <p>Tap the input bar, type your thought, hit Add. It goes straight to your inbox.</p>
            </div>
          </div>
          <div className="sd-step">
            <div className="sd-step-num">2</div>
            <div className="sd-step-text">
              <h3>Process</h3>
              <p>Decide what each task is: do it now, defer it, delegate it, or file it away.</p>
            </div>
          </div>
          <div className="sd-step">
            <div className="sd-step-num">3</div>
            <div className="sd-step-text">
              <h3>Do</h3>
              <p>Your Today view shows exactly what to work on. Check it off and watch your streak grow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Private beta notice */}
      <section className="sd-cta" id="cta">
        <h2>Currently in private beta</h2>
        <p>SkoobiDo is being tested with a small group. Public release coming soon.</p>
      </section>

      {/* Footer */}
      <footer className="sd-footer">
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
