import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class ShoppingCart extends Component {
  state = { dynamicClass: '' };

  componentWillReceiveProps({ itemsCount }) {
    if (!itemsCount || this.props.itemsCount === itemsCount) return;
    console.log(this.props, itemsCount);
    this.setState({ dynamicClass: 'animate' });
    setTimeout(() => this.setState({ dynamicClass: '' }), 400);
  }
  render() {
    const {
      props: { itemsCount, color },
      state: { dynamicClass },
    } = this;
    const className = `nav-item ${dynamicClass}`;
    return (
      <li className={className}>
        <NavLink className="nav-link" to="/my-shopping-cart">
          <FontAwesomeIcon color={color} icon="shopping-cart" />
          {itemsCount > 0 && <span className="badge badge-primary align-top">{itemsCount}</span>}
        </NavLink>
      </li>
    );
  }
}

export default ShoppingCart;
