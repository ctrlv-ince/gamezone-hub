/**
 * Avatar Service
 * Business logic for avatar upload and management
 */

const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const { UPLOAD_CONFIG, ERROR_MESSAGES } = require('../config/constants');
const { ValidationError, ServerError } = require('../utils/errorHandler');

class AvatarService {
  /**
   * Upload avatar to Cloudinary
   */
  async uploadAvatar(filePath, folder = UPLOAD_CONFIG.AVATAR_FOLDER) {
    try {
      if (!filePath) {
        throw new ValidationError(ERROR_MESSAGES.NO_FILE);
      }

      const result = await cloudinary.uploader.upload(filePath, {
        folder: folder,
        resource_type: 'auto'
      });

      return {
        public_id: result.public_id,
        url: result.secure_url
      };
    } catch (error) {
      if (error.name === 'ValidationError') throw error;
      throw new ServerError(`${ERROR_MESSAGES.CLOUDINARY_ERROR}: ${error.message}`);
    }
  }

  /**
   * Delete avatar from Cloudinary
   */
  async deleteAvatar(publicId) {
    try {
      if (publicId === 'default') {
        return; // Don't delete default avatar
      }

      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      console.error('Error deleting avatar from Cloudinary:', error);
      // Don't throw - old avatar deletion should not block operations
    }
  }

  /**
   * Delete temporary file
   */
  deleteTemporaryFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Error deleting temporary file:', error);
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

  /**
   * Validate avatar file
   */
  validateAvatarFile(file) {
    if (!file) {
      throw new ValidationError(ERROR_MESSAGES.NO_FILE);
    }

    if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE) {
      throw new ValidationError(ERROR_MESSAGES.FILE_TOO_LARGE);
    }

    if (!UPLOAD_CONFIG.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new ValidationError(ERROR_MESSAGES.INVALID_FILE_TYPE);
    }
  }
}

module.exports = new AvatarService();