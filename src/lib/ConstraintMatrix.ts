import { BoardInterface } from './Board';
import { ConstraintColumnInterface } from './ConstraintColumn';
import ConstraintColumn from './ConstraintColumn';
import ConstraintNode, { ConstraintRowInterface } from './ConstraintNode';

/**
 * @class ConstraintMatrix: Converts a hitori board into a constraint matrix data structure
 * with dancing links methods (https://en.wikipedia.org/wiki/Dancing_Links) to generate a solution.
 */

export default class ConstraintMatrix {
  public board: BoardInterface;
  public solutionColumns: ConstraintColumnInterface[];
  public main: ConstraintColumnInterface;

  constructor(inputBoard: BoardInterface) {
    this.board = inputBoard;
  }

  public generateMatrix(): void {
    // create constraint column nodes for board columns, rows and no nodes unsolved (n ^ 2 * 3)
    this.solutionColumns = Array(this.board.size ** 2 * 3)
      .fill(0)
      .map(() => new ConstraintColumn());

    // iterate through all board node/number combinations
    for (let num = 0; num < this.board.size; num++) {
      for (let x = 0; x < this.board.size; x++) {
        for (let y = 0; y < this.board.size; y++) {
          const currNode = this.board.nodeAt([x, y]);
          if (currNode) {
            // add for column
            const constraintCol = this.solutionColumns[
              num * this.board.size + x
            ];
            this.appendToColumn(
              constraintCol,
              new ConstraintNode(currNode, num + 1),
            );

            // add for row
            const constraintRow = this.solutionColumns[
              this.board.size ** 2 - 1 + num * this.board.size + y
            ];
            this.appendToColumn(
              constraintRow,
              new ConstraintNode(currNode, num + 1),
            );

            // add for cell. If this cell is marked, we don't care about its constraint (optimization)
            if (!currNode.marked) {
              const constraintCell = this.solutionColumns[
                2 * this.board.size ** 2 - 1 + currNode.id
              ];
              this.appendToColumn(
                constraintCell,
                new ConstraintNode(currNode, num + 1),
              );
            }
          }
        }
      }
    }

    // add a main node, wire it up with the rest of the columns
    this.main = new ConstraintColumn(true);

    this.main.right = this.solutionColumns[0];
    this.main.right.left = this.main;

    this.main.left = this.solutionColumns.slice(-1)[0];
    this.main.left.right = this.main;

    this.solutionColumns.unshift(this.main);
    console.log(this.solutionColumns);
  }

  private appendToColumn(
    colHead: ConstraintColumnInterface,
    node: ConstraintRowInterface,
  ): void {
    const last = colHead.up;
    colHead.up = node;
    node.down = colHead;
    node.up = last;
    last.down = colHead.up;
    colHead.count++;
  }
}
