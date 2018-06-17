import Node from './Node';

import { NodeInterface } from './Node';
import Color from './Color';

export interface BoardInterface {
  state: Map<String, NodeInterface>;
  size: number;
  nodeAt: (input: number[]) => NodeInterface | void;
  getUnmarkedNodes(): NodeInterface[];
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

  public getUnmarkedNodes(): NodeInterface[] {
    return Array.from(this.state.values()).filter(e => !e.marked);
  }

  private buildNewBoard(boardSize: number) {
    const arrayFiller = Array(this.size)
      .fill(0)
      .map((e, i) => i.toString(10));

    const boardMap = new Map<String, Node>();
    let id = 0;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const newNode = new Node(Color.White);
        newNode.coordinates = [i, j];
        newNode.x = i;
        newNode.y = j;
        newNode.id = id++;
        newNode.solutionSet = arrayFiller;
        boardMap.set(`${i},${j}`, newNode);
      }
    }
    this.state = boardMap;
  }
}
