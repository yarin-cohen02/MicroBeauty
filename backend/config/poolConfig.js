const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
  max: 5, 
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

setInterval(async () => {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1'); // Keep connection alive
    client.release();
    console.log('Database keep-alive query executed');
  } catch (err) {
    console.error('Error keeping DB connection alive:', err);
  }
}, 60000); // Run every 60 seconds

module.exports = pool;

