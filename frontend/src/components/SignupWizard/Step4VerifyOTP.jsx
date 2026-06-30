import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  Typography,
  Stack,
} from '@mui/material';
import axios from '../../utils/axios';

const Step4VerifyOTP = ({ formData, onClose, onSwitchToLogin }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [verified, setVerified] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const { identifier, otpType } = formData;

  // Cooldown timer for resend
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const payload = { code };
    if (otpType === 'PHONE') payload.phone = identifier;
    else payload.email = identifier;

    try {
      await axios.post('/auth/verify-otp', payload);
      setVerified(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendMessage('');
    const payload = { type: otpType };
    if (otpType === 'PHONE') payload.phone = identifier;
    else payload.email = identifier;

    try {
      await axios.post('/auth/send-otp', payload);
      setResendMessage('OTP resent successfully');
      setCooldown(60); // 60 seconds cooldown
    } catch (err) {
      setResendMessage(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  // Success state
  if (verified) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="primary.main" gutterBottom>
          ✅ Account Verified!
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Your account has been successfully verified. You can now log in.
        </Typography>
        <Button variant="contained" color="primary" onClick={onSwitchToLogin}>
          Login Now
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h6" gutterBottom>
        Verify Your {otpType.toLowerCase()}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Enter the 6‑digit code sent to your {otpType.toLowerCase()}.
      </Typography>
      <form onSubmit={handleVerify}>
        <TextField
          label="OTP Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          inputProps={{ maxLength: 6 }}
        />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </Button>
      </form>
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
        <Button
          variant="text"
          onClick={handleResend}
          disabled={resendLoading || cooldown > 0}
        >
          {resendLoading
            ? 'Sending...'
            : cooldown > 0
            ? `Resend (${cooldown}s)`
            : 'Resend OTP'}
        </Button>
        <Button variant="text" color="secondary" onClick={onSwitchToLogin}>
          Already have an account? Login
        </Button>
      </Stack>
      {resendMessage && <Alert severity="info" sx={{ mt: 1 }}>{resendMessage}</Alert>}
    </Box>
  );
};

export default Step4VerifyOTP;