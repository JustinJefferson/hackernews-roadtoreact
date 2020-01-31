import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render () {
    const helloWorld = 'Time to Start Reacting!';
    return (
      <div className="App">
        <h2>{helloWorld}</h2>
        <p>The world is so reactable!</p>
      </div>
    );
  }
}

export default App;
