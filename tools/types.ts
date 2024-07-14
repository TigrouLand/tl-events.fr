export namespace API {
  export interface Member {
    name: string;
    rank: string;
    uuid: string;
    kills: number;
    deaths: number;
    wins: number;
  }

  export interface Modifier {
    name: string;
    enabled: boolean;
    material: string;
    description: string[];
  }

  export interface Team {
    name: string;
    colors: number[];
  }

  export interface Game {
    id: number;
    name: string;
    type: string;
    status: string;
    alive: string[];
    players: string[];
    modifiers: string[] | undefined;
    logs: string[];
    moles: string[] | undefined;
    teams: Team[] | undefined;
    events: string[] | undefined;
    playerRoles: Record<string, string> | undefined;
    playerTeams: Record<string, string> | undefined;
    finalTeams: Record<string, string> | undefined;
    hiddenRoles: boolean;
    hours: number;
    minutes: number;
    seconds: number;
    startDate: number;
    scheduleDate: number;
    archiveDate: number;
  }

  export interface GameResponse {
    games: Game[];
    archivedGames: Game[];
  }

  export interface Stats {
    games: number;
    members: number;
    modifiers: number;
  }
}
