const express = require('express');
const router = express.Router();
const dbMySQL = require('../config/dbMySQL');

// Ruta para obtener todos los usuarios
router.get('/', (req, res) => {
  dbMySQL.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err.message);
      return res.status(500).send('Error al obtener datos');
    }
    res.json(results);
  });
});

module.exports = router;
