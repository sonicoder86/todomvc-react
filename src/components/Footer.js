import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FILTERS } from '../constants/Filters';
import { selectNotCompleted, selectCompleted } from '../selectors/Todo';

const FILTER_TITLES = {
  [FILTERS.all]: 'All',
  [FILTERS.active]: 'Active',
  [FILTERS.completed]: 'Completed'
};

export class Footer extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    filter: PropTypes.string.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    onFilterSelect: PropTypes.func.isRequired
  };

  render() {
    const itemsLeft = selectNotCompleted(this.props.todos).length;
    const completedCount = selectCompleted(this.props.todos).length;
    const itemText = itemsLeft === 1 ? 'item' : 'items';

    return (
      <footer className="footer">
        <span className="todo-count"><strong>{itemsLeft}</strong><span> {itemText} left</span></span>
        <ul className="filters">
          {Object.keys(FILTER_TITLES).map(filterKey =>
            <li key={filterKey}>
              <a
                href="#"
                className={classNames({ selected: filterKey === this.props.filter })}
                onClick={() => this.props.onFilterSelect(filterKey)}
              >
                {FILTER_TITLES[filterKey]}
              </a>
            </li>
          )}
        </ul>
        {
          !!completedCount &&
          <button className="clear-completed" onClick={this.props.onClearCompleted}>Clear completed</button>
        }
      </footer>
    );
  }
}
