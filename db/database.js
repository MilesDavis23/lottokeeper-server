const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'petiland',
    database: 'CaselinkDB'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to lottokeeper database.');
  });

module.exports = pool;