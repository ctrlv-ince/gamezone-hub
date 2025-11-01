/**
 * Update User Avatar Use Case
 * Application business logic for avatar updates
 */

const {
  UserNotFoundError,
  InvalidAvatarError,
  AvatarUploadError
} = require('../../domain/errors/DomainError');
const UserResponseDTO = require('../dtos/UserResponseDTO');

class UpdateUserAvatarUseCase {
  constructor(userRepository, avatarProvider) {
    this.userRepository = userRepository;
    this.avatarProvider = avatarProvider;
  }

  /**
   * Execute avatar update use case
   * @param {string} userId - User ID
   * @param {Object} file - File object from multer
   * @returns {Promise<{user: UserResponseDTO}>}
   */
  async execute(userId, file) {
    if (!file) {
      throw new InvalidAvatarError('No file provided');
    }

    // Validate file
    this.avatarProvider.validateFile(file);

    // Get current user
    const userEntity = await this.userRepository.findById(userId);
    if (!userEntity) {
      throw new UserNotFoundError(userId);
    }

    try {
      // Upload new avatar
      const newAvatar = await this.avatarProvider.upload(
        file.path,
        'gamezone/avatars'
      );

      // Delete old avatar in background
      if (userEntity.avatar?.public_id && userEntity.avatar.public_id !== 'default') {
        this.avatarProvider.delete(userEntity.avatar.public_id).catch(err => {
          console.error('Background avatar deletion failed:', err);
        });
      }

      // Save new avatar to repository
      const updatedUser = await this.userRepository.update(userId, {
        avatar: newAvatar
      });

      return {
        user: UserResponseDTO.fromEntity(updatedUser)
      };
    } catch (error) {
      if (error instanceof InvalidAvatarError) {
        throw error;
      }
      throw new AvatarUploadError(error.message);
    } finally {
      // Clean up temp file
      this._deleteTemporaryFile(file.path);
    }
  }

  /**
   * Helper: Delete temporary uploaded file
   */
  _deleteTemporaryFile(filePath) {
    try {
      const fs = require('fs');
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Error deleting temporary file:', error);
      // Don't throw - cleanup should not fail the operation
    }
  }
}

module.exports = UpdateUserAvatarUseCase;