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
      this.processNode();
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

  private processNode(): void {
    if (this.canBeMarked(this.currIndex)) {
      const node = this.board.nodeAt(this.currIndex);
      if (this.isNode(node)) {
        this.markNode(node);
      }
    }
  }

  private markNode(node: NodeInterface): void {
    node.marked = true;
    node.color = Color.Black;
    const coordinates = node.coordinates;

    // propagate walled status
    if (
      this.isWallAdjacent(coordinates) ||
      this.wallingNeigbhors(coordinates).length > 0
    ) {
      this.wallNeigbhors(coordinates);
    }

    // pick graph ID to propagate
    const adjacent = this.vertexNeigbhors(coordinates).filter(n => n.marked);
    if (adjacent.length) {
      const graphID = adjacent[0].id;

      // propagate same id to indicate graph connectivity
      this.propagateId(coordinates, graphID);
    }
  }

  private propagateId(coordinates: number[], graphID: number): void {
    const node = this.board.nodeAt(coordinates);
    if (this.isNode(node)) {
      node.id = graphID;
      const adjacent = this.vertexNeigbhors(coordinates).filter(
        n => n.marked && n.id !== graphID,
      );

      if (adjacent.length) {
        adjacent.map(currNode =>
          this.propagateId(currNode.coordinates, graphID),
        );
      }
    }
  }

  private wallNeigbhors(nodeLoc: number[]): void {
    const node = this.board.nodeAt(nodeLoc);
    if (this.isNode(node)) {
      node.walled = true;
    }

    this.vertexNeigbhors(nodeLoc)
      .filter(n => n.marked)
      .map(n => {
        if (!n.walled) {
          n.walled = true;
          this.wallNeigbhors(n.coordinates);
        }
      });
  }

  private canBeMarked(coordinates: number[]): boolean {
    return (
      !this.hasMarkedNeigbhors(coordinates) &&
      !this.isWalling(coordinates) &&
      this.uniqueIDNeigbhors(coordinates) &&
      Math.random() > 0.5
    );
  }

  private isWallAdjacent([x, y]: number[]): boolean {
    return (
      x === 0 ||
      x === this.board.size - 1 ||
      y === 0 ||
      y === this.board.size - 1
    );
  }

  private vertexNeigbhors([x, y]: number[]): NodeInterface[] {
    return [[x + 1, y + 1], [x - 1, y - 1], [x + 1, y - 1], [x - 1, y + 1]]
      .map(el => this.board.nodeAt(el))
      .filter(this.isNode)
      .sort((a, b) => {
        const xDiff = a.coordinates[0] - b.coordinates[0];
        const yDiff = a.coordinates[1] - b.coordinates[1];

        return xDiff || yDiff;
      });
  }

  private uniqueIDNeigbhors(coordinates: number[]): boolean {
    const vertexAdjacent = this.vertexNeigbhors(coordinates);
    return (
      vertexAdjacent
        .map(el => el.id)
        .filter((val, index, s) => s.indexOf(val) === index).length ===
      vertexAdjacent.length
    );
  }

  private wallingNeigbhors(coordinates: number[]): NodeInterface[] {
    return this.vertexNeigbhors(coordinates).filter(el => el.walled);
  }

  private isWalling(coordinates: number[]): boolean {
    const wallingNeigbhorCount = this.wallingNeigbhors(coordinates).length;
    return (
      wallingNeigbhorCount >= 2 ||
      (this.isWallAdjacent(coordinates) && wallingNeigbhorCount > 0)
    );
  }

  private hasMarkedNeigbhors([x, y]: number[]): boolean {
    return [[x + 1, y], [x - 1, y], [x, y - 1], [x, y + 1]]
      .map(el => {
        return this.board.nodeAt(el);
      })
      .filter(this.isNode)
      .some(el => el.marked);
  }

  private getUnmarkedNodes(): NodeInterface[] {
    return Array.from(this.board.state.values()).filter(
      el => this.isNode(el) && !el.marked,
    );
  }

  private isNode(maybeNode: NodeInterface | void): maybeNode is NodeInterface {
    return <NodeInterface>maybeNode !== undefined;
  }
}
