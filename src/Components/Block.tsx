import * as React from 'react';
import { Color } from '../lib/Board';
import './Block.css';

export interface BlockProps {
  color: Color;
}

export default class Block extends React.Component<BlockProps, {}> {
  render() {
    return (
      <div
        className="board-block"
        style={{backgroundColor: this.props.color}}
      />
    );
  }
}
