const uploadService = require('../services/uploadService');

const uploadImage = (req, res) => {
  const imageUrl = uploadService.uploadImage(req.file);
  res.status(200).json({ imageUrl });
};

module.exports = {
  uploadImage,
};