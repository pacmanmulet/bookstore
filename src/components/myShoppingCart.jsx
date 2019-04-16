import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Table from './common/table';
class MyShoppingCart extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: book => <Link to={`/books/${book._id}`}>{book.title}</Link>,
    },
    { path: 'price', label: 'Price' },
    {
      key: 'delete',
      content: book => (
        <button onClick={() => this.props.removeItem(book)} className="btn btn-danger btn-sm">
          Delete
        </button>
      ),
    },
  ];
  state = {
    sortColumn: { path: 'title', order: 'asc' },
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  componentWillReceiveProps({ shoppingBasket }) {
    if (!shoppingBasket.length) this.props.history.replace('/');
  }
  render() {
    const {
      props: { shoppingBasket },
      state: { sortColumn, handleSort },
    } = this;
    return (
      <Fragment>
        <Table columns={this.columns} data={shoppingBasket} sortColumn={sortColumn} onSort={handleSort} />
        <div className="row">
          <div className="col">
            <span style={{ fontWeight: 'bold' }}>Total {shoppingBasket.map(book => book.price).reduce((a, b) => a + b, 0)}$</span>
            <button className="btn btn-primary mx-3" disabled>
              Confirm
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MyShoppingCart;
