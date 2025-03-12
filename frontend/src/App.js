import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Importaciones de React Router
import Register from './pages/Register'; // Ruta para el registro
import Login from './pages/Login'; // Ruta para el inicio de sesión
import Movies from './pages/Movies'; // Ruta para las películas
import PrivateRoute from './components/PrivateRoute'; // Ruta privada personalizada
import MovieDetails from './pages/MovieDetails'; // Ruta para los detalles de las películas
import AdminPanel from './pages/AdminPanel'; // Ruta para el panel de administración

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Redirigir la ruta raíz "/" a "/movies" */}
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/movies"
            element={
              <PrivateRoute>
                <Movies />
              </PrivateRoute>
            }
          />
          <Route
            path="/movies/:id"
            element={
              <PrivateRoute>
                <MovieDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
