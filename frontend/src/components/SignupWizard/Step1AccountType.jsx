import { useState } from 'react';
import { Box, Typography, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Phone as PhoneIcon, Email as EmailIcon } from '@mui/icons-material';

const Step1AccountType = ({ onNext, initialData }) => {
  const [usePhone, setUsePhone] = useState(initialData.usePhone ?? true);

  const handleNext = () => {
    onNext({ usePhone, identifier: '', otpType: usePhone ? 'PHONE' : 'EMAIL' });
  };

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h6" gutterBottom>
        How would you like to sign up?
      </Typography>
      <ToggleButtonGroup
        value={usePhone}
        exclusive
        onChange={(_, val) => val !== null && setUsePhone(val)}
        fullWidth
        sx={{ my: 3 }}
      >
        <ToggleButton value={true} sx={{ py: 2 }}>
          <PhoneIcon sx={{ mr: 1 }} /> Phone
        </ToggleButton>
        <ToggleButton value={false} sx={{ py: 2 }}>
          <EmailIcon sx={{ mr: 1 }} /> Email
        </ToggleButton>
      </ToggleButtonGroup>
      <Button variant="contained" color="primary" fullWidth size="large" onClick={handleNext}>
        Continue
      </Button>
    </Box>
  );
};

export default Step1AccountType;