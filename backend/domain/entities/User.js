/**
 * User Domain Entity
 * Plain object representing a user in the domain model
 * No framework dependencies - pure business object
 */

class User {
  constructor({
    id,
    name,
    email,
    passwordHash,
    address,
    contactNumber,
    avatar = null,
    role = 'user',
    createdAt = new Date(),
    resetPasswordToken = null,
    resetPasswordExpire = null
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.address = address;
    this.contactNumber = contactNumber;
    this.avatar = avatar;
    this.role = role;
    this.createdAt = createdAt;
    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = resetPasswordExpire;
  }

  /**
   * Factory method to create a new user (during registration)
   */
  static createNew({
    name,
    email,
    passwordHash,
    address,
    contactNumber,
    avatar
  }) {
    return new User({
      id: null, // Will be assigned by persistence layer
      name,
      email,
      passwordHash,
      address,
      contactNumber,
      avatar,
      role: 'user',
      createdAt: new Date()
    });
  }

  /**
   * Check if user is admin
   */
  isAdmin() {
    return this.role === 'admin';
  }

  /**
   * Check if user can perform action
   */
  hasRole(role) {
    return this.role === role;
  }

  /**
   * Get user info (excluding sensitive data)
   */
  getPublicInfo() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      address: this.address,
      contactNumber: this.contactNumber,
      avatar: this.avatar,
      role: this.role,
      createdAt: this.createdAt
    };
  }
}

module.exports = User;