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

  const token = generateToken(user);

  return { token, user };
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

module.exports = {
  getMe,
  updateProfile,
  login,
  generateToken,
  googleSignIn,
};