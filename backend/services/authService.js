const User = require('../models/User');

const getMe = async (userId) => {
  const user = await User.findById(userId).select('-password');
  return user;
};

const updateProfile = async (userId, profileData) => {
  const user = await User.findByIdAndUpdate(userId, profileData, {
    new: true,
  }).select('-password');
  return user;
};

module.exports = {
  getMe,
  updateProfile,
};