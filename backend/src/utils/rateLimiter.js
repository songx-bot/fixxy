// backend/src/utils/rateLimiter.js
import rateLimit, { ipKeyGenerator } from 'express-rate-limit'; // <-- Import ipKeyGenerator

/**
 * Rate limiter for OTP requests
 * Limits: 3 requests per phone/email per hour
 */
export const otpRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: 'Too many OTP requests. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Use phone or email from body as the primary key
    const identifier = req.body.phone || req.body.email;
    if (identifier) {
      return identifier;
    }
    // Fallback to IP address with proper IPv6 handling
    return ipKeyGenerator(req.ip); // <-- Use the helper
  },
});