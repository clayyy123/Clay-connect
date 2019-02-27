import React, { Component } from 'react';
import Slot from '../components/slot';
import Head from './IO-Test';
import io from 'socket.io-client';
const socket = io('https://clay-connect.herokuapp.com/');

class Board extends Component {
  state = {
    grid: Array(7)
      .fill('white')
      .map(row => Array(6).fill('white')),
    players: { Red: '', Yellow: '' },
    player: { name: '', code: '' },
    currentPlayer: 'Red',
    message: '',
    gameOn: false
  };

  componentDidMount() {
    socket.on('new', function(data) {
      // console.log(data);
    });

    socket.on(
      'board',
      function(data) {
        // console.log(data);
        this.setState({
          grid: data.grid,
          currentPlayer: data.currentPlayer,
          gameOn: data.gameOn,
          message: data.message
        });
      }.bind(this)
    );

    socket.on(
      'users',
      function(data) {
        // console.log(data);
        if (data) {
          this.setState({
            players: {
              Red: data.player1,
              Yellow: data.player2 ? data.player2 : ''
            }
          });
        }
      }.bind(this)
    );

    socket.on(
      'info',
      function(data) {
        if (data) {
          // console.log(data);
          this.setState({
            currentPlayer: data.currentPlayer
          });
        }
      }.bind(this)
    );

    socket.on(
      'winning player',
      function(data) {
        // console.log(data);
        this.setState({
          message: data.message
        });
      }.bind(this)
    );
  }

  socketHandler() {
    socket.emit('user-info', this.state.player);
  }

  changeHandler(e) {
    this.setState({
      player: {
        ...this.state.player,
        [e.target.name]: e.target.value
      }
    });
  }

  render() {
    return (
      <div className="game">
        <Head
          players={this.state.players}
          newGame={this.newGame.bind(this)}
          current={this.state.currentPlayer}
          socket={this.socketHandler.bind(this)}
          gameOn={this.state.gameOn}
          change={this.changeHandler.bind(this)}
          player={this.state.player}
        />
        <div className="board">
          {this.state.grid.map((row, i) => {
            return (
              <div
                column={i}
                onMouseDown={this.checkBelow.bind(this)}
                className="board__column"
              >
                {row.map((slot, index) => {
                  return (
                    <Slot
                      color={slot}
                      column={i}
                      row={index}
                      current={this.state.currentPlayer}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <h1 className="game__message">{this.state.message}</h1>
      </div>
    );
  }

  turnHandler() {
    if (this.state.gameOn) {
      if (this.state.currentPlayer === this.state.players[0].player) {
        this.setState({
          currentPlayer: this.state.players[1].player
        });
      } else if (this.state.currentPlayer === this.state.players[1].player) {
        this.setState({
          currentPlayer: this.state.players[0].player
        });
      }
    }
  }

  newGame() {
    this.setState(
      {
        currentPlayer: 'Red',
        grid: Array(7)
          .fill('white')
          .map(row => Array(6).fill('white')),
        message: '',
        gameOn: true
      },
      () => {
        socket.emit('state', this.state);
      }
    );
  }

  checkVertically(e) {
    const { value } = e.currentTarget.attributes.column;
    const { children } = e.currentTarget;
    let column = value;
    let newGrid = [...this.state.grid];
    for (var i = children.length - 1; i >= 3; i--) {
      if (
        newGrid[column][i] === this.state.currentPlayer &&
        newGrid[column][i - 1] === this.state.currentPlayer &&
        newGrid[column][i - 2] === this.state.currentPlayer &&
        newGrid[column][i - 3] === this.state.currentPlayer
      ) {
        this.setState(
          {
            message: `${this.state.players[this.state.currentPlayer]} wins!`,
            currentPlayer: null,
            gameOn: false
          },
          () => {
            socket.emit('winner', this.state);
          }
        );
      }
    }
  }

  checkHorizontally(grid, row) {
    let currentGrid = grid;
    for (let i = 0; i < 4; i++) {
      if (
        currentGrid[i][row] === this.state.currentPlayer &&
        currentGrid[i + 1][row] === this.state.currentPlayer &&
        currentGrid[i + 2][row] === this.state.currentPlayer &&
        currentGrid[i + 3][row] === this.state.currentPlayer
      ) {
        return this.setState(
          {
            message: `${this.state.players[this.state.currentPlayer]} wins!`,
            currentPlayer: null,
            gameOn: false
          },
          () => {
            socket.emit('winner', this.state);
          }
        );
      }
    }
  }

  checkRightUp(grid, col, row) {
    const { currentPlayer } = this.state;
    let colStack = [];
    let rowStack = [];
    let runLoop = true;
    let winCount = 0;
    let direction = true;
    while (runLoop) {
      if (col <= -1 || row >= 6) {
        runLoop = false;
        // console.log('first');
      } else if (col > 6 || (grid[col][row] !== currentPlayer && direction)) {
        direction = false;
        col = colStack[0];
        row = rowStack[0];
        col = col - 1;
        row = row + 1;
        // console.log('second');
      } else if (grid[col][row] === currentPlayer && direction) {
        winCount++;
        rowStack.push(row);
        colStack.push(col);
        col++;
        row--;
        // console.log('third');
      } else if (grid[col][row] === currentPlayer && !direction) {
        winCount++;
        col--;
        row++;
        // console.log('fourth');
      } else {
        runLoop = false;
        // console.log('last');
      }
    }
    // console.log(winCount);
    if (winCount >= 4) {
      return this.setState(
        {
          message: `${this.state.players[this.state.currentPlayer]} wins!`,
          currentPlayer: null,
          gameOn: false
        },
        () => {
          socket.emit('winner', this.state);
        }
      );
    }
  }

  checkRightDown(grid, col, row) {
    const { currentPlayer } = this.state;
    let colStack = [];
    let rowStack = [];
    let runLoop = true;
    let winCount = 0;
    let direction = true;
    while (runLoop) {
      if (col <= -1 || row <= -1) {
        runLoop = false;
        // console.log('first');
      } else if (col > 6 || (grid[col][row] !== currentPlayer && direction)) {
        direction = false;
        col = colStack[0];
        row = rowStack[0];
        col = col - 1;
        row = row - 1;
        // console.log('second');
      } else if (grid[col][row] === currentPlayer && direction) {
        winCount++;
        rowStack.push(row);
        colStack.push(col);
        col++;
        row++;
        // console.log('third');
      } else if (grid[col][row] === currentPlayer && !direction) {
        winCount++;
        col--;
        row--;
        // console.log('fourth');
      } else {
        runLoop = false;
        // console.log('last');
      }
    }
    // console.log(winCount);
    if (winCount >= 4) {
      return this.setState(
        {
          message: `${this.state.players[this.state.currentPlayer]} wins!`,
          currentPlayer: null,
          gameOn: false
        },
        () => {
          socket.emit('winner', this.state);
        }
      );
    }
  }

  checkBelow(e) {
    const { value } = e.currentTarget.attributes.column;
    const { children } = e.currentTarget;
    let column = parseInt(value);
    let newGrid = [...this.state.grid];
    if (
      this.state.gameOn &&
      this.state.player.name === this.state.players[this.state.currentPlayer]
    ) {
      for (var i = children.length - 1; i >= 0; i--) {
        let color = children[i].className.split(' ')[1];
        if (color === 'white') {
          newGrid[column][i] = this.state.currentPlayer;
          this.checkVertically(e);
          this.checkHorizontally(newGrid, i);
          this.checkRightUp(newGrid, column, i);
          this.checkRightDown(newGrid, column, i);
          return this.setState(
            {
              grid: newGrid,
              currentPlayer:
                this.state.currentPlayer === 'Red' ? 'Yellow' : 'Red'
            },
            () => {
              socket.emit('state', this.state);
            }
          );
        }
      }
    }
  }
}

export default Board;
