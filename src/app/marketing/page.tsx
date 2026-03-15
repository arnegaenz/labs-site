'use client';

export default function MarketingDashboard() {
  const stats = [
    { label: "Active Campaigns", value: "0" },
    { label: "Total Spend", value: "$0" },
    { label: "Installs", value: "0" },
    { label: "Revenue", value: "$0" },
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
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 1.5rem;
        }
        .stat-card .stat-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 0.5rem;
        }
        .stat-card .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
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
        .btn:hover {
          opacity: 0.85;
          transform: translateY(-1px);
        }
        .btn-primary {
          background: linear-gradient(135deg, #00E5A0, #00D4FF);
          color: #08080F;
        }
        .btn-secondary {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.7);
        }
      `}</style>

      <div className="mkt-header">
        <h1>Marketing Engine</h1>
        <p>SkoobiLabs Campaign Intelligence</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="table-section">
        <h2>Recent Campaigns</h2>
        <div className="empty-table">No campaigns yet</div>
      </div>

      <div className="actions">
        <button className="btn btn-primary">New Campaign</button>
        <button className="btn btn-secondary">View Insights</button>
      </div>
    </>
  );
}
