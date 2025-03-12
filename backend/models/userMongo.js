const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'cliente'], default: 'cliente' },
  history: [
    {
      action: { type: String, enum: ['alquiler', 'compra'], required: true },
      movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
      date: { type: Date, default: Date.now },
    }
  ],
});

module.exports = mongoose.model('User', userSchema);
