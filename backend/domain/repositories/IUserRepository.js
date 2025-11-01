/**
 * User Repository Interface
 * Defines the contract for user data access
 * Implementations must provide these methods
 *
 * This interface abstracts the persistence layer
 * - Allows switching storage backends without changing business logic
 * - Enables easier testing with mock implementations
 * - Clear separation between domain and infrastructure
 */

class IUserRepository {
  /**
   * Find user by ID
   * @param {string} id - User ID
   * @returns {Promise<User|null>} User entity or null
   */
  async findById(id) {
    throw new Error('Method findById must be implemented');
  }

  /**
   * Find user by email
   * @param {string} email - User email
   * @returns {Promise<User|null>} User entity or null
   */
  async findByEmail(email) {
    throw new Error('Method findByEmail must be implemented');
  }

  /**
   * Find user by email with password hash included
   * @param {string} email - User email
   * @returns {Promise<User|null>} User entity or null
   */
  async findByEmailWithPassword(email) {
    throw new Error('Method findByEmailWithPassword must be implemented');
  }

  /**
   * Save new user to repository
   * @param {User} user - User entity to save
   * @returns {Promise<User>} Saved user with ID assigned
   */
  async save(user) {
    throw new Error('Method save must be implemented');
  }

  /**
   * Update existing user
   * @param {string} id - User ID
   * @param {Object} updateData - Fields to update
   * @returns {Promise<User>} Updated user entity
   */
  async update(id, updateData) {
    throw new Error('Method update must be implemented');
  }

  /**
   * Delete user by ID
   * @param {string} id - User ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    throw new Error('Method delete must be implemented');
  }

  /**
   * Check if email exists
   * @param {string} email - Email to check
   * @returns {Promise<boolean>}
   */
  async emailExists(email) {
    throw new Error('Method emailExists must be implemented');
  }

  /**
   * Check if email exists excluding a specific user
   * @param {string} email - Email to check
   * @param {string} userId - User ID to exclude
   * @returns {Promise<boolean>}
   */
  async emailExistsExcluding(email, userId) {
    throw new Error('Method emailExistsExcluding must be implemented');
  }

  /**
   * Find all users with pagination
   * @param {number} page - Page number (1-indexed)
   * @param {number} limit - Items per page
   * @returns {Promise<{users: User[], total: number, pages: number}>}
   */
  async findAll(page = 1, limit = 10) {
    throw new Error('Method findAll must be implemented');
  }

  /**
   * Count total users
   * @returns {Promise<number>}
   */
  async count() {
    throw new Error('Method count must be implemented');
  }
}

module.exports = IUserRepository;