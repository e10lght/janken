import { Player, Players } from './Players';
import { Hand } from './hand';
import { Janken } from './Janken';

const player: Player = {
  hand: [Hand.Paper, Hand.Stone],
  name: 'プレイヤーA',
  result: { win: 9, lose: 9, draw: 9 },
};
const player2: Player = {
  hand: [Hand.Scissors, Hand.Stone],
  name: 'プレイヤーB',
};
const player3: Player = {
  hand: [Hand.Paper, Hand.Stone],
  name: 'プレイヤーC',
};

try {
  const p = new Players();
  p.addPlayer(player);
  p.addPlayer(player2);
  p.addPlayer(player3);

  const j = new Janken(3, p);
  const result: Player[] = j.playJanken();
  console.log('詳細：', result);
} catch (error) {
  console.log((error as Error).message);
}
