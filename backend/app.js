const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
  })
);
app.use(express.json());

app.get('/api/v1', (req, res) => {
  res.json({ message: 'Welcome to Gamezone Hub API' });
});

// Define Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/products', require('./routes/products'));

module.exports = app;