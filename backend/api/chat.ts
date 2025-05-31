import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import { PrismaClient } from '../src/generated/prisma';

dotenv.config();

let prisma: PrismaClient;
if (!global.prisma) {
  global.prisma = new PrismaClient();
}
prisma = global.prisma;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId, message } = request.body as { userId: string; message: string };
  if (!userId || !message) {
    return response.status(400).json({ error: 'Missing userId or message' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a compassionate AI therapist.' },
        { role: 'user', content: message },
      ],
    });
    const aiReply = completion.choices[0].message?.content ?? '';
    return response.status(200).json({ userId, reply: aiReply });
  } catch (err: any) {
    console.error('Chat error:', err);
    return response.status(500).json({ error: err.message });
  }
}
