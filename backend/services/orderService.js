const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const createOrderFromCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate('cartItems.product');

  if (!cart || cart.cartItems.length === 0) {
    throw new Error('Cart is empty');
  }

  // Check stock availability for all items
  for (const item of cart.cartItems) {
    if (item.product.stock < item.quantity) {
      throw new Error(`Insufficient stock for ${item.product.name}. Available: ${item.product.stock}, Requested: ${item.quantity}`);
    }
  }

  const order = new Order({
    user: userId,
    orderItems: cart.cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    })),
  });

  await order.save();

  // Update product stock
  for (const item of cart.cartItems) {
    await Product.findByIdAndUpdate(
      item.product._id,
      { $inc: { stock: -item.quantity } }
    );
  }

  cart.cartItems = [];
  await cart.save();

  const populatedOrder = await Order.findById(order._id).populate({
    path: 'orderItems.product',
  });
  return populatedOrder;
};

const getOrders = async (userId) => {
  return await Order.find({ user: userId }).populate({
    path: 'orderItems.product',
    select: 'name price images'
  }).sort({ createdAt: -1 });
};

const getOrderById = async (id) => {
  const order = await Order.findById(id).populate('user', 'username');
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

const getSalesData = async (startDate, endDate) => {
  return await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        totalSales: { $sum: '$totalPrice' },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
};

const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );

  if (!order) {
    throw new Error('Order not found');
  }

  return order;
};

const getAllOrders = async () => {
  return await Order.find({}).populate('user', 'username email').sort({ createdAt: -1 });
};

module.exports = {
  createOrderFromCart,
  getOrders,
  getOrderById,
  getSalesData,
  updateOrderStatus,
  getAllOrders,
};