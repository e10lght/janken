import { Player, Players } from './Players';
import { Hand } from './hand';

interface Playable {
  playJanken: () => Player[];
}

// 'typeof Hand' を使用して型を取得
type HandType = typeof Hand;
// 'keyof HandType' を使用して、Hand のキーの型を取得
type HandKey = keyof HandType;
// 'HandType[HandKey]' を使用して、Hand の値の型を取得
type HandValue = HandType[HandKey];

// じゃんけんの判定や結果の表示などを行うクラス
export class Janken implements Playable {
  private playerList: Player[];
  constructor(private count: number, private players: Players) {
    this.playerList = players.getPlayers();
  }

  public playJanken(): Player[] {
    let result: Player[] = [];

    if (this.playerList.length < 2) {
      throw new Error('じゃんけんはプレイヤーが2人以上必要です');
    } else {
      console.log('じゃんけん開始！');
    }

    for (let i = 0; i < this.count; i++) {
      console.log(`第${i + 1}回戦！`);
      const addedRandom = this.assignRandomHands(i);
      this.playerList = addedRandom;
      // ループの度に上書きしている
      result = this.judge(this.playerList, i);
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
        console.log(`${player.name}さんの出し手：${hand[playerHand]}`);
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
        console.log(`${player.name}さん：出し手の${hand[winnerHand]}：勝ち!`);
        player.result!.win++;
      } else {
        console.log(`${player.name}さん：出し手の${hand[loseHand]}：負け!`);
        player.result!.lose++;
      }
    });
    return players;
  }

  //  手札がない場合ランダムで入れる
  private assignRandomHands(times: number): Player[] {
    const addRandom = this.playerList.map((player) => {
      if (player.hand![times] == null) {
        const random = Math.floor(Math.random() * 3) as HandValue;
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
