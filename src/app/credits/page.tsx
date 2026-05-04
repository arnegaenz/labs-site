import { promises as fs } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Source Credits — Skoobi Labs",
  description:
    "Third-party software included with Skoobi Labs products. SkoobiLabs honors the attribution requirements of every license listed.",
};

type NoticePackage = {
  name: string;
  version: string;
  license: string;
  publisher: string | null;
  repository: string | null;
  homepage: string | null;
};

type NoticeFile = {
  generated_at: string;
  count: number;
  notice: string;
  packages: NoticePackage[];
};

async function loadNotice(): Promise<NoticeFile> {
  const filePath = path.join(process.cwd(), "public", "notice.json");
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

export default async function CreditsPage() {
  const data = await loadNotice();
  const generated = new Date(data.generated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="credits-page">
      <style>{`
        .credits-page {
          max-width: 920px;
          margin: 0 auto;
          padding: 3rem 1.5rem;
          line-height: 1.6;
        }
        .credits-page h1 {
          font-size: 2rem;
          font-weight: 700;
          color: rgba(255,255,255,0.95);
          margin-bottom: 0.5rem;
        }
        .credits-page .meta {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.4);
          margin-bottom: 1.25rem;
        }
        .credits-page .intro {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.7);
          margin-bottom: 2.5rem;
        }
        .credits-page .package {
          padding: 0.85rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
          gap: 1rem;
          align-items: baseline;
        }
        .credits-page .package:last-child {
          border-bottom: none;
        }
        .credits-page .name {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.9);
        }
        .credits-page .name a {
          color: rgba(255,255,255,0.9);
          text-decoration: none;
        }
        .credits-page .name a:hover {
          color: #C8923C;
        }
        .credits-page .version {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.4);
          margin-top: 0.15rem;
        }
        .credits-page .license {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.55);
          text-align: right;
          font-variant-numeric: tabular-nums;
        }
        .credits-page .back {
          display: inline-block;
          margin-top: 3rem;
          color: rgba(255,255,255,0.5);
          font-size: 0.9rem;
          text-decoration: none;
        }
        .credits-page .back:hover {
          color: #C8923C;
        }
      `}</style>

      <h1>Open Source Credits</h1>
      <div className="meta">
        {data.count} packages — generated {generated}
      </div>
      <p className="intro">{data.notice}</p>

      <div>
        {data.packages.map((pkg) => {
          const url = pkg.repository || pkg.homepage;
          return (
            <div key={`${pkg.name}@${pkg.version}`} className="package">
              <div>
                <div className="name">
                  {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {pkg.name}
                    </a>
                  ) : (
                    pkg.name
                  )}
                </div>
                <div className="version">
                  {pkg.version}
                  {pkg.publisher ? ` — ${pkg.publisher}` : ""}
                </div>
              </div>
              <div className="license">{pkg.license}</div>
            </div>
          );
        })}
      </div>

      <a href="/" className="back">
        ← Back to home
      </a>
    </main>
  );
}
