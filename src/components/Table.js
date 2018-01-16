import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './table.css';

/**
 * All purpose responsive table
 *
 * Author: [Josue Comoto](https://github.com/Stidro)
 *
 * This component renders a highly extensible table.
 * Just provide an array with objects as data,
 * and a column config to let it know what and how to render each item.
 *
 * Basic Example:
 *
 * ```js
 * const data = [{id: 1, name:'Johnn'}, {id: 2, name:'Mark'}, {id: 3, name:'Rachel'}];
 * const config = [{ key: 'name', title: 'Name' }];
 *
 * <Table data={data} columns={config} />
 * ```
 *
 */

export default class Table extends Component {
  /**
   * Returns a key of an item from table's data
   * If a keyExtractor function is not provided,
   * this will return 'r' + item index
   * @param {Object} item
   * @param {Number} index
   */
  itemKeyProvider(item, index) {
    if (this.props.keyExtractor) return this.props.keyExtractor(item);

    console.warn(
      'Item keyExtractor is not defined. To ensure row key uniqueness, please provide a keyExtractor function.'
    );
    return `r${index}`;
  }

  /**
   * This renders all column headers
   * TODO: Allow custom renderHeader method
   */
  renderHeaders() {
    return this.props.columns.map((c, index) => <th key={c.key}>{c.title}</th>);
  }

  /**
   * Renders all items from data prop
   */
  renderItems() {
    return this.props.data.map((item, index) => (
      <tr key={this.itemKeyProvider(item, index)}>{this.renderRow(item)}</tr>
    ));
  }

  /**s
   * Renders a data item with the required columns
   * If a column's renderItem function is not provided,
   * it will render a plain string
   * @param {Object} item
   */
  renderRow(item) {
    return this.props.columns.map((c, index) => {
      const data = item[c.key];
      // Get renderItem function from column config
      // otherwise, render a plain string
      const renderItem = c.renderItem || (data => data.toString());
      return (
        <td key={c.key + index} data-th={c.title}>
          {renderItem(data)}
        </td>
      );
    });
  }

  /**
   * Renders a row to let know the user that there's no data to show.
   * A custom message can be provided.
   */
  renderEmptyPlaceholder() {
    return (
      <tr className="emptyData">
        <td colSpan={this.props.columns.length}>
          { this.props.placeholder }
        </td>
      </tr>
    );
  }

  /**
   * Renders the table's title if provided
   */
  renderTableTitle() {
    if (this.props.title) {
      return (
        <tr>
          <th colSpan={this.props.columns.length}>{this.props.title}</th>
        </tr>
      );
    }
  }

  render() {
    const { data, className } = this.props;
    return (
      <div className={`jc-table ${className}`}>
        <table>
          <thead>
            {this.renderTableTitle()}
            <tr>{this.renderHeaders()}</tr>
          </thead>
          <tbody>
            {data.length > 0
              ? this.renderItems()
              : this.renderEmptyPlaceholder()}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  /**
   * Table data
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Columns configuration
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Column's title
       */
      title: PropTypes.string.isRequired,
      /**
       * Data to display from an item
       */
      key: PropTypes.string.isRequired,
      /**
       * Function to render
       */
      renderItem: PropTypes.func
    })
  ),
  /**
   * Function to extract a unique key for each data item
   */
  keyExtractor: PropTypes.func,
  /**
   * Table title
   */
  title: PropTypes.string,
  /**
   * Text to display when no data is available
   */
  placeholder: PropTypes.string,
  /**
   * Style class or classes
   */
  className: PropTypes.string
};

Table.defaultProps = {
  data: [],
  columns: [],
  placeholder: 'No available data',
  className: ''
};
