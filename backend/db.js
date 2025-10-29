// backend/db.js
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// You can either store DATABASE_URL in .env, or directly define it here
const pool = new Pool({
  user: 'linkedin_db_wjjg_user',
  host: 'dpg-d40pl8qli9vc73brn9tg-a.oregon-postgres.render.com',
  database: 'linkedin_db_wjjg',
  password: 'wR5EmGk78JyfGnJtmSoixdBeDazpMvBP',
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // required for Render-hosted PostgreSQL
  },
});

pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL Database (Render)'))
  .catch(err => {
    console.error('❌ Database connection failed:', err);
  });

module.exports = pool;
