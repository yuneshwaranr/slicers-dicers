import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const views = await kv.incr("page_views");

  res.status(200).json({ views });
}
