import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate para redirigir

const Menu = () => {
  const navigate = useNavigate(); // Hook para manejar redirecciones

  const handleLogout = () => {
    localStorage.removeItem('token'); // Ejemplo de limpieza de token
    navigate('/login'); // Redirige al login
  };

  return (
    <nav style={{ padding: '10px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ccc' }}>
      <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around', margin: 0, padding: 0 }}>
        <li>
          <Link to="/movies" style={{ textDecoration: 'none', color: '#007bff' }}>Inicio</Link>
        </li>
        <li>
          <Link to="/admin" style={{ textDecoration: 'none', color: '#007bff' }}>Panel de Administración</Link>
        </li>
        <li>
          <button
            onClick={handleLogout} // Usamos la función de cierre de sesión
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#007bff',
              cursor: 'pointer',
            }}
          >
            Cerrar Sesión
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
