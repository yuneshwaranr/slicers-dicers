import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { duration } = req.body || {};

    if (duration) {
      await kv.incrby("total_session_time", duration);
      await kv.incr("session_count");
    }

    return res.status(200).json({ ok: true });
  }

  res.status(405).end();
}
