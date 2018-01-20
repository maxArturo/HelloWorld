import Color from './Color';

export interface NodeInterface {
  walled: boolean;
  visited: boolean;
  marked: boolean;
  id: number;
  color: Color;
  text: String;
  coordinates: number[];
}

export default class Node implements NodeInterface {
  public walled: boolean;
  public visited: boolean;
  public marked: boolean;
  public text: String;
  public coordinates: number[];
  public id: number;
  constructor(public color: Color) {}
}
