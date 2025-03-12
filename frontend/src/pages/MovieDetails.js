import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovies } from '../services/api'; // Usamos la función existente para obtener las películas

const MovieDetails = () => {
  const { id } = useParams(); // Obtener el ID de la película desde la URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovies(); // Obtener todas las películas
        const selectedMovie = data.find((m) => m.id === parseInt(id)); // Encontrar la película por su ID
        setMovie(selectedMovie);
      } catch (error) {
        console.error('Error al obtener los detalles de la película:', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <p>Cargando detalles de la película...</p>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img
        src={movie.image_url}
        alt={movie.title}
        style={{ width: '300px', borderRadius: '8px' }}
      />
      <p><strong>Género:</strong> {movie.genre}</p>
      <p><strong>Descripción:</strong> {movie.description}</p>
      <p><strong>Año:</strong> {movie.release_year}</p>
      <div>
        <h2>Disfruta del vídeo:</h2>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${movie.youtube_video_id}`} // Video de YouTube asociado
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MovieDetails;
