const cloudinary = require('../config/cloudinary');

const uploadImages = async (files) => {
  if (!files || files.length === 0) {
    throw new Error('No files uploaded.');
  }

  const uploadPromises = files.map(file => 
    cloudinary.uploader.upload(file.path, {
      folder: 'gamezone-hub',
      resource_type: 'image',
    })
  );

  const results = await Promise.all(uploadPromises);
  const imageUrls = results.map(result => result.secure_url);
  
  return imageUrls;
};

const uploadProfilePicture = async (file) => {
  if (!file) {
    throw new Error('No file uploaded.');
  }

  const result = await cloudinary.uploader.upload(file.path, {
    folder: 'gamezone-hub/avatars',
    resource_type: 'image',
  });

  return result.secure_url;
};

module.exports = {
  uploadImages,
  uploadProfilePicture,
};