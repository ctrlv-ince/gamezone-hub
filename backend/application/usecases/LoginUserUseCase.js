/**
 * Login User Use Case
 * Application business logic for user authentication
 */

const LoginValidator = require('../validators/LoginValidator');
const {
  AuthenticationFailedError,
  UserNotFoundError,
  InvalidPasswordError,
  InvalidUserDataError
} = require('../../domain/errors/DomainError');
const UserResponseDTO = require('../dtos/UserResponseDTO');

class LoginUserUseCase {
  constructor(userRepository, passwordProvider) {
    this.userRepository = userRepository;
    this.passwordProvider = passwordProvider;
  }

  /**
   * Execute login use case
   * @param {LoginUserDTO} loginDTO - Login data
   * @returns {Promise<{user: UserResponseDTO, token: string}>}
   */
  async execute(loginDTO) {
    // Validate input
    LoginValidator.validate(loginDTO);

    // Find user with password
    const userEntity = await this.userRepository.findByEmailWithPassword(loginDTO.email);
    if (!userEntity) {
      throw new AuthenticationFailedError();
    }

    // Compare password
    const isPasswordValid = await this.passwordProvider.compare(
      loginDTO.password,
      userEntity.passwordHash
    );
    if (!isPasswordValid) {
      throw new AuthenticationFailedError();
    }

    // Return response (without password)
    return {
      user: UserResponseDTO.fromEntity(userEntity),
      token: null // Token generated in presentation layer
    };
  }
}

module.exports = LoginUserUseCase;