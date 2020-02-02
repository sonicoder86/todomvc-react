import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TodoLocal } from '../services/TodoLocal';
import { withStateAndDispatch } from '../store/container';
import { HeaderContainer } from './Header';
import { ListContainer } from './List';
import { FooterContainer } from './Footer';
import { CopyRight } from './CopyRight';

export class App extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    onLoad: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.onLoad(TodoLocal.loadTodos());
  }

  componentDidUpdate() {
    TodoLocal.storeTodos(this.props.todos);
  }

  render() {
    return (
      <div id="app">
        <section className="todoapp">
          <HeaderContainer />
          {
            !!this.props.todos.length &&
            <ListContainer />
          }
          {
            !!this.props.todos.length &&
            <FooterContainer />
          }
        </section>
        <CopyRight />
      </div>
    );
  }
}

export const AppContainer = withStateAndDispatch(App);
