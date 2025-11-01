/**
 * Bcrypt Password Provider Implementation
 * Concrete implementation of IPasswordProvider interface
 * Handles password hashing and comparison using bcryptjs
 */

const bcrypt = require('bcryptjs');
const IPasswordProvider = require('../../domain/repositories/IPasswordProvider');

class BcryptPasswordProvider extends IPasswordProvider {
  constructor(saltRounds = 10) {
    super();
    this.saltRounds = saltRounds;
  }

  /**
   * Hash password
   */
  async hash(password) {
    return bcrypt.hash(password, this.saltRounds);
  }

  /**
   * Compare plain password with hash
   */
  async compare(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = BcryptPasswordProvider;