// src/routes/auth.routes.js
import express from 'express';
import {
  register,
  sendOTP,
  verifyOTP,
  login,
  logout,
} from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  registerSchema,
  sendOTPSchema,
  verifyOTPSchema,
  loginSchema,
} from '../utils/validators/auth.validator.js';
import { otpRateLimiter } from '../utils/rateLimiter.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/register', validate(registerSchema), register);
router.post('/send-otp', otpRateLimiter, validate(sendOTPSchema), sendOTP);
router.post('/verify-otp', validate(verifyOTPSchema), verifyOTP);
router.post('/login', validate(loginSchema), login);
router.post('/logout', authenticate, logout); // requires authentication to logout

// Protected test route (for demonstration)
router.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user });
});

export default router;