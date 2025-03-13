const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'root',
    database: 'movie_manager' 
});

module.exports = pool;
