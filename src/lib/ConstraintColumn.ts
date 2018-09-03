import { ConstraintSolutionNodeInterface } from './ConstraintNode';

export interface ConstraintColumnInterface
  extends ConstraintSolutionNodeInterface {
  count: number;
  main: boolean;
  id: number;
}

export default class ConstraintColumn implements ConstraintColumnInterface {
  public up: ConstraintSolutionNodeInterface;
  public down: ConstraintSolutionNodeInterface;
  public left: ConstraintSolutionNodeInterface;
  public right: ConstraintSolutionNodeInterface;
  public count: number;
  public main: boolean;
  public id: number;

  constructor(id: number, main: boolean = false) {
    this.id = id;
    this.up = this;
    this.down = this;
    this.left = this;
    this.right = this;
    this.count = 0;
    this.main = main;
  }
}
