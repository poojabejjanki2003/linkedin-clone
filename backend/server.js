require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./db');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

// ✅ CORS configuration
app.use(
  cors({
    origin: [
      'https://linkedin-frontend-bnkz.onrender.com', // your frontend URL
      'http://localhost:5500' // for local testing
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

// ✅ JSON middleware
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// ✅ Default route
app.get('/', (req, res) => {
  res.send('✅ LinkedIn Clone Backend is running successfully!');
});

// ✅ Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
