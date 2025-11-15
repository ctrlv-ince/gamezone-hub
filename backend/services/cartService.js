const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, cartItems: [] });
    await cart.save();
  }
  return cart;
};

const addItemToCart = async (userId, item) => {
  const { productId, quantity } = item;
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  const cart = await getCart(userId);
  const itemIndex = cart.cartItems.findIndex(
    (i) => i.product.toString() === productId
  );

  if (itemIndex > -1) {
    cart.cartItems[itemIndex].quantity += quantity;
  } else {
    cart.cartItems.push({
      product: productId,
      quantity,
      price: product.price,
    });
  }

  await cart.save();
  return cart;
};

const removeItemFromCart = async (userId, productId) => {
  const cart = await getCart(userId);
  cart.cartItems = cart.cartItems.filter(
    (i) => i.product.toString() !== productId
  );

  await cart.save();
  return cart;
};

module.exports = {
  getCart,
  addItemToCart,
  removeItemFromCart,
};