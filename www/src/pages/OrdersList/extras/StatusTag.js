import React from 'react';
import PropTypes from 'prop-types';

import { StatusTag as Container, Dot } from '../styles';

const colors = {
  pendente: '#ffb300',
  entregue: 'green',
  cancelado: 'red',
};

function StatusTag({ status }) {
  return (
    <Container color={colors[status]}>
      <Dot color={colors[status]} />
      {status}
    </Container>
  );
}

StatusTag.propTypes = {
  status: PropTypes.oneOf(['pendente', 'entregue', 'cancelado']).isRequired,
};

export default StatusTag;
