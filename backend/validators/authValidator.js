/**
 * Auth Validators
 * Validation schemas for authentication endpoints
 */

const validator = require('validator');
const { VALIDATION_RULES, ERROR_MESSAGES } = require('../config/constants');

const validateRegistration = (name, email, password, confirmPassword, address, contactNumber) => {
  const errors = [];

  if (!name || !email || !password || !confirmPassword || !address || !contactNumber) {
    errors.push(ERROR_MESSAGES.MISSING_FIELDS);
  }

  if (name && name.length < VALIDATION_RULES.NAME_MIN_LENGTH) {
    errors.push(`Name must be at least ${VALIDATION_RULES.NAME_MIN_LENGTH} characters`);
  }

  if (name && name.length > VALIDATION_RULES.NAME_MAX_LENGTH) {
    errors.push(ERROR_MESSAGES.NAME_TOO_LONG);
  }

  if (email && !validator.isEmail(email)) {
    errors.push(ERROR_MESSAGES.INVALID_EMAIL);
  }

  if (password && password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    errors.push(ERROR_MESSAGES.PASSWORD_TOO_SHORT);
  }

  if (password && password !== confirmPassword) {
    errors.push(ERROR_MESSAGES.PASSWORD_MISMATCH);
  }

  return errors;
};

const validateLogin = (email, password) => {
  const errors = [];

  if (!email || !password) {
    errors.push(ERROR_MESSAGES.MISSING_FIELDS);
  }

  if (email && !validator.isEmail(email)) {
    errors.push(ERROR_MESSAGES.INVALID_EMAIL);
  }

  return errors;
};

const validateProfileUpdate = (name, email, address, contactNumber) => {
  const errors = [];

  if (!name || !email || !address || !contactNumber) {
    errors.push(ERROR_MESSAGES.MISSING_FIELDS);
  }

  if (name && name.length < VALIDATION_RULES.NAME_MIN_LENGTH) {
    errors.push(`Name must be at least ${VALIDATION_RULES.NAME_MIN_LENGTH} characters`);
  }

  if (name && name.length > VALIDATION_RULES.NAME_MAX_LENGTH) {
    errors.push(ERROR_MESSAGES.NAME_TOO_LONG);
  }

  if (email && !validator.isEmail(email)) {
    errors.push(ERROR_MESSAGES.INVALID_EMAIL);
  }

  return errors;
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateProfileUpdate
};