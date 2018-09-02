import * as React from 'react';
import Color from '../lib/Color';
import './Block.css';

export interface BlockProps {
  color: Color;
  coordinates: number[];
  value: string;
  onClick: () => void;
}

export default class Block extends React.Component<BlockProps, {}> {
  constructor(props: BlockProps) {
    super(props);
  }

  render() {
    return (
      <div
        className="board-block"
        style={{ backgroundColor: this.props.color }}
        onClick={this.props.onClick}
      >
        {this.props.value}
      </div>
    );
  }
}
