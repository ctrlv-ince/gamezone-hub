const uploadService = require('../services/uploadService');

const uploadImages = async (req, res) => {
  try {
    const urls = await uploadService.uploadImages(req.files);
    res.status(200).json({ urls });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading images', error: error.message });
  }
};

const uploadProfilePicture = async (req, res) => {
  try {
    const url = await uploadService.uploadProfilePicture(req.file);
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading profile picture', error: error.message });
  }
};

module.exports = {
  uploadImages,
  uploadProfilePicture,
};