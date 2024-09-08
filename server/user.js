const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./database');
const router = express.Router(); // Make sure to use 'router'

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await db.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
  
  req.session.userId = result.rows[0].id;
  res.redirect('/');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);

  if (result.rows.length > 0) {
    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (isValidPassword) {
      req.session.userId = user.id;
      res.redirect('/');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } else {
    res.status(401).send('Invalid credentials');
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;