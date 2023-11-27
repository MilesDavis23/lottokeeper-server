const mysql = require('mysql2/promise');


const dbConfig = process.env.NODE_ENV === 'production' ? {
  connectionLimit: 50,
  host: process.env.JAWSDB_HOST,
  port: process.env.JAWSDB_PORT,
  user: process.env.JAWSDB_USER,
  password: process.env.JAWSDB_PASS,
  database: process.env.JAWSDB_DB
} : {
  connectionLimit: 50,
  host: 'localhost',
  user: 'root',
  password: 'petiland',
  database: 'lottokeeper'
}

const pool = mysql.createPool(dbConfig);

console.log('these aree the current settings:', dbConfig);

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