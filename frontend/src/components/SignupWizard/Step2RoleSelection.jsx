import { useState } from 'react';
import { Box, Typography, Button, ToggleButtonGroup, ToggleButton, Stack } from '@mui/material';
import { Person, Build, Storefront } from '@mui/icons-material';

const roles = [
  { value: 'CUSTOMER', label: 'Customer', icon: <Person />, desc: 'Find technicians and buy parts' },
  { value: 'TECHNICIAN', label: 'Technician', icon: <Build />, desc: 'Offer repair services' },
  { value: 'SELLER', label: 'Seller', icon: <Storefront />, desc: 'Sell parts and devices' },
];

const Step2RoleSelection = ({ onNext, onBack, initialData }) => {
  const [selectedRole, setSelectedRole] = useState(initialData.role || 'CUSTOMER');

  const handleNext = () => {
    onNext({ role: selectedRole });
  };

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h6" gutterBottom>
        What best describes you?
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Choose the role that fits your needs.
      </Typography>

      <Stack spacing={2}>
        {roles.map((role) => (
          <Button
            key={role.value}
            variant={selectedRole === role.value ? 'contained' : 'outlined'}
            color={selectedRole === role.value ? 'primary' : 'inherit'}
            sx={{
              justifyContent: 'flex-start',
              py: 1.5,
              px: 2,
              borderRadius: 2,
              borderColor: selectedRole === role.value ? 'primary.main' : '#484A4B',
              color: selectedRole === role.value ? '#070709' : '#FFFFFF',
              '&:hover': {
                borderColor: 'primary.main',
              },
            }}
            onClick={() => setSelectedRole(role.value)}
          >
            <Box sx={{ mr: 2 }}>{role.icon}</Box>
            <Box textAlign="left">
              <Typography variant="subtitle1">{role.label}</Typography>
              <Typography variant="caption" color="text.secondary">
                {role.desc}
              </Typography>
            </Box>
          </Button>
        ))}
      </Stack>

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button variant="outlined" onClick={onBack} fullWidth>
          Back
        </Button>
        <Button variant="contained" color="primary" fullWidth onClick={handleNext}>
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default Step2RoleSelection;