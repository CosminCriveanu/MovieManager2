import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Verificar si el usuario está autenticado
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
