export default async function handler(req, res) {
  try {
    let kv;
    try {
      ({ kv } = await import("@vercel/kv"));
    } catch (e) {
      return res.status(200).json({
        views: 0,
        sessions: 0,
        avgSession: 0
      });
    }

    const [views, sessions, totalSessionTime] = await Promise.all([
      kv.get("views"),
      kv.get("sessions"),
      kv.get("totalSessionTime")
    ]);

    const safeViews = views ?? 0;
    const safeSessions = sessions ?? 0;
    const safeTotalTime = totalSessionTime ?? 0;

    const avgSession =
      safeSessions > 0 ? Math.round(safeTotalTime / safeSessions) : 0;

    return res.status(200).json({
      views: safeViews,
      sessions: safeSessions,
      avgSession
    });
  } catch (err) {
    console.error("Stats API error:", err);
    return res.status(500).json({
      views: 0,
      sessions: 0,
      avgSession: 0
    });
  }
}
