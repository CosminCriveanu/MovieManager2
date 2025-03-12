import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/movies">Películas</Link>
        </li>
        <li>
          <Link to="/favorites">Favoritos</Link>
        </li>
        <li>
          <Link to="/login" onClick={() => localStorage.removeItem('token')}>Cerrar Sesión</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
