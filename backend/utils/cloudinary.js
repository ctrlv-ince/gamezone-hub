const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload image to Cloudinary
exports.uploadImage = async (filePath, folder = 'gamezone/avatars') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: 'auto'
    });

    return {
      public_id: result.public_id,
      url: result.secure_url
    };
  } catch (error) {
    throw new Error(`Cloudinary upload error: ${error.message}`);
  }
};

// Delete image from Cloudinary
exports.deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Cloudinary delete error: ${error.message}`);
  }
};

// Upload multiple images
exports.uploadMultipleImages = async (filePaths, folder = 'gamezone/products') => {
  try {
    const uploadPromises = filePaths.map((filePath) =>
      cloudinary.uploader.upload(filePath, { folder })
    );

    const results = await Promise.all(uploadPromises);

    return results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url
    }));
  } catch (error) {
    throw new Error(`Cloudinary upload error: ${error.message}`);
  }
};