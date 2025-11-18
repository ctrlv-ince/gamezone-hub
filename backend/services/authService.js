const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('../config/firebase');

const googleSignIn = async (idToken) => {
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const { uid, email, name, picture } = decodedToken;

  let user = await User.findOne({ email });

  if (!user) {
    // User does not exist, create a new one
    let username = name || email.split('@');
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
  const token = generateToken(user);

  return { token, user };
};

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

const login = async (loginIdentifier, password) => {
  const user = await User.findOne({
    $or: [{ email: loginIdentifier }, { username: loginIdentifier }],
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  if (!user.firebaseUid) {
    try {
      const firebaseUser = await admin.auth().createUser({
        email: user.email,
        password: password,
      });
      user.firebaseUid = firebaseUser.uid;
      await user.save();
    } catch (error) {
      // If user already exists in firebase, try to get the user and update the local db
      if (error.code === 'auth/email-already-exists') {
        const firebaseUser = await admin.auth().getUserByEmail(user.email);
        user.firebaseUid = firebaseUser.uid;
        await user.save();
      } else {
        throw error;
      }
    }
  }

  const customToken = await admin.auth().createCustomToken(user.firebaseUid);

  return customToken;
};

const getMe = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('getMe error:', error.message);
    throw error;
  }
};

const updateProfile = async (userId, profileData) => {
  try {
    // Validate profileData to prevent malicious updates
    const allowedFields = ['username', 'avatar', 'email'];
    const filteredData = {};
    Object.keys(profileData).forEach(key => {
      if (allowedFields.includes(key)) {
        filteredData[key] = profileData[key];
      }
    });

    const user = await User.findByIdAndUpdate(userId, filteredData, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.error('updateProfile error:', error.message);
    throw error;
  }
};

const createUser = async (userData) => {
  const { username, email, firebaseUid, password } = userData;
  let user = await User.findOne({ email });

  if (user) {
    // User exists, update firebaseUid if it's not already set
    if (!user.firebaseUid) {
      user.firebaseUid = firebaseUid;
    }
    // If the user exists but doesn't have a password, set it
    if (password && !user.password) {
      user.password = password;
    }
    await user.save();
  } else {
    // User does not exist, create a new one
    user = new User({
      username,
      email,
      firebaseUid,
      password,
    });
    await user.save();
  }

  const token = generateToken(user);
  return { user, token };
};

module.exports = {
  getMe,
  updateProfile,
  login,
  generateToken,
  googleSignIn,
  createUser,
};