const User = require('../models/User');

const getMe = async (userId) => {
  const user = await User.findById(userId).select('-password');
  return user;
};

module.exports = {
  getMe,
};