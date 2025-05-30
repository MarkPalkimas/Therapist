import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import { PrismaClient } from './generated/prisma';
import Fastify from 'fastify';
import { Registry, collectDefaultMetrics, Counter, Histogram, Gauge, Summary } from 'prom-client';

// Load environment variables
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prisma = new PrismaClient();
const app = Fastify();

// Prometheus setup
const register = new Registry();
collectDefaultMetrics({ register });

const chatCounter = new Counter({
  name: 'moodai_chat_requests_total',
  help: 'Total number of /chat requests',
  registers: [register],
});

const chatLatency = new Histogram({
  name: 'moodai_chat_latency_seconds',
  help: 'Latency of /chat handler in seconds',
  buckets: [0.05, 0.1, 0.5, 1, 2],
  registers: [register],
});

const chatLastLatency = new Gauge({
  name: 'moodai_chat_last_latency_seconds',
  help: 'Latency of the last /chat request in seconds',
  registers: [register],
});

const chatLatencySummary = new Summary({
  name: 'moodai_chat_latency_summary_seconds',
  help: 'Summary of /chat handler latencies in seconds',
  percentiles: [0.5, 0.9, 0.95],
  registers: [register],
});

app.get('/', async () => {
  return { message: 'Hello, Therapist!', userCount: 0 };
});

app.post('/chat', async (request, reply) => {
  const start = process.hrtime();
  chatCounter.inc();

  const { userId, message } = request.body as { userId: string; message: string };

  try {
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
  } finally {
    const [s, ns] = process.hrtime(start);
    const seconds = s + ns / 1e9;
    chatLastLatency.set(seconds);
    chatLatencySummary.observe(seconds);
  }
});

app.get('/metrics', async (_request, reply) => {
  reply.header('Content-Type', register.contentType);
  reply.send(await register.metrics());
});

const start = async () => {
  try {
    await app.listen({ port: 4000, host: '0.0.0.0' });
    console.log('Backend running at http://0.0.0.0:4000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
