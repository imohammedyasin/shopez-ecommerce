import express from 'express';
import {
  fetchOrders,
  buyProduct,
  cancelOrder,
  updateOrderStatus,
  placeCartOrder
} from '../controllers/orderController.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { validateOrder } from '../middleware/validate.js';

const router = express.Router();

// Protected user routes
router.get('/fetch-orders', protect, fetchOrders);
router.post('/buy-product', protect, validateOrder, buyProduct);
router.put('/cancel-order', protect, cancelOrder);
router.post('/place-cart-order', protect, validateOrder, placeCartOrder);

// Admin only
router.put('/update-order-status', protect, adminOnly, updateOrderStatus);

export default router;
