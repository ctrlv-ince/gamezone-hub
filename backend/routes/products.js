const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
} = require('../controllers/productController');
const { auth } = require('../middleware/jwt');


router.get('/', getAllProducts);
router.get('/:id', getProductById);

module.exports = router;