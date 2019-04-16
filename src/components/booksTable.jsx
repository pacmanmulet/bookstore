import React, { Component } from 'react';
import auth from '../services/authService';
import { Link } from 'react-router-dom';
import Table from './common/table';
import Stars from './common/stars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class BooksTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: book => <Link to={`/books/${book._id}`}>{book.title}</Link>,
    },
    { path: 'price', label: '$' },
    { path: 'rate', label: 'Stars', content: book => <Stars rate={book.rate} /> },
    { path: 'thumbnailUrl', label: '', content: book => <img className="thumbnail" alt={book.title} src={book.thumbnailUrl} /> },
    {
      key: 'add',
      content: book => {
        const {
          user,
          props: { addItem, shoppingBasket, removeItem },
        } = this;
        const bookOnBasket = shoppingBasket.find(item => item._id === book._id);
        const color = !user ? '#bbf' : bookOnBasket ? '#0b0' : '#44f';
        return (
          <FontAwesomeIcon
            color={color}
            className={!user ? '' : 'clickable'}
            icon={bookOnBasket ? 'cart-arrow-down' : 'cart-plus'}
            onClick={() => {
              if (user) !bookOnBasket ? addItem(book) : removeItem(book);
            }}
          />
        );
      },
    },
  ];

  deleteColumn = {
    key: 'delete',
    content: book => (
      <button onClick={() => this.props.onDelete(book)} className="btn btn-danger btn-sm">
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    this.user = auth.getCurrentUser();
    if (this.user && this.user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { books, onSort, sortColumn } = this.props;

    return <Table columns={this.columns} data={books} sortColumn={sortColumn} onSort={onSort} />;
  }
}

export default BooksTable;
