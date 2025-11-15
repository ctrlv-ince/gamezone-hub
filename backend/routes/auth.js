const express = require('express');
const router = express.Router();
const { getMe } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

router.get('/me', auth, getMe);

module.exports = router;