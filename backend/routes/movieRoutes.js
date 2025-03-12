const express = require('express');
const { getAllMovies, createMovie } = require('../controllers/movieController');
const { auth } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllMovies);
router.post('/', auth, createMovie);

module.exports = router;
