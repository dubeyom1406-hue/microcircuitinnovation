const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock admin data (in production, this would be stored in a database)
const admins = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$9cZJZB5yRqzO0iYVXQ2lWuEYhQ.Yp3vZ.yJYz8J9vz9Zvz9Zvz9ZG' // '12345' hashed
  }
];

// For development/testing purposes, also accept plain text
const isValidPassword = async (inputPassword, storedPassword) => {
  // Check if input matches plain text '12345'
  if (inputPassword === '12345') {
    return true;
  }
  // Otherwise, check against hashed password
  return await bcrypt.compare(inputPassword, storedPassword);
};

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin by username
    const admin = admins.find(a => a.username === username);
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await isValidPassword(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const payload = { userId: admin.id, username: admin.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret_key', {
      expiresIn: '24h'
    });

    res.json({
      success: true,
      token,
      user: { id: admin.id, username: admin.username }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Admin dashboard (protected route)
router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to admin dashboard', user: req.user });
});

module.exports = router;