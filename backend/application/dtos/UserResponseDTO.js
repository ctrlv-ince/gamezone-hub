/**
 * User Response Data Transfer Object
 * Formats user entity for HTTP response
 * Ensures consistent API responses
 */

class UserResponseDTO {
  constructor({
    id,
    name,
    email,
    address,
    contactNumber,
    avatar,
    role,
    createdAt
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.address = address;
    this.contactNumber = contactNumber;
    this.avatar = avatar;
    this.role = role;
    this.createdAt = createdAt;
  }

  /**
   * Factory method from User entity
   */
  static fromEntity(userEntity) {
    return new UserResponseDTO({
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      address: userEntity.address,
      contactNumber: userEntity.contactNumber,
      avatar: userEntity.avatar,
      role: userEntity.role,
      createdAt: userEntity.createdAt
    });
  }

  /**
   * Convert to plain object for JSON serialization
   */
  toJSON() {
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

module.exports = UserResponseDTO;