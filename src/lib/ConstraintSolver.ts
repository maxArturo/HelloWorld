import { BoardInterface } from './Board';
import ConstraintMatrix, {
  ConstraintMatrixInterface,
} from './ConstraintMatrix';
import ConstraintNode, { ConstraintRowInterface } from './ConstraintNode';
import { ConstraintColumnInterface } from './ConstraintColumn';

/**
 * @class ConstraintSolver implements the Algorithm X, relying on a data structure
 * with methods applying to DLX. https://en.wikipedia.org/wiki/Dancing_Links
 */
export default class ConstraintSolver {
  private constraintMatrix: ConstraintMatrixInterface;

  constructor(board: BoardInterface) {
    this.constraintMatrix = new ConstraintMatrix(board);

    this.constraintMatrix.generateMatrix();
    this.generateSolution();
  }

  private generateSolution(): void {
    const solution = this.solveNextConstraint();
    console.log('printing solver solution:', solution);
  }

  private solveNextConstraint(
    currSolution: ConstraintRowInterface[] = [],
    depth = 0,
  ): ConstraintRowInterface[] {
    if (this.constraintMatrix.main.right === this.constraintMatrix.main) {
      // if no unsolved constraints remain (no columns to the right of header) return
      return currSolution;
    }
    let nextConstraint = this.getLowestCol();

    if (nextConstraint !== null) {
      this.coverColumn(nextConstraint);
      let nextRow = nextConstraint.down;
      while (nextRow !== nextConstraint) {
        // add row to our solution
        currSolution.push(nextRow as ConstraintRowInterface);

        // cover each column that is satisfied by row
        let rightRow = nextRow.right as ConstraintRowInterface;
        while (rightRow !== nextRow) {
          this.coverColumn(rightRow.column);
          rightRow = rightRow.right as ConstraintRowInterface;
        }
        // search recursively

        const result = this.solveNextConstraint(currSolution, depth + 1);
        if (result.length) {
          return result;
        }
        // solution not found; pop latest row and use its column
        nextRow = currSolution.pop() as ConstraintRowInterface;
        nextConstraint = (nextRow as ConstraintRowInterface).column;

        // uncover in reverse order
        let leftRow = nextRow.left as ConstraintRowInterface;
        while (leftRow !== nextRow) {
          this.uncoverColumn(leftRow.column);
          leftRow = leftRow.left as ConstraintRowInterface;
        }
        nextRow = nextRow.down;
      }
      this.uncoverColumn(nextConstraint);
    }

    return [];
  }

  /*
   * @function getLowestCol() gets the matrix column with the lowest number of associated rows.
   * If there are no columns, it returns null. If there are two or more nodes with the same number of rows,
   * it returns the column closest to the right of the head node.
   */
  private getLowestCol(): ConstraintColumnInterface | null {
    if (this.constraintMatrix.main.right === this.constraintMatrix.main) {
      return null;
    }

    let smallestNumCol = this.constraintMatrix.main.right;
    let nextCol = smallestNumCol.right;

    while (nextCol !== this.constraintMatrix.main) {
      if (smallestNumCol.count > nextCol.count) {
        smallestNumCol = nextCol;
      }
      nextCol = nextCol.right;
    }

    return smallestNumCol;
  }

  /*
   * @function coverColumn() implements the reversible "covering" of a column, as described here:
   * http://garethrees.org/2007/06/10/zendoku-generation/#section-4.3
   */
  private coverColumn(column: ConstraintColumnInterface): void {
    column.right.left = column.left;
    column.left.right = column.right;
    let node = column.down;
    while (node !== column) {
      let rightNode = node.right;
      while (node !== rightNode) {
        rightNode.down.up = rightNode.up;
        rightNode.up.down = rightNode.down;
        (rightNode as ConstraintRowInterface).column.count--;
        rightNode = rightNode.right;
      }
      node = node.down;
    }
  }

  /*
   * @function uncoverColumn() implements the reversible "uncovering" of a column, as described here:
   * http://garethrees.org/2007/06/10/zendoku-generation/#section-4.3
   */
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
