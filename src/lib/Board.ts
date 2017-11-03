import Node from './Node';

import { NodeInterface } from './Node';
import Color from './Color';

export interface BoardInterface {
  state: NodeInterface[][];
  size: number;
  isWallAdjacent: (input: number[]) => boolean;
  getAdjacentVertexNodeCoordinates: (input: number[]) => NodeInterface[];
  nodeAt: (input: number[]) => NodeInterface;
}

export default class Board implements BoardInterface {
  public state: NodeInterface[][];
  public filled: boolean;
  public size: number;

  constructor(public boardSize: number) {
    this.size = boardSize;
    this.buildNewBoard(boardSize);
  }

  public isWallAdjacent([x, y]: number[]): boolean {
    return x === 0 || (x === this.size - 1)
      || y === 0 || (y === this.size - 1);
  }

  public getAdjacentVertexNodeCoordinates([x, y]: number[]): NodeInterface[] {
    return [
        [x + 1, y + 1], [x - 1, y - 1], [x + 1, y - 1], [x - 1, y + 1],
        [x + 1, y], [x - 1, y], [x, y - 1], [x, y + 1]
      ]
      .filter(el => el[0] >= 0 && el[0] < this.size && el[1] >= 0 && el[1] < this.size)
      .map(el => this.nodeAt(el));
  }

  public nodeAt([x, y]: number[]): NodeInterface {
    return this.state[x][y];
  }

  private buildNewBoard(boardSize: number) {
    const row = new Array(this.size).fill(new Node(Color.White));
    this.state = new Array(this.size).fill(row);
  }
}