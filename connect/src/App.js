import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Board from './pages/main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            path="/"
            render={props => {
              return <Board prop={props} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
