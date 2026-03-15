'use client';

import { useEffect, useState, useCallback } from 'react';

interface Attribution {
  id: string;
  campaign_id: string;
  campaign_name?: string;
  app_tag: string;
  event_type: string;
  referral_code: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

const APP_TAGS = ['', 'hearz', 'connections_helper', 'skoobi', 'skoobilabs'];
const EVENT_TYPES = ['', 'install', 'signup', 'subscription', 'purchase', 'referral'];

function formatCents(cents: number): string {
  return '$' + (cents / 100).toFixed(2);
}

export default function AttributionPage() {
  const [attributions, setAttributions] = useState<Attribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterApp, setFilterApp] = useState('');
  const [filterEvent, setFilterEvent] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    campaign_id: '',
    app_tag: 'hearz',
    event_type: 'install',
    referral_code: '',
    metadata: '{}',
  });

  const fetchAttributions = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filterApp) params.set('app_tag', filterApp);
      if (filterEvent) params.set('event_type', filterEvent);
      const qs = params.toString();
      const res = await fetch(`/api/marketing/attributions${qs ? '?' + qs : ''}`);
      if (!res.ok) throw new Error('Failed to fetch attributions');
      const data = await res.json();
      setAttributions(data.attributions || []);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load attributions');
    } finally {
      setLoading(false);
    }
  }, [filterApp, filterEvent]);

  useEffect(() => {
    fetchAttributions();
  }, [fetchAttributions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let meta = {};
      try { meta = JSON.parse(form.metadata); } catch { /* keep empty */ }
      const res = await fetch('/api/marketing/attributions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaign_id: form.campaign_id || undefined,
          app_tag: form.app_tag,
          event_type: form.event_type,
          referral_code: form.referral_code || undefined,
          metadata: meta,
        }),
      });
      if (!res.ok) throw new Error('Failed to record event');
      setShowForm(false);
      setForm({ campaign_id: '', app_tag: 'hearz', event_type: 'install', referral_code: '', metadata: '{}' });
      fetchAttributions();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to record event');
    } finally {
      setSubmitting(false);
    }
  };

  // Compute summary stats
  const summary = {
    total: attributions.length,
    installs: attributions.filter((a) => a.event_type === 'install').length,
    signups: attributions.filter((a) => a.event_type === 'signup').length,
    subscriptions: attributions.filter((a) => a.event_type === 'subscription').length,
    revenue: attributions.reduce((sum, a) => {
      const rev = (a.metadata as Record<string, number>)?.revenue_cents || 0;
      return sum + rev;
    }, 0),
  };

  const eventColor = (type: string): string => {
    switch (type) {
      case 'install': return '#00E5A0';
      case 'signup': return '#00D4FF';
      case 'subscription': return '#8B5CF6';
      case 'purchase': return '#ffc800';
      case 'referral': return '#ff80ab';
      default: return 'rgba(255,255,255,0.5)';
    }
  };

  return (
    <>
      <style jsx>{`
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
        .page-header h1 { font-size: 1.8rem; font-weight: 700; color: rgba(255,255,255,0.9); }
        .controls { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }
        .filter-select {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; padding: 0.55rem 0.8rem; color: rgba(255,255,255,0.75);
          font-size: 0.82rem; outline: none; font-family: inherit;
        }
        .filter-select:focus { border-color: #00D4FF; }
        .btn { display: inline-flex; align-items: center; padding: 0.7rem 1.4rem; border-radius: 10px; font-size: 0.85rem; font-weight: 600; border: none; cursor: pointer; transition: opacity 0.2s, transform 0.15s; text-decoration: none; }
        .btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .btn-primary { background: linear-gradient(135deg, #00E5A0, #00D4FF); color: #08080F; }
        .btn-secondary { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .summary-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem; margin-bottom: 2rem;
        }
        .summary-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 1.25rem;
        }
        .summary-label {
          font-size: 0.68rem; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 0.4rem;
        }
        .summary-value { font-size: 1.5rem; font-weight: 700; color: rgba(255,255,255,0.85); }

        .form-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 2rem; margin-bottom: 2rem; }
        .form-card h2 { font-size: 1.1rem; font-weight: 600; color: rgba(255,255,255,0.8); margin-bottom: 1.5rem; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
        .form-group.full { grid-column: 1 / -1; }
        .form-group label { font-size: 0.72rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,0.35); }
        .form-group input, .form-group select, .form-group textarea {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; padding: 0.65rem 0.9rem; color: rgba(255,255,255,0.85);
          font-size: 0.88rem; outline: none; transition: border-color 0.2s; font-family: inherit;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #00D4FF; }
        .form-group textarea { resize: vertical; min-height: 60px; font-family: monospace; font-size: 0.8rem; }
        .form-actions { display: flex; gap: 0.75rem; margin-top: 1.5rem; }

        .table-wrap { overflow-x: auto; }
        .attr-table { width: 100%; border-collapse: collapse; }
        .attr-table th {
          text-align: left; font-size: 0.7rem; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: rgba(255,255,255,0.3); padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .attr-table td {
          padding: 0.75rem 1rem; font-size: 0.85rem; color: rgba(255,255,255,0.65);
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .attr-table tr:hover td { background: rgba(255,255,255,0.02); }
        .event-badge {
          display: inline-block; padding: 0.15rem 0.55rem; border-radius: 5px;
          font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;
        }
        .meta-cell { font-family: monospace; font-size: 0.75rem; color: rgba(255,255,255,0.4); max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        .empty-state {
          background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.08);
          border-radius: 12px; padding: 3rem 2rem; text-align: center;
          color: rgba(255,255,255,0.2); font-size: 0.9rem;
        }
        .error-msg {
          padding: 1rem 1.5rem; background: rgba(255,80,80,0.1); border: 1px solid rgba(255,80,80,0.2);
          border-radius: 10px; color: #ff8080; font-size: 0.88rem; margin-bottom: 2rem;
        }
        .loading-text { color: rgba(255,255,255,0.3); font-size: 0.9rem; padding: 2rem 0; }

        @media (max-width: 768px) {
          .form-grid { grid-template-columns: 1fr; }
          .attr-table th, .attr-table td { padding: 0.5rem; font-size: 0.78rem; }
        }
      `}</style>

      <div className="page-header">
        <h1>Attribution</h1>
        <div className="controls">
          <select className="filter-select" value={filterApp} onChange={(e) => setFilterApp(e.target.value)}>
            <option value="">All Apps</option>
            {APP_TAGS.filter(Boolean).map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select className="filter-select" value={filterEvent} onChange={(e) => setFilterEvent(e.target.value)}>
            <option value="">All Events</option>
            {EVENT_TYPES.filter(Boolean).map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <button className="btn btn-secondary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Record Event'}
          </button>
        </div>
      </div>

      {error && <div className="error-msg">{error}</div>}

      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-label">Total Events</div>
          <div className="summary-value">{summary.total}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Installs</div>
          <div className="summary-value">{summary.installs}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Signups</div>
          <div className="summary-value">{summary.signups}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Subscriptions</div>
          <div className="summary-value">{summary.subscriptions}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Revenue</div>
          <div className="summary-value">{formatCents(summary.revenue)}</div>
        </div>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>Record Attribution Event</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>App</label>
                <select value={form.app_tag} onChange={(e) => setForm({ ...form, app_tag: e.target.value })}>
                  {APP_TAGS.filter(Boolean).map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Event Type</label>
                <select value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value })}>
                  {EVENT_TYPES.filter(Boolean).map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Campaign ID (optional)</label>
                <input type="text" value={form.campaign_id} onChange={(e) => setForm({ ...form, campaign_id: e.target.value })} placeholder="UUID" />
              </div>
              <div className="form-group">
                <label>Referral Code (optional)</label>
                <input type="text" value={form.referral_code} onChange={(e) => setForm({ ...form, referral_code: e.target.value })} placeholder="e.g. SPRING25" />
              </div>
              <div className="form-group full">
                <label>Metadata (JSON)</label>
                <textarea value={form.metadata} onChange={(e) => setForm({ ...form, metadata: e.target.value })} />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Saving...' : 'Record Event'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading-text">Loading attributions...</div>
      ) : attributions.length === 0 ? (
        <div className="empty-state">No attribution events recorded yet.</div>
      ) : (
        <div className="table-wrap">
          <table className="attr-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>App</th>
                <th>Event</th>
                <th>Campaign</th>
                <th>Referral Code</th>
                <th>Metadata</th>
              </tr>
            </thead>
            <tbody>
              {attributions.map((a) => (
                <tr key={a.id}>
                  <td>{new Date(a.created_at).toLocaleDateString()}</td>
                  <td>{a.app_tag}</td>
                  <td>
                    <span className="event-badge" style={{ background: `${eventColor(a.event_type)}22`, color: eventColor(a.event_type) }}>
                      {a.event_type}
                    </span>
                  </td>
                  <td>{a.campaign_name || a.campaign_id || '—'}</td>
                  <td>{a.referral_code || '—'}</td>
                  <td className="meta-cell" title={JSON.stringify(a.metadata)}>{JSON.stringify(a.metadata)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
