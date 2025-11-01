/**
 * Token Provider Interface
 * Defines the contract for JWT token operations
 * Implementations use jsonwebtoken or similar
 */

class ITokenProvider {
  /**
   * Generate JWT token
   * @param {string} userId - User ID to encode in token
   * @param {Object} options - Additional token options
   * @returns {Promise<string>} JWT token
   */
  async generateToken(userId, options = {}) {
    throw new Error('Method generateToken must be implemented');
  }

  /**
   * Verify JWT token
   * @param {string} token - Token to verify
   * @returns {Promise<Object>} Decoded token payload
   */
  async verifyToken(token) {
    throw new Error('Method verifyToken must be implemented');
  }

  /**
   * Decode token without verification
   * @param {string} token - Token to decode
   * @returns {Object} Decoded token payload
   */
  decodeToken(token) {
    throw new Error('Method decodeToken must be implemented');
  }
}

module.exports = ITokenProvider;