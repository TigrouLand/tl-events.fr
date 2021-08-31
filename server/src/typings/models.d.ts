import type { Document } from 'mongoose';

export interface PlayerDocument extends Document {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uuid: any;
  rank: string;
  kills: number;
  deaths: number;
  wins: number;
}

export interface ModifierDocument extends Document {
  name: string;
  material: string;
  description: string[];
  web: string[];
  enabled: boolean;
}

export interface GameDocument extends Document {
  name: string;
  id: number;
  logs: string[];
  states: string[];
  duration: string;
  seconds: number;
  minutes: number;
  hours: number;
  archiveDate: number;
  scheduleDate: number;
  startDate: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  players: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  alive: any[];
  baseTeamsSize: number;
  baseTeams: number;
  teams: TeamDocument[];
}

export interface TeamDocument extends Document {
  name: string;
  adjective: string;
  id: number;
  color: string;
  colors: number[];
  channel: string;
}
