import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function makeRandomColor() {
  let c = '';
  while (c.length < 6) {
    c += Math.random().toString(16).substr(-6).substr(-1);
  }
  return `#${c}`;
}

function GenericAvatar({ username }) {
  const initials = React.useMemo(() => {
    const names = username.split(' ');

    const [firstLetter] = names[0];
    const [secondLetter] = names[names.length - 1];

    return `${firstLetter}${secondLetter}`;
  }, [username]);

  const color = React.useMemo(() => makeRandomColor(), []);

  return <Container color={color}>{initials}</Container>;
}

GenericAvatar.propTypes = {
  username: PropTypes.string.isRequired,
};

export default GenericAvatar;
