const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userMongo'); // Cambiamos a MongoDB

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('El usuario ya existe');
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = new User({ username, password: hashedPassword, role: role || 'cliente' });
    await newUser.save();

    res.status(201).send('Usuario registrado con éxito');
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('Usuario o contraseña incorrectos');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('Usuario o contraseña incorrectos');
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      'secreto', // Cambia esta clave secreta en producción
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;
