const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { Pool } = require('pg');
const userRoutes = require('./user');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Routes
app.use('/user', userRoutes);

// Serve static files (HTML, CSS, etc.)
app.use(express.static('public'));

// Home Route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});