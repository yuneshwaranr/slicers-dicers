import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const views = await kv.incr("page_views");
    return res.status(200).json({ views });
  }

  if (req.method === "GET") {
    const views = (await kv.get("page_views")) || 0;
    return res.status(200).json({ views });
  }

  res.status(405).end();
}
