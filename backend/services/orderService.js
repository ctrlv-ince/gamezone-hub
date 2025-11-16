const Order = require('../models/Order');
const Cart = require('../models/Cart');

const createOrderFromCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate('items.product');

  if (!cart || cart.items.length === 0) {
    throw new Error('Cart is empty');
  }

  const totalPrice = cart.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const order = new Order({
    user: userId,
    items: cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    })),
    total: totalPrice,
  });

  await order.save();

  cart.items = [];
  await cart.save();

  return order;
};

const getOrders = async () => {
  return await Order.find().populate('user', 'username');
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
        totalSales: { $sum: '$total' },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
};

module.exports = {
  createOrderFromCart,
  getOrders,
  getOrderById,
  getSalesData,
};