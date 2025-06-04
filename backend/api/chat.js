export default function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const { message, userId } = req.body || {};
  // (Optional) You can use `userId` here to do per-user logic.
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.status(200).json({ reply: `Echo (${userId ?? "anon"}): ${message}` });
}
