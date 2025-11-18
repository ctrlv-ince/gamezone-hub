const express = require('express');
const router = express.Router();
const {
  getMe,
  updateProfile,
  googleSignIn,
  logout,
  login,
  register,
} = require('../controllers/authController');
const { auth } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getMe);
router.put('/me/update', auth, updateProfile);
router.post('/google-signin', googleSignIn);
router.post('/logout', logout);

module.exports = router;