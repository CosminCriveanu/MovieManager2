const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userMongo'); 

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' }); // Respuesta en JSON
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = new User({ username, password: hashedPassword, role: role || 'cliente' });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado con éxito' }); // JSON válido
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' }); // JSON válido
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  try {
    console.log('Datos recibidos del frontend:', req.body);

    const { username, password } = req.body;

    if (!username || !password) {
      console.log('Faltan username o password.');
      return res.status(400).json({ error: 'Nombre de usuario y contraseña son obligatorios' });
    }

    // Buscar usuario (sin distinguir mayúsculas/minúsculas)
    const user = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
    console.log('Usuario encontrado:', user);

    if (!user) {
      return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('¿Contraseña válida?', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      'secreto', // Clave secreta para firmar el token
      { expiresIn: '1h' }
    );

    console.log('Inicio de sesión exitoso. Token generado:', token);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



module.exports = router;
