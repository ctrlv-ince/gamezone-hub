/**
 * Auth Routes
 * Presentation layer - HTTP route definitions
 *
 * Responsibilities:
 * - Define HTTP routes
 * - Bind controllers to routes
 * - Apply middleware
 * - Handle file uploads
 */

const express = require('express');
const { upload, handleUploadError } = require('../../middleware/upload');

/**
 * Factory function to create auth routes
 * Receives injected controller and middleware
 */
function createAuthRoutes(authController, authenticate) {
  const router = express.Router();

  // Public routes
  router.post(
    '/register',
    upload.single('avatar'),
    handleUploadError,
    authController.register
  );

  router.post('/login', authController.login);

  router.post('/logout', authController.logout);

  // Protected routes
  router.get('/me', authenticate, authController.getCurrentUser);

  router.put(
    '/profile',
    authenticate,
    authController.updateProfile
  );

  router.put(
    '/avatar',
    authenticate,
    upload.single('avatar'),
    handleUploadError,
    authController.updateAvatar
  );

  return router;
}

module.exports = createAuthRoutes;