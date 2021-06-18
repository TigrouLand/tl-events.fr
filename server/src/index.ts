import 'dotenv/config';
import fastifyCors from 'fastify-cors';
import fastify from 'fastify';
import mongoose from 'mongoose';
import MUUID from 'uuid-mongodb';
import Game from './models/game';
import Modifier from './models/modifier';
import Player from './models/player';
import type { GameDocument } from './typings/models';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const server: FastifyInstance = fastify({
  logger: true,
  requestIdHeader: 'X-Request-Id',
});

void server.register(fastifyCors, {
  origin: '*',
});

server.get('/', async (_req: FastifyRequest, reply: FastifyReply) => reply.send({
  players: '/players',
  modifiers: '/modifiers',
  games: '/games',
  stats: '/stats',
}));

server.get('/players', async (_req: FastifyRequest, reply: FastifyReply) => {
  const players = await Player.find({}, ['name', 'rank', 'kills', 'deaths', 'wins']).sort([['wins', -1]]);
  return reply.send({ players });
});

server.get('/modifiers', async (_req: FastifyRequest, reply: FastifyReply) => {
  const modifiers = await Modifier.find({}, ['name', 'material', 'description', 'web', 'enabled']).sort([['name', 1]]);
  return reply.send({ modifiers });
});

server.get('/games', async (_req: FastifyRequest, reply: FastifyReply) => {
  // Don't leak some data when the game is not archived yet
  const games: GameDocument[] = await Game.find({ archiveDate: -1 }, ['-logs', '-states', '-status', '-duration']);
  const archivedGames: GameDocument[] = await Game.find({ archiveDate: { $ne: -1 } });
  for (const game of [...games, ...archivedGames]) {
    game.players = game.players.map(p => MUUID.from(p).toString());
    if (game.alive)
      game.alive = game.alive.map(p => MUUID.from(p).toString());
  }
  return reply.send({ games, archivedGames });
});

server.get('/stats', async (_req: FastifyRequest, reply: FastifyReply) => {
  const players = await Player.estimatedDocumentCount();
  const modifiers = await Modifier.estimatedDocumentCount();
  const games = await Game.estimatedDocumentCount();
  return reply.send({ players, modifiers, games });
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
