const Order = require('../models/Order');

const createOrder = async (orderData) => {
  const order = new Order(orderData);
  return await order.save();
};

const getOrders = async () => {
  return await Order.find().populate('user', 'username');
};

const getOrderById = async (id) => {
  return await Order.findById(id).populate('user', 'username');
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
  createOrder,
  getOrders,
  getOrderById,
  getSalesData,
};