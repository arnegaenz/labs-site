'use client';

import { useEffect, useState, useCallback } from 'react';

interface Insight {
  id: string;
  app_tag: string;
  insight_type: string;
  title: string;
  body: string;
  recommendations: string[];
  applied: boolean;
  created_at: string;
}

const APP_TAGS = ['', 'hearz', 'connections_helper', 'skoobi', 'skoobilabs'];

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [filterApp, setFilterApp] = useState('');
  const [generateApp, setGenerateApp] = useState('');

  const fetchInsights = useCallback(async () => {
    try {
      const params = filterApp ? `?app_tag=${filterApp}` : '';
      const res = await fetch(`/api/marketing/insights${params}`);
      if (!res.ok) throw new Error('Failed to fetch insights');
      const data = await res.json();
      setInsights(data.insights || []);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load insights');
    } finally {
      setLoading(false);
    }
  }, [filterApp]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const body: Record<string, string> = {};
      if (generateApp) body.app_tag = generateApp;
      const res = await fetch('/api/marketing/insights/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to generate insight');
      setGenerating(false);
      fetchInsights();
    } catch {
      alert('Failed to generate insight');
      setGenerating(false);
    }
  };

  const typeBadgeColor = (type: string): string => {
    switch (type) {
      case 'performance': return '#00E5A0';
      case 'optimization': return '#00D4FF';
      case 'budget': return '#ffc800';
      case 'audience': return '#8B5CF6';
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
        .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .generate-bar {
          display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 1rem 1.5rem; margin-bottom: 2rem;
        }
        .generate-bar label { font-size: 0.78rem; color: rgba(255,255,255,0.4); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }

        .insight-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 1.75rem; margin-bottom: 1rem;
          transition: border-color 0.2s;
        }
        .insight-card:hover { border-color: rgba(255,255,255,0.12); }
        .insight-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
        .insight-title { font-size: 1.05rem; font-weight: 600; color: rgba(255,255,255,0.85); }
        .insight-meta { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }
        .type-badge {
          display: inline-block; padding: 0.15rem 0.55rem; border-radius: 5px;
          font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;
        }
        .applied-badge {
          display: inline-block; padding: 0.15rem 0.55rem; border-radius: 5px;
          font-size: 0.68rem; font-weight: 600; text-transform: uppercase;
          background: rgba(0,229,160,0.15); color: #00E5A0;
        }
        .insight-date { font-size: 0.78rem; color: rgba(255,255,255,0.25); margin-bottom: 1rem; }
        .insight-body { font-size: 0.9rem; color: rgba(255,255,255,0.6); line-height: 1.6; margin-bottom: 1rem; }
        .recommendations { margin: 0; padding: 0 0 0 1.2rem; }
        .recommendations li { font-size: 0.85rem; color: rgba(255,255,255,0.55); line-height: 1.7; }
        .reco-label { font-size: 0.7rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 0.5rem; }

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
      `}</style>

      <div className="page-header">
        <h1>AI Insights</h1>
        <div className="controls">
          <select className="filter-select" value={filterApp} onChange={(e) => setFilterApp(e.target.value)}>
            <option value="">All Apps</option>
            {APP_TAGS.filter(Boolean).map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {error && <div className="error-msg">{error}</div>}

      <div className="generate-bar">
        <label>Generate insight for:</label>
        <select className="filter-select" value={generateApp} onChange={(e) => setGenerateApp(e.target.value)}>
          <option value="">All Apps</option>
          {APP_TAGS.filter(Boolean).map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <button className="btn btn-primary" onClick={handleGenerate} disabled={generating}>
          {generating ? 'Generating...' : 'Generate New Insight'}
        </button>
      </div>

      {loading ? (
        <div className="loading-text">Loading insights...</div>
      ) : insights.length === 0 ? (
        <div className="empty-state">No insights yet. Generate your first AI insight above.</div>
      ) : (
        insights.map((insight) => (
          <div className="insight-card" key={insight.id}>
            <div className="insight-header">
              <div className="insight-title">{insight.title}</div>
              <div className="insight-meta">
                <span className="type-badge" style={{ background: `${typeBadgeColor(insight.insight_type)}22`, color: typeBadgeColor(insight.insight_type) }}>
                  {insight.insight_type}
                </span>
                {insight.applied && <span className="applied-badge">Applied</span>}
              </div>
            </div>
            <div className="insight-date">
              {insight.app_tag} &middot; {new Date(insight.created_at).toLocaleDateString()}
            </div>
            <div className="insight-body">{insight.body}</div>
            {insight.recommendations && insight.recommendations.length > 0 && (
              <>
                <div className="reco-label">Recommendations</div>
                <ul className="recommendations">
                  {insight.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))
      )}
    </>
  );
}
