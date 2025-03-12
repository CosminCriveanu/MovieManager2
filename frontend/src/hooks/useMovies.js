import { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get('/movies');
        setMovies(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMovies();
  }, []);

  return { movies, error };
};

export default useMovies;
