const User = require('../models/User');

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
};