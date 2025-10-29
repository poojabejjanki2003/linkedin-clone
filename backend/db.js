// backend/db.js
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('❌ DATABASE_URL is not set');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false } // required on Render
});

pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL Database'))
  .catch(err => {
    console.error('❌ Database connection failed:', err);
    // do not throw so server can show an error instead of crash immediately
  });

module.exports = pool;
