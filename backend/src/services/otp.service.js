// backend/src/services/otp.service.js
import axios from 'axios';
import { OTP_LENGTH, OTP_EXPIRY_MINUTES } from '../config/constants.js';

const {
  NALO_AUTH_KEY,
  NALO_SENDER_ID,
  NALO_EMAIL_FROM,
  NALO_SMS_API_URL,
  NALO_EMAIL_API_URL,
} = process.env;

/**
 * Generate a random 6-digit OTP
 * @returns {string} 6-digit code
 */
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Send OTP via SMS using Nalo API
 * @param {string} phone - recipient phone (with country code, no +)
 * @param {string} otp - 6-digit code
 * @returns {Promise<Object>} API response
 */
export const sendSMSOTP = async (phone, otp) => {
  const message = `Your Fixxy OTP is: ${otp}`;
  const payload = {
    key: NALO_AUTH_KEY,
    type: 0,
    msisdn: phone,          // ✅ correct field name
    sender_id: NALO_SENDER_ID, // ✅ correct field name
    message,
    dlr: 1,
  };

  try {
    const response = await axios.post(NALO_SMS_API_URL, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Nalo SMS error:', error.response?.data || error.message);
    throw new Error('Failed to send SMS OTP');
  }
};

/**
 * Send OTP via Email using Nalo API
 * @param {string} email - recipient email
 * @param {string} otp - 6-digit code
 * @returns {Promise<Object>} API response
 */
export const sendEmailOTP = async (email, otp) => {
  const emailBody = `Your Fixxy OTP is: ${otp}`;
  const payload = {
    emailTo: email,
    emailFrom: NALO_EMAIL_FROM,
    senderName: 'Fixxy',
    subject: 'Your OTP Code',
    emailBody,
  };

  try {
    const response = await axios.post(NALO_EMAIL_API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${NALO_AUTH_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Nalo Email error:', error.response?.data || error.message);
    throw new Error('Failed to send Email OTP');
  }
};