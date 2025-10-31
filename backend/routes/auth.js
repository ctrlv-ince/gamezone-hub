const express = require('express');
const { registerUser, loginUser, getCurrentUser, logoutUser } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticate, getCurrentUser);
router.post('/logout', logoutUser);

module.exports = router;