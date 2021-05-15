import type { Document } from 'mongoose';

export interface PlayerDocument extends Document {
  name: string;
  rank: string;
  kills: number;
  deaths: number;
  wins: number;
}
