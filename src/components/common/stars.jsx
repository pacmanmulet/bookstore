import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Input = ({ rate, ...rest }) => {
  const stars = [];
  const backgroudStars = [1, 2, 3, 4, 5];
  let full = parseInt(rate / 2, 10) - 1;
  while (full >= 0) stars[full--] = 'star';
  if (rate % 2 !== 0) stars.push('star-half');

  return (
    <Fragment>
      <div style={{ position: 'absolute' }}>
        {stars.map((icon, index) => (
          <FontAwesomeIcon key={icon + index.toString()} color="#bb0" icon={icon} {...rest} />
        ))}
      </div>
      <div style={{ opacity: 0.3 }}>
        {backgroudStars.map((n, index) => (
          <FontAwesomeIcon key={n + index.toString()} color="#bb0" icon="star" {...rest} />
        ))}
      </div>
    </Fragment>
  );
};

export default Input;
