const pool = require('../config/dbMySQL');

// Obtener todas las películas
exports.getAllMovies = async (req, res) => {
  try {
    const [movies] = await pool.query('SELECT * FROM movies');
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear película (solo admin)
exports.createMovie = async (req, res) => {
  try {
    const { title, genre, release_year, director, description } = req.body;
    await pool.query('INSERT INTO movies (title, genre, release_year, director, description) VALUES (?, ?, ?, ?, ?)', 
    [title, genre, release_year, director, description]);
    res.status(201).json({ message: 'Movie created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
