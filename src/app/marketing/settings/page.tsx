'use client';

import { useState } from 'react';

interface AccountStatus {
  name: string;
  identifier: string;
  connected: boolean;
  note?: string;
}

const ACCOUNTS: AccountStatus[] = [
  { name: 'Google AdMob', identifier: 'ca-app-pub-2092614136459898~9037470779', connected: true },
  { name: 'Google Ads', identifier: '490-511-0744', connected: true },
  { name: 'Meta Business', identifier: 'SkoobiLabs', connected: true },
  { name: 'Apple Search Ads', identifier: 'Connected', connected: true, note: 'App linking pending' },
  { name: 'RevenueCat', identifier: 'appl_KiwjlILsulTvlbjKQJFWsWEYEIl', connected: true },
];

export default function SettingsPage() {
  const [apiStatus, setApiStatus] = useState<'idle' | 'testing' | 'ok' | 'error'>('idle');
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  const testConnection = async () => {
    setApiStatus('testing');
    setApiResponse(null);
    try {
      const res = await fetch('/api/marketing/overview');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setApiStatus('ok');
      setApiResponse(`Active campaigns: ${data.active_campaigns}, Total spend: $${(data.total_spend_cents / 100).toFixed(2)}`);
    } catch (err: unknown) {
      setApiStatus('error');
      setApiResponse(err instanceof Error ? err.message : 'Connection failed');
    }
  };

  const endpoints = [
    { path: '/api/marketing/overview', method: 'GET' },
    { path: '/api/marketing/campaigns', method: 'GET' },
    { path: '/api/marketing/metrics', method: 'GET' },
    { path: '/api/marketing/attributions', method: 'GET' },
    { path: '/api/marketing/insights', method: 'GET' },
    { path: '/api/marketing/insights/generate', method: 'POST' },
  ];

  return (
    <>
      <style jsx>{`
        .page-header h1 { font-size: 1.8rem; font-weight: 700; color: rgba(255,255,255,0.9); margin-bottom: 0.4rem; }
        .page-header p { font-size: 0.9rem; color: rgba(255,255,255,0.35); margin-bottom: 2.5rem; }

        .section { margin-bottom: 2.5rem; }
        .section h2 {
          font-size: 1.05rem; font-weight: 600; color: rgba(255,255,255,0.8);
          margin-bottom: 1rem; padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .account-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .account-row {
          display: flex; align-items: center; gap: 1rem;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 1rem 1.25rem;
        }
        .account-icon {
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
        }
        .icon-ok { background: rgba(0,229,160,0.15); color: #00E5A0; }
        .icon-err { background: rgba(255,80,80,0.15); color: #ff8080; }
        .account-info { flex: 1; min-width: 0; }
        .account-name { font-size: 0.9rem; font-weight: 600; color: rgba(255,255,255,0.8); }
        .account-id { font-size: 0.78rem; color: rgba(255,255,255,0.35); font-family: monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .account-note { font-size: 0.75rem; color: #ffc800; margin-top: 0.2rem; }

        .endpoint-list { display: flex; flex-direction: column; gap: 0.4rem; }
        .endpoint-row {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.6rem 1rem; background: rgba(255,255,255,0.02);
          border-radius: 8px;
        }
        .endpoint-method {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.5px;
          padding: 0.15rem 0.5rem; border-radius: 4px; font-family: monospace;
        }
        .method-get { background: rgba(0,212,255,0.12); color: #00D4FF; }
        .method-post { background: rgba(0,229,160,0.12); color: #00E5A0; }
        .endpoint-path { font-size: 0.82rem; color: rgba(255,255,255,0.55); font-family: monospace; }

        .btn { display: inline-flex; align-items: center; padding: 0.7rem 1.4rem; border-radius: 10px; font-size: 0.85rem; font-weight: 600; border: none; cursor: pointer; transition: opacity 0.2s, transform 0.15s; }
        .btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .btn-primary { background: linear-gradient(135deg, #00E5A0, #00D4FF); color: #08080F; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .test-result {
          margin-top: 1rem; padding: 1rem 1.25rem; border-radius: 10px;
          font-size: 0.85rem;
        }
        .test-ok { background: rgba(0,229,160,0.08); border: 1px solid rgba(0,229,160,0.15); color: #00E5A0; }
        .test-err { background: rgba(255,80,80,0.08); border: 1px solid rgba(255,80,80,0.15); color: #ff8080; }
        .test-loading { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); color: rgba(255,255,255,0.4); }
      `}</style>

      <div className="page-header">
        <h1>Settings</h1>
        <p>Connected accounts and API configuration</p>
      </div>

      <div className="section">
        <h2>Connected Accounts</h2>
        <div className="account-list">
          {ACCOUNTS.map((acct) => (
            <div className="account-row" key={acct.name}>
              <div className={`account-icon ${acct.connected ? 'icon-ok' : 'icon-err'}`}>
                {acct.connected ? '\u2713' : '\u2717'}
              </div>
              <div className="account-info">
                <div className="account-name">{acct.name}</div>
                <div className="account-id">{acct.identifier}</div>
                {acct.note && <div className="account-note">{acct.note}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>API Endpoints</h2>
        <div className="endpoint-list">
          {endpoints.map((ep) => (
            <div className="endpoint-row" key={ep.path + ep.method}>
              <span className={`endpoint-method method-${ep.method.toLowerCase()}`}>{ep.method}</span>
              <span className="endpoint-path">{ep.path}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Test Connection</h2>
        <button className="btn btn-primary" onClick={testConnection} disabled={apiStatus === 'testing'}>
          {apiStatus === 'testing' ? 'Testing...' : 'Test API Connection'}
        </button>
        {apiStatus === 'testing' && (
          <div className="test-result test-loading">Connecting to API...</div>
        )}
        {apiStatus === 'ok' && apiResponse && (
          <div className="test-result test-ok">Connected successfully. {apiResponse}</div>
        )}
        {apiStatus === 'error' && apiResponse && (
          <div className="test-result test-err">Connection failed: {apiResponse}</div>
        )}
      </div>
    </>
  );
}
