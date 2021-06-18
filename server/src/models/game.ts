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

const gameSchema = new Schema<GameDocument>({
  id: Number,
  type: String,
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
