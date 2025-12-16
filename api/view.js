export default async function handler(req, res) {
  try {
    let kv;
    try {
      ({ kv } = await import("@vercel/kv"));
    } catch {
      return res.status(200).json({ views: 0 });
    }

    const views = await kv.incr("views");
    return res.status(200).json({ views });
  } catch (err) {
    console.error("View API error:", err);
    return res.status(500).json({ views: 0 });
  }
}
