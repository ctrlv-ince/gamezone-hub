/**
 * Authentication Middleware
 * JWT token verification and user identification
 */

const jwt = require('jsonwebtoken');
const { AuthenticationError, AuthorizationError } = require('../utils/errorHandler');
const userRepository = require('../repositories/userRepository');

/**
 * Verify JWT token and attach user to request
 */
exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AuthenticationError('Please login to access this resource');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      next(error);
    } else if (error.name === 'JsonWebTokenError') {
      next(new AuthenticationError('Invalid token'));
    } else if (error.name === 'TokenExpiredError') {
      next(new AuthenticationError('Token expired'));
    } else {
      next(error);
    }
  }
};

/**
 * Verify user has required role
 */
exports.authorize = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        throw new AuthenticationError('Authentication required');
      }

      const user = await userRepository.findById(req.user.id);

      if (!user) {
        throw new AuthenticationError('User not found');
      }

      if (!allowedRoles.includes(user.role)) {
        throw new AuthorizationError('Insufficient permissions');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};