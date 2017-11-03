import { BoardInterface } from './Board';
import { getRandomBinary } from '../util/random';

/*
 * The BoardBuilder class is in charge of the construction
 * and solution of a 
 */
export default class BoardBuilder {
  private board: BoardInterface;
  private traverseIndex: number[];
  private completed: boolean;

  constructor(newBoard: BoardInterface) {
    this.board = newBoard;
    this.traverseIndex = [0, 0];
  }

  public traverseStep() {
    if (!this.completed) {
      this.markNode(); 
      this.setNextIndex();
      if (getRandomBinary()) {
        this.setNextIndex(); 
      }
    }
  }

  private markNode() {
    const board = this.board;
    const currNode = board.nodeAt(this.traverseIndex);
    // const touching = board.isWallAdjacent(this.traverseIndex);

    // if (touching) {
    //   currNode.touching = true;
    // }

    const adjacents = board.getAdjacentVertexNodeCoordinates(this.traverseIndex);

  }

  private setNextIndex() {
    const board = this.board;

    if (!this.completed) {
      const idx = this.traverseIndex;
      // mark current node as visited
      board[idx[0]][idx[1]].visited = true;

      const nextRow = (idx[0] + 1) % this.board.size;
      idx[0] = nextRow;

      // move to the next row if needed
      if (nextRow === 0) {
        idx[1]++;
      }

      if (idx[1] >= this.board.size) {
        this.completed = true;
        return;
      }

      console.log(`this is the current index: ${this.traverseIndex}`);
      this.traverseIndex = idx;
    }
  }
}