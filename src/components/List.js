import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item } from './Item';

export class List extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCompleteAll: PropTypes.func.isRequired
  };

  render() {
    const { todos } = this.props;
    const areAllCompleted = todos.length && todos.every(todo => todo.completed);

    return (
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" checked={areAllCompleted} readOnly />
        <label htmlFor="toggle-all" onClick={this.props.onCompleteAll}></label>

        <ul className="todo-list">
          {todos.map(todo =>
            <Item
              key={todo.id}
              todo={todo}
              onUpdate={this.props.onUpdate}
              onDelete={this.props.onDelete}
            />
          )}
        </ul>
      </section>
    );
  }
}
