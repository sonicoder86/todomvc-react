import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Item extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  state = {
    editing: false
  };

  handleEdit() {
    this.setState({ editing: true });
  }

  handleCompleted() {
    this.props.onUpdate(
      this.props.todo.id,
      { completed: !this.props.todo.completed }
    );
  }

  handleDelete() {
    this.props.onDelete(this.props.todo.id);
  }

  render() {
    const { name, completed } = this.props.todo;

    return (
      <li className={classNames({ completed })}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => this.handleCompleted()}
          />
          <label onDoubleClick={() => this.handleEdit()}>{name}</label>
          <button
            className="destroy"
            onClick={() => this.handleDelete()}
          />
        </div>
      </li>
    );
  }
}
