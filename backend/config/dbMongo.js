const mongoose = require('mongoose');

const connectMongoDB = async () => {
  try {
    const uri = 'mongodb://localhost:27017/movie_manager';
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión exitosa con MongoDB');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
    process.exit(1); // Detiene el servidor si no hay conexión
  }
};

module.exports = connectMongoDB;
