const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: Number, required: true }, // Refers to MySQL Movie ID
});

module.exports = mongoose.model('Favorite', favoriteSchema);
