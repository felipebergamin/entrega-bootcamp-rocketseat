import React from 'react';
import { NavLink as Link } from 'react-router-dom';

import Logo from '../../assets/logo.svg';
import { Container } from './styles';

function Header() {
  return (
    <Container>
      <img src={Logo} alt="Logo" />

      <div className="separator" />

      <ul>
        <Link to="/orders" activeClassName="active-link">
          <li>Encomendas</li>
        </Link>

        <Link to="/couriers" activeClassName="active-link">
          <li>Entregadores</li>
        </Link>

        <Link to="/recipients" activeClassName="active-link">
          <li>Destinatários</li>
        </Link>

        <Link to="/delivery-problems" activeClassName="active-link">
          <li>Problemas</li>
        </Link>
      </ul>

      <div className="spacer" />

      <div className="user-box">
        <strong>Admin</strong>

        <Link to="/logout">
          <p>sair do sistema</p>
        </Link>
      </div>
    </Container>
  );
}

export default Header;
