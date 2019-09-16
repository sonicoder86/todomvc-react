import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ENTER_KEY = 13;

export class Header extends Component {
  static propTypes = {
    onCreate: PropTypes.func.isRequired
  };

  state = {
    name: ''
  };

  handleChange(event) {
    this.setState({ name: event.target.value });
  };

  handleSubmit(event) {
    if (event.which === ENTER_KEY) {
      this.props.onCreate(this.state.name);
      this.setState({ name: '' });
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus={true}
          value={this.state.name}
          onChange={(e) => this.handleChange(e)}
          onKeyDown={(e) => this.handleSubmit(e)}
        />
      </header>
    );
  }
}
