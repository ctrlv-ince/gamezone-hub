const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth, isAdmin } = require('../middleware/jwt');

router.post('/', auth, orderController.createOrder);
router.get('/', auth, orderController.getOrders);
router.get('/sales', auth, isAdmin, orderController.getSales);
router.get('/:id', auth, orderController.getOrderById);

module.exports = router;