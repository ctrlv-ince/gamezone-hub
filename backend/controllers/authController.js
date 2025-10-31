const User = require('../models/user');
const validator = require('validator');
const { uploadImage, deleteImage } = require('../utils/cloudinary');
const fs = require('fs');

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    if (name.length > 30) {
      return res.status(400).json({
        success: false,
        message: 'Name cannot exceed 30 characters'
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Handle avatar upload if provided
    let avatar = {
      public_id: 'default',
      url: 'https://via.placeholder.com/150?text=Avatar'
    };

    if (req.file) {
      try {
        avatar = await uploadImage(req.file.path, 'gamezone/avatars');
        // Delete temporary file
        fs.unlinkSync(req.file.path);
      } catch (uploadError) {
        // Delete temporary file if upload fails
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({
          success: false,
          message: uploadError.message
        });
      }
    }

    // Create user with avatar
    user = await User.create({
      name,
      email,
      password,
      avatar
    });

    // Get JWT token
    const token = user.getJwtToken();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error registering user'
    });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user and select password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Compare password
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Get JWT token
    const token = user.getJwtToken();

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error logging in'
    });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching user'
    });
  }
};

// Logout user (typically handled on frontend by clearing token)
exports.logoutUser = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error logging out'
    });
  }
};

// Update user avatar
exports.updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Delete old avatar if not default
    if (user.avatar.public_id !== 'default') {
      try {
        await deleteImage(user.avatar.public_id);
      } catch (deleteError) {
        console.error('Error deleting old avatar:', deleteError);
      }
    }

    // Upload new avatar
    try {
      const avatar = await uploadImage(req.file.path, 'gamezone/avatars');
      // Delete temporary file
      fs.unlinkSync(req.file.path);

      // Update user avatar
      user.avatar = avatar;
      await user.save();

      res.status(200).json({
        success: true,
        message: 'Avatar updated successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        }
      });
    } catch (uploadError) {
      // Delete temporary file if upload fails
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      throw uploadError;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating avatar'
    });
  }
};