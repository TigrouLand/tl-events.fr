import { model, Schema } from 'mongoose';
import type { GameDocument, TeamDocument } from '../typings/models';

const teamSchema = new Schema<TeamDocument>({
  name: String,
  adjective: String,
  id: Number,
  color: String,
  colors: [Number],
  channel: String,
});

// @ts-expect-error TS2589: Type instantiation is excessively deep and possibly infinite.
const gameSchema = new Schema<GameDocument>({
  id: Number,
  players: [Schema.Types.Mixed],
  alive: [Schema.Types.Mixed],
  startDate: Number,
  archiveDate: Number,
  hours: Number,
  minutes: Number,
  seconds: Number,
  baseTeamsSize: Number,
  baseTeams: Number,
  teams: [teamSchema],
});

export default model<GameDocument>('Game', gameSchema, 'games');
