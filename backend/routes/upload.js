const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const uploadController = require('../controllers/uploadController');

router.post('/', upload.array('images'), uploadController.uploadImages);

module.exports = router;