import { Player, Players } from '../../src/Players';
import { Hand } from '../../src/hand';
import { Janken } from '../../src/Janken';

describe('Janken', () => {
  let players: Players;
  let player1: Player;
  let player2: Player;
  let player3: Player;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    player1 = {
      hand: [Hand.Paper, Hand.Stone],
      name: 'プレイヤーA',
    };
    player2 = {
      hand: [Hand.Scissors, Hand.Stone],
      name: 'プレイヤーB',
    };
    player3 = {
      hand: [Hand.Paper, Hand.Stone],
      name: 'プレイヤーC',
    };

    players = new Players();
    players.addPlayer(player1);
    players.addPlayer(player2);
    players.addPlayer(player3);

    consoleSpy = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('プレイヤーの配列を返す', () => {
    const janken = new Janken(3, players);
    const result = janken.playJanken();
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(3);
  });

  test('2人未満の場合、エラーを返す', () => {
    const p = new Players();
    p.addPlayer(player1);
    const janken = new Janken(3, p);
    expect(() => janken.playJanken()).toThrow(
      'じゃんけんはプレイヤーが2人以上必要です'
    );
  });

  test('2人以上の場合、じゃんけん開始を出力する', () => {
    const p = new Players();
    p.addPlayer(player1);
    p.addPlayer(player2);
    const janken = new Janken(3, p);
    janken.playJanken();
    expect(consoleSpy).toHaveBeenCalledWith('じゃんけん開始！');
  });
});
