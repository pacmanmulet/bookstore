import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShoppingCart from './shoppingCart';
const NavBar = ({ user, itemsCount }) => {
  const color = '#44f';
  return (
    <nav className="navbar  navbar-expand-lg navbar-light mb-2 bg-light">
      <Link className="navbar-brand" to="/">
        Bookstore
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/books">
              Books
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav">
          {!user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                  <FontAwesomeIcon className="mx-2" color={color} icon="sign-in-alt" />
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <ShoppingCart itemsCount={itemsCount} color={color} />
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  {user.name}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Logout
                  <FontAwesomeIcon className="mx-2" color={color} icon="sign-out-alt" />
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
