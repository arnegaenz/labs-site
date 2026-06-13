export default function HomePage() {
  return (
    <>
      {/* Background */}
      <div className="orb orb-mint" />
      <div className="orb orb-purple" />
      <div className="orb orb-cyan" />

      {/* HERO */}
      <section className="hero">
        <div className="bus-scene">
          {/* Bus */}
          <div className="bus-group">
            <svg viewBox="0 0 320 180" width={420} fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="aGrad" x1="0" y1="0" x2="320" y2="180" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00E5A0" />
                  <stop offset="45%" stopColor="#00D4FF" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <path d="M 40,120 L 40,55 Q 40,28 60,22 L 230,22 Q 260,22 270,35 L 285,65 Q 290,75 290,85 L 290,120"
                stroke="url(#aGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 40,120 L 55,120 A 20,14 0 0,1 95,120 L 207,120 A 25,25 0 0,1 257,120 L 290,120"
                stroke="url(#aGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="42" y1="75" x2="288" y2="75" stroke="url(#aGrad)" strokeWidth="2" opacity="0.4" />
              <line x1="48" y1="82" x2="78" y2="82" stroke="url(#aGrad)" strokeWidth="1" opacity="0.25" />
              <line x1="48" y1="86" x2="78" y2="86" stroke="url(#aGrad)" strokeWidth="1" opacity="0.25" />
              <line x1="48" y1="90" x2="78" y2="90" stroke="url(#aGrad)" strokeWidth="1" opacity="0.25" />
              <line x1="48" y1="94" x2="78" y2="94" stroke="url(#aGrad)" strokeWidth="1" opacity="0.25" />
              <line x1="48" y1="98" x2="78" y2="98" stroke="url(#aGrad)" strokeWidth="1" opacity="0.25" />
              <path d="M 55,22 L 255,22" stroke="url(#aGrad)" strokeWidth="1" opacity="0.2" />
              <rect x="50" y="32" width="18" height="35" rx="4" stroke="url(#aGrad)" strokeWidth="2" opacity="0.5" />
              <rect x="74" y="32" width="24" height="35" rx="4" stroke="url(#aGrad)" strokeWidth="2" opacity="0.5" />
              <rect x="104" y="32" width="24" height="35" rx="4" stroke="url(#aGrad)" strokeWidth="2" opacity="0.5" />
              <rect x="134" y="32" width="24" height="35" rx="4" stroke="url(#aGrad)" strokeWidth="2" opacity="0.5" />
              <rect x="164" y="32" width="24" height="35" rx="4" stroke="url(#aGrad)" strokeWidth="2" opacity="0.5" />
              <rect x="194" y="32" width="16" height="35" rx="3" stroke="url(#aGrad)" strokeWidth="1.8" opacity="0.45" />
              <path d="M 218,67 L 214,38 Q 213,33 218,32 L 262,32 Q 268,32 270,38 L 276,58 Q 278,65 272,67 L 222,67 Z"
                stroke="url(#aGrad)" strokeWidth="2" opacity="0.55" />
              <line x1="244" y1="32" x2="247" y2="67" stroke="url(#aGrad)" strokeWidth="1.2" opacity="0.3" />
              <circle cx="284" cy="55" r="5.5" stroke="url(#aGrad)" strokeWidth="2" opacity="0.45" />
              <circle cx="284" cy="55" r="2" fill="url(#aGrad)" opacity="0.2" />
              <rect x="280" y="80" width="6" height="4" rx="2" fill="url(#aGrad)" opacity="0.2" />
              <circle cx="276" cy="95" r="7" stroke="url(#aGrad)" strokeWidth="1.5" opacity="0.35" />
              <path d="M 280,120 L 295,120 Q 298,120 298,117 L 298,110" stroke="url(#aGrad)" strokeWidth="2.5" opacity="0.3" />
              <path d="M 40,120 L 30,120 Q 27,120 27,117 L 27,110" stroke="url(#aGrad)" strokeWidth="2.5" opacity="0.3" />
              <g className="wheel-spin" style={{ transformOrigin: "75px 130px" }}>
                <circle cx="75" cy="130" r="20" stroke="url(#aGrad)" strokeWidth="5.5" opacity="0.7" />
                <circle cx="75" cy="130" r="13" stroke="url(#aGrad)" strokeWidth="2" opacity="0.4" />
                <circle cx="75" cy="130" r="8" stroke="url(#aGrad)" strokeWidth="2" opacity="0.5" />
                <circle cx="75" cy="130" r="3" fill="url(#aGrad)" opacity="0.2" />
              </g>
              <g className="wheel-spin" style={{ transformOrigin: "232px 130px" }}>
                <circle cx="232" cy="130" r="20" stroke="url(#aGrad)" strokeWidth="5.5" opacity="0.7" />
                <circle cx="232" cy="130" r="13" stroke="url(#aGrad)" strokeWidth="2" opacity="0.4" />
                <circle cx="232" cy="130" r="8" stroke="url(#aGrad)" strokeWidth="2" opacity="0.5" />
                <circle cx="232" cy="130" r="3" fill="url(#aGrad)" opacity="0.2" />
              </g>
            </svg>
          </div>

          {/* Dust */}
          <div className="dust">
            <svg width="60" height="60" viewBox="0 0 60 60">
              <defs>
                <linearGradient id="dustGrad" x1="0" y1="0" x2="60" y2="60">
                  <stop offset="0%" stopColor="#00E5A0" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <circle cx="15" cy="35" r="8" stroke="url(#dustGrad)" />
              <circle cx="30" cy="25" r="12" stroke="url(#dustGrad)" />
              <circle cx="10" cy="20" r="6" stroke="url(#dustGrad)" />
              <circle cx="25" cy="42" r="5" stroke="url(#dustGrad)" />
            </svg>
          </div>

          {/* Skid marks */}
          <div className="skid-marks">
            <svg viewBox="0 0 800 30" width={800} height={30} xmlns="http://www.w3.org/2000/svg">
              <line x1="550" y1="4" x2="50" y2="4" className="skid-line skid-line-1" stroke="#111" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
              <line x1="550" y1="11" x2="70" y2="11" className="skid-line skid-line-3" stroke="#111" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
              <line x1="620" y1="19" x2="150" y2="19" className="skid-line skid-line-2" stroke="#111" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
              <line x1="620" y1="26" x2="170" y2="26" className="skid-line skid-line-4" stroke="#111" strokeWidth="3.5" strokeLinecap="round" opacity="0.35" />
            </svg>
          </div>

          {/* Logo text */}
          <div className="logo-text">
            <svg viewBox="0 0 300 50" width={340} xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="tGrad" x1="0" y1="0" x2="300" y2="0">
                  <stop offset="0%" stopColor="#00E5A0" />
                  <stop offset="50%" stopColor="#00D4FF" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <text x="150" y="22" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="26" fontWeight="700" letterSpacing="7" fill="url(#tGrad)" opacity="0.9">skoobi</text>
              <text x="150" y="42" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="13" fontWeight="300" letterSpacing="14" fill="url(#tGrad)" opacity="0.4">LABS</text>
            </svg>
          </div>
        </div>

        <div className="hero-tagline">
          <h1>Want to build something <em>cool</em> together?</h1>
          <p>A freelance studio with a lot going on &mdash; and a lot of love for what we do. Got an ambitious idea? We&apos;re probably your people.</p>
          <p className="hero-fine-print"><em>Got something boring? We probably aren&apos;t your best connection.</em></p>
        </div>

        <div className="scroll-hint"><span /></div>
      </section>

      {/* APPS */}
      <section className="apps-section">
        <div className="section-label">Our flagship</div>
        <h2 className="section-heading">The task manager we built for ourselves</h2>

        {/* SkoobiSlate — Hero App */}
        <div className="hero-app skoobislate-hero">
          <img src="/icons/skoobislate.png" alt="SkoobiSlate" className="hero-app-icon" />
          <span className="beta-tag">Private Beta</span>
          <h3>Skoobi<em>Slate</em></h3>
          <p className="subtitle">Get things done. For real.</p>

          <div className="hero-app-phones">
            <div className="phone"><img src="/screenshots/skoobislate-splash.png" alt="SkoobiSlate Splash" /></div>
            <div className="phone"><img src="/screenshots/skoobislate-inbox.png" alt="SkoobiSlate Inbox" /></div>
            <div className="phone"><img src="/screenshots/skoobislate-task.png" alt="SkoobiSlate Task" /></div>
          </div>

          <div className="features">
            <div className="feature"><span className="feature-dot" />GTD workflow</div>
            <div className="feature"><span className="feature-dot" />Smart Today view</div>
            <div className="feature"><span className="feature-dot" />Dependencies</div>
            <div className="feature"><span className="feature-dot" />5 color themes</div>
            <div className="feature"><span className="feature-dot" />Streaks &amp; insights</div>
          </div>

          <p className="tagline">
            A task manager built on the GTD methodology — capture every loose thread into your inbox, process into actionable next steps, and watch your streak grow as you finish what matters.
          </p>

          <a href="/skoobislate" className="learn-more">Learn More &rarr;</a>
        </div>

      </section>

      {/* SKOOBIBUILD — built it ourselves first */}
      <section className="client-work">
        <div className="section-label">Built it ourselves first</div>
        <h2 className="section-heading">How <em>SkoobiBuild</em> grew up</h2>
        <p className="section-lede">
          We needed a job-tracking tool for our own construction company &mdash; Kelli
          Homes &mdash; so we built one. Real jobs, real schedules, real walkthroughs.
          Then we saw the shape underneath, and turned it into a platform any small
          construction company can run on.
        </p>

        {/* The origin — Kelli Homes dashboard rendered in HTML/CSS */}
        <div className="mac-window kelli-window">
          <div className="mac-titlebar">
            <span className="mac-dot mac-dot-red" />
            <span className="mac-dot mac-dot-yellow" />
            <span className="mac-dot mac-dot-green" />
            <span className="mac-url">jobs.kellihomes.com</span>
          </div>
          <div className="kelli-dashboard">
            <div className="kelli-topbar">
              <div className="kelli-crest">
                <span className="kelli-crest-letters">KH</span>
                <span className="kelli-crest-est">EST. 1999</span>
              </div>
              <nav className="kelli-nav">
                <span className="kelli-nav-active">Dashboard</span>
                <span>Tasks</span>
                <span>Documents</span>
                <span>Wasteland</span>
              </nav>
              <div className="kelli-user">Signed in as kelli</div>
            </div>
            <div className="kelli-jobs-header">
              <div>
                <h4>Job Management</h4>
                <p>A clear view of every project in motion, from first estimate to final walkthrough.</p>
              </div>
              <button className="kelli-cta">Create New Job</button>
            </div>
            <div className="kelli-stats">
              <div className="kelli-stat">
                <div className="kelli-stat-label">Active Jobs</div>
                <div className="kelli-stat-num">4</div>
                <div className="kelli-stat-note">Currently in build or punch.</div>
              </div>
              <div className="kelli-stat">
                <div className="kelli-stat-label">In Design / Estimating</div>
                <div className="kelli-stat-num">2</div>
                <div className="kelli-stat-note">Preconstruction work in motion.</div>
              </div>
              <div className="kelli-stat">
                <div className="kelli-stat-label">Closed</div>
                <div className="kelli-stat-num">11</div>
                <div className="kelli-stat-note">Completed and handed off.</div>
              </div>
            </div>
            <div className="kelli-table">
              <div className="kelli-table-head">
                <span>Job</span>
                <span>Client</span>
                <span>Stage</span>
                <span>Type</span>
                <span>Start</span>
                <span>Target</span>
              </div>
              <div className="kelli-table-row">
                <span><strong>Lakeside Garage Conversion</strong><br /><em className="kelli-loc">Bellevue, WA</em></span>
                <span>J. Thompson</span>
                <span className="kelli-stage">In Construction</span>
                <span>Remodel</span>
                <span>Apr 12</span>
                <span>Aug 30</span>
              </div>
              <div className="kelli-table-row">
                <span><strong>Crestline Custom Home</strong><br /><em className="kelli-loc">Snohomish, WA</em></span>
                <span>M. Sandoval</span>
                <span className="kelli-stage">Permitting</span>
                <span>Custom Build</span>
                <span>May 28</span>
                <span>Mar 2027</span>
              </div>
              <div className="kelli-table-row">
                <span><strong>Sound View ADU</strong><br /><em className="kelli-loc">Edmonds, WA</em></span>
                <span>R. Wells</span>
                <span className="kelli-stage kelli-stage-warranty">Warranty</span>
                <span>Custom Build</span>
                <span>Jul 31</span>
                <span>Feb 16</span>
              </div>
            </div>
          </div>
        </div>

        <p className="morph-line"><em>Then we saw the shape underneath.</em></p>

        {/* The white-label proof — three branded tiles */}
        <div className="white-label-grid">
          <div className="brand-tile brand-kelli">
            <div className="brand-tile-crest">KH</div>
            <h4>Kelli Homes</h4>
            <p>The original. Custom homes — Edmonds, WA.</p>
            <span className="brand-tile-badge">live</span>
          </div>
          <div className="brand-tile brand-cascade">
            <div className="brand-tile-crest">CB</div>
            <h4>Cascade Builders</h4>
            <p>Light-commercial. <em>Could be your company.</em></p>
          </div>
          <div className="brand-tile brand-driftwood">
            <div className="brand-tile-crest">DC</div>
            <h4>Driftwood Carpentry</h4>
            <p>Boutique remodels. <em>Could be your company.</em></p>
          </div>
        </div>

        <p className="white-label-tagline">
          Your company. Your colors. Your name. <em>Our engine underneath.</em>
        </p>
      </section>

      {/* HEAR LINE — the passion project */}
      <section className="hear-line">
        <div className="section-label">Our passion project</div>
        <h2 className="section-heading">A quiet little family we keep coming back to</h2>
        <p className="hear-lede">
          For people who&apos;d rather hear than read. Or who can&apos;t, anymore.
          We&apos;re building a small family of audio apps to bring the world to them &mdash;
          book by book, headline by headline, verse by verse.
        </p>

        <div className="hear-grid">
          {/* HearBooks */}
          <div className="hear-card hear-card-books">
            <img src="/icons/hearbooks.png" alt="HearBooks" className="hear-card-icon" />
            <h3>Hear<em>Books</em></h3>
            <p className="hear-card-tag">Public-domain audiobooks. Discovered by <em>mood.</em></p>
            <p className="hear-card-body">
              Twain, Austen, the whole canon &mdash; free, read aloud, tagged with poetic moods
              like &ldquo;a long brown river&rdquo; or &ldquo;a quiet kind of brave.&rdquo;
              Find one that fits the day.
            </p>
            <div className="hear-card-shot">
              <img src="/screenshots/hearbooks-discover.jpeg" alt="HearBooks Discover" />
            </div>
            <span className="hear-card-status">TestFlight</span>
          </div>

          {/* HearNews */}
          <div className="hear-card hear-card-news">
            <img src="/icons/hearnews.png" alt="HearNews" className="hear-card-icon" />
            <h3>Hear<em>News</em></h3>
            <p className="hear-card-tag">The day&apos;s news, read to you. Learns what you like.</p>
            <p className="hear-card-body">
              Pick sources, pick topics, then let the app build your news rhythm.
              The more you listen, the better it gets at picking what you want next.
            </p>
            <div className="hear-card-shot">
              <img src="/screenshots/hearnews-discover.png" alt="HearNews Discover" />
            </div>
            <span className="hear-card-status">TestFlight</span>
          </div>

          {/* HearVerse */}
          <div className="hear-card hear-card-verse">
            <img src="/icons/hearverse.png" alt="HearVerse" className="hear-card-icon" />
            <h3>Hear<em>Verse</em></h3>
            <p className="hear-card-tag">The Bible, read aloud beautifully.</p>
            <p className="hear-card-body">
              All 1,189 chapters. Two warm AI voices. Daily reading plans
              that meet you where you are.
            </p>
            <div className="hear-card-shot">
              <img src="/screenshots/nowplaying.jpg" alt="HearVerse Now Playing" />
            </div>
            <a href="https://apps.apple.com/app/id6761432386" className="hear-card-cta">
              Download on the App Store &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* HOW WE WORK + PRICING */}
      <section className="how-we-work">
        <div className="section-label">How we work</div>
        <h2 className="section-heading">We build it. We host it. We watch over it.</h2>
        <p className="how-lede">
          Every project we ship goes onto <em>our</em> infrastructure. We host it. We
          monitor it. If something breaks at 2am, we&apos;re the ones who get the call.
          Every month, you get a report on uptime, traffic, and how the thing&apos;s
          actually being used. You stay focused on your business.
        </p>

        <p className="how-pricing-lede">
          One build cost up front, plus a small monthly retainer.
          <em>The numbers below are starting points, not ceilings — they scale with how intense the code gets.</em>
        </p>

        <div className="pricing-grid">
          <div className="pricing-card pricing-card-essential">
            <h3>Essential</h3>
            <div className="pricing-amount">
              <span className="pricing-from">From</span>
              <span className="pricing-num">$2,500</span>
              <span className="pricing-mo">+ $100<span>/mo</span></span>
            </div>
            <p className="pricing-shape">A focused, one-purpose tool.</p>
            <ul className="pricing-features">
              <li>Custom configurator, calculator, or branded form</li>
              <li>Hosted on a subdomain you point at us</li>
              <li>Monthly uptime &amp; traffic report</li>
              <li>We maintain it. We&apos;re on call.</li>
            </ul>
          </div>

          <div className="pricing-card pricing-card-professional">
            <h3>Professional</h3>
            <div className="pricing-amount">
              <span className="pricing-from">From</span>
              <span className="pricing-num">$5,000</span>
              <span className="pricing-mo">+ $150<span>/mo</span></span>
            </div>
            <p className="pricing-shape">Interactive. Data-backed. Integrated.</p>
            <ul className="pricing-features">
              <li>Database-backed, custom workflows</li>
              <li>Third-party integrations (Stripe, email, calendars)</li>
              <li>Custom domain or embeddable widget</li>
              <li>Same monthly report &amp; on-call coverage</li>
            </ul>
          </div>

          <div className="pricing-card pricing-card-advanced">
            <h3>Advanced</h3>
            <div className="pricing-amount">
              <span className="pricing-from">From</span>
              <span className="pricing-num">$10,000</span>
              <span className="pricing-mo">+ $250<span>/mo</span></span>
            </div>
            <p className="pricing-shape">Full app. Auth, multi-user, dashboards.</p>
            <ul className="pricing-features">
              <li>User accounts, roles, permissions</li>
              <li>Internal dashboards &amp; admin tools</li>
              <li>Multi-tenant when you need it</li>
              <li>Same monthly report &amp; on-call coverage</li>
            </ul>
          </div>
        </div>

        <p className="pricing-addon">
          Want a live analytics dashboard on top? Add it to any tier &mdash; <em>$50&ndash;75/mo</em>.
        </p>

        <div className="cta-block">
          <h3>Got something in mind?</h3>
          <p>Tell us about it. We&apos;ll tell you straight whether we&apos;re a fit.</p>
          <a href="mailto:ask@skoobilabs.com?subject=Project idea" className="cta-btn">
            ask@skoobilabs.com &rarr;
          </a>
        </div>
      </section>

      {/* MORE PROJECTS */}
      <section className="more-projects">
        <a href="/projects" className="more-projects-link">
          More projects <span>&rarr;</span>
        </a>
      </section>

      {/* COMING SOON */}
      <section className="coming-soon">
        <div className="divider" />
        <h2>A lot more is coming.</h2>
        <p>We&apos;ve got a garage full of ideas and we&apos;re just getting started. Stay tuned.</p>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <p>&copy; 2026 Skoobi Labs</p>
      </footer>
    </>
  );
}
