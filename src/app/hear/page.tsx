import Link from "next/link";

export const metadata = {
  title: "Hear — SkoobiLabs",
  description:
    "A small studio building audio apps for the people who need them. HearVerse, HearNews, HearBooks — read aloud, beautifully.",
};

export default function HearPage() {
  return (
    <>
      {/* Background orbs (shared studio brand) */}
      <div className="orb orb-mint" />
      <div className="orb orb-purple" />
      <div className="orb orb-cyan" />

      {/* Top nav back to studio */}
      <nav className="hear-nav">
        <Link href="/" className="hear-nav-back">
          ← SkoobiLabs
        </Link>
        <a href="mailto:ask@skoobilabs.com" className="hear-nav-mail">
          ask@skoobilabs.com
        </a>
      </nav>

      {/* HERO */}
      <section className="hear-page-hero">
        <div className="hear-page-label">The Hear line</div>
        <h1>
          A small studio. We make audio apps for the people who
          <br />
          need them.
        </h1>
        <p className="hear-page-lede">
          For people who&apos;d rather <em>hear</em> than read. Or who can&apos;t,
          anymore. We&apos;re a quiet little family of audio apps built to bring
          the world to them &mdash; book by book, headline by headline, verse
          by verse.
        </p>
      </section>

      {/* THE APPS */}
      <section className="hear-page-apps">
        <div className="hear-grid">
          {/* HearBooks */}
          <div className="hear-card hear-card-books">
            <img src="/icons/hearbooks.png" alt="HearBooks" className="hear-card-icon" />
            <h3>
              Hear<em>Books</em>
            </h3>
            <p className="hear-card-tag">
              Public-domain audiobooks. Discovered by <em>mood.</em>
            </p>
            <p className="hear-card-body">
              Twain, Austen, the whole canon &mdash; free, read aloud, tagged
              with poetic moods like &ldquo;a long brown river&rdquo; or &ldquo;a
              quiet kind of brave.&rdquo; Find one that fits the day.
            </p>
            <div className="hear-card-shot">
              <img src="/screenshots/hearbooks-discover.jpeg" alt="HearBooks Discover" />
            </div>
            <span className="hear-card-status">Coming soon</span>
          </div>

          {/* HearNews */}
          <div className="hear-card hear-card-news">
            <img src="/icons/hearnews.png" alt="HearNews" className="hear-card-icon" />
            <h3>
              Hear<em>News</em>
            </h3>
            <p className="hear-card-tag">
              The day&apos;s news, read to you. Learns what you like.
            </p>
            <p className="hear-card-body">
              Pick sources, pick topics, then let the app build your news rhythm.
              The more you listen, the better it gets at picking what you want next.
            </p>
            <div className="hear-card-shot">
              <img src="/screenshots/hearnews-discover.png" alt="HearNews Discover" />
            </div>
            <span className="hear-card-status">Coming soon</span>
          </div>

          {/* HearVerse */}
          <div className="hear-card hear-card-verse">
            <img src="/icons/hearverse.png" alt="HearVerse" className="hear-card-icon" />
            <h3>
              Hear<em>Verse</em>
            </h3>
            <p className="hear-card-tag">
              The Bible, read aloud beautifully. Built for people who&apos;d
              rather hear it.
            </p>
            <p className="hear-card-body">
              All 1,189 chapters across 66 books &mdash; KJV and ASV. Two warm
              AI voices that read patiently, verse by verse. Reading plans that
              meet you where you are: five minutes a morning, or a whole book
              on a Sunday drive.
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

      {/* HEAR ASSIST — the sneaky teaser */}
      <section className="hear-page-tease">
        <div className="hear-tease-card">
          <span className="hear-tease-label">Still in the workshop</span>
          <h2>
            Hear<em>Assist.</em>
          </h2>
          <p>Stay close to the people you love &mdash; even when you can&apos;t be there.</p>
          <p className="hear-tease-aside">We&apos;ll tell you more when it&apos;s ready.</p>
        </div>
      </section>

      {/* THE PROMISE */}
      <section className="hear-page-promise">
        <div className="hear-promise-card">
          <div className="hear-page-label">We&apos;re listening</div>
          <h2>If something feels off, please tell us first.</h2>
          <p>
            We&apos;re a small studio. We&apos;re not a big company. We listen
            to every email. If something in one of our apps feels broken or
            wrong, please write us before you write the App Store &mdash;
            we&apos;re more responsive than you&apos;d expect, and we&apos;d
            love a chance to make it right.
          </p>
          <p className="hear-promise-emphasis">
            <em>Same human reads every one.</em>
          </p>
          <a href="mailto:ask@skoobilabs.com?subject=Hear%20feedback" className="hear-promise-cta">
            ask@skoobilabs.com &rarr;
          </a>
          <p className="hear-promise-aside">
            And if you love what we&apos;re doing &mdash; a review on the App
            Store helps more than you know. We make this for you. Thank you for
            listening.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="hear-page-footer">
        <Link href="/">SkoobiLabs &rarr;</Link>
        <p>&copy; 2026 SkoobiLabs</p>
      </footer>
    </>
  );
}
