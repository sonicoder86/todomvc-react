import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { Header } from './Header';
import { List } from './List';
import { Footer } from './Footer';

export class App extends Component {
  state = {
    todos: []
  };

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

  render() {
    return (
      <section className="todoapp">
        <Header onSave={(name) => this.onCreate(name)} />
        <List
          todos={this.state.todos}
          onUpdate={(id, values) => this.onUpdate(id, values)}
          onDelete={(id) => this.onDelete(id)}
        />
        <Footer />
      </section>
    );
  }
}
