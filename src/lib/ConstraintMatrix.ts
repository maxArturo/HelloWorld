import { BoardInterface } from './Board';
import { ConstraintColumnInterface } from './ConstraintColumn';
import ConstraintColumn from './ConstraintColumn';
import ConstraintNode, { ConstraintRowInterface } from './ConstraintNode';

/**
 * @class ConstraintMatrix: Converts a hitori board into a constraint matrix data structure
 * needed for dancing links (https://en.wikipedia.org/wiki/Dancing_Links) to generate a solution.
 */

export interface ConstraintMatrixInterface {
  board: BoardInterface;
  solutionColumns: ConstraintColumnInterface[];
  main: ConstraintColumnInterface;
  generateMatrix(): void;
}
export default class ConstraintMatrix {
  public board: BoardInterface;
  public solutionColumns: ConstraintColumnInterface[];
  public main: ConstraintColumnInterface;

  constructor(inputBoard: BoardInterface) {
    this.board = inputBoard;
  }

  public generateMatrix(): void {
    /*
     * We need to represent three types of constraints:
     * Each possible number in each row (n numbers * n rows)
     * Each possible number in each column (n numbers * n columns)
     * Each cell of the board is filled (n * n cells)
     *
     * For each constraint type, we'll represent it as a series of columns in our constraint matrix.
     * We'll have a total of (n ^ 2 * 3) columns.
     */
    this.solutionColumns = Array(this.board.size ** 2 * 3)
      .fill(0)
      .map((_, i) => new ConstraintColumn(i))
      .map((el, i, arr) => {
        // create links to left, right col nodes
        const nextEl = arr[(i + 1) % arr.length];
        el.right = nextEl;
        nextEl.left = el;
        return el;
      });

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
            const constraintColNode = new ConstraintNode(currNode, num + 1);
            constraintColNode.label = `column constraint: no:${num +
              1} at coordinates(${x}, ${y}) column_id: ${constraintCol.id}`;
            constraintColNode.column = constraintCol;
            this.appendToColumn(constraintCol, constraintColNode);

            // add for row
            const constraintRow = this.solutionColumns[
              this.board.size ** 2 + num * this.board.size + y
            ];
            const constraintRowNode = new ConstraintNode(currNode, num + 1);
            constraintRowNode.label = `row constraint: no:${num +
              1} at coordinates(${x}, ${y}) column_id: ${constraintRow.id}`;
            constraintRowNode.column = constraintRow;
            this.appendToColumn(constraintRow, constraintRowNode);

            constraintColNode.right = constraintRowNode;
            constraintRowNode.left = constraintColNode;

            // add for cell. If this cell is marked, we don't care about its constraint (optimization)
            if (!currNode.marked) {
              const constraintCell = this.solutionColumns[
                2 * this.board.size ** 2 + currNode.id
              ];
              const constraintCellNode = new ConstraintNode(currNode, num + 1);
              constraintCellNode.label = `cell constraint: no:${num +
                1} at coords(${x}, ${y}) column_id:${constraintCell.id}`;
              constraintCellNode.column = constraintCell;
              this.appendToColumn(constraintCell, constraintCellNode);

              constraintRowNode.right = constraintCellNode;
              constraintCellNode.left = constraintRowNode;
              constraintCellNode.right = constraintColNode;
              constraintColNode.left = constraintCellNode;
            } else {
              constraintColNode.left = constraintRowNode;
              constraintRowNode.right = constraintColNode;
            }
          }
        }
      }
    }

    this.addMainNode();
    this.filterUnusedCols();
    // this.printConstraintMap();
  }

  private filterUnusedCols(): void {
    let currCol = this.main.right;
    while (currCol !== this.main) {
      if (!currCol.count) {
        currCol.left.right = currCol.right;
        currCol.right.left = currCol.left;
      }
      currCol = currCol.right;
    }
  }

  public printConstraintMap(): void {
    let currCol: ConstraintColumnInterface = this.main
      .right as ConstraintColumnInterface;

    while (!currCol.main) {
      const nodeContents = [];

      let currNode = currCol.down as ConstraintRowInterface;
      while (currNode.node) {
        nodeContents.push(
          `solution ${currNode.solutionNumber} at [${
            currNode.node.coordinates
          }]`,
        );
        currNode = currNode.down as ConstraintRowInterface;
      }

      console.log(`constraint col ${currCol.id}: ${nodeContents.join(', ')}`);
      currCol = currCol.right as ConstraintColumnInterface;
    }
  }

  private addMainNode(): void {
    // add a main node, wire it up with the rest of the columns
    this.main = new ConstraintColumn(-1, true);

    this.main.right = this.solutionColumns[0];
    this.main.right.left = this.main;

    this.main.left = this.solutionColumns.slice(-1)[0];
    this.main.left.right = this.main;

    this.solutionColumns.unshift(this.main);
  }

  private appendToColumn(
    colHead: ConstraintColumnInterface,
    node: ConstraintRowInterface,
  ): void {
    if (colHead.count) {
      const last = colHead.up;
      colHead.up = node;
      node.down = colHead;
      node.up = last;
      last.down = colHead.up;
    } else {
      colHead.up = colHead.down = node;
      node.up = node.down = colHead;
    }

    colHead.count++;
  }
}
