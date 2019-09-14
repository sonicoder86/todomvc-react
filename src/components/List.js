import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item } from './Item';

export class List extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  render() {
    return (
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all" ></label>

        <ul className="todo-list">
          {this.props.todos.map(todo =>
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
