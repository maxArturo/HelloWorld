import { BoardInterface } from './Board';
import { NodeInterface } from './Node';

import * as lodash from 'lodash';

export default class BoardSolver {
  public board: BoardInterface;
  private cols: string[][];
  private rows: string[][];
  private availableValues: string[];

  constructor(newBoard: BoardInterface) {
    this.board = newBoard;
    this.availableValues = new Array(this.board.size)
      .fill(0)
      .map((_, i) => i.toString(10));

    this.cols = this.availableValues.map(_ => []);
    this.rows = this.availableValues.map(_ => []);

    console.log(new Date(), 'starting');
    this.solveBoard(this.board.getUnSolvedNodes());
    console.log(new Date(), 'ended');
  }

  public solveBoard(nodes: NodeInterface[]): boolean {
    if (!nodes.length) {
      // if no nodes left, you're done
      return true;
    }

    for (const node of nodes) {
      // get all possible solution options
      const solOptions = lodash.difference(
        this.availableValues,
        lodash.union(this.rows[node.x], this.cols[node.y]),
      );

      if (!solOptions.length) {
        // no solution possible
        return false;
      }

      // pick a valid number for this node
      for (const possibleSolution of lodash.shuffle(solOptions)) {
        // mark the node, add it to the list of cols and rows
        this.rows[node.x].push(possibleSolution);
        this.cols[node.y].push(possibleSolution);
        node.solutionNumber = possibleSolution;

        // get a new array without

        if (this.solveBoard(lodash.differenceBy(nodes, [node], el => el.id))) {
          return true;
        }

        // unmark the node, remove from cols and rows
        this.rows[node.x].pop();
        this.cols[node.y].pop();
        node.solutionNumber = '';
      }
    }

    return false;
  }
}
