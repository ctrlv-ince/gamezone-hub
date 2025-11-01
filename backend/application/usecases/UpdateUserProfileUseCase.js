/**
 * Update User Profile Use Case
 * Application business logic for profile updates
 */

const ProfileUpdateValidator = require('../validators/ProfileUpdateValidator');
const {
  UserNotFoundError,
  EmailAlreadyInUseError,
  InvalidUserDataError
} = require('../../domain/errors/DomainError');
const UserResponseDTO = require('../dtos/UserResponseDTO');

class UpdateUserProfileUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Execute profile update use case
   * @param {string} userId - User ID
   * @param {UpdateProfileDTO} updateDTO - Updated profile data
   * @returns {Promise<{user: UserResponseDTO}>}
   */
  async execute(userId, updateDTO) {
    // Validate input
    ProfileUpdateValidator.validate(updateDTO);

    // Get current user
    const userEntity = await this.userRepository.findById(userId);
    if (!userEntity) {
      throw new UserNotFoundError(userId);
    }

    // Check if new email is already in use by another user
    if (updateDTO.email !== userEntity.email) {
      const emailAlreadyUsed = await this.userRepository.emailExistsExcluding(
        updateDTO.email,
        userId
      );
      if (emailAlreadyUsed) {
        throw new EmailAlreadyInUseError(updateDTO.email);
      }
    }

    // Update user entity
    userEntity.name = updateDTO.name;
    userEntity.email = updateDTO.email;
    userEntity.address = updateDTO.address;
    userEntity.contactNumber = updateDTO.contactNumber;

    // Save to repository
    const updatedUser = await this.userRepository.update(userId, {
      name: updateDTO.name,
      email: updateDTO.email,
      address: updateDTO.address,
      contactNumber: updateDTO.contactNumber
    });

    return {
      user: UserResponseDTO.fromEntity(updatedUser)
    };
  }
}

module.exports = UpdateUserProfileUseCase;