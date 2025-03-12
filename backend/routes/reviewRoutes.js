const express = require('express');
const { addReview, getMovieReviews } = require('../controllers/reviewController');
const { auth } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth, addReview);
router.get('/:movieId', getMovieReviews);

module.exports = router;
