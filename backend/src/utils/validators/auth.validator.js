// src/utils/validators/auth.validator.js
import Joi from 'joi';

export const registerSchema = Joi.object({
  phone: Joi.string().pattern(/^[0-9]+$/).min(8).max(15).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).required(),
  fullName: Joi.string().min(2).max(100).required(),
  role: Joi.string().valid('CUSTOMER', 'TECHNICIAN', 'SELLER', 'ADMIN').default('CUSTOMER'),
}).xor('phone', 'email')
  .with('phone', 'password')
  .with('email', 'password');

export const sendOTPSchema = Joi.object({
  phone: Joi.string().pattern(/^[0-9]+$/).min(8).max(15).optional(),
  email: Joi.string().email().optional(),
  type: Joi.string().valid('PHONE', 'EMAIL').required(),
}).xor('phone', 'email');

export const verifyOTPSchema = Joi.object({
  phone: Joi.string().pattern(/^[0-9]+$/).min(8).max(15).optional(),
  email: Joi.string().email().optional(),
  code: Joi.string().length(6).required(),
}).xor('phone', 'email');

export const loginSchema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().required(),
});