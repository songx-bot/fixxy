import { AppBar, Toolbar, Typography, Button, Stack, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ onLoginOpen, onSignupOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none', py: 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>
          Fixxy
        </Typography>
        <Stack direction="row" spacing={isMobile ? 1 : 2}>
          <Button color="inherit" onClick={onLoginOpen}>
            Login
          </Button>
          <Button variant="contained" color="primary" onClick={onSignupOpen}>
            Sign Up
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;