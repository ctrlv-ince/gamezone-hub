const uploadService = require('../services/uploadService');

const uploadImages = async (req, res) => {
  try {
    const urls = await uploadService.uploadImages(req.files);
    res.status(200).json({ urls });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading images', error: error.message });
  }
};

module.exports = {
  uploadImages,
};