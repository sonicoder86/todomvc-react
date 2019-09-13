import React, { Component } from 'react';
import { Header } from './Header';
import { List } from './List';
import { Footer } from './Footer';

export class App extends Component {
  onCreate(name) {
    console.log('on create', name);
  }

  render() {
    return (
      <section className="todoapp">
        <Header onSave={(name) => this.onCreate(name)} />
        <List />
        <Footer />
      </section>
    );
  }
}
