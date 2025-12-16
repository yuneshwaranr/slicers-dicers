import { useEffect, useState } from "react";

export default function Analytics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/stats")
      .then(res => res.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  if (!stats) {
    return <p style={{ padding: 24 }}>Loading analytics…</p>;
  }

  return (
    <div style={{ padding: 32 }}>
      <h2>📊 Site Analytics</h2>

      <p>👁 <strong>Total Page Views:</strong> {stats.views}</p>
      <p>🔢 <strong>Total Sessions:</strong> {stats.sessions}</p>
      <p>⏱ <strong>Avg Session Duration:</strong> {stats.avgSession} sec</p>

      <hr style={{ margin: "24px 0" }} />

      <p style={{ opacity: 0.7, fontSize: 13 }}>
        Data collected anonymously · Powered by Vercel KV
      </p>
    </div>
  );
}
