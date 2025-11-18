const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth, isAdmin } = require('../middleware/auth');

router.post('/', auth, orderController.createOrder);
router.get('/', auth, orderController.getOrders);
router.get('/all', auth, isAdmin, orderController.getAllOrders);
router.get('/sales', auth, isAdmin, orderController.getSales);
router.get('/sales/monthly', auth, isAdmin, orderController.getMonthlySales);
router.get('/:id', auth, orderController.getOrderById);
router.put('/:id/status', auth, isAdmin, orderController.updateOrderStatus);

module.exports = router;