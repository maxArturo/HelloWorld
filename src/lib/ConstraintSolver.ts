import { BoardInterface } from './Board';
import ConstraintMatrix, {
  ConstraintMatrixInterface,
} from './ConstraintMatrix';
import { sample, shuffle } from 'lodash';

const solver = require('dlxlib');

/**
 * @class ConstraintSolver implements the Algorithm X, relying on a data structure
 * with methods applying to DLX. https://en.wikipedia.org/wiki/Dancing_Links
 */
export default class ConstraintSolver {
  private constraintMatrix: ConstraintMatrixInterface;

  constructor(board: BoardInterface) {
    this.constraintMatrix = new ConstraintMatrix(board);

    const result = this.constraintMatrix.generateMatrix();
    const solution: number[] = sample(solver.solve(result, null, null, 2048));

    const rowColshuffling = [
      shuffle(Array.from(new Array(board.size).keys())),
      shuffle(Array.from(new Array(board.size).keys())),
    ];
    console.log(rowColshuffling);

    solution.map(el => {
      const x = rowColshuffling[0][Math.trunc(el / board.size ** 2)];
      const y = rowColshuffling[1][Math.trunc(el / board.size) % board.size];

      const node = board.nodeAt([x, y]);
      if (node) {
        node.solutionNumber = ((el % board.size) + 1).toString();
      }
    });
  }
}
