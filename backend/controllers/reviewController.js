const pool = require('../config/dbMySQL');

// Crear reseña
exports.addReview = async (req, res) => {
  try {
    const { movie_id, rating, review_text } = req.body;
    await pool.query('INSERT INTO reviews (movie_id, user_id, rating, review_text) VALUES (?, ?, ?, ?)', 
    [movie_id, req.user.id, rating, review_text]);
    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener reseñas por ID de película
exports.getMovieReviews = async (req, res) => {
  try {
    const [reviews] = await pool.query('SELECT * FROM reviews WHERE movie_id = ?', [req.params.movieId]);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
