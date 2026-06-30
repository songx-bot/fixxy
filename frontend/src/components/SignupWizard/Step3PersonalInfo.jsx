// frontend/src/components/SignupWizard/Step3PersonalInfo.jsx
import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  Typography,
} from '@mui/material';
import axios from '../../utils/axios';

const Step3PersonalInfo = ({ onNext, onBack, initialData }) => {
  const [fullName, setFullName] = useState(initialData.fullName || '');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      fullName,
      password,
      role: initialData.role, // include the selected role
    };
    if (initialData.usePhone) {
      payload.phone = identifier;
    } else {
      payload.email = identifier;
    }

    try {
      const response = await axios.post('/auth/register', payload);
      onNext({
        fullName,
        identifier,
        password,
        userId: response.data.userId,
        otpType: initialData.usePhone ? 'PHONE' : 'EMAIL',
        role: initialData.role,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ py: 2 }}>
      <TextField
        label="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <TextField
        label={initialData.usePhone ? 'Phone Number (e.g., 233501234567)' : 'Email Address'}
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        required
        type={initialData.usePhone ? 'tel' : 'email'}
      />
      <TextField
        label="Password (min 6 chars)"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        inputProps={{ minLength: 6 }}
      />
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button variant="outlined" onClick={onBack} fullWidth>
          Back
        </Button>
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? 'Creating...' : 'Sign Up'}
        </Button>
      </Box>
    </Box>
  );
};

export default Step3PersonalInfo;