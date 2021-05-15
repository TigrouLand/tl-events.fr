import 'dotenv/config';
import fastifyCors from 'fastify-cors';
import fastify from 'fastify';
import mongoose from 'mongoose';
import Player from './models/player';
import type { FastifyInstance } from 'fastify';

const server: FastifyInstance = fastify({
  logger: true,
});

void server.register(fastifyCors, {
  origin: '*',
});

server.get('/players', async (req, reply) => {
  const players = await Player.find({}, ['name', 'rank', 'kills', 'deaths', 'wins']);
  return reply.send({ players });
});

async function start(): Promise<void> {
  await mongoose.connect(process.env.MONGO_URI ?? 'mongodb://127.0.0.1/tigrouland', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  await server.listen(process.env.APP_PORT ?? 7070);
}

void start();
