import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStateAndDispatch } from '../store/container';
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
    if (event.which !== ENTER_KEY) {
      return;
    }

    this.props.onCreate(this.state.name);
    this.setState({ name: '' });
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.name}
          onInput={e => this.handleChange(e)}
          onKeyUp={e => this.handleSubmit(e)}
        />
      </header>
    );
  }
}

export const HeaderContainer = withStateAndDispatch(Header);
