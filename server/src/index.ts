import 'dotenv/config';
import fastifyCors from 'fastify-cors';
import fastify from 'fastify';
import mongoose from 'mongoose';
import Modifier from './models/modifier';
import Player from './models/player';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const server: FastifyInstance = fastify({
  logger: true,
});

void server.register(fastifyCors, {
  origin: '*',
});

server.get('/', async (_req: FastifyRequest, reply: FastifyReply) => reply.send({
  players: '/players',
  modifiers: '/modifiers',
}));

server.get('/players', async (_req: FastifyRequest, reply: FastifyReply) => {
  const players = await Player.find({}, ['name', 'rank', 'kills', 'deaths', 'wins']);
  return reply.send({ players });
});

server.get('/modifiers', async (_req: FastifyRequest, reply: FastifyReply) => {
  const modifiers = await Modifier.find({}, ['name', 'material', 'description', 'enabled']);
  return reply.send({ modifiers });
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
