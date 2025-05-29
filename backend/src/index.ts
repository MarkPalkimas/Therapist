import Fastify from 'fastify';

const app = Fastify();

app.get('/', async () => {
  return { message: 'Hello, Therapist!' };
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
