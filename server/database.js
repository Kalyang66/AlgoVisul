const { Pool } = require('pg');

// Database Connection Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Heroku Postgres URL
  ssl: {
    rejectUnauthorized: false
  }
});

// Query Wrapper
const query = (text, params) => pool.query(text, params);

module.exports = {
  query,
};