/**
 * Register User Use Case
 * Application business logic for user registration
 * Orchestrates domain objects and infrastructure
 *
 * Use Case Pattern:
 * - Receives DTOs from presentation layer
 * - Applies validators (application layer)
 * - Uses domain entities and repositories (domain layer)
 * - Returns result to presentation layer
 */

const User = require('../../domain/entities/User');
const RegistrationValidator = require('../validators/RegistrationValidator');
const {
  UserAlreadyExistsError,
  InvalidAvatarError,
  AvatarUploadError,
  InvalidUserDataError
} = require('../../domain/errors/DomainError');
const UserResponseDTO = require('../dtos/UserResponseDTO');

class RegisterUserUseCase {
  constructor(userRepository, passwordProvider, avatarProvider) {
    this.userRepository = userRepository;
    this.passwordProvider = passwordProvider;
    this.avatarProvider = avatarProvider;
  }

  /**
   * Execute registration use case
   * @param {RegisterUserDTO} registrationDTO - Registration data
   * @returns {Promise<{user: UserResponseDTO, token: string}>}
   */
  async execute(registrationDTO) {
    // Validate input
    RegistrationValidator.validate(registrationDTO);

    // Check if user already exists
    const emailExists = await this.userRepository.emailExists(registrationDTO.email);
    if (emailExists) {
      throw new UserAlreadyExistsError(registrationDTO.email);
    }

    // Handle avatar
    let avatar = this.avatarProvider.getDefaultAvatar();
    if (registrationDTO.avatarFile) {
      try {
        this.avatarProvider.validateFile(registrationDTO.avatarFile);
        avatar = await this.avatarProvider.upload(
          registrationDTO.avatarFile.path,
          'gamezone/avatars'
        );
      } catch (error) {
        if (error instanceof InvalidAvatarError) {
          throw error;
        }
        throw new AvatarUploadError(error.message);
      } finally {
        // Clean up temp file
        this._deleteTemporaryFile(registrationDTO.avatarFile.path);
      }
    }

    // Hash password
    const passwordHash = await this.passwordProvider.hash(registrationDTO.password);

    // Create user entity
    const userEntity = User.createNew({
      name: registrationDTO.name,
      email: registrationDTO.email,
      passwordHash,
      address: registrationDTO.address,
      contactNumber: registrationDTO.contactNumber,
      avatar
    });

    // Save to repository
    const savedUser = await this.userRepository.save(userEntity);

    // Return response
    return {
      user: UserResponseDTO.fromEntity(savedUser),
      token: null // Token generated in presentation layer
    };
  }

  /**
   * Helper: Delete temporary uploaded file
   */
  _deleteTemporaryFile(filePath) {
    try {
      const fs = require('fs');
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Error deleting temporary file:', error);
      // Don't throw - cleanup should not fail the operation
    }
  }
}

module.exports = RegisterUserUseCase;