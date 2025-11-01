/**
 * Mongoose User Repository Implementation
 * Concrete implementation of IUserRepository interface
 * Handles MongoDB operations using Mongoose
 *
 * This repository:
 * - Implements the repository interface
 * - Maps between Mongoose models and domain entities
 * - Handles database-specific logic
 * - Can be replaced with SQL, Firebase, etc. without affecting domain
 */

const UserModel = require('../../models/user');
const IUserRepository = require('../../domain/repositories/IUserRepository');
const UserMapper = require('../../application/mappers/UserMapper');

class MongooseUserRepository extends IUserRepository {
  /**
   * Find user by ID
   */
  async findById(id) {
    const doc = await UserModel.findById(id);
    return UserMapper.toDomain(doc);
  }

  /**
   * Find user by email
   */
  async findByEmail(email) {
    const doc = await UserModel.findOne({ email });
    return UserMapper.toDomain(doc);
  }

  /**
   * Find user by email with password hash
   */
  async findByEmailWithPassword(email) {
    const doc = await UserModel.findOne({ email }).select('+password');
    return UserMapper.toDomain(doc);
  }

  /**
   * Save new user
   */
  async save(userEntity) {
    const userData = {
      name: userEntity.name,
      email: userEntity.email,
      password: userEntity.passwordHash,
      address: userEntity.address,
      contactNumber: userEntity.contactNumber,
      avatar: userEntity.avatar,
      role: userEntity.role
    };

    const userModel = new UserModel(userData);
    const savedDoc = await userModel.save();
    return UserMapper.toDomain(savedDoc);
  }

  /**
   * Update user
   */
  async update(id, updateData) {
    const doc = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });
    return UserMapper.toDomain(doc);
  }

  /**
   * Delete user
   */
  async delete(id) {
    await UserModel.findByIdAndDelete(id);
  }

  /**
   * Check if email exists
   */
  async emailExists(email) {
    const user = await UserModel.findOne({ email });
    return !!user;
  }

  /**
   * Check if email exists (excluding a user)
   */
  async emailExistsExcluding(email, userId) {
    const user = await UserModel.findOne({
      email,
      _id: { $ne: userId }
    });
    return !!user;
  }

  /**
   * Find all users with pagination
   */
  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const docs = await UserModel.find().skip(skip).limit(limit);
    const total = await UserModel.countDocuments();

    return {
      users: UserMapper.toDomainArray(docs),
      total,
      pages: Math.ceil(total / limit)
    };
  }

  /**
   * Count total users
   */
  async count() {
    return UserModel.countDocuments();
  }
}

module.exports = MongooseUserRepository;