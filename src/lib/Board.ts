import { Node } from './Node';

export enum Color {
  White = 'white',
  Black = 'black',
  Gray = 'gray'
}

export class Board {
  public state: Node[][];
  private initialNodeSeed: boolean;

  constructor(public boardSize: number) {
    this.initialNodeSeed = Math.floor(Math.random() * 10) % 2 === 0;
    this.buildNewBoard(boardSize);
  }

  private buildNewBoard(boardSize: number) {
    this.state = [];
    let whiteOrBlack: boolean = this.initialNodeSeed;

    for (let i: number = 0; i < boardSize; i++) {
      this.state.push([]);

      for (let j: number = 0; j < boardSize; j++) {
        if (whiteOrBlack) {
          this.state[i][j] = new Node(Color.White);
        } else {
          this.state[i][j] = new Node(Color.Black);
        }
        whiteOrBlack = !whiteOrBlack;
      }
      whiteOrBlack = !whiteOrBlack;
    }
  }
}