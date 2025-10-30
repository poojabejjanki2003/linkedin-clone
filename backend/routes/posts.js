const express = require('express');
const router = express.Router();
const pool = require('../db');

// CREATE POST
router.post('/', async (req, res) => {
  try {
    const { content, author, email } = req.body;
    if (!content) return res.status(400).json({ error: 'Content is required' });

    const newPost = await pool.query(
      'INSERT INTO posts (content, author, email) VALUES ($1, $2, $3) RETURNING *',
      [content, author, email]
    );

    res.json({ message: 'Post created successfully', post: newPost.rows[0] });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Server error while creating post' });
  }
});

// GET ALL POSTS
router.get('/', async (req, res) => {
  try {
    const posts = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(posts.rows);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Server error while fetching posts' });
  }
});

module.exports = router;