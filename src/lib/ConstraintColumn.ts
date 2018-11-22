import { ConstraintSolutionNodeInterface } from './ConstraintNode';

export interface ConstraintColumnInterface
  extends ConstraintSolutionNodeInterface {
  count: number;
  main: boolean;
  id: number;
  left: ConstraintColumnInterface;
  right: ConstraintColumnInterface;
}

export default class ConstraintColumn implements ConstraintColumnInterface {
  public up: ConstraintSolutionNodeInterface;
  public down: ConstraintSolutionNodeInterface;
  public left: ConstraintColumnInterface;
  public right: ConstraintColumnInterface;
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
