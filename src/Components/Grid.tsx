import * as React from 'react';
import './Grid.css';
import * as Board from '../lib/Board';
import Block from '../Components/Block';

export default class Grid extends React.Component<{}, {}> {
  private board: Board.Board;

  constructor() {
    super();
    this.board = new Board.Board(6);
  }

  render() {
    return (
      <div className="board-grid">
        {
          this.board.state.map((row, i) => {
            return (
              <div className="board-row" key={i}>
                {row.map((node, j) => {
                  return (
                    <Block color={node.color} key={j} />
                  );
                })}
              </div>
            );
          })
        }
      </div>
    );
  }
}
