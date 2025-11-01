/**
 * User Mapper
 * Converts between domain entities and persistence models
 * Handles bidirectional mapping: Entity ↔ Database Model
 *
 * This mapper is crucial for clean architecture:
 * - Domain layer works with User entities
 * - Persistence layer uses Mongoose models
 * - Mapper translates between them
 * - Domain logic remains database-agnostic
 */

const User = require('../../domain/entities/User');

class UserMapper {
  /**
   * Convert Mongoose document to User entity
   * @param {Object} mongooseDoc - Mongoose user document
   * @returns {User} User domain entity
   */
  static toDomain(mongooseDoc) {
    if (!mongooseDoc) return null;

    return new User({
      id: mongooseDoc._id.toString(),
      name: mongooseDoc.name,
      email: mongooseDoc.email,
      passwordHash: mongooseDoc.password,
      address: mongooseDoc.address,
      contactNumber: mongooseDoc.contactNumber,
      avatar: mongooseDoc.avatar,
      role: mongooseDoc.role,
      createdAt: mongooseDoc.createdAt,
      resetPasswordToken: mongooseDoc.resetPasswordToken,
      resetPasswordExpire: mongooseDoc.resetPasswordExpire
    });
  }

  /**
   * Convert User entity to Mongoose document format
   * @param {User} userEntity - User domain entity
   * @returns {Object} Object suitable for Mongoose
   */
  static toPersistence(userEntity) {
    return {
      _id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      password: userEntity.passwordHash,
      address: userEntity.address,
      contactNumber: userEntity.contactNumber,
      avatar: userEntity.avatar,
      role: userEntity.role,
      createdAt: userEntity.createdAt,
      resetPasswordToken: userEntity.resetPasswordToken,
      resetPasswordExpire: userEntity.resetPasswordExpire
    };
  }

  /**
   * Convert array of Mongoose documents to User entities
   * @param {Array} mongooseDocs - Array of Mongoose documents
   * @returns {Array<User>} Array of User entities
   */
  static toDomainArray(mongooseDocs) {
    if (!Array.isArray(mongooseDocs)) return [];
    return mongooseDocs.map(doc => this.toDomain(doc));
  }
}

module.exports = UserMapper;