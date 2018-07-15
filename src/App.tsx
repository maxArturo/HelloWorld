import * as React from 'react';
import Grid from './Components/Grid';
import Controls from './Components/Controls';
import './App.css';

interface AppStateInterface {
  gridSize: number;
}

class App extends React.Component<{}, AppStateInterface> {
  constructor() {
    super();
    this.state = {
      gridSize: 9,
    };
    this.updateGridSize = this.updateGridSize.bind(this);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>自分</h2>
          <Controls
            size={this.state.gridSize}
            updateNumber={this.updateGridSize}
          />
        </div>
        <Grid boardSize={this.state.gridSize} />
      </div>
    );
  }

  updateGridSize(size: number) {
    this.setState({
      gridSize: size,
    });
  }
}

export default App;
