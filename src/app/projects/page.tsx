'use client';

export default function ProjectsPage() {
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

        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(110px);
          pointer-events: none;
          z-index: 0;
        }
        .orb-mint {
          width: 600px; height: 600px;
          background: #00E5A0;
          opacity: 0.05;
          top: -200px; left: -160px;
        }
        .orb-purple {
          width: 520px; height: 520px;
          background: #8B5CF6;
          opacity: 0.07;
          bottom: -180px; right: -140px;
        }

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

        .projects-hero {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 4rem 1.5rem 3rem;
          max-width: 720px;
          margin: 0 auto;
        }
        .section-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: rgba(139,92,246,0.55);
          margin-bottom: 1rem;
        }
        .projects-hero h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          color: rgba(255,255,255,0.95);
          letter-spacing: -1px;
          margin-bottom: 1rem;
        }
        .projects-hero p {
          font-size: 1rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.7;
        }

        .projects-grid {
          position: relative;
          z-index: 10;
          max-width: 900px;
          margin: 0 auto;
          padding: 0 1.5rem 5rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .project-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 2rem 1.8rem;
          transition: border-color 0.3s, transform 0.2s;
        }
        .project-card:hover {
          border-color: rgba(0,212,255,0.15);
          transform: translateY(-3px);
        }
        .project-card .app-icon {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          margin-bottom: 1rem;
          display: block;
        }
        .project-card h3 {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
          letter-spacing: -0.3px;
        }
        .project-card h3 span {
          background: linear-gradient(135deg, #00E5A0, #00D4FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .project-card .status {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.25);
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 0.8rem;
        }
        .project-card p {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.65;
        }
        .project-card a {
          display: inline-block;
          margin-top: 1rem;
          font-size: 0.8rem;
          color: rgba(0,212,255,0.6);
          text-decoration: none;
        }

        .site-footer {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 2rem 1.5rem 3rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .site-footer p {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.15);
          letter-spacing: 0.5px;
        }
      `}</style>

      <div className="orb orb-mint" />
      <div className="orb orb-purple" />

      <nav className="nav">
        <a href="/" className="nav-logo">&larr; SkoobiLabs</a>
      </nav>

      <section className="projects-hero">
        <div className="section-label">Projects</div>
        <h1>More from the garage</h1>
        <p>
          Ideas in progress, side projects, and experiments. Some will ship, some will stay in the shop. Either way, this is where they live.
        </p>
      </section>

      <div className="projects-grid">
        <div className="project-card">
          <img src="/icons/hearnews.png" alt="HearNewZ" className="app-icon" />
          <h3><span>HearZ</span></h3>
          <div className="status">Coming Soon &middot; iPhone + Android</div>
          <p>
            Your curated audio feed. 50+ sources, AI voices that sound human, and a recommendation engine that learns what you love. Like a radio station for everything you want to read but don&apos;t have time for.
          </p>
          <a href="/hearz">Learn More &rarr;</a>
        </div>

        <div className="project-card">
          <h3><span>Connections Buddy</span></h3>
          <div className="status">Coming Soon &middot; iOS</div>
          <p>
            Your scratchpad for NYT Connections puzzles. Color-tag words, work through the logic, solve the grid.
          </p>
        </div>
      </div>

      <footer className="site-footer">
        <p>&copy; 2026 Skoobi Labs</p>
      </footer>
    </>
  );
}
