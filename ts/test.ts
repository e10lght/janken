interface Playable {
  playJanken: () => Player[];
}

type Player = {
  hand?: Hand[];
  name: string;
  result?: {
    win: number;
    lose: number;
    draw: number;
  };
};

// Playerクラスを実装する
class Players {
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

enum Hand {
  Stone,
  Scissors,
  Paper,
}

class Janken implements Playable {
  constructor(private count: number, private players: Player[]) {}

  public playJanken(): Player[] {
    let result: Player[] = [];

    if (this.players.length < 2) {
      throw new Error('じゃんけんはプレイヤーが2人以上必要です');
    }

    for (let i = 0; i < this.count; i++) {
      console.log(`第${i + 1}回戦！`);
      const addedRandom = this.assignRandomHands(i);
      this.players = addedRandom;
      result = this.judge(this.players, i);
    }
    console.log('最終結果');
    for (const player of result) {
      console.log(
        `${player.name}さんは${player.result?.win}勝：${player.result?.lose}敗：${player.result?.draw}分け`
      );
    }
    return result;
  }

  private judge(players: Player[], times: number): Player[] {
    const hand = ['グー', 'チョキ', 'パー'];

    // 各回のプレイヤーの手札
    // undefinedと重複を除いた手札を新たな配列として取得する
    const uniqueHands: number[] = Array.from(
      new Set(
        players
          .filter((player) => player.hand !== undefined)
          .map((player) => player.hand![times] as number) // 'as number'を追加
      )
    );

    // 0,1,2のような全ての手札の場合あいことする
    const isSameHands =
      uniqueHands.includes(0) &&
      uniqueHands.includes(1) &&
      uniqueHands.includes(2);
    if (uniqueHands.length === 1 || isSameHands) {
      let playerHand;
      for (const player of players) {
        playerHand = player.hand![times] as number;
        console.log(`${player.name}さん、出し手：${hand[playerHand]}`);
        player.result!.draw++;
      }
      console.log(`あいこ！`);
      return players;
    }

    // あいこの場合は除く（つまり、ここでは勝敗の2値のどちらかを返す）
    // 手札の最大値と最小値の差分が2の場合、最大値を返し、それ以外は最小値を返す。
    const maxHand = Math.max(...uniqueHands);
    const minHand = Math.min(...uniqueHands);
    const winnerHand = maxHand - minHand === 2 ? maxHand : minHand;
    const loseHand = maxHand - minHand === 2 ? minHand : maxHand;

    players.forEach((player) => {
      if (player.hand![times] === winnerHand) {
        console.log(`${player.name}さん：出し手、${hand[winnerHand]}：勝ち!`);
        player.result!.win++;
      } else {
        console.log(`${player.name}さん：出し手、${hand[loseHand]}：負け!`);
        player.result!.lose++;
      }
    });
    return players;
  }

  //  手札がない場合ランダムで入れる
  private assignRandomHands(times: number): Player[] {
    const addRandom = this.players.map((player) => {
      if (player.hand![times] == null) {
        const random = Math.floor(Math.random() * 3) as Hand;
        return {
          ...player,
          hand: [...player.hand!, random],
        };
      }
      return player;
    });
    return addRandom;
  }
}

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

try {
  const p = new Players();
  p.addPlayer(player);
  p.addPlayer(player2);
  p.addPlayer(player3);
  const players = p.getPlayers();

  const j = new Janken(3, players);
  const result: Player[] = j.playJanken();
  console.log('詳細：', result);
} catch (error) {
  console.log((error as Error).message);
}
