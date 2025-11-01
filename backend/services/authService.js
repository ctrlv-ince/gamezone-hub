/**
 * Auth Service
 * Business logic for authentication
 */

const userRepository = require('../repositories/userRepository');
const avatarService = require('./avatarService');
const { validateRegistration, validateLogin, validateProfileUpdate } = require('../validators/authValidator');
const { ERROR_MESSAGES, SUCCESS_MESSAGES } = require('../config/constants');
const { ValidationError, AuthenticationError, ConflictError, NotFoundError } = require('../utils/errorHandler');

class AuthService {
  /**
   * Register new user
   */
  async registerUser(registrationData) {
    const { name, email, password, confirmPassword, address, contactNumber, avatarFile } = registrationData;

    // Validate input
    const errors = validateRegistration(name, email, password, confirmPassword, address, contactNumber);
    if (errors.length > 0) {
      throw new ValidationError(errors[0]);
    }

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictError(ERROR_MESSAGES.USER_EXISTS);
    }

    // Handle avatar upload
    let avatar = avatarService.getDefaultAvatar();
    if (avatarFile) {
      avatarService.validateAvatarFile(avatarFile);
      try {
        avatar = await avatarService.uploadAvatar(avatarFile.path);
      } finally {
        avatarService.deleteTemporaryFile(avatarFile.path);
      }
    }

    // Create user
    const user = await userRepository.create({
      name,
      email,
      password,
      address,
      contactNumber,
      avatar
    });

    return {
      user: this.formatUserResponse(user),
      token: user.getJwtToken()
    };
  }

  /**
   * Login user
   */
  async loginUser(email, password) {
    // Validate input
    const errors = validateLogin(email, password);
    if (errors.length > 0) {
      throw new ValidationError(errors[0]);
    }

    // Find user with password field
    const user = await userRepository.findByEmailWithPassword(email);
    if (!user) {
      throw new AuthenticationError(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AuthenticationError(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    return {
      user: this.formatUserResponse(user),
      token: user.getJwtToken()
    };
  }

  /**
   * Get current user
   */
  async getCurrentUser(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User');
    }

    return {
      user: this.formatUserResponse(user)
    };
  }

  /**
   * Update user profile
   */
  async updateUserProfile(userId, profileData) {
    const { name, email, address, contactNumber } = profileData;

    // Validate input
    const errors = validateProfileUpdate(name, email, address, contactNumber);
    if (errors.length > 0) {
      throw new ValidationError(errors[0]);
    }

    // Find user
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User');
    }

    // Check if new email is already in use by another user
    if (email !== user.email) {
      const emailExists = await userRepository.emailExistsExcluding(email, userId);
      if (emailExists) {
        throw new ConflictError(ERROR_MESSAGES.EMAIL_IN_USE);
      }
    }

    // Update user
    const updatedUser = await userRepository.update(userId, {
      name,
      email,
      address,
      contactNumber
    });

    return {
      user: this.formatUserResponse(updatedUser),
      message: SUCCESS_MESSAGES.PROFILE_UPDATED
    };
  }

  /**
   * Update user avatar
   */
  async updateUserAvatar(userId, avatarFile) {
    if (!avatarFile) {
      throw new ValidationError(ERROR_MESSAGES.NO_FILE);
    }

    // Validate file
    avatarService.validateAvatarFile(avatarFile);

    // Find user
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User');
    }

    try {
      // Upload new avatar
      const newAvatar = await avatarService.uploadAvatar(avatarFile.path);

      // Delete old avatar (async, don't wait)
      if (user.avatar.public_id !== 'default') {
        avatarService.deleteAvatar(user.avatar.public_id).catch(err => {
          console.error('Background avatar deletion failed:', err);
        });
      }

      // Update user
      const updatedUser = await userRepository.update(userId, { avatar: newAvatar });

      return {
        user: this.formatUserResponse(updatedUser),
        message: SUCCESS_MESSAGES.AVATAR_UPDATED
      };
    } finally {
      avatarService.deleteTemporaryFile(avatarFile.path);
    }
  }

  /**
   * Format user response (exclude sensitive fields)
   */
  formatUserResponse(user) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      contactNumber: user.contactNumber,
      role: user.role,
      avatar: user.avatar
    };
  }
}

module.exports = new AuthService();