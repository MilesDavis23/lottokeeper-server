const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: 'petiland',
    database: 'lottokeeper'
});

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to lottokeeper database.');
    connection.release();
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

testConnection();

module.exports = pool;