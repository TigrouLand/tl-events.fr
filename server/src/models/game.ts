import { model, Schema } from 'mongoose';
import type { GameDocument } from '../typings/models';

const gameSchema = new Schema<GameDocument>({
  id: Number,
  type: String,
  players: [Schema.Types.Mixed],
  startDate: Number,
  archiveDate: Number,
  hours: Number,
  minutes: Number,
  seconds: Number,
  baseTeamsSize: Number,
  baseTeams: Number,
});

export default model<GameDocument>('Game', gameSchema, 'games');
