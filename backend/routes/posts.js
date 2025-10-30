const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

// ✅ Updated Middleware to verify token
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET || 'mysecretkey', (err, decoded) => {
    if (err) {
      console.error('JWT verification failed:', err.message);
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
}

// ✅ Create a post
router.post('/', verifyToken, (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;

  // PostgreSQL uses $1, $2 placeholders instead of ?
  const sql = 'INSERT INTO posts (user_id, content) VALUES ($1, $2)';
  db.query(sql, [userId, content], (err) => {
    if (err) {
      console.error('Post error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Post created successfully' });
  });
});

// ✅ Get all posts (feed)
router.get('/', (req, res) => {
  const sql = `
    SELECT posts.*, users.name 
    FROM posts 
    JOIN users ON posts.user_id = users.id 
    ORDER BY posts.created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
