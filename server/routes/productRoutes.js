import express from 'express';
import {
  fetchProducts,
  fetchProductDetails,
  addNewProduct,
  updateProduct,
  deleteProduct,
  fetchCategories
} from '../controllers/productController.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { validateProduct } from '../middleware/validate.js';

const router = express.Router();

// Public routes
router.get('/fetch-products', fetchProducts);
router.get('/fetch-product-details/:id', fetchProductDetails);
router.get('/fetch-categories', fetchCategories);

// Protected routes (admin only)
router.post('/add-new-product', protect, adminOnly, validateProduct, addNewProduct);
router.put('/update-product/:id', protect, adminOnly, validateProduct, updateProduct);
router.delete('/delete-product/:id', protect, adminOnly, deleteProduct);

export default router;
