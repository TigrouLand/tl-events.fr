import 'dotenv/config';
import fastify from 'fastify';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyCors from 'fastify-cors';
import mongoose from 'mongoose';
import MUUID from 'uuid-mongodb';
import Game from './models/game';
import Modifier from './models/modifier';
import Player from './models/player';
import type { GameDocument } from './typings/models';

const server: FastifyInstance = fastify({
  logger: true,
  requestIdHeader: 'X-Request-Id',
});

void server.register(fastifyCors, {
  origin: '*',
});

server.get('/', async (_req: FastifyRequest, reply: FastifyReply) => reply.send({
  members: '/members',
  modifiers: '/modifiers',
  games: '/games',
  stats: '/stats',
}));

server.get('/members', async (_req: FastifyRequest, reply: FastifyReply) => {
  const members = await Player.find({}, ['name', 'uuid', 'rank', 'kills', 'deaths', 'wins']).sort([['wins', -1]]);
  for (const member of members) {
    if (member.uuid)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      member.uuid = MUUID.from(member.uuid).toString();
  }
  return reply.send({ members });
});

server.get('/modifiers', async (_req: FastifyRequest, reply: FastifyReply) => {
  const modifiers = await Modifier.find({}, ['name', 'material', 'description', 'web', 'enabled']).sort([['name', 1]]);
  return reply.send({ modifiers });
});

server.get('/games', async (_req: FastifyRequest, reply: FastifyReply) => {
  // Don't leak some data when the game is not archived yet
  const games: GameDocument[] = await Game.find({ archiveDate: -1 }, ['-logs', '-states', '-status', '-duration', '-type']).sort([['startDate', -1]]);
  const archivedGames: GameDocument[] = await Game.find({ archiveDate: { $ne: -1 } }, ['-type']).sort([['startDate', -1]]);
  for (const game of [...games, ...archivedGames]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    game.players = game.players.map(p => MUUID.from(p).toString());
    if (game.alive)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      game.alive = game.alive.map(p => MUUID.from(p).toString());
  }
  return reply.send({ games, archivedGames });
});

server.get('/stats', async (_req: FastifyRequest, reply: FastifyReply) => {
  const members = await Player.estimatedDocumentCount();
  const modifiers = await Modifier.estimatedDocumentCount();
  const games = await Game.estimatedDocumentCount();
  return reply.send({ members, modifiers, games });
});

async function start(): Promise<void> {
  await mongoose.connect(process.env.MONGO_URI ?? 'mongodb://127.0.0.1/tigrouland');
  await server.listen(process.env.APP_PORT ?? 7070, process.env.APP_ADDRESS ?? '0.0.0.0');
}

void start();
