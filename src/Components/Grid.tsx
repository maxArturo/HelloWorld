import * as React from 'react';
import './Grid.css';
import Board from '../lib/Board';
import Block from '../Components/Block';
import BoardBuilder from '../lib/BoardBuilder';

import { NodeInterface } from '../lib/Node';
import BoardSolver from '../lib/BoardSolver';
export interface GridPropsInterface {
  boardSize: number;
}
export interface GridStateInterface {
  board: Map<String, NodeInterface>;
}

export default class Grid extends React.Component<
  GridPropsInterface,
  GridStateInterface
> {
  private board: Board;
  private boardBuilder: BoardBuilder;
  private runAll = true;

  constructor(props: GridPropsInterface) {
    super(props);
    this.generateSolvedBoard(props.boardSize);
    this.state = {
      board: this.board.state,
    };

    this.fillInNumbers = this.fillInNumbers.bind(this);
  }

  generateSolvedBoard(boardSize: number) {
    this.board = new Board(boardSize);
    this.boardBuilder = new BoardBuilder(this.board);

    if (this.runAll) {
      while (!this.boardBuilder.completed) {
        this.boardBuilder.traverseStep();
      }
    }
  }

  componentWillReceiveProps(nextProps: GridPropsInterface) {
    this.generateSolvedBoard(nextProps.boardSize);
    this.fillInNumbers();
    this.setState({
      board: this.board.state,
    });
  }

  fillInNumbers() {
    new BoardSolver(this.board);
  }

  render() {
    const tiles = Array.from(this.state.board.values());
    const tileArray = Array.from(new Array(this.board.size).keys()).map(el =>
      tiles.splice(0, this.board.size),
    );
    return (
      <div className="board-grid">
        {tileArray.map((row, i) => {
          return (
            <div className="board-row" key={i}>
              {row.map((node, j) => {
                return (
                  <Block
                    color={node.color}
                    coordinates={node.coordinates}
                    value={node.solutionNumber}
                    key={j}
                    onClick={this.fillInNumbers}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
