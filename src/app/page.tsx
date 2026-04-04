'use client';

export default function HomePage() {
  return (
    <>
      <style jsx global>{`
        :root {
          --mint: #00E5A0;
          --cyan: #00D4FF;
          --purple: #8B5CF6;
          --bg: #08080F;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: var(--bg);
          color: rgba(255,255,255,0.85);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          overflow-x: hidden;
        }

        /* --- BACKGROUND ORBS --- */
        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(110px);
          pointer-events: none;
          z-index: 0;
        }
        .orb-mint {
          width: 700px; height: 700px;
          background: var(--mint);
          opacity: 0.06;
          top: -260px; left: -210px;
          animation: driftA 20s ease-in-out infinite;
        }
        .orb-purple {
          width: 620px; height: 620px;
          background: var(--purple);
          opacity: 0.08;
          bottom: -210px; right: -160px;
          animation: driftB 24s ease-in-out infinite;
        }
        .orb-cyan {
          width: 420px; height: 420px;
          background: var(--cyan);
          opacity: 0.04;
          top: 50%; left: 55%;
          animation: driftC 30s ease-in-out infinite;
        }
        @keyframes driftA { 0%,100% { transform: translate(0,0); } 50% { transform: translate(45px,35px); } }
        @keyframes driftB { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-35px,-45px); } }
        @keyframes driftC {
          0%,100% { transform: translate(-50%,-50%); }
          33% { transform: translate(calc(-50% + 25px), calc(-50% - 18px)); }
          66% { transform: translate(calc(-50% - 18px), calc(-50% + 25px)); }
        }

        /* --- HERO SECTION --- */
        .hero {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
        }

        .bus-scene {
          width: 800px;
          max-width: 100%;
          height: 340px;
          position: relative;
          margin-bottom: 1rem;
        }

        .bus-group {
          position: absolute;
          top: 28%;
          left: 50%;
          transform: translate(-450%, -50%);
          opacity: 0;
          animation: slideIn 0.7s cubic-bezier(0.0, 0.0, 0.2, 1) 0.3s forwards,
            skidStop 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) 1.0s forwards;
        }
        @keyframes slideIn {
          0%   { transform: translate(-450%, -50%); opacity: 0; }
          5%   { opacity: 1; }
          100% { transform: translate(-50%, -50%); opacity: 1; }
        }
        @keyframes skidStop {
          0%   { transform: translate(-50%, -50%) rotate(0deg) scaleX(1) scaleY(1); transform-origin: 75% 85%; }
          15%  { transform: translate(-50%, -50%) rotate(8deg) scaleX(0.82) scaleY(1.06); transform-origin: 75% 85%; }
          30%  { transform: translate(-50%, -50%) rotate(14deg) scaleX(0.85) scaleY(1.04); transform-origin: 75% 85%; }
          50%  { transform: translate(-50%, -50%) rotate(-3deg) scaleX(1.06) scaleY(0.97); transform-origin: 75% 85%; }
          70%  { transform: translate(-50%, -50%) rotate(2deg) scaleX(0.97) scaleY(1.01); transform-origin: 75% 85%; }
          85%  { transform: translate(-50%, -50%) rotate(-0.5deg) scaleX(1.01) scaleY(1); transform-origin: 75% 85%; }
          100% { transform: translate(-50%, -50%) rotate(0deg) scaleX(1) scaleY(1); transform-origin: 75% 85%; }
        }

        .wheel-spin {
          animation: spin 0.15s linear 0s 5;
          transform-origin: center;
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* Dust */
        .dust {
          position: absolute;
          top: 38%;
          left: 18%;
          opacity: 0;
          animation: dustPuff 0.6s ease-out 1.1s forwards;
        }
        .dust circle { fill: none; stroke-width: 1.5; }
        @keyframes dustPuff {
          0%   { opacity: 0; transform: scale(0.3) translateX(0) translateY(0); }
          20%  { opacity: 0.6; }
          100% { opacity: 0; transform: scale(2.5) translateX(-50px) translateY(-30px); }
        }

        /* Skid marks */
        .skid-marks {
          position: absolute;
          top: 52%;
          left: 0;
          width: 100%;
          height: 30px;
        }
        .skid-line { stroke-dasharray: 600; stroke-dashoffset: 600; }
        .skid-line-1 { animation: drawSkid 0.3s ease-out 0.95s forwards; }
        .skid-line-2 { animation: drawSkid 0.3s ease-out 1.02s forwards; }
        .skid-line-3 { animation: drawSkid 0.3s ease-out 0.98s forwards; }
        .skid-line-4 { animation: drawSkid 0.3s ease-out 1.05s forwards; }
        @keyframes drawSkid { to { stroke-dashoffset: 0; } }

        /* Logo text under bus */
        .logo-text {
          position: absolute;
          top: 60%;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          animation: textIn 0.6s ease-out 1.6s forwards;
        }
        @keyframes textIn {
          0%   { opacity: 0; transform: translateX(-50%) translateY(8px); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        /* Hero tagline */
        .hero-tagline {
          opacity: 0;
          animation: fadeUp 0.7s ease-out 2.0s forwards;
          text-align: center;
        }
        .hero-tagline h1 {
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          line-height: 1.2;
          margin-bottom: 0.8rem;
          letter-spacing: -0.5px;
        }
        .hero-tagline h1 em {
          font-style: normal;
          background: linear-gradient(135deg, var(--mint), var(--cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-tagline p {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.35);
          max-width: 500px;
          line-height: 1.6;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Scroll hint */
        .scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          animation: fadeUp 0.5s ease-out 2.5s forwards;
        }
        .scroll-hint span {
          display: block;
          width: 20px;
          height: 32px;
          border: 2px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          position: relative;
        }
        .scroll-hint span::after {
          content: '';
          width: 3px;
          height: 6px;
          background: rgba(255,255,255,0.3);
          border-radius: 3px;
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          animation: scrollDot 1.8s ease-in-out infinite;
        }
        @keyframes scrollDot {
          0%,100% { opacity: 1; transform: translateX(-50%) translateY(0); }
          50%     { opacity: 0.3; transform: translateX(-50%) translateY(10px); }
        }

        /* --- APPS SECTION --- */
        .apps-section {
          position: relative;
          z-index: 10;
          padding: 6rem 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .section-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: rgba(0,212,255,0.5);
          text-align: center;
          margin-bottom: 1rem;
        }

        .section-heading {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 700;
          text-align: center;
          color: rgba(255,255,255,0.9);
          letter-spacing: -0.5px;
          margin-bottom: 3.5rem;
        }

        .app-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .app-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          padding: 2.5rem 2rem;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: border-color 0.3s, transform 0.2s;
        }
        .app-card:hover {
          border-color: rgba(0,212,255,0.2);
          transform: translateY(-4px);
        }

        .app-icon {
          width: 72px;
          height: 72px;
          border-radius: 16px;
          margin-bottom: 1.2rem;
        }

        /* --- HERO APP (HearVerse) --- */
        .hero-app {
          text-align: center;
          margin-bottom: 4rem;
          padding: 0 1rem;
        }
        .hero-app-icon {
          width: 120px;
          height: 120px;
          border-radius: 28px;
          box-shadow: 0 12px 48px rgba(255,179,0,0.25), 0 0 0 1px rgba(255,179,0,0.15);
          margin: 0 auto 1.5rem;
          display: block;
        }
        .hero-app h3 {
          font-size: 2.8rem;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: -1px;
          margin-bottom: 0.4rem;
        }
        .hero-app h3 em {
          font-style: normal;
          color: #FFB300;
        }
        .hero-app .subtitle {
          font-size: 1.2rem;
          color: rgba(255,255,255,0.4);
          margin-bottom: 1.8rem;
        }
        .hero-app .tagline {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          max-width: 520px;
          margin: 0 auto 2.5rem;
        }
        .hero-app-phone {
          position: relative;
          width: 260px;
          margin: 0 auto 2.5rem;
        }
        .hero-app-phone::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 38px;
          border: 2.5px solid rgba(255,255,255,0.12);
          pointer-events: none;
          z-index: 2;
        }
        .hero-app-phone::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(255,179,0,0.12) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 0;
          filter: blur(40px);
        }
        .hero-app-phone img {
          width: 100%;
          border-radius: 36px;
          position: relative;
          z-index: 1;
          box-shadow: 0 24px 80px rgba(0,0,0,0.6);
        }
        .hero-app .features {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        .hero-app .feature {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.45);
        }
        .hero-app .feature-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FFB300;
          flex-shrink: 0;
        }
        .hero-app .app-store-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          background: #FFB300;
          color: #000;
          font-weight: 700;
          font-size: 1rem;
          border-radius: 14px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          letter-spacing: -0.2px;
        }
        .hero-app .app-store-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(255,179,0,0.35);
        }
        .hero-app .app-store-btn svg {
          width: 20px;
          height: 20px;
        }

        /* --- OTHER APPS --- */
        .other-apps-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          text-align: center;
          margin-bottom: 1.5rem;
          margin-top: 2rem;
        }
        .other-apps {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .app-card-small {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 2rem 1.8rem;
          transition: border-color 0.3s, transform 0.2s;
        }
        .app-card-small:hover {
          border-color: rgba(0,212,255,0.15);
          transform: translateY(-3px);
        }
        .app-card-small .app-icon {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          margin-bottom: 1rem;
        }
        .app-card-small h3 {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
          letter-spacing: -0.3px;
        }
        .app-card-small h3 span {
          background: linear-gradient(135deg, var(--mint), var(--cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .app-card-small .platform {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.2);
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 0.8rem;
        }
        .app-card-small p {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.35);
          line-height: 1.6;
        }

        @media (max-width: 700px) {
          .hero-app h3 { font-size: 2rem; }
          .hero-app-phone { width: 220px; }
          .hero-app .features { gap: 1rem; }
          .other-apps { grid-template-columns: 1fr; }
        }

        .app-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 100px;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 1.2rem;
        }
        .badge-live {
          border: 1px solid rgba(0,229,160,0.3);
          color: rgba(0,229,160,0.7);
        }
        .badge-live .dot { width: 5px; height: 5px; border-radius: 50%; background: var(--mint); animation: dotBlink 1.5s ease-in-out infinite; }
        .badge-dev {
          border: 1px solid rgba(139,92,246,0.3);
          color: rgba(139,92,246,0.7);
        }
        @keyframes dotBlink { 0%,100% { opacity: 1; } 50% { opacity: 0.2; } }

        .app-card h3 {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
          letter-spacing: -0.3px;
        }
        .app-card h3 span {
          background: linear-gradient(135deg, var(--mint), var(--cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .app-card .platform {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.25);
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .app-card p {
          font-size: 0.92rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.65;
        }

        /* --- COMING SOON SECTION --- */
        .coming-soon {
          position: relative;
          z-index: 10;
          padding: 5rem 1.5rem 6rem;
          text-align: center;
        }

        .coming-soon .divider {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, var(--mint), var(--cyan), var(--purple));
          margin: 0 auto 3rem;
          border-radius: 2px;
          opacity: 0.4;
        }

        .coming-soon h2 {
          font-size: clamp(1.4rem, 3vw, 1.8rem);
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          margin-bottom: 1rem;
          letter-spacing: -0.3px;
        }

        .coming-soon p {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.25);
          max-width: 460px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* --- FOOTER --- */
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

        @media (max-width: 700px) {
          .bus-scene { height: 260px; }
          .bus-group svg { width: 300px; }
          .app-grid { grid-template-columns: 1fr; }
        }
      `}</style>

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

          <div className="hero-app-phone">
            <img src="/screenshots/nowplaying.jpg" alt="HearVerse Now Playing" />
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

          <a href="/hearverse" className="app-store-btn">
            Learn More
          </a>
        </div>

        {/* Other Apps */}
        <div className="other-apps-label">Also from SkoobiLabs</div>
        <div className="other-apps">
          {/* HearZ */}
          <div className="app-card-small">
            <img src="/icons/hearz.png" alt="HearZ" className="app-icon" />
            <h3><span>HearZ</span></h3>
            <div className="platform">Coming Soon &middot; iPhone + Android</div>
            <p>
              Your curated audio feed. The best articles from the web, read aloud. Like a radio station for everything you want to read but don&apos;t have time for.
            </p>
          </div>

          {/* Connections Buddy */}
          <div className="app-card-small">
            <h3><span>Connections Buddy</span></h3>
            <div className="platform">Coming Soon &middot; iOS</div>
            <p>
              Your scratchpad for NYT Connections puzzles. Color-tag words, work through the logic, solve the grid.
            </p>
          </div>
        </div>
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
