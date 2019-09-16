import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { selectVisible } from '../selectors/Todo';
import { TodoLocal } from '../services/TodoLocal';
import { ListContainer, FooterContainer, HeaderContainer } from '../containers';

export class App extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    filter: PropTypes.string.isRequired,
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
      <section className="todoapp">
        <HeaderContainer />
        {
          !!this.props.todos.length &&
          <ListContainer todos={selectVisible(this.props.todos, this.props.filter)} />
        }
        {
          !!this.props.todos.length &&
          <FooterContainer todos={this.props.todos} filter={this.props.filter} />
        }
      </section>
    );
  }
}
