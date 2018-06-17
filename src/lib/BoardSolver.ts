import { BoardInterface } from './Board';
import { NodeInterface } from './Node';

import * as lodash from 'lodash';

export default class BoardSolver {
  public board: BoardInterface;
  private cols: string[][];
  private rows: string[][];
  private availableValues: string[];
  private unmarkedNodes: NodeInterface[];

  constructor(newBoard: BoardInterface) {
    this.board = newBoard;
    this.availableValues = new Array(this.board.size)
      .fill(0)
      .map((_, i) => i.toString(10));

    this.cols = this.rows = this.availableValues.map(_ => []);
    this.unmarkedNodes = this.board.getUnmarkedNodes();

    this.solveBoard();
  }

  public solveBoard(): boolean {
    // pick a valid node
    // TODO pop a random node out of here
    const node = lodash.sample(this.unmarkedNodes);

    if (!node) {
      // if no nodes left, you're done
      return true;
    }

    // get all possible solution options
    const solOptions = lodash.difference(
      this.availableValues,
      lodash.union(this.cols[node.x], this.rows[node.y]),
    );

    if (!solOptions.length) {
      // no solution possible
      return false;
    }

    // pick a valid number for this node
    for (const possibleSolution of solOptions) {
      this.cols[node.x].push(possibleSolution);
      this.cols[node.y].push(possibleSolution);
      // TODO remove this solution from cols and rows; try another solution
      if (!this.solveBoard()) break;
    }

    if (solNumber) {
      // found a solution, update
    }

    return false;
  }
}
