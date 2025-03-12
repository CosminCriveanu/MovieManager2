const pool = require('../config/dbMySQL');

const createTable = `
  CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    genre VARCHAR(255),
    release_year INT,
    director VARCHAR(255),
    description TEXT
  )
`;

pool.query(createTable)
  .then(() => console.log('Movies table ready'))
  .catch((err) => console.error(err));

module.exports = pool;
