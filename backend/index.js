const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Analizar JSON en las solicitudes

// Ruta básica de prueba
app.get('/api/test', (req, res) => {
  res.send('Backend is running!');
});

// Conexión a MongoDB
const connectMongoDB = require('./config/dbMongo');
connectMongoDB();

// Rutas de autenticación
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Rutas de películas
const movieRoutes = require('./routes/movies');
app.use('/api/movies', movieRoutes);

// Rutas de acciones de usuario (reseñas, etc.)
const userActionsRoutes = require('./routes/userActions');
app.use('/api/users', userActionsRoutes);

// Manejo de errores (opcional, si no se definió)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Configuración del puerto
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
