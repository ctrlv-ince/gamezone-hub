const admin = require('../config/firebase');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const idToken = authHeader.substring(7);

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      // Generate a unique username
      let username = name || email.split('@')[0];
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        username = `${username}_${Date.now()}`;
      }

      user = new User({
        email,
        firebaseUid: uid,
        username,
        avatar: picture,
      });
      await user.save();
    } else {
      // Update user data if available and different
      if (name && user.username !== name) user.username = name;
      if (picture && user.avatar !== picture) user.avatar = picture;
      if (user.email !== email) user.email = email;
      await user.save();
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ msg: 'Token expired. Please refresh your session.' });
    }
    if (error.code === 'auth/id-token-revoked') {
      return res.status(401).json({ msg: 'Token revoked. Please sign in again.' });
    }
    res.status(401).json({ msg: 'Authentication failed' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ msg: 'Access denied. Not an admin.' });
  }
};

module.exports = { auth, isAdmin };