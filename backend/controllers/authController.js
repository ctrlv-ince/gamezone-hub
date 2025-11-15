const authService = require('../services/authService');

const registerUser = async (req, res) => {
  try {
    const { token } = await authService.register(req.body);
    res.json({ token });
  } catch (err) {
    if (err.message === 'User already exists') {
      return res.status(400).json({ msg: err.message });
    }
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const loginUser = async (req, res) => {
  try {
    const { token } = await authService.login(req.body);
    res.json({ token });
  } catch (err) {
    if (err.message === 'Invalid Credentials') {
      return res.status(400).json({ msg: err.message });
    }
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getMe = async (req, res) => {
  try {
    const user = await authService.getMe(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};