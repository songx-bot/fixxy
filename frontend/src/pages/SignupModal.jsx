// frontend/src/pages/SignupModal.jsx
import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Step1AccountType from '../components/SignupWizard/Step1AccountType';
import Step2RoleSelection from '../components/SignupWizard/Step2RoleSelection';
import Step3PersonalInfo from '../components/SignupWizard/Step3PersonalInfo';
import Step4VerifyOTP from '../components/SignupWizard/Step4VerifyOTP';

const steps = ['Account Type', 'Role', 'Personal Info', 'Verify OTP'];

const SignupModal = ({ open, onClose, onSwitchToLogin }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    usePhone: true,
    userId: null,
    identifier: '',
    otpType: 'PHONE',
    role: 'CUSTOMER',
  });

  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleClose = () => {
    onClose();
    setActiveStep(0);
    // Reset form data if needed (optional)
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Step1AccountType onNext={handleNext} initialData={formData} />;
      case 1:
        return <Step2RoleSelection onNext={handleNext} onBack={handleBack} initialData={formData} />;
      case 2:
        return <Step3PersonalInfo onNext={handleNext} onBack={handleBack} initialData={formData} />;
      case 3:
        return <Step4VerifyOTP formData={formData} onClose={handleClose} onSwitchToLogin={onSwitchToLogin} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Create Account
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Stepper activeStep={activeStep} sx={{ mt: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>
      <DialogContent>
        {getStepContent(activeStep)}
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;