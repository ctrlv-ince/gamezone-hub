/**
 * Login Validator
 * Application-level validation for login use case
 */

const validator = require('validator');
const { InvalidUserDataError } = require('../../domain/errors/DomainError');
const { ERROR_MESSAGES } = require('../../config/constants');

class LoginValidator {
  /**
   * Validate login data
   * @param {LoginUserDTO} dto - Login data
   * @throws {InvalidUserDataError} If validation fails
   */
  static validate(dto) {
    const errors = [];

    // Required fields
    if (!dto.email?.trim() || !dto.password?.trim()) {
      errors.push(ERROR_MESSAGES.MISSING_FIELDS);
    }

    // Email validation
    if (dto.email && !validator.isEmail(dto.email)) {
      errors.push(ERROR_MESSAGES.INVALID_EMAIL);
    }

    if (errors.length > 0) {
      throw new InvalidUserDataError(errors[0]);
    }
  }
}

module.exports = LoginValidator;