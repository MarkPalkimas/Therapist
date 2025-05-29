import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import { PrismaClient } from './generated/prisma';
import Fastify from 'fastify';

// Load environment variables
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prisma = new PrismaClient();
const app = Fastify();

app.get('/', async () => {
  return { message: 'Hello, Therapist!', userCount: 0 };
});

app.post('/chat', async (request, reply) => {
  const { userId, message } = request.body as { userId: string; message: string };

  try {
    // Call OpenAI for a therapeutic response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a compassionate AI therapist.' },
        { role: 'user', content: message },
      ],
    });
    const aiReply = completion.choices[0].message?.content ?? '';
    reply.send({ userId, reply: aiReply });
  } catch (err: any) {
    reply.status(500).send({ error: err.message });
  }
});

const start = async () => {
  try {
    await app.listen({ port: 4000 });
    console.log('Backend running at http://localhost:4000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
