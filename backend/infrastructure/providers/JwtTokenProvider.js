/**
 * JWT Token Provider Implementation
 * Concrete implementation of ITokenProvider interface
 * Handles JWT token generation and verification
 */

const jwt = require('jsonwebtoken');
const ITokenProvider = require('../../domain/repositories/ITokenProvider');
const { TokenGenerationError, TokenVerificationError } = require('../../domain/errors/DomainError');

class JwtTokenProvider extends ITokenProvider {
  constructor(secret, expiresIn) {
    super();
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  /**
   * Generate JWT token
   */
  async generateToken(userId, options = {}) {
    try {
      const token = jwt.sign(
        { id: userId },
        this.secret,
        {
          expiresIn: options.expiresIn || this.expiresIn,
          ...options
        }
      );
      return token;
    } catch (error) {
      throw new TokenGenerationError();
    }
  }

  /**
   * Verify JWT token
   */
  async verifyToken(token) {
    try {
      const payload = jwt.verify(token, this.secret);
      return payload;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new TokenVerificationError();
      }
      throw new TokenVerificationError();
    }
  }

  /**
   * Decode token without verification
   */
  decodeToken(token) {
    return jwt.decode(token);
  }
}

module.exports = JwtTokenProvider;