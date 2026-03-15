'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase-browser';

const navItems = [
  { label: "Dashboard", href: "/marketing" },
  { label: "Campaigns", href: "/marketing/campaigns" },
  { label: "Insights", href: "/marketing/insights" },
  { label: "Attribution", href: "/marketing/attribution" },
  { label: "Settings", href: "/marketing/settings" },
];

export function MarketingSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/marketing/login';
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }
    supabaseBrowser.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        window.location.href = '/marketing/login';
        return;
      }
      setAuthenticated(true);
      setChecking(false);
    });
  }, [isLoginPage]);

  async function handleSignOut() {
    await supabaseBrowser.auth.signOut();
    window.location.href = '/marketing/login';
  }

  // Login page: render without sidebar or auth gate
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checking || !authenticated) {
    return (
      <>
        <style jsx>{`
          .mkt-loading {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255, 255, 255, 0.3);
            font-size: 0.9rem;
          }
        `}</style>
        <div className="mkt-loading">Loading...</div>
      </>
    );
  }

  return (
    <>
      <style jsx global>{`
        .mkt-layout { display: flex; min-height: 100vh; }
        .mkt-sidebar { width: 240px; background: rgba(255,255,255,0.02); border-right: 1px solid rgba(255,255,255,0.06); padding: 2rem 0; flex-shrink: 0; display: flex; flex-direction: column; }
        .mkt-sidebar-brand { padding: 0 1.5rem 2rem; font-size: 0.65rem; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: rgba(0,212,255,0.5); }
        .mkt-nav { list-style: none; padding: 0; margin: 0; flex: 1; }
        .mkt-nav li a { display: block; padding: 0.75rem 1.5rem; font-size: 0.9rem; color: rgba(255,255,255,0.45); text-decoration: none; transition: color 0.2s, background 0.2s; border-left: 2px solid transparent; }
        .mkt-nav li a:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.03); border-left-color: #00D4FF; }
        .mkt-signout { padding: 1rem 1.5rem; border-top: 1px solid rgba(255,255,255,0.06); }
        .mkt-signout-btn { background: none; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: rgba(255,255,255,0.4); font-size: 0.8rem; padding: 0.5rem 1rem; cursor: pointer; width: 100%; transition: color 0.2s, border-color 0.2s; }
        .mkt-signout-btn:hover { color: rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.2); }
        .mkt-content { flex: 1; padding: 2.5rem 3rem; overflow-y: auto; }
        @media (max-width: 768px) {
          .mkt-layout { flex-direction: column; }
          .mkt-sidebar { width: 100%; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); padding: 1rem 0; flex-direction: row; align-items: center; }
          .mkt-nav { display: flex; gap: 0; overflow-x: auto; flex: 1; }
          .mkt-nav li a { white-space: nowrap; border-left: none; border-bottom: 2px solid transparent; padding: 0.5rem 1rem; font-size: 0.8rem; }
          .mkt-nav li a:hover { border-left-color: transparent; border-bottom-color: #00D4FF; }
          .mkt-signout { border-top: none; padding: 0.5rem 1rem; }
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
          <div className="mkt-signout">
            <button className="mkt-signout-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </aside>
        <main className="mkt-content">{children}</main>
      </div>
    </>
  );
}
