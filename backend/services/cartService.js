const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Helper to populate cart
const populateCart = (cart) => {
  return cart.populate({
    path: 'cartItems.product',
    select: 'name price images stock', // Select fields you need
  });
};

const getCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, cartItems: [] });
    await cart.save();
  } else {
    await populateCart(cart);
  }

  // Clean up cart from deleted products
  const originalLength = cart.cartItems.length;
  cart.cartItems = cart.cartItems.filter(item => item.product);
  if (cart.cartItems.length < originalLength) {
      await cart.save();
      await populateCart(cart); // Re-populate after cleaning
  }

  return cart;
};

const addItemToCart = async (userId, item) => {
  console.log('addItemToCart called with userId:', userId, 'and item:', item);
  const { productId, quantity } = item;
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  let cart = await Cart.findOne({ user: userId });
  console.log('Initial cart:', cart);

  if (!cart) {
    cart = new Cart({ user: userId, cartItems: [] });
    console.log('New cart created:', cart);
  }

  // Populate cart to handle cleanup and updates consistently
  await populateCart(cart);
  console.log('Cart after population:', cart);

  // Clean up cart from deleted products
  cart.cartItems = cart.cartItems.filter(item => item.product);
  console.log('Cart after cleaning:', cart);

  const itemIndex = cart.cartItems.findIndex(
    (i) => i.product && i.product._id.toString() === productId
  );
  console.log('Found itemIndex:', itemIndex);

  const itemQuantity = quantity ? Number(quantity) : 1;

  if (itemIndex > -1) {
    cart.cartItems[itemIndex].quantity += itemQuantity;
    cart.cartItems[itemIndex].price = product.price; // Keep price updated
  } else {
    cart.cartItems.push({
      product: productId,
      quantity: itemQuantity,
      price: product.price,
    });
  }
  console.log('Cart before save:', cart);

  await cart.save();
  await populateCart(cart); // Re-populate to ensure consistency
  console.log('Final cart returned:', cart);
  return cart;
};

const removeItemFromCart = async (userId, productId) => {
  let cart = await Cart.findOne({ user: userId });

  if (cart) {
    // Use populated cart to safely access product properties
    await populateCart(cart);
    cart.cartItems = cart.cartItems.filter(
      (i) => i.product && i.product._id.toString() !== productId
    );
    await cart.save();
    await populateCart(cart);
  }

  return cart;
};

const updateCartItemQuantity = async (userId, productId, quantity) => {
  let cart = await Cart.findOne({ user: userId });

  if (cart) {
    await populateCart(cart);
    const itemIndex = cart.cartItems.findIndex(
      (i) => i.product && i.product._id.toString() === productId
    );

    if (itemIndex > -1) {
      if (quantity > 0) {
        cart.cartItems[itemIndex].quantity = quantity;
      } else {
        cart.cartItems.splice(itemIndex, 1);
      }
      await cart.save();
      await populateCart(cart);
    }
  }

  return cart;
};

module.exports = {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
};
