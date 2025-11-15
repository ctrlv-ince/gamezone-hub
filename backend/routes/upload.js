const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const uploadController = require('../controllers/uploadController');

router.post('/', upload.single('image'), uploadController.uploadImage);

module.exports = router;