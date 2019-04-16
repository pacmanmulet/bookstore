import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getBook, saveBook } from '../services/bookService';

class BookForm extends Form {
  state = {
    data: {
      title: '',
      pageCount: 1,
      shortDescription: 'jj',
      longDescription: '',
      price: 1,
      isbn: '',
      publishedDate: new Date(),
      authors: '',
      categories: '',
      thumbnailUrl: '',
      rate: 1,
    },
    errors: {},
  };

  schema = {
    title: Joi.string()
      .required()
      .label('Title'),
    isbn: Joi.string().required(),
    pageCount: Joi.number().required(),
    price: Joi.number()
      .required()
      .min(1),
    rate: Joi.number()
      .required()
      .min(1)
      .max(10),
    authors: Joi.string().allow(''),
    categories: Joi.string().allow(''),
    thumbnailUrl: Joi.string().allow(''),
    longDescription: Joi.string().allow(''),
    shortDescription: Joi.string().allow(''),
    publishedDate: Joi.optional(),
  };
  // "shortDescription" . "longDescription" . "publishedDate" . "authors" . "categories" . "thumbnailUrl"

  async populateBook() {
    try {
      const bookId = this.props.match.params.id;
      if (bookId === 'new') return;

      const { data: book } = await getBook(bookId);
      this.setState({ data: this.mapToViewModel(book) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateBook();
  }

  mapToViewModel(book) {
    return {
      _id: book._id,
      title: book.title,
    };
  }

  doSubmit = async () => {
    await saveBook(this.state.data);

    this.props.history.push('/books');
  };

  render() {
    return (
      <div>
        <h1>Book Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderInput('authors', 'Authors (Use "," separator)')}
          {this.renderInput('categories', 'Categories (Use "," separator)')}
          {this.renderInput('isbn', 'ISBN')}
          {this.renderInput('publishedDate', 'Published date', 'date')}
          {this.renderInput('thumbnailUrl', 'Image url')}
          {this.renderInput('price', 'Price ($)', 'number', { min: 1, step: 0.01 })}
          {this.renderInput('rate', 'Rate', 'number', { min: 1, max: 10 })}
          {this.renderInput('pageCount', 'Pages number', 'number', { min: 1 })}
          {this.renderTextArea('shortDescription', 'Short description')}
          {this.renderTextArea('longDescription', 'Long description')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
    //{this.renderInputDate('publishedDate', 'Published date')}
  }
}

export default BookForm;
