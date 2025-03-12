const db = require('../config/dbMySQL');

// Obtener todas las películas
const getAllMovies = async () => {
    const query = `SELECT * FROM movies`;
    const [rows] = await db.query(query);
    return rows;
};

// Agregar una nueva película
const addMovie = async (title, genre, description, release_year, image_url, youtube_video_id) => {
    const query = `
      INSERT INTO movies (title, genre, description, release_year, image_url, youtube_video_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [title, genre, description, release_year, image_url, youtube_video_id]);
    return result;
};

// Eliminar una película por título
const deleteMovieByTitle = async (title) => {
    const query = 'DELETE FROM movies WHERE title = ?';
    const [result] = await db.query(query, [title]);
    return result;
};

// Editar una película por título
const updateMovieByTitle = async (title, updatedData) => {
    const { newTitle, genre, description, release_year, image_url, youtube_video_id } = updatedData;

    const query = `
      UPDATE movies
      SET title = ?, genre = ?, description = ?, release_year = ?, image_url = ?, youtube_video_id = ?
      WHERE title = ?
    `;

    const [result] = await db.query(query, [
        newTitle || title, // Si no se envía un nuevo título, usar el original
        genre,
        description,
        release_year,
        image_url,
        youtube_video_id,
        title,
    ]);

    return result;
};

module.exports = {
    getAllMovies,
    addMovie,
    deleteMovieByTitle,
    updateMovieByTitle, // Exportar esta función
};
