import * as React from 'react';
import './Grid.css';
import Board from '../lib/Board';
import Block from '../Components/Block';
import BoardBuilder from '../lib/BoardBuilder';

export default class Grid extends React.Component<{}, {}> {
  private board: Board;
  private boardBuilder: BoardBuilder;

  constructor() {
    super();
    this.board = new Board(3);
    this.boardBuilder = new BoardBuilder(this.board); 
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
                    <Block color={node.color} key={j} onClick={() => {this.boardBuilder.traverseStep(); }} />
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
