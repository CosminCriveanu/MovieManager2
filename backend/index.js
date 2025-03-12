const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta básica de prueba
app.get('/api/test', (req, res) => {
  res.send('Backend is running!');
});
// Importar y usar las rutas de autenticación
const connectMongoDB = require('./config/dbMongo');
connectMongoDB();

// Configuracion de las rutas de autenticacion
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Configuracion de las rutas de peliculas
const movieRoutes = require('./routes/movies');
app.use('/api/movies', movieRoutes);


// Configuracion de las rutas de reseñas
const userActionsRoutes = require('./routes/userActions');
app.use('/api/users', userActionsRoutes);


// Configurar el puerto
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

