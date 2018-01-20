import { BoardInterface } from './Board';
import { NodeInterface } from './Node';
import Color from './Color';

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
      console.log('at node: ', this.currIndex);
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
    console.log('analyzing node: ', this.currIndex);
    if (this.canBeMarked(this.currIndex)) {
      const node = this.board.nodeAt(this.currIndex);
      if (this.isNode(node)) {

        node.marked = true;
        node.color = Color.Black;
        if (this.isWallAdjacent(this.currIndex) || this.wallingNeigbhors(this.currIndex).length > 0) {
          this.wallNeigbhors(this.currIndex);
        }
      }
    }
  }

  private wallNeigbhors(nodeLoc: number[]): void {
    const node = this.board.nodeAt(nodeLoc);
    if (this.isNode(node)) {
      console.log('WALLING this node', node)
      node.walled = true;
    }

    console.log('and WALLING its neigbhors')
    this.vertexNeigbhors(nodeLoc)
      .filter(n => n.marked)
      .map(n => {
        if (!n.walled) {
          n.walled = true;
          this.wallNeigbhors(n.coordinates);
        }
      });
  }

  private canBeMarked([x, y]: number[]): boolean {
    const hasMarkedNeigbhors = this.hasMarkedNeigbhors([x, y]);
    const isWalling = this.isWalling([x, y]);
    console.log('hasMarkedNeigbhors:', hasMarkedNeigbhors);
    console.log('wallingNeigbhors', this.wallingNeigbhors(this.currIndex));
    console.log('iswalling :', isWalling);

    return !this.hasMarkedNeigbhors([x, y])
      && !this.isWalling([x, y])
      && Math.random() > 0.5;
  }

  private isWallAdjacent([x, y]: number[]): boolean {
    return x === 0 || (x === this.board.size - 1)
      || y === 0 || (y === this.board.size - 1);
  }

  private vertexNeigbhors([x, y]: number[]): NodeInterface[] {
    return [[x + 1, y + 1], [x - 1, y - 1], [x + 1, y - 1], [x - 1, y + 1]]
      .map(el => this.board.nodeAt(el))
      .filter(this.isNode);
  }

  private uniqueIDNeigbhors(coordinates: number[]): boolean {
    // TODO implement this function, then use algo to make sure no closed cycles
    const vertexAdjacent = this.vertexNeigbhors(coordinates);
    return vertexAdjacent
      .map(el => el.id)
      .filter((val, index, s) => );
  }

  private wallingNeigbhors(coordinates: number[]): NodeInterface[] {
    return this.vertexNeigbhors(coordinates).filter(el => el.walled);
  }

  private isWalling(coordinates: number[]): boolean {
    const wallingNeigbhorCount = this.wallingNeigbhors(coordinates).length;
    return wallingNeigbhorCount >= 2 ||
      this.isWallAdjacent(coordinates) && wallingNeigbhorCount > 0;
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