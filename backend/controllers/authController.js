const authService = require('../services/authService');
const admin = require('../config/firebase');

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
const googleSignIn = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ msg: 'ID token is required' });
  }

  try {
    const { token, user } = await authService.googleSignIn(idToken);
    res.json({ token, user });
  } catch (err) {
    console.error('Google sign-in error:', err.message);
    if (err.code === 'auth/id-token-expired') {
      return res.status(401).json({ msg: 'Token expired' });
    }
    if (err.code === 'auth/id-token-revoked') {
      return res.status(401).json({ msg: 'Token revoked' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

const logout = async (req, res) => {
  try {
    res.json({ msg: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};
const login = async (req, res) => {
  const { loginIdentifier, password } = req.body;

  if (!loginIdentifier || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const customToken = await authService.login(loginIdentifier, password);
    res.json({ customToken });
  } catch (err) {
    console.error('Login error:', err.message);
    if (err.message === 'Invalid credentials') {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = {
  getMe,
  updateProfile,
  googleSignIn,
  logout,
  login,
};