import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FILTERS } from '../constants/Filters';
import { withStateAndDispatch } from '../store/container';

export class Footer extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    filter: PropTypes.string.isRequired,
    itemsLeft: PropTypes.number.isRequired,
    completedCount: PropTypes.number.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    onFilterSelect: PropTypes.func.isRequired
  };

  render() {
    const itemText = this.props.itemsLeft === 1 ? 'item' : 'items';
    const filterTitles = {
      [FILTERS.all]: 'All',
      [FILTERS.active]: 'Active',
      [FILTERS.completed]: 'Completed'
    };

    return (
      <footer className="footer">
        <span className="todo-count"><strong>{this.props.itemsLeft}</strong><span> {itemText} left</span></span>
        <ul className="filters">
          {Object.keys(filterTitles).map(filterKey =>
            <li key={filterKey}>
              <a
                href="#"
                className={classNames({ selected: filterKey === this.props.filter })}
                onClick={() => this.props.onFilterSelect(filterKey)}
              >
                {filterTitles[filterKey]}
              </a>
            </li>
          )}
        </ul>
        {
          !!this.props.completedCount &&
          <button className="clear-completed" onClick={this.props.onClearCompleted}>Clear completed</button>
        }
      </footer>
    );
  }
}

export const FooterContainer = withStateAndDispatch(Footer);
