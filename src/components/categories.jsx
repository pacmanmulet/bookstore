import React, { Component } from 'react';
import Autocomplete from './autocomplete';
import _ from 'lodash';
class Categories extends Component {
  render() {
    const { categories, categoriesSelected, removeCategory, addCategory } = this.props;
    const suggestions = _.difference(categories, categoriesSelected);
    return (
      <React.Fragment>
        <Autocomplete addCategory={addCategory} suggestions={suggestions} placeholder="Select categories..." />
        <div className="row">
          <div className="col">
            <ul className="categoriesList">
              {categoriesSelected.map(category => (
                <li className="my-1 py-1" key={category}>
                  {category}
                  <span onClick={removeCategory} aria-label="remove" role="img" className="px-2 clikable float-right">
                    ❌
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Categories;
