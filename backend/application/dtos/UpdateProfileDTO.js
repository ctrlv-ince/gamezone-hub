/**
 * Update Profile Data Transfer Object
 * Input validation and data transformation for profile updates
 */

class UpdateProfileDTO {
  constructor(data) {
    this.name = data.name?.trim();
    this.email = data.email?.trim().toLowerCase();
    this.address = data.address?.trim();
    this.contactNumber = data.contactNumber?.trim();
  }

  /**
   * Factory method from HTTP request body
   */
  static fromRequest(reqBody) {
    return new UpdateProfileDTO(reqBody);
  }
}

module.exports = UpdateProfileDTO;