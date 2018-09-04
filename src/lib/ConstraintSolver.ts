import lodash from 'lodash';

import { BoardInterface } from './Board';
import ConstraintMatrix, {
  ConstraintMatrixInterface,
} from './ConstraintMatrix';
import { ConstraintSolutionNodeInterface } from './ConstraintNode';
import { ConstraintColumnInterface } from './ConstraintColumn';

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
}
