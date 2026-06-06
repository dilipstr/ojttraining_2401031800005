const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

// Protected routes
router.get('/', auth, orderController.getUserOrders);
router.get('/:id', auth, orderController.getOrderById);
router.post('/create', auth, orderController.createOrder);
router.put('/:id/status', auth, orderController.updateOrderStatus);
router.put('/:id/payment', auth, orderController.updatePaymentStatus);

module.exports = router;
