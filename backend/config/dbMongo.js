const mongoose = require('mongoose');

const connectMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/moviemanager', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión exitosa con MongoDB');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
  }
};

module.exports = connectMongoDB;
