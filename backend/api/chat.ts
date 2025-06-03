import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { message } = req.body as { message: string };
  res.status(200).json({ reply: \`Echo: \${message}\` });
}
