const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

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

// Serve static files from the 'public' directory within the 'Algorithms-Vis' project folder
app.use(express.static(path.join(__dirname, '../public'))); // Note the path adjustment

// Routes for HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html')); // Note the path adjustment
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html')); // Note the path adjustment
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/register.html')); // Note the path adjustment
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});