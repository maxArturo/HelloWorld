import { ConstraintSolutionNodeInterface } from './ConstraintNode';

export interface ConstraintColumnInterface
  extends ConstraintSolutionNodeInterface {
  count: number;
  main: boolean;
}

export default class ConstraintColumn implements ConstraintColumnInterface {
  public up: ConstraintSolutionNodeInterface;
  public down: ConstraintSolutionNodeInterface;
  public left: ConstraintSolutionNodeInterface;
  public right: ConstraintSolutionNodeInterface;
  public count: number;
  public main: boolean;

  constructor(main: boolean = false) {
    this.up = this;
    this.down = this;
    this.left = this;
    this.right = this;
    this.count = 0;
    this.main = main;
  }
}
