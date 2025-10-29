require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./db');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');


const cors = require('cors');

const cors = require('cors');

app.use(cors({
  origin: [
    'https://linkedin-frontend-bnkz.onrender.com',
    'http://localhost:5500',                      
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('✅ LinkedIn Clone Backend is running successfully!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
