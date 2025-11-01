/**
 * Authentication Middleware
 * JWT token verification and user identification
 *
 * Moved from presentation layer to infrastructure layer
 * - Infrastructure handles cross-cutting concerns
 * - Validates tokens using domain providers
 * - Attaches user to request for use in controllers
 */

const { TokenVerificationError } = require('../../domain/errors/DomainError');

/**
 * Factory function to create authentication middleware
 */
function createAuthenticationMiddleware(tokenProvider, userRepository) {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new TokenVerificationError();
      }

      // Verify token and get payload
      const payload = await tokenProvider.verifyToken(token);
      req.user = { id: payload.id };
      next();
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Factory function to create authorization middleware
 */
function createAuthorizationMiddleware(userRepository) {
  return (...allowedRoles) => {
    return async (req, res, next) => {
      try {
        if (!req.user) {
          throw new TokenVerificationError();
        }

        const userEntity = await userRepository.findById(req.user.id);
        if (!userEntity) {
          throw new TokenVerificationError();
        }

        if (!allowedRoles.includes(userEntity.role)) {
          return res.status(403).json({
            success: false,
            message: 'Insufficient permissions'
          });
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  };
}

module.exports = {
  createAuthenticationMiddleware,
  createAuthorizationMiddleware
};