/**
 * Application Constants
 * Centralize all magic strings and configurations
 */

const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  AVATAR_FOLDER: 'gamezone/avatars',
  PRODUCT_FOLDER: 'gamezone/products'
};

const VALIDATION_RULES = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 30,
  PASSWORD_MIN_LENGTH: 6,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

const ERROR_MESSAGES = {
  // Auth
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'User not found',
  USER_EXISTS: 'User already exists with this email',
  EMAIL_IN_USE: 'Email already in use',
  UNAUTHORIZED_ACCESS: 'Unauthorized access',
  PLEASE_LOGIN: 'Please login to access this resource',

  // Validation
  MISSING_FIELDS: 'Please provide all required fields',
  INVALID_EMAIL: 'Please enter a valid email',
  PASSWORD_MISMATCH: 'Passwords do not match',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters',
  NAME_TOO_LONG: 'Name cannot exceed 30 characters',

  // File Upload
  NO_FILE: 'Please upload an image',
  INVALID_FILE_TYPE: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.',
  FILE_TOO_LARGE: 'File size must not exceed 5MB',
  UPLOAD_ERROR: 'Upload error',
  CLOUDINARY_ERROR: 'Cloudinary upload error',

  // General
  INSUFFICIENT_PERMISSIONS: 'Insufficient permissions',
  INTERNAL_ERROR: 'Internal server error',
  OPERATION_FAILED: 'Operation failed'
};

const SUCCESS_MESSAGES = {
  REGISTERED: 'User registered successfully',
  LOGGED_IN: 'Logged in successfully',
  LOGGED_OUT: 'Logged out successfully',
  AVATAR_UPDATED: 'Avatar updated successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  OPERATION_SUCCESS: 'Operation completed successfully'
};

module.exports = {
  UPLOAD_CONFIG,
  VALIDATION_RULES,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES
};