/**
 * Get Current User Use Case
 * Retrieves authenticated user information
 */

const { UserNotFoundError } = require('../../domain/errors/DomainError');
const UserResponseDTO = require('../dtos/UserResponseDTO');

class GetCurrentUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Execute get user use case
   * @param {string} userId - User ID to fetch
   * @returns {Promise<{user: UserResponseDTO}>}
   */
  async execute(userId) {
    const userEntity = await this.userRepository.findById(userId);
    if (!userEntity) {
      throw new UserNotFoundError(userId);
    }

    return {
      user: UserResponseDTO.fromEntity(userEntity)
    };
  }
}

module.exports = GetCurrentUserUseCase;