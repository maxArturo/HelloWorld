import Node from './Node';

import { NodeInterface } from './Node';
import Color from './Color';

export interface BoardInterface {
  state: Map<String, NodeInterface>;
  size: number;
  nodeAt: (input: number[]) => NodeInterface | void;
  registerUnmarkedNode(node: NodeInterface): void;
  getUnmarkedRowNodes(index: number): NodeInterface[];
  getUnregisteredColumnNodes(index: number): NodeInterface[];
}

export default class Board implements BoardInterface {
  public state: Map<String, NodeInterface>;
  public filled: boolean;
  public size: number;
  private unmarkedNodes: NodeInterface[][][];

  constructor(public boardSize: number) {
    this.size = boardSize;
    this.unmarkedNodes = [Array(this.size).fill([]), Array(this.size).fill([])];
    this.buildNewBoard();
  }

  public registerUnmarkedNode(node: NodeInterface): void {
    this.unmarkedNodes[0][node.x].push(node);
    this.unmarkedNodes[1][node.y].push(node);
  }

  public getUnmarkedRowNodes(index: number): NodeInterface[] {
    return this.unmarkedNodes[0][index];
  }

  public getUnregisteredColumnNodes(index: number): NodeInterface[] {
    return this.unmarkedNodes[1][index];
  }

  public nodeAt([x, y]: number[]): NodeInterface | void {
    return this.state.get(`${x},${y}`);
  }

  private buildNewBoard() {
    const boardMap = new Map<String, Node>();
    let id = 0;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const newNode = new Node(Color.White);
        newNode.coordinates = [i, j];
        newNode.x = i;
        newNode.y = j;
        newNode.id = id++;
        boardMap.set(`${i},${j}`, newNode);
      }
    }
    this.state = boardMap;
  }
}
