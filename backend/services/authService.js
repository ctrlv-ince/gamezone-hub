const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (userData) => {
  const { username, email, password } = userData;

  let useremail = await User.findOne({ email });
  let useruname = await User.findOne({ username });

  if (useremail || useruname) {
    throw new Error('User already exists');
  }

  const user = new User({
    username,
    email,
    password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  const payload = {
    user: {
      id: user.id,
    },
  };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) reject(err);
        resolve({ token });
      }
    );
  });
};

const login = async (credentials) => {
  const { email, password } = credentials;

  let user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid Credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid Credentials');
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) reject(err);
        resolve({ token });
      }
    );
  });
};

module.exports = {
  register,
  login,
};