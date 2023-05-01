import { Hand } from './hand';

export type Player = {
  hand?: HandValue[];
  name: string;
  result?: {
    win: number;
    lose: number;
    draw: number;
  };
};

// 'typeof Hand' を使用して型を取得
type HandType = typeof Hand;
// 'keyof HandType' を使用して、Hand のキーの型を取得
type HandKey = keyof HandType;
// 'HandType[HandKey]' を使用して、Hand の値の型を取得
type HandValue = HandType[HandKey];

// Playerを管理するクラス
export class Players {
  private players: Player[] = [];
  constructor() {}

  public addPlayer(player: Player): void {
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

  public getPlayers(): Player[] {
    return this.players;
  }
}
