import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { Header } from './Header';
import { List } from './List';
import { Footer } from './Footer';
import { FILTERS } from '../constants/Filters';
import { selectCompleted, selectNotCompleted, selectVisible } from '../selectors/Todo';
import { TodoLocal } from '../services/TodoLocal';

export class App extends Component {
  state = {
    todos: [],
    filter: FILTERS.all
  };

  componentDidMount() {
    this.setState({
      todos: TodoLocal.loadTodos()
    });
  }

  componentDidUpdate() {
    TodoLocal.storeTodos(this.state.todos);
  }

  onCreate(name) {
    const newTodo = { id: uuid(), name, completed: false };

    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  }

  onUpdate(id, values) {
    this.setState({
      todos: this.state.todos.map(
        todo => todo.id === id ? { ...todo, ...values } : todo
      )
    });
  }

  onDelete(id) {
    this.setState({
      todos: this.state.todos.filter(
        todo => todo.id !== id
      )
    });
  }

  onCompleteAll() {
    const todos = this.state.todos;
    const areAllCompleted = todos.length && selectCompleted(todos).length === todos.length;

    this.setState({
      todos: todos.map(
        todo => ({ ...todo, ...{ completed: !areAllCompleted } })
      )
    });
  }

  onClearCompleted() {
    this.setState({
      todos: selectNotCompleted(this.state.todos)
    });
  }

  onFilterSelect(filter) {
    this.setState({ filter });
  }

  render() {
    return (
      <section className="todoapp">
        <Header
          onSave={(name) => this.onCreate(name)}
        />
        {
          !!this.state.todos.length &&
          <List
            todos={selectVisible(this.state.todos, this.state.filter)}
            onUpdate={(id, values) => this.onUpdate(id, values)}
            onDelete={(id) => this.onDelete(id)}
            onCompleteAll={() => this.onCompleteAll()}
          />
        }
        {
          !!this.state.todos.length &&
          <Footer
            todos={this.state.todos}
            filter={this.state.filter}
            onClearCompleted={() => this.onClearCompleted()}
            onFilterSelect={(filter) => this.onFilterSelect(filter)}
          />
        }
      </section>
    );
  }
}
