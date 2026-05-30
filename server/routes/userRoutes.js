import express from 'express';
import { registerUser, loginUser, fetchUsers } from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { validateRegistration, validateLogin } from '../middleware/validate.js';

const router = express.Router();

// Public routes
router.post('/register', validateRegistration, registerUser);
router.post('/login', validateLogin, loginUser);

// Protected route (admin)
router.get('/fetch-users', protect, adminOnly, fetchUsers);

export default router;
