import admin from '../config/firebase.js';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const idToken = authHeader.split('Bearer ');

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      user = new User({
        email,
        firebaseUid: uid,
        username: email,
      });
      await user.save();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ msg: 'Access denied. Not an admin.' });
  }
};

export { auth, isAdmin };