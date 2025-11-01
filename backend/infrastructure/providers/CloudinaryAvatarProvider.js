/**
 * Cloudinary Avatar Provider Implementation
 * Concrete implementation of IAvatarProvider interface
 * Handles avatar upload/delete using Cloudinary
 */

const fs = require('fs');
const cloudinary = require('../../config/cloudinary');
const IAvatarProvider = require('../../domain/repositories/IAvatarProvider');
const { UPLOAD_CONFIG, ERROR_MESSAGES } = require('../../config/constants');
const { InvalidAvatarError, AvatarDeletionError } = require('../../domain/errors/DomainError');

class CloudinaryAvatarProvider extends IAvatarProvider {
  /**
   * Upload avatar to Cloudinary
   */
  async upload(filePath, folder = UPLOAD_CONFIG.AVATAR_FOLDER) {
    if (!filePath) {
      throw new InvalidAvatarError(ERROR_MESSAGES.NO_FILE);
    }

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: folder,
        resource_type: 'auto'
      });

      return {
        public_id: result.public_id,
        url: result.secure_url
      };
    } catch (error) {
      throw new InvalidAvatarError(`Upload failed: ${error.message}`);
    }
  }

  /**
   * Delete avatar from Cloudinary
   */
  async delete(publicId) {
    if (publicId === 'default') {
      return; // Don't delete default avatar
    }

    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error('Error deleting avatar from Cloudinary:', error);
      throw new AvatarDeletionError(error.message);
    }
  }

  /**
   * Validate avatar file
   */
  validateFile(file) {
    if (!file) {
      throw new InvalidAvatarError(ERROR_MESSAGES.NO_FILE);
    }

    if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE) {
      throw new InvalidAvatarError(ERROR_MESSAGES.FILE_TOO_LARGE);
    }

    if (!UPLOAD_CONFIG.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new InvalidAvatarError(ERROR_MESSAGES.INVALID_FILE_TYPE);
    }
  }

  /**
   * Get default avatar
   */
  getDefaultAvatar() {
    return {
      public_id: 'default',
      url: 'https://via.placeholder.com/150?text=Avatar'
    };
  }
}

module.exports = CloudinaryAvatarProvider;