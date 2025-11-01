const express = require('express');
const { registerUser, loginUser, getCurrentUser, logoutUser, updateAvatar, updateProfile } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');

const router = express.Router();

// Auth routes
router.post('/register', upload.single('avatar'), handleUploadError, registerUser);
router.post('/login', loginUser);
router.get('/me', authenticate, getCurrentUser);
router.post('/logout', logoutUser);
router.put('/avatar', authenticate, upload.single('avatar'), handleUploadError, updateAvatar);
router.put('/profile', authenticate, updateProfile);

module.exports = router;