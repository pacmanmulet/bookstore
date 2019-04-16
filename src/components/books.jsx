import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import BooksTable from './booksTable';
import SearchBox from './searchBox';
import Categories from './categories';
import Pagination from './common/pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getBooks, deleteBook } from '../services/bookService';
import { paginate } from '../utils/paginate';
import _ from 'lodash';

class Books extends Component {
  state = {
    books: [],
    currentPage: 1,
    loadingBooks: true,
    categories: [],
    categoriesSelected: [],
    pageSize: 5,
    searchQuery: '',
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' },
  };

  async componentDidMount() {
    const { data: books } = await getBooks();
    books.forEach(book => (book.categories = book.categories.map(cat => cat.toLowerCase())));
    this.setState({ books, loadingBooks: false }, this.updateCategories);
  }

  updateCategories() {
    this.setState({
      categories: _.uniq(
        this.state.books.map(book => (book.categories ? [...book.categories.map(cat => cat.toLowerCase())] : [])).flat()
      ).filter(cat => cat),
    });
  }

  handleDelete = async book => {
    const originalBooks = this.state.books;
    const books = originalBooks.filter(m => m._id !== book._id);
    this.setState({ books }, this.updateCategories);

    try {
      await deleteBook(book._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) toast.error('This book has already been deleted.');

      this.setState({ books: originalBooks }, this.updateCategories);
    }
  };

  handleLike = book => {
    const books = [...this.state.books];
    const index = books.indexOf(book);
    books[index] = { ...books[index] };
    books[index].liked = !books[index].liked;
    this.setState({ books });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, categoriesSelected: [], currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  addCategory = category => {
    const { categoriesSelected } = this.state;
    categoriesSelected.push(category);
    this.setState({ categoriesSelected, currentPage: 1 });
  };
  removeCategory = category => {
    const { categoriesSelected } = this.state;
    categoriesSelected.splice(categoriesSelected.indexOf(category), 1);
    this.setState({ categoriesSelected, currentPage: 1 });
  };
  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, categoriesSelected, searchQuery, books: allBooks } = this.state;

    let filtered = allBooks;
    if (searchQuery) filtered = allBooks.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    else if (categoriesSelected.length)
      filtered = allBooks.filter(m => m.categories.filter(cat => categoriesSelected.includes(cat)).length);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const books = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: books };
  };

  render() {
    const { length: count } = this.state.books;
    const {
      props: { user, shoppingBasket },
      state: { pageSize, currentPage, loadingBooks, sortColumn, searchQuery, categories, categoriesSelected },
      addCategory,
      removeCategory,
    } = this;

    if (loadingBooks) return <p>Loading...</p>;
    if (count === 0) return <p>There are no books in the database.</p>;

    const { totalCount, data: books } = this.getPagedData();
    return (
      <div className="row">
        <ReactTooltip />
        <div className="col-3">
          <Categories
            categories={categories}
            categoriesSelected={categoriesSelected}
            addCategory={addCategory}
            removeCategory={removeCategory}
          />
        </div>
        <div className="col">
          {user && (
            <Link to="/books/new" className="btn btn-primary" style={{ marginBottom: 20 }}>
              New Book
            </Link>
          )}
          <p>
            Showing {totalCount} books in the database.
            {(!user || !user.isAdmin) && (
              <FontAwesomeIcon
                data-tip="Use admin@gmail.com / 12345 to login in with admin rights"
                className="mx-2 float-right"
                color="#0000ff"
                icon="exclamation-circle"
              />
            )}
          </p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <BooksTable
            books={books}
            shoppingBasket={shoppingBasket}
            sortColumn={sortColumn}
            addItem={this.props.addItem}
            removeItem={this.props.removeItem}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
        </div>
      </div>
    );
  }
}

export default Books;
