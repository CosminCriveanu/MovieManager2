import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../services/api'; // Asegúrate de que este archivo existe
import Menu from '../components/Menu'; // Importar el componente del menú

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies(); // Obtener las películas desde la API
        setMovies(data);
      } catch (error) {
        console.error('Error al obtener las películas:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <Menu /> {/* Menú en la parte superior de la página */}
      <h1>Películas Disponibles</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: '1px solid #ddd',
              padding: '10px',
              width: '200px',
              borderRadius: '8px',
              backgroundColor: '#f8f8f8',
              textAlign: 'center',
            }}
          >
            <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src={movie.image_url || 'https://via.placeholder.com/200x300'}
                alt={movie.title}
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <h3>{movie.title}</h3>
            </Link>
            <p><strong>Género:</strong> {movie.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
