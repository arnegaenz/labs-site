'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface Campaign {
  id: string;
  campaign_name: string;
  app_tag: string;
  platform: string;
  status: string;
  budget_cents: number;
  target_audience?: string;
  notes?: string;
  created_at?: string;
  metrics_totals?: {
    spend_cents: number;
    installs: number;
    impressions: number;
    clicks: number;
    revenue_cents: number;
  };
}

interface DailyMetric {
  id: string;
  date: string;
  impressions: number;
  clicks: number;
  installs: number;
  spend_cents: number;
  revenue_cents: number;
}

const APP_TAGS = ['hearz', 'connections_helper', 'skoobi', 'skoobilabs'];
const PLATFORMS = ['facebook', 'google', 'apple_search', 'tiktok', 'manual'];
const STATUSES = ['draft', 'active', 'paused', 'completed'];

function formatCents(cents: number): string {
  return '$' + (cents / 100).toFixed(2);
}

function dollarsToCents(dollars: string): number {
  return Math.round(parseFloat(dollars || '0') * 100);
}

export default function CampaignsPage() {
  return (
    <Suspense fallback={<div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', padding: '2rem 0' }}>Loading campaigns...</div>}>
      <CampaignsContent />
    </Suspense>
  );
}

function CampaignsContent() {
  const searchParams = useSearchParams();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(searchParams.get('new') === 'true');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [dailyMetrics, setDailyMetrics] = useState<DailyMetric[]>([]);
  const [metricsLoading, setMetricsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    campaign_name: '',
    app_tag: 'hearz',
    platform: 'facebook',
    budget: '',
    status: 'draft',
    target_audience: '',
    notes: '',
  });

  const fetchCampaigns = useCallback(async () => {
    try {
      const res = await fetch('/api/marketing/campaigns');
      if (!res.ok) throw new Error('Failed to fetch campaigns');
      const data = await res.json();
      setCampaigns(data.campaigns || []);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const fetchMetrics = async (campaignId: string) => {
    setMetricsLoading(true);
    try {
      const res = await fetch(`/api/marketing/metrics?campaign_id=${campaignId}`);
      if (!res.ok) throw new Error('Failed to fetch metrics');
      const data = await res.json();
      setDailyMetrics(data.metrics || []);
    } catch {
      setDailyMetrics([]);
    } finally {
      setMetricsLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      setDailyMetrics([]);
    } else {
      setExpandedId(id);
      fetchMetrics(id);
    }
  };

  const resetForm = () => {
    setForm({ campaign_name: '', app_tag: 'hearz', platform: 'facebook', budget: '', status: 'draft', target_audience: '', notes: '' });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const body = {
        campaign_name: form.campaign_name,
        app_tag: form.app_tag,
        platform: form.platform,
        budget_cents: dollarsToCents(form.budget),
        status: form.status,
        target_audience: form.target_audience,
        notes: form.notes,
      };

      const url = editingId ? `/api/marketing/campaigns/${editingId}` : '/api/marketing/campaigns';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to save campaign');
      resetForm();
      setShowForm(false);
      fetchCampaigns();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (c: Campaign) => {
    setForm({
      campaign_name: c.campaign_name,
      app_tag: c.app_tag,
      platform: c.platform,
      budget: (c.budget_cents / 100).toFixed(2),
      status: c.status,
      target_audience: c.target_audience || '',
      notes: c.notes || '',
    });
    setEditingId(c.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this campaign?')) return;
    try {
      const res = await fetch(`/api/marketing/campaigns/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      fetchCampaigns();
      if (expandedId === id) setExpandedId(null);
    } catch {
      alert('Failed to delete campaign');
    }
  };

  return (
    <>
      <style jsx>{`
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
        .page-header h1 { font-size: 1.8rem; font-weight: 700; color: rgba(255,255,255,0.9); }
        .btn { display: inline-flex; align-items: center; padding: 0.7rem 1.4rem; border-radius: 10px; font-size: 0.85rem; font-weight: 600; border: none; cursor: pointer; transition: opacity 0.2s, transform 0.15s; text-decoration: none; }
        .btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .btn-primary { background: linear-gradient(135deg, #00E5A0, #00D4FF); color: #08080F; }
        .btn-secondary { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); }
        .btn-sm { padding: 0.4rem 0.8rem; font-size: 0.75rem; border-radius: 8px; }
        .btn-danger { background: rgba(255,80,80,0.12); border: 1px solid rgba(255,80,80,0.2); color: #ff8080; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .form-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 2rem; margin-bottom: 2rem; }
        .form-card h2 { font-size: 1.1rem; font-weight: 600; color: rgba(255,255,255,0.8); margin-bottom: 1.5rem; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
        .form-group.full { grid-column: 1 / -1; }
        .form-group label { font-size: 0.72rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,0.35); }
        .form-group input, .form-group select, .form-group textarea {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 0.65rem 0.9rem;
          color: rgba(255,255,255,0.85);
          font-size: 0.88rem;
          outline: none;
          transition: border-color 0.2s;
          font-family: inherit;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          border-color: #00D4FF;
        }
        .form-group textarea { resize: vertical; min-height: 80px; }
        .form-actions { display: flex; gap: 0.75rem; margin-top: 1.5rem; }

        .table-wrap { overflow-x: auto; }
        .campaigns-table { width: 100%; border-collapse: collapse; }
        .campaigns-table th {
          text-align: left; font-size: 0.7rem; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: rgba(255,255,255,0.3); padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .campaigns-table td {
          padding: 0.85rem 1rem; font-size: 0.88rem; color: rgba(255,255,255,0.7);
          border-bottom: 1px solid rgba(255,255,255,0.04); cursor: pointer;
        }
        .campaigns-table tr:hover td { background: rgba(255,255,255,0.02); }
        .status-badge {
          display: inline-block; padding: 0.2rem 0.6rem; border-radius: 6px;
          font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;
        }
        .status-active { background: rgba(0,229,160,0.15); color: #00E5A0; }
        .status-paused { background: rgba(255,200,0,0.15); color: #ffc800; }
        .status-draft { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.4); }
        .status-completed { background: rgba(139,92,246,0.15); color: #8B5CF6; }

        .expand-panel {
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px; padding: 1.5rem; margin: 0.5rem 1rem 1rem;
        }
        .expand-panel h3 { font-size: 0.9rem; font-weight: 600; color: rgba(255,255,255,0.7); margin-bottom: 1rem; }
        .metrics-table { width: 100%; border-collapse: collapse; }
        .metrics-table th {
          text-align: left; font-size: 0.65rem; font-weight: 600; letter-spacing: 1px;
          text-transform: uppercase; color: rgba(255,255,255,0.25); padding: 0.5rem 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .metrics-table td {
          padding: 0.5rem 0.75rem; font-size: 0.82rem; color: rgba(255,255,255,0.6);
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }
        .expand-actions { display: flex; gap: 0.5rem; margin-top: 1rem; }

        .empty-table {
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
          .campaigns-table th, .campaigns-table td { padding: 0.6rem 0.5rem; font-size: 0.78rem; }
        }
      `}</style>

      <div className="page-header">
        <h1>Campaigns</h1>
        <button className="btn btn-primary" onClick={() => { resetForm(); setShowForm(!showForm); }}>
          {showForm ? 'Cancel' : 'New Campaign'}
        </button>
      </div>

      {error && <div className="error-msg">{error}</div>}

      {showForm && (
        <div className="form-card">
          <h2>{editingId ? 'Edit Campaign' : 'Create Campaign'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Campaign Name</label>
                <input type="text" required value={form.campaign_name} onChange={(e) => setForm({ ...form, campaign_name: e.target.value })} placeholder="e.g. HearZ Spring Launch" />
              </div>
              <div className="form-group">
                <label>App</label>
                <select value={form.app_tag} onChange={(e) => setForm({ ...form, app_tag: e.target.value })}>
                  {APP_TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Platform</label>
                <select value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })}>
                  {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Budget ($)</label>
                <input type="number" step="0.01" min="0" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="0.00" />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Target Audience</label>
                <input type="text" value={form.target_audience} onChange={(e) => setForm({ ...form, target_audience: e.target.value })} placeholder="e.g. 18-35, podcast listeners" />
              </div>
              <div className="form-group full">
                <label>Notes</label>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Campaign notes..." />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Saving...' : editingId ? 'Update Campaign' : 'Create Campaign'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); resetForm(); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading-text">Loading campaigns...</div>
      ) : campaigns.length === 0 ? (
        <div className="empty-table">No campaigns yet. Click &quot;New Campaign&quot; to create one.</div>
      ) : (
        <div className="table-wrap">
          <table className="campaigns-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>App</th>
                <th>Platform</th>
                <th>Status</th>
                <th>Budget</th>
                <th>Spend</th>
                <th>Installs</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => {
                const spend = c.metrics_totals?.spend_cents ?? 0;
                const installs = c.metrics_totals?.installs ?? 0;
                const isExpanded = expandedId === c.id;
                return (
                  <tr key={c.id} style={{ verticalAlign: 'top' }}>
                    <td colSpan={7} style={{ padding: 0 }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                          <tr onClick={() => toggleExpand(c.id)} style={{ cursor: 'pointer' }}>
                            <td style={{ padding: '0.85rem 1rem', fontSize: '0.88rem', color: '#00D4FF' }}>{c.campaign_name}</td>
                            <td style={{ padding: '0.85rem 1rem', fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)' }}>{c.app_tag}</td>
                            <td style={{ padding: '0.85rem 1rem', fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)' }}>{c.platform}</td>
                            <td style={{ padding: '0.85rem 1rem' }}><span className={`status-badge status-${c.status}`}>{c.status}</span></td>
                            <td style={{ padding: '0.85rem 1rem', fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)' }}>{formatCents(c.budget_cents)}</td>
                            <td style={{ padding: '0.85rem 1rem', fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)' }}>{formatCents(spend)}</td>
                            <td style={{ padding: '0.85rem 1rem', fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)' }}>{installs}</td>
                          </tr>
                        </tbody>
                      </table>
                      {isExpanded && (
                        <div className="expand-panel">
                          <h3>Daily Metrics</h3>
                          {metricsLoading ? (
                            <div className="loading-text">Loading metrics...</div>
                          ) : dailyMetrics.length === 0 ? (
                            <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.85rem' }}>No daily metrics recorded yet.</div>
                          ) : (
                            <div className="table-wrap">
                              <table className="metrics-table">
                                <thead>
                                  <tr>
                                    <th>Date</th>
                                    <th>Impressions</th>
                                    <th>Clicks</th>
                                    <th>Installs</th>
                                    <th>Spend</th>
                                    <th>Revenue</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {dailyMetrics.map((m) => (
                                    <tr key={m.id}>
                                      <td>{new Date(m.date).toLocaleDateString()}</td>
                                      <td>{m.impressions}</td>
                                      <td>{m.clicks}</td>
                                      <td>{m.installs}</td>
                                      <td>{formatCents(m.spend_cents)}</td>
                                      <td>{formatCents(m.revenue_cents)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                          <div className="expand-actions">
                            <button className="btn btn-secondary btn-sm" onClick={(e) => { e.stopPropagation(); handleEdit(c); }}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={(e) => { e.stopPropagation(); handleDelete(c.id); }}>Delete</button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
