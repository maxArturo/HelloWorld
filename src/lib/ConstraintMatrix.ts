import { BoardInterface } from './Board';
import { ConstraintColumnInterface } from './ConstraintColumn';

/**
 * @class ConstraintMatrix: Converts a hitori board into a constraint matrix data structure
 * needed for dancing links (https://en.wikipedia.org/wiki/Dancing_Links) to generate a solution.
 */

export interface ConstraintMatrixInterface {
  board: BoardInterface;
  solutionColumns: ConstraintColumnInterface[];
  main: ConstraintColumnInterface;
  generateMatrix(): number[][];
}
export default class ConstraintMatrix {
  public board: BoardInterface;
  public solutionColumns: ConstraintColumnInterface[];
  public main: ConstraintColumnInterface;

  constructor(inputBoard: BoardInterface) {
    this.board = inputBoard;
  }

  public generateMatrix(): number[][] {
    /*
     * We need to represent three types of constraints:
     * Each possible number in each row (n numbers * n rows)
     * Each possible number in each column (n numbers * n columns)
     * Each cell of the board is filled (n * n cells)
     *
     * For each constraint type, we'll represent it as a series of columns in our constraint matrix.
     * We'll have a total of (n ^ 2 * 3) columns.
     */

    // our first-order elements in the matrix will be the row options themselves.
    const matrix = Array(this.board.size ** 3)
      .fill(null)
      .map((_, i) => {
        // add cell constraints
        const cellConstraints = Array(this.board.size ** 2).fill(0);
        const rowConstraints = Array(this.board.size ** 2).fill(0);
        const colConstraints = Array(this.board.size ** 2).fill(0);

        cellConstraints[Math.trunc(i / this.board.size)] = 1;
        rowConstraints[
          (i % this.board.size) +
            Math.trunc(i / this.board.size ** 2) * this.board.size
        ] = 1;
        colConstraints[i % this.board.size ** 2] = 1;

        return cellConstraints.concat(rowConstraints).concat(colConstraints);
      });

    return matrix;
  }
}
