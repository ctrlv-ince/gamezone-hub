const cartService = require('../services/cartService');

const getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addItemToCart = async (req, res) => {
  try {
    const cart = await cartService.addItemToCart(req.user.id, req.body);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const cart = await cartService.removeItemFromCart(
      req.user.id,
      req.params.productId
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const cart = await cartService.updateCartItemQuantity(
      req.user.id,
      req.params.productId,
      req.body.quantity
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
};