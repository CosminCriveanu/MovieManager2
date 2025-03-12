const express = require('express');
require('dotenv').config(); // Cargar las variables de entorno desde .env
const cors = require('cors');
const connectMongoDB = require('./config/dbMongo'); // Conectar MongoDB
const dbMySQL = require('./config/dbMySQL'); // Conectar MySQL
const userRoutes = require('./routes/userRoutes'); // Rutas de usuarios
const movieRoutes = require('./routes/movieRoutes'); // Rutas de películas
const reviewRoutes = require('./routes/reviewRoutes'); // Rutas de reseñas

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Middleware para manejar JSON

// Conectar a MongoDB
connectMongoDB();

// Conectar y verificar MySQL
dbMySQL; // Esto asegura que la conexión MySQL se active cuando se importe el módulo

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);

// Servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
