/**
 * Register User Data Transfer Object
 * Input validation and data transformation for registration
 * Decouples HTTP layer from domain logic
 */

class RegisterUserDTO {
  constructor(data) {
    this.name = data.name?.trim();
    this.email = data.email?.trim().toLowerCase();
    this.password = data.password;
    this.confirmPassword = data.confirmPassword;
    this.address = data.address?.trim();
    this.contactNumber = data.contactNumber?.trim();
    this.avatarFile = data.avatarFile || null;
  }

  /**
   * Factory method from HTTP request body
   */
  static fromRequest(reqBody, file = null) {
    return new RegisterUserDTO({
      ...reqBody,
      avatarFile: file
    });
  }
}

module.exports = RegisterUserDTO;