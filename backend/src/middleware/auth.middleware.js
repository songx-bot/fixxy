// src/middleware/auth.middleware.js
import { verifyToken } from '../utils/jwt.utils.js';

export const authenticate = async (req, res, next) => {
  try {
    // Extract token from cookie (name: 'token')
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = verifyToken(token);
    req.user = decoded; // { id, role, phone?, email?, ... }
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Role-based authorization middleware
 * @param {...string} allowedRoles - roles allowed to access the route
 * @returns {Function} middleware
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthenticated' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
  };
};