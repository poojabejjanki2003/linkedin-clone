const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

// 🔐 Verify Token Middleware
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET || 'mysecretkey', (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
}

// 📝 Create Post
router.post('/', verifyToken, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'Post content is required' });

    const result = await db.query(
      'INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *',
      [req.user.id, content]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Server error while creating post' });
  }
});

// 📜 Get All Posts
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT posts.*, users.name 
      FROM posts 
      JOIN users ON posts.user_id = users.id 
      ORDER BY posts.id DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Server error while fetching posts' });
  }
});

module.exports = router;
