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
          <h1>We build apps you&apos;re<br />going to <em>love</em></h1>
          <p>Thoughtful mobile apps for iPhone and Android, designed to delight and built to last.</p>
        </div>

        <div className="scroll-hint"><span /></div>
      </section>

      {/* APPS */}
      <section className="apps-section">
        <div className="section-label">Our Apps</div>
        <h2 className="section-heading">What we&apos;re building</h2>

        {/* HearVerse — Hero App */}
        <div className="hero-app">
          <img src="/icons/hearverse.png" alt="HearVerse" className="hero-app-icon" />
          <h3>Hear<em>Verse</em></h3>
          <p className="subtitle">The Bible, read aloud beautifully.</p>

          <div className="hero-app-phones">
            <div className="phone"><img src="/screenshots/library.jpg" alt="HearVerse Library" /></div>
            <div className="phone"><img src="/screenshots/nowplaying.jpg" alt="HearVerse Now Playing" /></div>
            <div className="phone"><img src="/screenshots/plan.jpg" alt="HearVerse Reading Plan" /></div>
          </div>

          <div className="features">
            <div className="feature"><span className="feature-dot" />1,189 chapters</div>
            <div className="feature"><span className="feature-dot" />66 books</div>
            <div className="feature"><span className="feature-dot" />KJV &amp; ASV</div>
            <div className="feature"><span className="feature-dot" />Two AI voices</div>
            <div className="feature"><span className="feature-dot" />Daily reading plans</div>
          </div>

          <p className="tagline">
            Open the app, pick a book, and listen. Two warm AI voices read Scripture aloud — chapter by chapter, verse by verse. Built for people who want the Word read to them.
          </p>

          <a href="https://apps.apple.com/app/id6761432386" className="app-store-btn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            Download on the App Store
          </a>
          <a href="/hearverse" style={{ display: 'block', marginTop: '1.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
            Learn More &rarr;
          </a>
        </div>

        {/* SkoobiDo — Hero App */}
        <div className="hero-app skoobido-hero">
          <img src="/icons/skoobido.png" alt="SkoobiDo" className="hero-app-icon" />
          <span className="beta-tag">Private Beta</span>
          <h3>Skoobi<em>Do</em></h3>
          <p className="subtitle">Get things done. For real.</p>

          <div className="hero-app-phones">
            <div className="phone"><img src="/screenshots/skoobido-splash.png" alt="SkoobiDo Splash" /></div>
            <div className="phone"><img src="/screenshots/skoobido-inbox.png" alt="SkoobiDo Inbox" /></div>
            <div className="phone"><img src="/screenshots/skoobido-task.png" alt="SkoobiDo Task" /></div>
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

          <a href="/skoobido" className="learn-more">Learn More &rarr;</a>
        </div>

      </section>

      {/* CLIENT WORK */}
      <section className="client-work">
        <div className="section-label">Client Work</div>
        <h2 className="section-heading">We build for our clients too</h2>

        {/* JakeTrack — Client Hero */}
        <div className="hero-app jaketrack-hero">
          <img src="/icons/jaketrack.png" alt="JakeTrack" className="hero-app-icon" />
          <span className="client-tag">In Development</span>
          <h3>Jake<em>Track</em></h3>
          <p className="subtitle">Built for Jake&apos;s Junk Removal.</p>

          <div className="hero-app-phones">
            <div className="phone"><img src="/screenshots/jaketrack-splash.png" alt="JakeTrack Splash" /></div>
            <div className="phone"><img src="/screenshots/jaketrack-home.png" alt="JakeTrack Clock In" /></div>
            <div className="phone"><img src="/screenshots/jaketrack-history.png" alt="JakeTrack History" /></div>
          </div>

          <div className="features">
            <div className="feature"><span className="feature-dot" />Clock in / out</div>
            <div className="feature"><span className="feature-dot" />Live pay tracking</div>
            <div className="feature"><span className="feature-dot" />Shift history</div>
            <div className="feature"><span className="feature-dot" />Crew sign-in</div>
            <div className="feature"><span className="feature-dot" />Custom-branded</div>
          </div>

          <p className="tagline">
            Custom field ops software designed and built end-to-end for Jake&apos;s Junk Removal. Crews clock in, watch their pay period grow in real-time, and review every shift — all from their phone.
          </p>
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
