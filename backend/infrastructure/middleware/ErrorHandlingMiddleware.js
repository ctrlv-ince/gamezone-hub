/**
 * Error Handling Middleware
 * Converts domain/application errors to HTTP responses
 * Acts as adapter between domain layer and HTTP presentation
 *
 * Flow:
 * Domain Layer → Throws DomainError
 * Application Layer → Throws ApplicationError
 * Presentation Layer → Catches and handles via this middleware
 * HTTP Response → Sent to client
 */

const { HTTP_STATUS } = require('../../config/constants');
const {
  DomainError,
  UserAlreadyExistsError,
  UserNotFoundError,
  InvalidPasswordError,
  EmailAlreadyInUseError,
  InvalidUserDataError,
  InvalidAvatarError,
  AvatarUploadError,
  AvatarDeletionError,
  AuthenticationFailedError,
  TokenGenerationError,
  TokenVerificationError
} = require('../../domain/errors/DomainError');

/**
 * Main error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', {
    name: err.name,
    message: err.message,
    code: err.code,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  // Domain/Application Errors
  if (err instanceof UserAlreadyExistsError) {
    return res.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      message: err.message,
      code: err.code
    });
  }

  if (err instanceof UserNotFoundError) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: err.message,
      code: err.code
    });
  }

  if (err instanceof EmailAlreadyInUseError) {
    return res.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      message: err.message,
      code: err.code
    });
  }

  if (err instanceof AuthenticationFailedError) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid email or password',
      code: err.code
    });
  }

  if (err instanceof TokenVerificationError) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid or expired token',
      code: err.code
    });
  }

  if (err instanceof InvalidUserDataError || err instanceof InvalidAvatarError) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: err.message,
      code: err.code
    });
  }

  if (err instanceof AvatarUploadError || err instanceof AvatarDeletionError) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message,
      code: err.code
    });
  }

  if (err instanceof TokenGenerationError) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to generate token',
      code: err.code
    });
  }

  // Generic Domain Error
  if (err instanceof DomainError) {
    const statusCode = mapErrorCodeToStatus(err.code);
    return res.status(statusCode).json({
      success: false,
      message: err.message,
      code: err.code
    });
  }

  // JWT Errors (from jsonwebtoken library)
  if (err.name === 'JsonWebTokenError') {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Token expired'
    });
  }

  // Mongoose Validation Errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: messages[0] || 'Validation error'
    });
  }

  // MongoDB Duplicate Key Errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      message: `${field} already exists`
    });
  }

  // Generic server error
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * Map error codes to HTTP status codes
 */
function mapErrorCodeToStatus(code) {
  const mapping = {
    'USER_ALREADY_EXISTS': HTTP_STATUS.CONFLICT,
    'USER_NOT_FOUND': HTTP_STATUS.NOT_FOUND,
    'EMAIL_ALREADY_IN_USE': HTTP_STATUS.CONFLICT,
    'AUTHENTICATION_FAILED': HTTP_STATUS.UNAUTHORIZED,
    'TOKEN_VERIFICATION_ERROR': HTTP_STATUS.UNAUTHORIZED,
    'INVALID_USER_DATA': HTTP_STATUS.BAD_REQUEST,
    'INVALID_AVATAR': HTTP_STATUS.BAD_REQUEST,
    'AVATAR_UPLOAD_ERROR': HTTP_STATUS.INTERNAL_SERVER_ERROR,
    'AVATAR_DELETION_ERROR': HTTP_STATUS.INTERNAL_SERVER_ERROR,
    'TOKEN_GENERATION_ERROR': HTTP_STATUS.INTERNAL_SERVER_ERROR
  };

  return mapping[code] || HTTP_STATUS.INTERNAL_SERVER_ERROR;
}

/**
 * Async error wrapper
 * Wraps async route handlers to catch errors
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  errorHandler,
  asyncHandler,
  mapErrorCodeToStatus
};