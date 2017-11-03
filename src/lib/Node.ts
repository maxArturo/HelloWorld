import Color from './Color';

export interface NodeInterface {
  touching: boolean;
  visited: boolean;
  color: Color;
  text: String;
}

export default class Node implements NodeInterface {
  public touching: boolean;
  public visited: boolean;
  public text: String;
  constructor(public color: Color) {}
}
