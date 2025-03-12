const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', 
  password: 'root', 
  database: 'moviemanager', // Nombre de tu base de datos
});

const promisePool = pool.promise(); // Usaremos promesas para consultas asíncronas

module.exports = promisePool;
