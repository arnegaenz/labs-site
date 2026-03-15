'use client';

import { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase-browser';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: authError } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    window.location.href = '/marketing';
  }

  return (
    <>
      <style jsx>{`
        .login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #08080F;
          padding: 2rem;
        }
        .login-card {
          width: 100%;
          max-width: 400px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 2.5rem;
        }
        .login-brand {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(0, 212, 255, 0.5);
          margin-bottom: 0.5rem;
        }
        .login-heading {
          font-size: 1.4rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 2rem;
        }
        .login-label {
          display: block;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 0.4rem;
        }
        .login-input {
          width: 100%;
          padding: 0.7rem 0.9rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
          margin-bottom: 1.25rem;
        }
        .login-input:focus {
          border-color: #00D4FF;
        }
        .login-btn {
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(135deg, #00D4FF 0%, #00E5A0 100%);
          border: none;
          border-radius: 8px;
          color: #08080F;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .login-btn:hover {
          opacity: 0.9;
        }
        .login-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .login-error {
          background: rgba(255, 59, 48, 0.1);
          border: 1px solid rgba(255, 59, 48, 0.3);
          border-radius: 8px;
          padding: 0.7rem 0.9rem;
          color: #FF6B6B;
          font-size: 0.85rem;
          margin-bottom: 1.25rem;
        }
      `}</style>

      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-brand">Skoobi Labs</div>
          <h1 className="login-heading">Sign in to Marketing Engine</h1>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <label className="login-label">Email</label>
            <input
              className="login-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="arne@skoobi.com"
              required
              autoFocus
            />

            <label className="login-label">Password</label>
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
