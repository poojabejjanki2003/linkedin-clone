// backend/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'linkedin_db_wjjg_user',
  host: 'dpg-d40pl8qli9vc73brn9tg-a.oregon-postgres.render.com',
  database: 'linkedin_db_wjjg',
  password: 'wR5EmGk78JyfGnJtmSoixdBeDazpMvBP',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect()
  .then(() => console.log('✅ Connected to Render PostgreSQL Database'))
  .catch(err => console.error('❌ Database connection failed:', err));

module.exports = pool;
