const express = require('express');
const User = require('../models/userMongo');
const router = express.Router();

// Añadir una acción al historial
router.post('/:userId/history', async (req, res) => {
  try {
    const { userId } = req.params;
    const { action, movieId } = req.body;

    // Encontrar el usuario
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    // Añadir acción al historial
    user.history.push({ action, movieId });
    await user.save();

    res.status(201).send('Acción añadida al historial');
  } catch (error) {
    console.error('Error al añadir al historial:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Obtener el historial de un usuario
router.get('/:userId/history', async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Buscar al usuario y su historial
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('Usuario no encontrado');
      }
  
      // Retornar el historial del usuario sin intentar "populate"
      res.status(200).json(user.history);
    } catch (error) {
      console.error('Error al obtener el historial:', error);
      res.status(500).send('Error interno del servidor');
    }
  });
  

module.exports = router;
