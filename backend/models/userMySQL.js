const db = require('../config/dbMySQL');

// Crear un nuevo usuario
const createUser = async (username, password, role) => {
  const query = `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`;
  const [result] = await db.query(query, [username, password, role]);
  return result;
};

// Buscar usuario por nombre de usuario
const findUserByUsername = async (username) => {
  const query = `SELECT * FROM users WHERE username = ?`;
  const [rows] = await db.query(query, [username]);
  return rows[0]; // Devuelve el primer resultado o undefined si no existe
};

module.exports = {
  createUser,
  findUserByUsername,
};
