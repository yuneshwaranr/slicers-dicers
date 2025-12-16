export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    let kv;
    try {
      ({ kv } = await import("@vercel/kv"));
    } catch {
      return res.status(200).end();
    }

    const { duration } = JSON.parse(req.body || "{}");

    if (typeof duration === "number" && duration > 0) {
      await Promise.all([
        kv.incr("sessions"),
        kv.incrby("totalSessionTime", duration)
      ]);
    }

    return res.status(200).end();
  } catch (err) {
    console.error("Session API error:", err);
    return res.status(200).end();
  }
}
