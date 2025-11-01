/**
 * Frontend Constants
 * Centralize all magic strings, URLs, and configurations
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/api',
  ENDPOINTS: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    GET_ME: '/auth/me',
    UPDATE_PROFILE: '/auth/profile',
    UPDATE_AVATAR: '/auth/avatar'
  },
  TIMEOUT: 10000 // 10 seconds
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'token',
  USER_DATA: 'user'
};

// Form Validation Rules
export const VALIDATION_RULES = {
  NAME_MIN: 2,
  NAME_MAX: 30,
  PASSWORD_MIN: 6,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  FILE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Please login to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'Resource not found.',
  
  // Auth
  LOGIN_FAILED: 'Login failed. Please check your credentials.',
  REGISTER_FAILED: 'Registration failed. Please try again.',
  LOGOUT_FAILED: 'Logout failed.',
  PROFILE_UPDATE_FAILED: 'Failed to update profile.',
  AVATAR_UPDATE_FAILED: 'Failed to update avatar.',
  
  // Validation
  INVALID_EMAIL: 'Please enter a valid email address.',
  PASSWORD_MISMATCH: 'Passwords do not match.',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters.',
  NAME_REQUIRED: 'Name is required.',
  NAME_TOO_SHORT: 'Name must be at least 2 characters.',
  NAME_TOO_LONG: 'Name cannot exceed 30 characters.',
  EMAIL_REQUIRED: 'Email is required.',
  ADDRESS_REQUIRED: 'Address is required.',
  CONTACT_REQUIRED: 'Contact number is required.',
  
  // File Upload
  FILE_REQUIRED: 'Please select a file.',
  FILE_TOO_LARGE: 'File is too large. Maximum size is 5MB.',
  INVALID_FILE_TYPE: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.',
  
  // General
  REQUIRED_FIELD: 'This field is required.',
  OPERATION_FAILED: 'Operation failed. Please try again.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  REGISTERED: 'Registration successful! Redirecting to login...',
  LOGGED_IN: 'Welcome back!',
  LOGGED_OUT: 'Logged out successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  AVATAR_UPDATED: 'Avatar updated successfully.',
  OPERATION_SUCCESS: 'Operation completed successfully.'
};

// Routes
export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/',
  UPDATE_PROFILE: '/update-profile'
};

// UI Configuration
export const UI_CONFIG = {
  TOAST_POSITION: 'top-right',
  TOAST_AUTO_CLOSE: 3000,
  TOAST_PAUSE_ON_HOVER: true
};

// Default Values
export const DEFAULT_VALUES = {
  AVATAR_URL: 'https://via.placeholder.com/150?text=Avatar'
};