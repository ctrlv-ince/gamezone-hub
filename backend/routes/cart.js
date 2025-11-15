const express = require('express');
const router = express.Router();
const {
  getCart,
  addItemToCart,
  removeItemFromCart,
} = require('../controllers/cartController');
const { auth } = require('../middleware/jwt');

router.get('/', auth, getCart);
router.post('/', auth, addItemToCart);
router.delete('/:productId', auth, removeItemFromCart);

module.exports = router;