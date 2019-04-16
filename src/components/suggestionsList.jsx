import React from 'react';
const SuggestionsList = ({ suggestions, activeSuggestion, onClick }) => {
  if (suggestions.length) {
    return (
      <ul class="suggestions">
        {suggestions.map((suggestion, index) => {
          let className;
          if (index === activeSuggestion) className = 'suggestion-active';

          return (
            <li className={className} key={suggestion} onClick={onClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    );
  } else {
    return null;
  }
};

export default SuggestionsList;
