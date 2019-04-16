import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Books from './components/books';
import BookInfo from './components/bookInfo';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import MyShoppingCart from './components/myShoppingCart';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Logout from './components/logout';
import ProtectedRoute from './components/common/protectedRoute';
import auth from './services/authService';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faStar,
  faStarHalf,
  faShoppingCart,
  faSignOutAlt,
  faSignInAlt,
  faCartPlus,
  faCartArrowDown,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import BookForm from './components/bookForm';

library.add(faStar, faStarHalf, faShoppingCart, faCartArrowDown, faCartPlus, faSignOutAlt, faSignInAlt, faExclamationCircle);

class App extends Component {
  state = {
    shoppingBasket: [],
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  addItem = book => {
    this.setState({ shoppingBasket: [...this.state.shoppingBasket, book] });
  };
  removeItem = book => {
    const { shoppingBasket } = this.state;
    shoppingBasket.splice(shoppingBasket.indexOf(book), 1);
    this.setState({ shoppingBasket });
  };
  render() {
    const {
      state: { user, shoppingBasket },
      addItem,
      removeItem,
    } = this;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} itemsCount={shoppingBasket.length} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route
              path="/my-shopping-cart"
              render={props => <MyShoppingCart {...props} removeItem={removeItem} shoppingBasket={shoppingBasket} />}
            />
            <ProtectedRoute path="/books/new" component={BookForm} />
            <Route
              path="/books/:id"
              render={props => (
                <BookInfo {...props} user={user} addItem={addItem} removeItem={removeItem} shoppingBasket={shoppingBasket} />
              )}
            />
            <Route
              path="/books"
              render={props => <Books {...props} user={user} addItem={addItem} removeItem={removeItem} shoppingBasket={shoppingBasket} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/books" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
