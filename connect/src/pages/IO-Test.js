import React, { Component } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:3001');

class Head extends Component {
  state = {
    display: true
  };

  submitHandler(e) {
    e.preventDefault();
    this.props.socket();
    this.setState({
      display: false
    });
  }

  render() {
    return (
      <div className="header">
        <h1 className="header__title">CONNECT 4</h1>
        <div className="display">
          <div className="display__player-info">
            <div className="display__player">
              Player 1<div className="display__player-color Cream" />
            </div>
            <h2 className="display__name">{this.props.players['Cream']}</h2>
          </div>
          <div className="display__center">
            <h1 className="display__message">{this.messageHandler()}</h1>
            {this.state.display ? (
              <form onSubmit={this.submitHandler.bind(this)}>
                <input
                  onChange={this.props.change}
                  name="name"
                  placeholder="enter name"
                  value={this.props.player.name}
                  className="form__input"
                />
                <input
                  onChange={this.props.change}
                  name="code"
                  placeholder="enter codename"
                  value={this.props.player.code}
                  className="form__input"
                />
                <button type="submit" className="form__button">
                  submit
                </button>
              </form>
            ) : (
              <div className="display__filler" />
            )}
          </div>

          <div className="display__player-info">
            <div className="display__player">
              Player 2<div className="display__player-color Black" />
            </div>

            <h2 className="display__name">{this.props.players['Black']}</h2>
          </div>
        </div>
      </div>
    );
  }

  messageHandler() {
    if (!this.props.players['Cream'] || !this.props.players['Black']) {
      return 'Waiting for players...';
    } else if (
      this.props.players['Cream'] === this.props.player.name &&
      !this.props.gameOn
    ) {
      return (
        <button className="form__button" onClick={this.props.newGame}>
          New Game
        </button>
      );
    } else if (
      this.props.players['Cream'] !== this.props.player.name &&
      !this.props.gameOn
    ) {
      return `Waiting for ${this.props.players['Cream']}`;
    } else if (
      this.props.player.name === this.props.players[this.props.current]
    ) {
      return "It's Your Turn";
    } else if (
      this.props.player.name !== this.props.players[this.props.current]
    ) {
      return `Waiting for ${this.props.players[this.props.current]}`;
    }
  }
}

export default Head;
