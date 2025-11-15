const authService = require('../services/authService');

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

module.exports = {
  getMe,
  updateProfile,
};