const express = require('express');
const { getAllMovies, addMovie, deleteMovieByTitle, updateMovieByTitle } = require('../models/movieMySQL');


const router = express.Router();

// Obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const movies = await getAllMovies();
    res.status(200).json(movies);
  } catch (error) {
    console.error('Error al obtener las películas:', error);
    res.status(500).send('Error al obtener las películas');
  }
});

// Agregar una nueva película
router.post('/', async (req, res) => {
    try {
      const { title, genre, description, release_year, image_url, youtube_video_id } = req.body;
      const result = await addMovie(title, genre, description, release_year, image_url, youtube_video_id);
      const newMovie = {
        id: result.insertId, // ID generado automáticamente
        title,
        genre,
        description,
        release_year,
        image_url,
        youtube_video_id,
      };
      res.status(201).json(newMovie); // Enviar la película completa al frontend
    } catch (error) {
      console.error('Error al añadir la película:', error);
      res.status(500).json({ error: 'Error al añadir la película' });
    }
  });
  
// Eliminar una película por título
router.delete('/:title', async (req, res) => {
    try {
      const { title } = req.params; // Obtener el título de los parámetros de la URL
      const result = await deleteMovieByTitle(title); // Llamar a la función para eliminar la película
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Película no encontrada' });
      }
      res.status(200).json({ message: 'Película eliminada con éxito' });
    } catch (error) {
      console.error('Error al eliminar la película:', error);
      res.status(500).json({ error: 'Error al eliminar la película' });
    }
  });
  
  // Editar una película por título
router.put('/:title', async (req, res) => {
    try {
      const { title } = req.params; // Título actual
      const { newTitle, genre, description, release_year, image_url, youtube_video_id } = req.body;
  
      const result = await updateMovieByTitle(title, {
        newTitle,
        genre,
        description,
        release_year,
        image_url,
        youtube_video_id,
      });
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Película no encontrada' });
      }
      res.status(200).json({ message: 'Película actualizada con éxito' });
    } catch (error) {
      console.error('Error al actualizar la película:', error);
      res.status(500).json({ error: 'Error al actualizar la película' });
    }
  });
  

module.exports = router;
