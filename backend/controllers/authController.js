const User = require('../models/User');
const authService = require('../services/authService');
const admin = require('../config/firebase');

const getMe = async (req, res) => {
  try {
    // req.user is populated by the auth middleware
    const user = await authService.getMe(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await authService.updateProfile(req.user.id, req.body);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
const googleSignIn = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ msg: 'ID token is required' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    let user = await User.findOne({ email });

    if (!user) {
      // User does not exist, create a new one
      let username = name || email.split('@')[0];
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        username = `${username}_${Date.now()}`;
      }
      user = new User({
        email,
        username,
        avatar: picture,
        firebaseUid: uid,
      });
    } else {
      // User exists, update their info
      if (!user.firebaseUid) {
        user.firebaseUid = uid;
      }
      if (name && !user.username) {
        user.username = name;
      }
      if (picture && !user.avatar) {
        user.avatar = picture;
      }
    }

    await user.save();

    // Generate a JWT token
    const token = authService.generateToken(user);

    res.json({
      token,
      user,
    });
  } catch (err) {
    console.error('Google sign-in error:', err.message);
    if (err.code === 'auth/id-token-expired') {
      return res.status(401).json({ msg: 'Token expired' });
    }
    if (err.code === 'auth/id-token-revoked') {
      return res.status(401).json({ msg: 'Token revoked' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

const logout = async (req, res) => {
  try {
    // In Firebase, logout is typically handled on the client side
    // This endpoint can be used for server-side cleanup if needed
    res.json({ msg: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = {
  getMe,
  updateProfile,
  googleSignIn,
  logout,
};