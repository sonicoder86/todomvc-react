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
    editing: false,
    name: this.props.todo.name
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

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleBlur() {
    this.props.onUpdate(
      this.props.todo.id,
      { name: this.state.name }
    );
    this.setState({ editing: false });
  }

  render() {
    const { name, completed } = this.props.todo;

    return (
      <li className={classNames({ completed, editing: this.state.editing })}>
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
        {
          this.state.editing &&
          <input
            className="edit"
            value={this.state.name}
            onChange={(e) => this.handleChange(e)}
            onBlur={() => this.handleBlur()}
            autoFocus={true}
          />
        }
      </li>
    );
  }
}
