import * as React from 'react';
import './Controls.css';

export interface ControlsPropsInterface {
  size: number;
  updateNumber(size: number): void;
}

export default class Controls extends React.Component<
  ControlsPropsInterface,
  {}
> {
  render() {
    return (
      <div className="game-controls">
        <div className="toggles">
          <p>{this.props.size}x</p>
          <button
            onClick={() =>
              this.props.size > 3 &&
              this.changeBoardSize((size: number) => size - 1)
            }
          >
            -
          </button>
          <button
            onClick={() =>
              this.props.size < 18 &&
              this.changeBoardSize((size: number) => size + 1)
            }
          >
            +
          </button>
        </div>
        <div className="controls">
          <button onClick={() => this.props.updateNumber(this.props.size)}>
            start a new board
          </button>
        </div>
        <div>
          <a href="https://en.wikipedia.org/wiki/Hitori" target="_blank">
            what is this even
          </a>
        </div>
      </div>
    );
  }

  changeBoardSize(updateFn: Function) {
    this.props.updateNumber(updateFn(this.props.size));
  }
}
