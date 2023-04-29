import { Player, Players } from './Players';
import { Hand } from './hand';
import { Janken } from './Janken';

try {
  const player: Player = {
    hand: [Hand.Paper, Hand.Stone],
    name: 'プレイヤーA',
  };
  const player2: Player = {
    hand: [Hand.Scissors, Hand.Stone],
    name: 'プレイヤーB',
  };
  const player3: Player = {
    hand: [Hand.Paper, Hand.Stone],
    name: 'プレイヤーC',
  };

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
