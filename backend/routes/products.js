const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
} = require('../controllers/productController');
const { auth } = require('../middleware/auth');


router.get('/', auth, getAllProducts);
router.get('/:id', auth, getProductById);

module.exports = router;