const express = require('express');
const router = express.Router();
const {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
} = require('../controllers/cartController');
const { auth } = require('../middleware/auth');

router.get('/', auth, getCart);
router.post('/', auth, addItemToCart);
router.delete('/:productId', auth, removeItemFromCart);
router.put('/:productId', auth, updateCartItemQuantity);

module.exports = router;