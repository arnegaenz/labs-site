'use client';

const navItems = [
  { label: "Dashboard", href: "/marketing" },
  { label: "Campaigns", href: "/marketing/campaigns" },
  { label: "Insights", href: "/marketing/insights" },
  { label: "Attribution", href: "/marketing/attribution" },
  { label: "Settings", href: "/marketing/settings" },
];

export function MarketingSidebar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>{`
        .mkt-layout { display: flex; min-height: 100vh; }
        .mkt-sidebar { width: 240px; background: rgba(255,255,255,0.02); border-right: 1px solid rgba(255,255,255,0.06); padding: 2rem 0; flex-shrink: 0; }
        .mkt-sidebar-brand { padding: 0 1.5rem 2rem; font-size: 0.65rem; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: rgba(0,212,255,0.5); }
        .mkt-nav { list-style: none; padding: 0; margin: 0; }
        .mkt-nav li a { display: block; padding: 0.75rem 1.5rem; font-size: 0.9rem; color: rgba(255,255,255,0.45); text-decoration: none; transition: color 0.2s, background 0.2s; border-left: 2px solid transparent; }
        .mkt-nav li a:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.03); border-left-color: #00D4FF; }
        .mkt-content { flex: 1; padding: 2.5rem 3rem; overflow-y: auto; }
        @media (max-width: 768px) {
          .mkt-layout { flex-direction: column; }
          .mkt-sidebar { width: 100%; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); padding: 1rem 0; }
          .mkt-nav { display: flex; gap: 0; overflow-x: auto; }
          .mkt-nav li a { white-space: nowrap; border-left: none; border-bottom: 2px solid transparent; padding: 0.5rem 1rem; font-size: 0.8rem; }
          .mkt-nav li a:hover { border-left-color: transparent; border-bottom-color: #00D4FF; }
          .mkt-content { padding: 1.5rem; }
        }
      `}</style>

      <div className="mkt-layout">
        <aside className="mkt-sidebar">
          <div className="mkt-sidebar-brand">Marketing</div>
          <ul className="mkt-nav">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </aside>
        <main className="mkt-content">{children}</main>
      </div>
    </>
  );
}
