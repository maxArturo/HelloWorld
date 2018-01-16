import Node from './Node';

import { NodeInterface } from './Node';
import Color from './Color';

export interface BoardInterface {
  state: Map<String, NodeInterface>;
  size: number;
  nodeAt: (input: number[]) => NodeInterface | void;
}

export default class Board implements BoardInterface {
  public state: Map<String, NodeInterface>;
  public filled: boolean;
  public size: number;

  constructor(public boardSize: number) {
    this.size = boardSize;
    this.buildNewBoard(boardSize);
  }

  public nodeAt([x, y]: number[]): NodeInterface | void {
    return this.state.get(`${x},${y}`);
  }

  private buildNewBoard(boardSize: number) {
    const boardMap = new Map<String, Node>();
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        boardMap.set(`${i},${j}`, new Node(Color.White));
      }
    }
    this.state = boardMap;
  }
}
