import * as React from 'react';
import Grid from './Components/Grid';
import './App.css';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Jibun</h2>
        </div>
        <Grid />
      </div>
    );
  }
}

export default App;
