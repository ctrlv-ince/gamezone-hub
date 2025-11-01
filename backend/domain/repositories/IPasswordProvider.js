/**
 * Password Provider Interface
 * Defines the contract for password operations
 * Implementations use bcryptjs or similar
 */

class IPasswordProvider {
  /**
   * Hash password
   * @param {string} password - Plain password
   * @returns {Promise<string>} Hashed password
   */
  async hash(password) {
    throw new Error('Method hash must be implemented');
  }

  /**
   * Compare plain password with hash
   * @param {string} plainPassword - Plain password
   * @param {string} hashedPassword - Hashed password
   * @returns {Promise<boolean>}
   */
  async compare(plainPassword, hashedPassword) {
    throw new Error('Method compare must be implemented');
  }
}

module.exports = IPasswordProvider;