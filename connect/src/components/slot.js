import React, { Component } from 'react';

class Slot extends Component {
  state = {
    color: this.props.color,
    methods: {
      turn: null
    }
  };

  componentDidMount() {
    this.setState({
      methods: {
        turn: this.props.turn
      }
    });
  }

  render() {
    const classColor = this.props.color;
    const classes = `board__slot ${classColor}`;
    return <div row={this.props.row} className={classes} />;
  }
}

export default Slot;
