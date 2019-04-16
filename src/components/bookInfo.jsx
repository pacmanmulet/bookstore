import React from 'react';
import Form from './common/form';
import Stars from './common/stars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getBook } from '../services/bookService';

class BookInfo extends Form {
  state = { book: null };

  async populateBook() {
    try {
      const bookId = this.props.match.params.id;
      if (bookId === 'new') return;
      const { data: book } = await getBook(bookId);
      this.setState({ book });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateBook();
  }

  render() {
    const {
      state: { book },
      props: { user, removeItem, addItem, shoppingBasket },
    } = this;
    if (!book) return null;
    console.log(book);
    const { title, isbn, pageCount, price, rate, thumbnailUrl, publishedDate, authors, shortDescription, longDescription } = book;
    const bookOnBasket = shoppingBasket.find(item => item._id === book._id);
    const color = !user ? '#bbf' : bookOnBasket ? '#0e0' : '#44f';
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <h2>{title}</h2>
          </div>
          <div className="col-4">
            <h5>
              <Stars rate={rate} style={{ verticalAlign: 'sub' }} />
            </h5>
          </div>
          <div className="col">
            <span className="float-right">
              <h4>
                {price}${' '}
                <FontAwesomeIcon
                  color={color}
                  className="clickable"
                  icon={bookOnBasket ? 'cart-arrow-down' : 'cart-plus'}
                  onClick={() => {
                    if (user) !bookOnBasket ? addItem(book) : removeItem(book);
                    else this.props.history.push('/login');
                  }}
                />
              </h4>
            </span>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-9">
            <div className="row">
              Written by {authors.join(', ')}
              <br />
              ISBN: {isbn}
              <br />
              Publish Date: {publishedDate && publishedDate.split('T')[0]}
              <br />
              {pageCount} {pageCount > 1 ? 'pages' : 'page'}
            </div>
            {shortDescription && <div className="row">{shortDescription}</div>}
            {longDescription && <div className="row mt-1">{longDescription}</div>}
          </div>
          <div className="col">
            <img style={{ width: '100%' }} src={thumbnailUrl} alt={title} />
          </div>
        </div>
      </div>
    );
  }
}

export default BookInfo;
