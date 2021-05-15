import { model, Schema } from 'mongoose';
import type { PlayerDocument } from '../typings/models';

const playerSchema = new Schema<PlayerDocument>({
  name: String,
  rank: String,
  kills: Number,
  deaths: Number,
  wins: Number,
});

export default model<PlayerDocument>('Player', playerSchema, 'players');
