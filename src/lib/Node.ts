import Color from './Color';

export interface NodeInterface {
  walled: boolean;
  visited: boolean;
  marked: boolean;
  color: Color;
  text: String;
}

export default class Node implements NodeInterface {
  public walled: boolean;
  public visited: boolean;
  public marked: boolean;
  public text: String;
  constructor(public color: Color) {}
}
