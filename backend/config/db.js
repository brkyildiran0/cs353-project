const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,          // Default PostgreSQL user
  host: process.env.DB_HOST,         // Host (local machine)
  database: process.env.DB_NAME, // Database name
  password: process.env.DB_PASSWORD,   // Your PostgreSQL password
  port: process.env.DB_PORT,                // Default PostgreSQL port
});

// Test the connection
pool.connect()
  .then(() => console.log('✅ Database connected successfully'))
  .catch((err) => console.error('❌ Database connection error:', err.message));

module.exports = pool;
