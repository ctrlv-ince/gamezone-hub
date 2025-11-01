/**
 * Registration Validator
 * Application-level validation for registration use case
 * Translates domain errors to application errors
 */

const validator = require('validator');
const { InvalidUserDataError } = require('../../domain/errors/DomainError');
const { VALIDATION_RULES, ERROR_MESSAGES } = require('../../config/constants');

class RegistrationValidator {
  /**
   * Validate registration data
   * @param {RegisterUserDTO} dto - Registration data
   * @throws {InvalidUserDataError} If validation fails
   */
  static validate(dto) {
    const errors = [];

    // Required fields
    if (!dto.name?.trim() || !dto.email?.trim() || !dto.password?.trim() ||
        !dto.confirmPassword?.trim() || !dto.address?.trim() || !dto.contactNumber?.trim()) {
      errors.push(ERROR_MESSAGES.MISSING_FIELDS);
    }

    // Name validation
    if (dto.name) {
      if (dto.name.length < VALIDATION_RULES.NAME_MIN_LENGTH) {
        errors.push(`Name must be at least ${VALIDATION_RULES.NAME_MIN_LENGTH} characters`);
      }
      if (dto.name.length > VALIDATION_RULES.NAME_MAX_LENGTH) {
        errors.push(ERROR_MESSAGES.NAME_TOO_LONG);
      }
    }

    // Email validation
    if (dto.email && !validator.isEmail(dto.email)) {
      errors.push(ERROR_MESSAGES.INVALID_EMAIL);
    }

    // Password validation
    if (dto.password && dto.password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
      errors.push(ERROR_MESSAGES.PASSWORD_TOO_SHORT);
    }

    // Password match validation
    if (dto.password !== dto.confirmPassword) {
      errors.push(ERROR_MESSAGES.PASSWORD_MISMATCH);
    }

    if (errors.length > 0) {
      throw new InvalidUserDataError(errors[0]);
    }
  }
}

module.exports = RegistrationValidator;