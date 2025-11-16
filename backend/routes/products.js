const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProducts,
  createProductReview,
  updateReview,
  deleteReview,
} = require('../controllers/productController');
const { auth, isAdmin } = require('../middleware/auth');

router.post('/', auth, isAdmin, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', auth, isAdmin, updateProduct);
router.delete('/', auth, isAdmin, deleteProducts);
router.post('/:id/reviews', auth, createProductReview);
router.put('/:id/reviews/:reviewId', auth, updateReview);
router.delete('/:id/reviews/:reviewId', auth, deleteReview);

module.exports = router;