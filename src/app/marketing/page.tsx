'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

interface Overview {
  active_campaigns: number;
  total_spend_cents: number;
  total_installs: number;
  total_revenue_cents: number;
  cost_per_install_cents: number;
  top_campaign: string | null;
}

interface Campaign {
  id: string;
  campaign_name: string;
  app_tag: string;
  platform: string;
  status: string;
  budget_cents: number;
  metrics_totals?: {
    spend_cents: number;
    installs: number;
    revenue_cents: number;
  };
}

function formatCents(cents: number): string {
  return '$' + (cents / 100).toFixed(2);
}

function calcROI(revenue: number, spend: number): string {
  if (spend === 0) return 'N/A';
  return ((revenue - spend) / spend * 100).toFixed(1) + '%';
}

export default function MarketingDashboard() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [ovRes, campRes] = await Promise.all([
        fetch('/api/marketing/overview'),
        fetch('/api/marketing/campaigns'),
      ]);
      if (!ovRes.ok) throw new Error('Failed to fetch overview');
      if (!campRes.ok) throw new Error('Failed to fetch campaigns');
      const ovData = await ovRes.json();
      const campData = await campRes.json();
      setOverview(ovData);
      setCampaigns(campData.campaigns || []);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleGenerateInsights = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/marketing/insights/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (!res.ok) throw new Error('Failed to generate insights');
      alert('Insights generated successfully!');
    } catch {
      alert('Failed to generate insights');
    } finally {
      setGenerating(false);
    }
  };

  const stats = overview
    ? [
        { label: 'Active Campaigns', value: String(overview.active_campaigns) },
        { label: 'Total Spend', value: formatCents(overview.total_spend_cents) },
        { label: 'Installs', value: String(overview.total_installs) },
        { label: 'Revenue', value: formatCents(overview.total_revenue_cents) },
        { label: 'Cost / Install', value: overview.cost_per_install_cents > 0 ? formatCents(overview.cost_per_install_cents) : 'N/A' },
      ]
    : [
        { label: 'Active Campaigns', value: '—' },
        { label: 'Total Spend', value: '—' },
        { label: 'Installs', value: '—' },
        { label: 'Revenue', value: '—' },
        { label: 'Cost / Install', value: '—' },
      ];

  return (
    <>
      <style jsx>{`
        .mkt-header h1 {
          font-size: 1.8rem;
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          margin-bottom: 0.4rem;
        }
        .mkt-header p {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.35);
          margin-bottom: 2.5rem;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1rem;
          margin-bottom: 3rem;
        }
        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 1.5rem;
        }
        .stat-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 0.5rem;
        }
        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
        }
        .top-campaign {
          margin-bottom: 2.5rem;
          padding: 1rem 1.5rem;
          background: rgba(0,229,160,0.06);
          border: 1px solid rgba(0,229,160,0.15);
          border-radius: 12px;
          color: rgba(255,255,255,0.7);
          font-size: 0.9rem;
        }
        .top-campaign strong {
          color: #00E5A0;
        }
        .table-section {
          margin-bottom: 2.5rem;
        }
        .table-section h2 {
          font-size: 1.1rem;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
          margin-bottom: 1rem;
        }
        .campaigns-table {
          width: 100%;
          border-collapse: collapse;
        }
        .campaigns-table th {
          text-align: left;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .campaigns-table td {
          padding: 0.85rem 1rem;
          font-size: 0.88rem;
          color: rgba(255,255,255,0.7);
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .campaigns-table tr:hover td {
          background: rgba(255,255,255,0.02);
        }
        .status-badge {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .status-active { background: rgba(0,229,160,0.15); color: #00E5A0; }
        .status-paused { background: rgba(255,200,0,0.15); color: #ffc800; }
        .status-draft { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.4); }
        .status-completed { background: rgba(139,92,246,0.15); color: #8B5CF6; }
        .empty-table {
          background: rgba(255,255,255,0.02);
          border: 1px dashed rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 3rem 2rem;
          text-align: center;
          color: rgba(255,255,255,0.2);
          font-size: 0.9rem;
        }
        .actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          padding: 0.7rem 1.4rem;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          text-decoration: none;
        }
        .btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .btn-primary { background: linear-gradient(135deg, #00E5A0, #00D4FF); color: #08080F; }
        .btn-secondary { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .error-msg {
          padding: 1rem 1.5rem;
          background: rgba(255,80,80,0.1);
          border: 1px solid rgba(255,80,80,0.2);
          border-radius: 10px;
          color: #ff8080;
          font-size: 0.88rem;
          margin-bottom: 2rem;
        }
        .loading-text {
          color: rgba(255,255,255,0.3);
          font-size: 0.9rem;
          padding: 2rem 0;
        }
        .table-wrap {
          overflow-x: auto;
        }
        @media (max-width: 768px) {
          .stat-value { font-size: 1.4rem; }
          .campaigns-table th, .campaigns-table td { padding: 0.6rem 0.5rem; font-size: 0.78rem; }
        }
      `}</style>

      <div className="mkt-header">
        <h1>Marketing Engine</h1>
        <p>SkoobiLabs Campaign Intelligence</p>
      </div>

      {error && <div className="error-msg">{error}</div>}

      {loading ? (
        <div className="loading-text">Loading dashboard...</div>
      ) : (
        <>
          <div className="stats-grid">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value">{stat.value}</div>
              </div>
            ))}
          </div>

          {overview?.top_campaign && (
            <div className="top-campaign">
              Top performing campaign: <strong>{overview.top_campaign}</strong>
            </div>
          )}

          <div className="table-section">
            <h2>Recent Campaigns</h2>
            {campaigns.length === 0 ? (
              <div className="empty-table">No campaigns yet. Create your first campaign to get started.</div>
            ) : (
              <div className="table-wrap">
                <table className="campaigns-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>App</th>
                      <th>Platform</th>
                      <th>Status</th>
                      <th>Spend</th>
                      <th>Installs</th>
                      <th>ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.slice(0, 10).map((c) => {
                      const spend = c.metrics_totals?.spend_cents ?? 0;
                      const rev = c.metrics_totals?.revenue_cents ?? 0;
                      const installs = c.metrics_totals?.installs ?? 0;
                      return (
                        <tr key={c.id}>
                          <td><Link href={`/marketing/campaigns`} style={{ color: '#00D4FF', textDecoration: 'none' }}>{c.campaign_name}</Link></td>
                          <td>{c.app_tag}</td>
                          <td>{c.platform}</td>
                          <td><span className={`status-badge status-${c.status}`}>{c.status}</span></td>
                          <td>{formatCents(spend)}</td>
                          <td>{installs}</td>
                          <td>{calcROI(rev, spend)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="actions">
            <Link href="/marketing/campaigns?new=true" className="btn btn-primary">New Campaign</Link>
            <button className="btn btn-secondary" onClick={handleGenerateInsights} disabled={generating}>
              {generating ? 'Generating...' : 'Generate Insights'}
            </button>
            <Link href="/marketing/insights" className="btn btn-secondary">View Insights</Link>
          </div>
        </>
      )}
    </>
  );
}
