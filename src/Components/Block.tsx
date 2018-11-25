import * as React from 'react';
import Color from '../lib/Color';
import './Block.css';

export interface BlockPropsInterface {
  color: Color;
  coordinates: number[];
  value: string;
  onClick: () => void;
}

export interface BlockStateInterface {
  selected: boolean;
}

export default class Block extends React.Component<
  BlockPropsInterface,
  BlockStateInterface
> {
  constructor(props: BlockPropsInterface) {
    super(props);
    this.state = { selected: false };
  }

  render() {
    return (
      <div
        className="board-block"
        style={{
          backgroundColor: this.state.selected ? Color.Black : Color.White,
        }}
        onClick={() => {
          this.setState({ selected: !this.state.selected });
          this.props.onClick();
        }}
      >
        <div className="block-number">{this.props.value}</div>
      </div>
    );
  }
}
