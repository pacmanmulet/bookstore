import React, { Component, Fragment } from 'react';
import SuggestionsList from './suggestionsList';

class Autocomplete extends Component {
  state = {
    activeSuggestion: 0,
    showSuggestions: false,
    filteredSuggestions: [],
    userInput: '',
  };
  componentDidMount() {
    this.setState({ filteredSuggestions: this.props.suggestions });
  }
  onChange = e => {
    const userInput = e.currentTarget.value;
    const filteredSuggestions = this.props.suggestions.filter(
      suggestion => suggestion.indexOf(userInput.toLowerCase()) > -1 && userInput.toLowerCase() !== suggestion
    );
    this.setState({
      userInput,
      filteredSuggestions,
      showSuggestions: true,
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion],
      });
    }
  };
  addCategory = category => {
    this.props.addCategory(this.state.userInput);
    this.setState({ userInput: '' });
  };
  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      addCategory,
      state: { activeSuggestion, showSuggestions, userInput, filteredSuggestions },
    } = this;
    const userInputLowerCase = userInput.toLowerCase();
    return (
      <Fragment>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <input
            id="category"
            type="text"
            className="form-control"
            style={{ marginBottom: 0, borderColor: '#007bff' }}
            value={userInput}
            aria-describedby="basic-addon2"
            placeholder={this.props.placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          <div className="input-group-append">
            <button
              disabled={!filteredSuggestions.includes(userInputLowerCase) && !this.props.suggestions.includes(userInputLowerCase)}
              className="btn btn-outline-primary"
              type="button"
              onClick={addCategory}
            >
              Add
            </button>
          </div>
        </div>
        {userInput && showSuggestions && (
          <SuggestionsList suggestions={filteredSuggestions} activeSuggestion={activeSuggestion} onClick={onClick} />
        )}
      </Fragment>
    );
  }
}

export default Autocomplete;
