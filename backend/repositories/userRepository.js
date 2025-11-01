/**
 * User Repository
 * Data access layer for User model
 * All database queries for user operations
 */

const User = require('../models/user');

class UserRepository {
  /**
   * Find user by email
   */
  async findByEmail(email) {
    return User.findOne({ email });
  }

  /**
   * Find user by email with password field
   */
  async findByEmailWithPassword(email) {
    return User.findOne({ email }).select('+password');
  }

  /**
   * Find user by ID
   */
  async findById(id) {
    return User.findById(id);
  }

  /**
   * Create new user
   */
  async create(userData) {
    const user = new User(userData);
    return user.save();
  }

  /**
   * Update user by ID
   */
  async update(id, updateData) {
    return User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });
  }

  /**
   * Delete user by ID
   */
  async delete(id) {
    return User.findByIdAndDelete(id);
  }

  /**
   * Check if email exists
   */
  async emailExists(email) {
    const user = await User.findOne({ email });
    return !!user;
  }

  /**
   * Check if email exists (excluding a specific user ID)
   */
  async emailExistsExcluding(email, userId) {
    const user = await User.findOne({ email, _id: { $ne: userId } });
    return !!user;
  }

  /**
   * Find all users (with pagination)
   */
  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const users = await User.find().skip(skip).limit(limit);
    const total = await User.countDocuments();
    return { users, total, pages: Math.ceil(total / limit) };
  }

  /**
   * Get user count
   */
  async count() {
    return User.countDocuments();
  }
}

module.exports = new UserRepository();