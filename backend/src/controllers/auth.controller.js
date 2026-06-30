// src/controllers/auth.controller.js
import bcrypt from 'bcrypt';
import prisma from '../db.js';
import { generateOTP, sendSMSOTP, sendEmailOTP } from '../services/otp.service.js';
import { generateToken } from '../utils/jwt.utils.js';
import { OTP_EXPIRY_MINUTES } from '../config/constants.js';



// ------------------- Register -------------------
export const register = async (req, res) => {
  try {
    const { phone, email, password, fullName, role } = req.body;

    // Check if user already exists with same phone or email
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ phone }, { email }],
      },
    });
    if (existingUser) {
      return res.status(409).json({
        message: 'User with this phone or email already exists.',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with provided role (defaults to CUSTOMER if not given)
    const user = await prisma.user.create({
      data: {
        phone: phone || null,
        email: email || null,
        passwordHash: hashedPassword,
        fullName,
        role: role || 'CUSTOMER',
        verifiedPhone: false,
        verifiedEmail: false,
      },
    });

    // Send OTP based on provided identifier
    const otp = generateOTP();
    const otpType = phone ? 'PHONE' : 'EMAIL';
    const identifier = phone || email;

    // Store OTP in database
    await prisma.oTP.create({
      data: {
        userId: user.id,
        code: otp,
        type: otpType,
        expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000),
        used: false,
      },
    });

    // Send via appropriate channel
    if (phone) {
      await sendSMSOTP(phone, otp);
    } else if (email) {
      await sendEmailOTP(email, otp);
    }

    res.status(201).json({
      message: 'User registered. OTP sent to your ' + (phone ? 'phone' : 'email'),
      userId: user.id,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ------------------- Send OTP (resend) -------------------
export const sendOTP = async (req, res) => {
  try {
    const { phone, email, type } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ phone }, { email }],
      },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (type === 'PHONE' && user.verifiedPhone) {
      return res.status(400).json({ message: 'Phone already verified' });
    }
    if (type === 'EMAIL' && user.verifiedEmail) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    const otp = generateOTP();

    await prisma.oTP.create({
      data: {
        userId: user.id,
        code: otp,
        type: type,
        expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000),
        used: false,
      },
    });

    if (type === 'PHONE') {
      await sendSMSOTP(phone, otp);
    } else {
      await sendEmailOTP(email, otp);
    }

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ------------------- Verify OTP -------------------
export const verifyOTP = async (req, res) => {
  try {
    const { phone, email, code } = req.body;
    const identifier = phone || email;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ phone }, { email }],
      },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otpType = phone ? 'PHONE' : 'EMAIL';
    const otpRecord = await prisma.oTP.findFirst({
      where: {
        userId: user.id,
        type: otpType,
        code: code,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    await prisma.oTP.update({
      where: { id: otpRecord.id },
      data: { used: true },
    });

    const updateData = {};
    if (otpType === 'PHONE') updateData.verifiedPhone = true;
    else updateData.verifiedEmail = true;

    await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ------------------- Login -------------------
export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ phone: identifier }, { email: identifier }],
      },
    });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.verifiedPhone && !user.verifiedEmail) {
      return res.status(403).json({ message: 'Account not verified. Please verify via OTP.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = {
      id: user.id,
      role: user.role,
      phone: user.phone,
      email: user.email,
      fullName: user.fullName,
    };
    const token = generateToken(payload);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ------------------- Logout -------------------
export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  res.json({ message: 'Logged out successfully' });
};