import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // URL base de tu backend
});

export const getMovies = async () => {
  const response = await api.get('/movies'); // Consumir el endpoint de películas
  return response.data;
};

export default api;
