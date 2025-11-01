/**
 * Login User Data Transfer Object
 * Input validation and data transformation for login
 */

class LoginUserDTO {
  constructor(data) {
    this.email = data.email?.trim().toLowerCase();
    this.password = data.password;
  }

  /**
   * Factory method from HTTP request body
   */
  static fromRequest(reqBody) {
    return new LoginUserDTO(reqBody);
  }
}

module.exports = LoginUserDTO;