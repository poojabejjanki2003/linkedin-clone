require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./db');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
