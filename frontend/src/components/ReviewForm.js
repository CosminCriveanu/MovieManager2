import React, { useState } from 'react';
import { createReview } from '../services/api';

const ReviewForm = ({ movieId, token }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = { movie_id: movieId, rating, review_text: reviewText };
    await createReview(reviewData, token);
    alert('Reseña añadida con éxito');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder="Calificación (1-5)"
      />
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Escribe tu reseña"
      ></textarea>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ReviewForm;
