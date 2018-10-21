import lodash from 'lodash';

import { BoardInterface } from './Board';
import ConstraintMatrix, {
  ConstraintMatrixInterface,
} from './ConstraintMatrix';
import ConstraintNode, {
  ConstraintSolutionNodeInterface,
} from './ConstraintNode';
import ConstraintColumn, {
  ConstraintColumnInterface,
} from './ConstraintColumn';

/**
 * @class ConstraintSolver implements the Algorithm X, relying on a data structure
 * with methods applying to DLX. https://en.wikipedia.org/wiki/Dancing_Links
 */
export default class ConstraintSolver {
  private constraintMatrix: ConstraintMatrixInterface;

  constructor(board: BoardInterface) {
    this.constraintMatrix = new ConstraintMatrix(board);
    this.generateSolution();
  }

  private generateSolution(): void {
    //
  }

  private solveNextConstraint(
    matrix: ConstraintMatrixInterface,
    currSolution: ConstraintSolutionNodeInterface[] = [],
  ): ConstraintSolutionNodeInterface[] {
    if ((matrix.main.right as ConstraintColumnInterface).main) {
      return currSolution;
    }

    // if you get an answer, return your results
    // otherwise return empty
  }

  private getLowestCol(): ConstraintColumnInterface | null {
    if ((this.constraintMatrix.main.right as ConstraintColumnInterface).main) {
      return null;
    }
  }

  private coverColumn(column: ConstraintColumnInterface): void {
    column.right.left = column.left;
    column.left.right = column.right;
    let node = column.down;
    while (node !== column) {
      let rightNode = node.right;
      while (node !== rightNode) {
        rightNode.down.up = rightNode.up;
        rightNode.up.down = rightNode.down;
        (rightNode as ConstraintNode).column.count--;
        rightNode = rightNode.right;
      }
      node = node.down;
    }
  }

  private uncoverColumn(column: ConstraintColumnInterface): void {
    let node = column.up;
    while (node !== column) {
      let leftNode = node.left;
      while (leftNode !== node) {
        (leftNode as ConstraintNode).column.count++;
        leftNode.down.up = leftNode;
        leftNode.up.down = leftNode;
        leftNode = leftNode.left;
      }
      node = node.up;
    }
    column.right.left = column;
    column.left.right = column;
  }
}
