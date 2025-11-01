/**
 * Domain Error Base Class
 * All domain-specific errors extend this
 * Domain errors represent business rule violations
 */

class DomainError extends Error {
  constructor(message, code = 'DOMAIN_ERROR') {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * User domain errors
 */
class UserAlreadyExistsError extends DomainError {
  constructor(email) {
    super(`User already exists with email: ${email}`, 'USER_ALREADY_EXISTS');
  }
}

class UserNotFoundError extends DomainError {
  constructor(userId) {
    super(`User not found: ${userId}`, 'USER_NOT_FOUND');
  }
}

class InvalidPasswordError extends DomainError {
  constructor() {
    super('Invalid password provided', 'INVALID_PASSWORD');
  }
}

class EmailAlreadyInUseError extends DomainError {
  constructor(email) {
    super(`Email already in use: ${email}`, 'EMAIL_ALREADY_IN_USE');
  }
}

class InvalidUserDataError extends DomainError {
  constructor(message) {
    super(message, 'INVALID_USER_DATA');
  }
}

/**
 * Avatar domain errors
 */
class InvalidAvatarError extends DomainError {
  constructor(message = 'Invalid avatar') {
    super(message, 'INVALID_AVATAR');
  }
}

class AvatarUploadError extends DomainError {
  constructor(message = 'Failed to upload avatar') {
    super(message, 'AVATAR_UPLOAD_ERROR');
  }
}

class AvatarDeletionError extends DomainError {
  constructor(message = 'Failed to delete avatar') {
    super(message, 'AVATAR_DELETION_ERROR');
  }
}

/**
 * Authentication domain errors
 */
class AuthenticationFailedError extends DomainError {
  constructor() {
    super('Authentication failed', 'AUTHENTICATION_FAILED');
  }
}

class TokenGenerationError extends DomainError {
  constructor() {
    super('Failed to generate token', 'TOKEN_GENERATION_ERROR');
  }
}

class TokenVerificationError extends DomainError {
  constructor() {
    super('Invalid or expired token', 'TOKEN_VERIFICATION_ERROR');
  }
}

module.exports = {
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
};