// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password strength regex (at least one letter and one number)
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;

export const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return '';
};

export const validateName = (name) => {
  if (!name) {
    return 'Name is required';
  }
  if (name.trim().length === 0) {
    return 'Name cannot be empty';
  }
  if (name.length > 30) {
    return 'Name cannot exceed 30 characters';
  }
  if (name.length < 2) {
    return 'Name must be at least 2 characters';
  }
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Confirm password is required';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return '';
};

export const validateAddress = (address) => {
  if (!address) {
    return 'Address is required';
  }
  if (address.trim().length === 0) {
    return 'Address cannot be empty';
  }
  if (address.length < 5) {
    return 'Address must be at least 5 characters';
  }
  if (address.length > 100) {
    return 'Address cannot exceed 100 characters';
  }
  return '';
};

export const validateContactNumber = (contactNumber) => {
  if (!contactNumber) {
    return 'Contact number is required';
  }
  if (contactNumber.trim().length === 0) {
    return 'Contact number cannot be empty';
  }
  const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
  if (!phoneRegex.test(contactNumber)) {
    return 'Please enter a valid contact number';
  }
  return '';
};

export const validateLoginForm = (email, password) => {
  const errors = {};
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return errors;
};

export const validateRegisterForm = (name, email, password, confirmPassword, address, contactNumber) => {
  const errors = {};
  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
  const addressError = validateAddress(address);
  const contactNumberError = validateContactNumber(contactNumber);

  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
  if (addressError) errors.address = addressError;
  if (contactNumberError) errors.contactNumber = contactNumberError;

  return errors;
};

export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};