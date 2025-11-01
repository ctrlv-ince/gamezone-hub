/**
 * Auth Controller
 * Presentation layer - HTTP request/response handling
 * Delegates business logic to use cases
 *
 * Responsibilities:
 * - Parse HTTP requests
 * - Call appropriate use cases
 * - Format responses
 * - Delegate errors to middleware
 *
 * Does NOT contain business logic
 */

const RegisterUserDTO = require('../../application/dtos/RegisterUserDTO');
const LoginUserDTO = require('../../application/dtos/LoginUserDTO');
const UpdateProfileDTO = require('../../application/dtos/UpdateProfileDTO');
const { asyncHandler } = require('../../infrastructure/middleware/ErrorHandlingMiddleware');

class AuthController {
  constructor(
    registerUseCase,
    loginUseCase,
    getCurrentUserUseCase,
    updateProfileUseCase,
    updateAvatarUseCase,
    tokenProvider
  ) {
    this.registerUseCase = registerUseCase;
    this.loginUseCase = loginUseCase;
    this.getCurrentUserUseCase = getCurrentUserUseCase;
    this.updateProfileUseCase = updateProfileUseCase;
    this.updateAvatarUseCase = updateAvatarUseCase;
    this.tokenProvider = tokenProvider;
  }

  /**
   * POST /api/auth/register
   * Register new user
   */
  register = asyncHandler(async (req, res) => {
    const dto = RegisterUserDTO.fromRequest(req.body, req.file);
    const result = await this.registerUseCase.execute(dto);

    // Generate token
    const token = await this.tokenProvider.generateToken(result.user.id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: result.user,
        token
      }
    });
  });

  /**
   * POST /api/auth/login
   * Login user
   */
  login = asyncHandler(async (req, res) => {
    const dto = LoginUserDTO.fromRequest(req.body);
    const result = await this.loginUseCase.execute(dto);

    // Generate token
    const token = await this.tokenProvider.generateToken(result.user.id);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: {
        user: result.user,
        token
      }
    });
  });

  /**
   * GET /api/auth/me
   * Get current user
   */
  getCurrentUser = asyncHandler(async (req, res) => {
    const result = await this.getCurrentUserUseCase.execute(req.user.id);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: result
    });
  });

  /**
   * POST /api/auth/logout
   * Logout user
   */
  logout = asyncHandler(async (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  });

  /**
   * PUT /api/auth/profile
   * Update user profile
   */
  updateProfile = asyncHandler(async (req, res) => {
    const dto = UpdateProfileDTO.fromRequest(req.body);
    const result = await this.updateProfileUseCase.execute(req.user.id, dto);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: result
    });
  });

  /**
   * PUT /api/auth/avatar
   * Update user avatar
   */
  updateAvatar = asyncHandler(async (req, res) => {
    const result = await this.updateAvatarUseCase.execute(req.user.id, req.file);

    res.status(200).json({
      success: true,
      message: 'Avatar updated successfully',
      data: result
    });
  });
}

module.exports = AuthController;