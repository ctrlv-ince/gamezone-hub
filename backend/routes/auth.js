const express = require('express');
const router = express.Router();
const { getMe, updateProfile } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

router.get('/me', auth, getMe);
router.put('/me/update', auth, updateProfile);

module.exports = router;