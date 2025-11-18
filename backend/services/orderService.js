const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { sendOrderStatusUpdate } = require('./emailService');
const { generateReceiptPdf } = require('../utils/pdfService');

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

  const orderItems = cart.cartItems.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const totalPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const order = new Order({
    user: userId,
    orderItems,
    totalPrice,
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
    select: 'name price images reviews'
  }).sort({ createdAt: -1 });
};

const getOrderById = async (id) => {
  const order = await Order.findById(id)
    .populate('user', 'username')
    .populate({
      path: 'orderItems.product',
      select: 'name price images reviews'
    });
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

const getSalesData = async (startDate, endDate) => {
  const start = new Date(startDate);
  start.setUTCHours(0, 0, 0, 0); // Set to beginning of the day UTC

  const end = new Date(endDate);
  end.setUTCHours(23, 59, 59, 999); // Set to end of the day UTC

  return await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: start,
          $lte: end,
        },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: 'UTC' } },
        totalSales: { $sum: '$totalPrice' },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        totalSales: 1,
      },
    },
  ]);
};

const getMonthlySalesData = async () => {
  return await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt', timezone: 'UTC' } },
        totalSales: { $sum: '$totalPrice' },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $project: {
        _id: 0,
        month: '$_id',
        totalSales: 1,
      },
    },
  ]);
};

const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  if (!order) {
    throw new Error('Order not found');
  }

  const populatedOrder = await Order.findById(order._id)
    .populate('user', 'username email') 
    .populate('orderItems.product'); 

  const pdfBuffer = await generateReceiptPdf(populatedOrder);
  await sendOrderStatusUpdate(populatedOrder.user.email, populatedOrder, pdfBuffer);

  return populatedOrder;
};

const getAllOrders = async () => {
  return await Order.find({}).select('status createdAt totalPrice').populate('user', 'username email').populate({
    path: 'orderItems.product',
    select: 'name price images reviews'
  }).sort({ createdAt: -1 });
};

module.exports = {
  createOrderFromCart,
  getOrders,
  getOrderById,
  getSalesData,
  getMonthlySalesData,
  updateOrderStatus,
  getAllOrders,
};