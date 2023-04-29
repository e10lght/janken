import { Hand } from './hand';

export type Player = {
  hand?: Hand[];
  name: string;
  result?: {
    win: number;
    lose: number;
    draw: number;
  };
};

// Playerを管理するクラス
export class Players {
  private players: Player[] = [];
  constructor() {}

  addPlayer(player: Player) {
    this.players.push(player);
    this.players = this.players.map((player) => ({
      ...player,
      result: {
        win: 0,
        lose: 0,
        draw: 0,
      },
    }));
  }

  getPlayers(): Player[] {
    return this.players;
  }
}
