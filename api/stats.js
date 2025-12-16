import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const views = (await kv.get("page_views")) || 0;
  const totalTime = (await kv.get("total_session_time")) || 0;
  const sessions = (await kv.get("session_count")) || 0;

  const avgSession =
    sessions > 0 ? Math.round(totalTime / sessions) : 0;

  res.status(200).json({
    views,
    sessions,
    avgSession
  });
}
