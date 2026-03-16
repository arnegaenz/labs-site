'use client';

import { useEffect, useState, useCallback } from 'react';

interface AnalyticsSummary {
  period_days: number;
  sessions: number;
  total_events: number;
  top_events: { event: string; count: number }[];
}

const EVENT_LABELS: Record<string, string> = {
  session_start: 'App Opens',
  session_end: 'App Closes',
  screen_view: 'Screen Views',
  ad_impression: 'Ad Impressions',
  ad_skip: 'Ad Skips',
  ad_click: 'Ad Clicks',
  paywall_view: 'Paywall Views',
  purchase_start: 'Purchase Started',
  purchase_complete: 'Purchases',
  purchase_fail: 'Purchase Failed',
  purchase_restore: 'Restores',
  daily_limit_reached: 'Limit Reached',
  referral_used: 'Referrals',
  error: 'Errors',
  onboarding_step: 'Onboarding Steps',
};

const EVENT_COLORS: Record<string, string> = {
  session_start: '#00E5A0',
  ad_impression: '#00D4FF',
  paywall_view: '#8B5CF6',
  purchase_complete: '#00E5A0',
  purchase_fail: '#FF6B6B',
  error: '#FF6B6B',
  daily_limit_reached: '#FFC800',
};

function eventLabel(event: string): string {
  return EVENT_LABELS[event] || event.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function eventColor(event: string): string {
  return EVENT_COLORS[event] || 'rgba(255,255,255,0.5)';
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(7);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics?days=${days}`);
      if (!res.ok) throw new Error('Failed to fetch analytics');
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Group events into categories for the funnel view
  const engagement = data?.top_events.filter(e =>
    ['session_start', 'screen_view', 'onboarding_step'].includes(e.event)
  ) || [];

  const adMetrics = data?.top_events.filter(e =>
    e.event.startsWith('ad_')
  ) || [];

  const revenueMetrics = data?.top_events.filter(e =>
    ['paywall_view', 'purchase_start', 'purchase_complete', 'purchase_fail', 'purchase_restore', 'daily_limit_reached'].includes(e.event)
  ) || [];

  const errorMetrics = data?.top_events.filter(e =>
    e.event === 'error'
  ) || [];

  // Calculate funnel conversion
  const paywallViews = data?.top_events.find(e => e.event === 'paywall_view')?.count || 0;
  const purchaseStarts = data?.top_events.find(e => e.event === 'purchase_start')?.count || 0;
  const purchaseCompletes = data?.top_events.find(e => e.event === 'purchase_complete')?.count || 0;

  const adImpressions = data?.top_events.find(e => e.event === 'ad_impression')?.count || 0;
  const adSkips = data?.top_events.find(e => e.event === 'ad_skip')?.count || 0;
  const skipRate = adImpressions > 0 ? ((adSkips / adImpressions) * 100).toFixed(1) : '0';

  return (
    <>
      <style jsx>{`
        .analytics-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1rem; }
        .analytics-header h1 { font-size: 1.8rem; font-weight: 700; color: rgba(255,255,255,0.9); margin: 0; }
        .period-selector { display: flex; gap: 0.5rem; }
        .period-btn { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; color: rgba(255,255,255,0.5); font-size: 0.8rem; font-weight: 600; padding: 0.5rem 1rem; cursor: pointer; transition: all 0.2s; }
        .period-btn:hover { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.8); }
        .period-btn.active { background: rgba(0,212,255,0.12); border-color: #00D4FF; color: #00D4FF; }

        .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 2.5rem; }
        .kpi-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 1.5rem; }
        .kpi-label { font-size: 0.7rem; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 0.5rem; }
        .kpi-value { font-size: 2rem; font-weight: 700; color: rgba(255,255,255,0.85); }
        .kpi-sub { font-size: 0.75rem; color: rgba(255,255,255,0.3); margin-top: 0.25rem; }

        .section { margin-bottom: 2.5rem; }
        .section h2 { font-size: 1.1rem; font-weight: 600; color: rgba(255,255,255,0.8); margin-bottom: 1rem; }

        .funnel { display: flex; gap: 0; align-items: stretch; margin-bottom: 2rem; }
        .funnel-step { flex: 1; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); padding: 1.2rem; text-align: center; position: relative; }
        .funnel-step:first-child { border-radius: 12px 0 0 12px; }
        .funnel-step:last-child { border-radius: 0 12px 12px 0; }
        .funnel-step:not(:last-child)::after { content: '→'; position: absolute; right: -8px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.2); font-size: 1.2rem; z-index: 1; }
        .funnel-value { font-size: 1.6rem; font-weight: 700; color: rgba(255,255,255,0.85); }
        .funnel-label { font-size: 0.7rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-top: 0.3rem; }
        .funnel-rate { font-size: 0.72rem; color: #00E5A0; margin-top: 0.3rem; }

        .event-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .event-row { display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; background: rgba(255,255,255,0.02); border-radius: 10px; }
        .event-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .event-name { flex: 1; font-size: 0.88rem; color: rgba(255,255,255,0.7); }
        .event-count { font-size: 0.95rem; font-weight: 700; color: rgba(255,255,255,0.85); font-variant-numeric: tabular-nums; }
        .event-bar { height: 4px; border-radius: 2px; min-width: 4px; transition: width 0.3s; }

        .empty-state { background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.08); border-radius: 12px; padding: 3rem 2rem; text-align: center; color: rgba(255,255,255,0.25); font-size: 0.9rem; }

        .error-msg { padding: 1rem 1.5rem; background: rgba(255,80,80,0.1); border: 1px solid rgba(255,80,80,0.2); border-radius: 10px; color: #ff8080; font-size: 0.88rem; margin-bottom: 2rem; }
        .loading-text { color: rgba(255,255,255,0.3); font-size: 0.9rem; padding: 2rem 0; }

        @media (max-width: 768px) {
          .funnel { flex-direction: column; }
          .funnel-step:first-child { border-radius: 12px 12px 0 0; }
          .funnel-step:last-child { border-radius: 0 0 12px 12px; }
          .funnel-step:not(:last-child)::after { content: '↓'; right: 50%; top: auto; bottom: -12px; transform: translateX(50%); }
          .kpi-value { font-size: 1.5rem; }
        }
      `}</style>

      <div className="analytics-header">
        <h1>App Analytics</h1>
        <div className="period-selector">
          {[1, 7, 30, 90].map((d) => (
            <button
              key={d}
              className={`period-btn ${days === d ? 'active' : ''}`}
              onClick={() => setDays(d)}
            >
              {d === 1 ? 'Today' : `${d}d`}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="error-msg">{error}</div>}

      {loading ? (
        <div className="loading-text">Loading analytics...</div>
      ) : !data || data.total_events === 0 ? (
        <div className="empty-state">
          No analytics data yet. Events will appear here once users start using the app.
          <br /><br />
          Tracked events include: app sessions, screen views, ad impressions, subscription funnel, and errors.
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-label">Sessions</div>
              <div className="kpi-value">{data.sessions.toLocaleString()}</div>
              <div className="kpi-sub">Last {days} day{days > 1 ? 's' : ''}</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">Total Events</div>
              <div className="kpi-value">{data.total_events.toLocaleString()}</div>
              <div className="kpi-sub">{(data.total_events / Math.max(data.sessions, 1)).toFixed(1)} per session</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">Ad Impressions</div>
              <div className="kpi-value">{adImpressions.toLocaleString()}</div>
              <div className="kpi-sub">{skipRate}% skip rate</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">Purchases</div>
              <div className="kpi-value">{purchaseCompletes}</div>
              <div className="kpi-sub">{paywallViews > 0 ? ((purchaseCompletes / paywallViews) * 100).toFixed(1) : '0'}% conversion</div>
            </div>
          </div>

          {/* Subscription Funnel */}
          {paywallViews > 0 && (
            <div className="section">
              <h2>Subscription Funnel</h2>
              <div className="funnel">
                <div className="funnel-step">
                  <div className="funnel-value">{paywallViews}</div>
                  <div className="funnel-label">Paywall Views</div>
                </div>
                <div className="funnel-step">
                  <div className="funnel-value">{purchaseStarts}</div>
                  <div className="funnel-label">Started Purchase</div>
                  {paywallViews > 0 && (
                    <div className="funnel-rate">{((purchaseStarts / paywallViews) * 100).toFixed(1)}%</div>
                  )}
                </div>
                <div className="funnel-step">
                  <div className="funnel-value">{purchaseCompletes}</div>
                  <div className="funnel-label">Completed</div>
                  {purchaseStarts > 0 && (
                    <div className="funnel-rate">{((purchaseCompletes / purchaseStarts) * 100).toFixed(1)}%</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Ad Performance */}
          {adMetrics.length > 0 && (
            <div className="section">
              <h2>Ad Performance</h2>
              <EventList events={adMetrics} maxCount={data.total_events} />
            </div>
          )}

          {/* Engagement */}
          {engagement.length > 0 && (
            <div className="section">
              <h2>Engagement</h2>
              <EventList events={engagement} maxCount={data.total_events} />
            </div>
          )}

          {/* Revenue Events */}
          {revenueMetrics.length > 0 && (
            <div className="section">
              <h2>Revenue &amp; Monetization</h2>
              <EventList events={revenueMetrics} maxCount={data.total_events} />
            </div>
          )}

          {/* Errors */}
          {errorMetrics.length > 0 && (
            <div className="section">
              <h2>Errors</h2>
              <EventList events={errorMetrics} maxCount={data.total_events} />
            </div>
          )}

          {/* All Events */}
          <div className="section">
            <h2>All Events</h2>
            <EventList events={data.top_events} maxCount={data.top_events[0]?.count || 1} />
          </div>
        </>
      )}
    </>
  );
}

function EventList({ events, maxCount }: { events: { event: string; count: number }[]; maxCount: number }) {
  return (
    <div className="event-list">
      {events.map((e) => (
        <div className="event-row" key={e.event}>
          <div className="event-dot" style={{ backgroundColor: eventColor(e.event) }} />
          <span className="event-name">{eventLabel(e.event)}</span>
          <div className="event-bar" style={{
            width: `${Math.max((e.count / maxCount) * 100, 2)}px`,
            backgroundColor: eventColor(e.event),
            maxWidth: '80px',
          }} />
          <span className="event-count">{e.count.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}
