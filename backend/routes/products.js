const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProducts,
} = require('../controllers/productController');
const { auth, isAdmin } = require('../middleware/auth');

router.post('/', auth, isAdmin, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', auth, isAdmin, updateProduct);
router.delete('/', auth, isAdmin, deleteProducts);

module.exports = router;