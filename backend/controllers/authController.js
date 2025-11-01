/**
 * Auth Controller
 * Route handlers for authentication endpoints
 * Delegates business logic to services
 */

const authService = require('../services/authService');
const { sendSuccess, sendError } = require('../utils/responseHandler');

/**
 * POST /api/auth/register
 * Register new user
 */
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, address, contactNumber } = req.body;

    const result = await authService.registerUser({
      name,
      email,
      password,
      confirmPassword,
      address,
      contactNumber,
      avatarFile: req.file
    });

    sendSuccess(res, 'User registered successfully', result, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/login
 * Login user
 */
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);

    sendSuccess(res, 'Logged in successfully', result);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/me
 * Get current user
 */
exports.getCurrentUser = async (req, res, next) => {
  try {
    const result = await authService.getCurrentUser(req.user.id);

    sendSuccess(res, 'User fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/logout
 * Logout user (typically handled on frontend)
 */
exports.logoutUser = async (req, res, next) => {
  try {
    sendSuccess(res, 'Logged out successfully', {});
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/auth/profile
 * Update user profile
 */
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email, address, contactNumber } = req.body;

    const result = await authService.updateUserProfile(req.user.id, {
      name,
      email,
      address,
      contactNumber
    });

    sendSuccess(res, result.message, { user: result.user });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/auth/avatar
 * Update user avatar
 */
exports.updateAvatar = async (req, res, next) => {
  try {
    const result = await authService.updateUserAvatar(req.user.id, req.file);

    sendSuccess(res, result.message, { user: result.user });
  } catch (error) {
    next(error);
  }
};