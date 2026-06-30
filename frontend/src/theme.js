import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9CB75A',      // light green accent
    },
    secondary: {
      main: '#EC3A02',      // red accent (for warnings / highlights)
    },
    background: {
      default: '#070709',   // very dark background
      paper: '#10130B',     // dark card background
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#484A4B',
    },
    success: {
      main: '#9CB75A',
    },
    error: {
      main: '#EC3A02',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
        margin: 'normal',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#1a1d1a', // slightly lighter dark for input fields
            color: '#FFFFFF',
          },
          '& .MuiInputLabel-root': {
            color: '#484A4B',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#484A4B',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9CB75A',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#10130B',
          borderRadius: 16,
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          color: '#FFFFFF',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.8)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#10130B',
          color: '#FFFFFF',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          '& .MuiStepLabel-label': {
            color: '#FFFFFF',
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          borderColor: '#484A4B',
          '&.Mui-selected': {
            backgroundColor: '#9CB75A',
            color: '#070709',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: '#10130B',
          color: '#FFFFFF',
        },
      },
    },
  },
});

export default theme;