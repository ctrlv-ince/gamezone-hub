/**
 * Profile Update Validator
 * Application-level validation for profile updates
 */

const validator = require('validator');
const { InvalidUserDataError } = require('../../domain/errors/DomainError');
const { VALIDATION_RULES, ERROR_MESSAGES } = require('../../config/constants');

class ProfileUpdateValidator {
  /**
   * Validate profile update data
   * @param {UpdateProfileDTO} dto - Profile update data
   * @throws {InvalidUserDataError} If validation fails
   */
  static validate(dto) {
    const errors = [];

    // Required fields
    if (!dto.name?.trim() || !dto.email?.trim() || !dto.address?.trim() || !dto.contactNumber?.trim()) {
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

    if (errors.length > 0) {
      throw new InvalidUserDataError(errors[0]);
    }
  }
}

module.exports = ProfileUpdateValidator;