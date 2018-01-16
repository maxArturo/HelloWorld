import { BoardInterface } from './Board';
import { NodeInterface } from './Node';
import Color from './Color';
// import { getRandomBinary } from '../util/random';

/*
 * The BoardBuilder class is in charge of the construction
 * and initializing the solution of a Hitori board
 */
export default class BoardBuilder {
  public completed: boolean;

  private board: BoardInterface;
  private currIndex: number[];

  constructor(newBoard: BoardInterface) {
    this.board = newBoard;
    this.currIndex = [0, 0];
  }

  public traverseStep() {
    if (!this.completed) {
      console.log('passing through node: ', this.currIndex);
      this.markNode(); 
      this.setNextIndex();
    }
  }

  private setNextIndex(): void {
    const idx = this.currIndex;
    idx[1] = (idx[1] + 1) % this.board.size;

    if (idx[1] === 0) {
      idx[0]++;
    }

    if (idx[0] >= this.board.size) {
      this.completed = true;
    }
    this.currIndex = idx;
  }

  private markNode(): void {
    if (this.canBeMarked(this.currIndex)) {
      console.log('this node can be marked:', this.currIndex);
      const node = this.board.nodeAt(this.currIndex);
      if (this.isNode(node)) {

        console.log('marking this node: ', node);
        node.marked = true;
        node.color = Color.Black;
        if (this.isWallAdjacent(this.currIndex)) {
          node.walled = true;
        }
      }
    }
  }

  private canBeMarked([x, y]: number[]): boolean {
    return !this.hasMarkedNeigbhors([x, y])
    && !this.isWalling([x, y])
    && Math.random() > 0.5;
  }

  private isWallAdjacent([x, y]: number[]): boolean {
    return x === 0 || (x === this.board.size - 1)
      || y === 0 || (y === this.board.size - 1);
  }

  private isWalling([x, y]: number[]): boolean {
    const wallingNeigbhors = [[x + 1, y + 1], [x - 1, y - 1], [x + 1, y - 1], [x - 1, y + 1]]
      .map(el => this.board.nodeAt(el))
      .filter(this.isNode)
      .filter(el => el.walled);

    return wallingNeigbhors.length >= 2 || 
      this.isWallAdjacent([x, y]) && wallingNeigbhors.length > 0;
  }

  private hasMarkedNeigbhors([x, y]: number[]): boolean {
    return [[x + 1, y], [x - 1, y], [x, y - 1], [x, y + 1]]
      .map(el => {
        return this.board.nodeAt(el);
      })
      .filter(this.isNode)
      .some(el => el.marked);
  }

  private isNode(maybeNode: NodeInterface | void): maybeNode is NodeInterface {
    return (<NodeInterface> maybeNode) !== undefined;
  }
}