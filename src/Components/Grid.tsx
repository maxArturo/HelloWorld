import * as React from 'react';
import './Grid.css';
import Board from '../lib/Board';
import Block from '../Components/Block';
import BoardBuilder from '../lib/BoardBuilder';

import { NodeInterface } from '../lib/Node';

export default class Grid extends React.Component<{}, {board: Map<String, NodeInterface>}> {
  private board: Board;
  private boardBuilder: BoardBuilder;
  private runAll = true;

  constructor() {
    super();
    this.board = new Board(8);
    this.boardBuilder = new BoardBuilder(this.board); 
    this.updateBoard = this.updateBoard.bind(this);

    if (this.runAll) {
      while (!this.boardBuilder.completed) {
        this.boardBuilder.traverseStep();
      }
    }

    this.state = {
      board: this.board.state
    };
  }

  updateBoard() {
    this.boardBuilder.traverseStep();
    this.setState({
      board: this.board.state
    });
  }

  render() {
    const tiles = Array.from(this.state.board.values());
    const tileArray = Array.from(new Array(this.board.size).keys()).map(el => tiles.splice(0, this.board.size));
    return (
      <div className="board-grid">
        {
          tileArray.map((row, i) => {
            return (
              <div className="board-row" key={i}>
                {row.map((node, j) => {
                  return (
                    <Block color={node.color} key={j} onClick={this.updateBoard} />
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
