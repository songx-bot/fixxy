// frontend/src/pages/VerifyOTP.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import axios from '../utils/axios';

const VerifyOTP = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const navigate = useNavigate();

  const identifier = localStorage.getItem('otpIdentifier');
  const type = localStorage.getItem('otpType'); // 'PHONE' or 'EMAIL'

  useEffect(() => {
    if (!identifier) {
      // No identifier found, redirect to signup
      navigate('/auth/signup');
    }
  }, [identifier, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = { code };
    if (type === 'PHONE') payload.phone = identifier;
    else payload.email = identifier;

    try {
      await axios.post('/auth/verify-otp', payload);
      // Verification successful: clear stored identifier, redirect to login
      localStorage.removeItem('otpIdentifier');
      localStorage.removeItem('otpType');
      navigate('/auth/login?verified=true');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendMessage('');
    const payload = { type };
    if (type === 'PHONE') payload.phone = identifier;
    else payload.email = identifier;

    try {
      await axios.post('/auth/send-otp', payload);
      setResendMessage('OTP resent successfully');
    } catch (err) {
      setResendMessage(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, bgcolor: 'background.paper' }}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Verify Your Account
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 2 }}>
          Enter the 6‑digit code sent to your {type.toLowerCase()}.
        </Typography>
        <form onSubmit={handleVerify}>
          <TextField
            label="OTP Code"
            fullWidth
            margin="normal"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            inputProps={{ maxLength: 6 }}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
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
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button
            variant="text"
            onClick={handleResend}
            disabled={resendLoading}
          >
            {resendLoading ? 'Sending...' : 'Resend OTP'}
          </Button>
          {resendMessage && (
            <Alert severity="info" sx={{ mt: 1 }}>
              {resendMessage}
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default VerifyOTP;