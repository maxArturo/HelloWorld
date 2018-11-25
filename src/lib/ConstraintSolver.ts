import { BoardInterface } from './Board';
import ConstraintMatrix, {
  ConstraintMatrixInterface,
} from './ConstraintMatrix';
import { sample, shuffle } from 'lodash';
import { NodeInterface } from './Node';

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

    const markedNodes: NodeInterface[] = [];
    solution.map(el => {
      const x = rowColshuffling[0][Math.trunc(el / board.size ** 2)];
      const y = rowColshuffling[1][Math.trunc(el / board.size) % board.size];

      const node = board.nodeAt([x, y]);
      if (node) {
        if (node.marked) {
          markedNodes.push(node);
        } else {
          node.solutionNumber = ((el % board.size) + 1).toString();
        }
      }
    });

    markedNodes.map(node => {
      const repeatedSolution = sample(
        board
          .getUnmarkedRowNodes(node.x)
          .concat(board.getUnmarkedColumnNodes(node.y)),
      );

      if (repeatedSolution) {
        node.solutionNumber = repeatedSolution.solutionNumber;
      }
    });
  }
}
