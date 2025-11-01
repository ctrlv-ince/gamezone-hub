/**
 * Avatar Provider Interface
 * Defines the contract for avatar storage operations
 * Implementations can use Cloudinary, S3, or local storage
 */

class IAvatarProvider {
  /**
   * Upload avatar to storage
   * @param {string} filePath - Path to uploaded file
   * @param {string} folder - Storage folder/namespace
   * @returns {Promise<{public_id: string, url: string}>}
   */
  async upload(filePath, folder) {
    throw new Error('Method upload must be implemented');
  }

  /**
   * Delete avatar from storage
   * @param {string} publicId - Public ID of avatar
   * @returns {Promise<void>}
   */
  async delete(publicId) {
    throw new Error('Method delete must be implemented');
  }

  /**
   * Validate avatar file
   * @param {Object} file - File object from multer
   * @throws {InvalidAvatarError} If file is invalid
   */
  validateFile(file) {
    throw new Error('Method validateFile must be implemented');
  }

  /**
   * Get default avatar object
   * @returns {Object} Default avatar {public_id, url}
   */
  getDefaultAvatar() {
    throw new Error('Method getDefaultAvatar must be implemented');
  }
}

module.exports = IAvatarProvider;