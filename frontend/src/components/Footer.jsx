import { Box, Container, Grid, Typography, Stack, Divider, Button } from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';

const Footer = ({ onLoginOpen, onSignupOpen }) => {
  return (
    <Box sx={{ bgcolor: '#10130B', py: 6, mt: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary.main" gutterBottom>
              Fixxy
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your all‑in‑one platform for gadget repairs, spare parts, and pre‑loved devices.
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Company
            </Typography>
            <Stack spacing={1}>
              <Button variant="text" color="inherit" size="small">About</Button>
              <Button variant="text" color="inherit" size="small">Blog</Button>
              <Button variant="text" color="inherit" size="small">Careers</Button>
            </Stack>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Support
            </Typography>
            <Stack spacing={1}>
              <Button variant="text" color="inherit" size="small">Help Center</Button>
              <Button variant="text" color="inherit" size="small">Contact</Button>
              <Button variant="text" color="inherit" size="small">FAQ</Button>
            </Stack>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Stack spacing={1}>
              <Button variant="text" color="inherit" size="small">Privacy Policy</Button>
              <Button variant="text" color="inherit" size="small">Terms of Service</Button>
              <Button variant="text" color="inherit" size="small">Cookie Policy</Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Contact
            </Typography>
            <Stack spacing={1}>
              <Box display="flex" alignItems="center">
                <Phone sx={{ mr: 1, color: 'primary.main', fontSize: 16 }} />
                <Typography variant="body2">+233 50 123 4567</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Email sx={{ mr: 1, color: 'primary.main', fontSize: 16 }} />
                <Typography variant="body2">support@fixxy.com</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <LocationOn sx={{ mr: 1, color: 'primary.main', fontSize: 16 }} />
                <Typography variant="body2">Accra, Ghana</Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, borderColor: '#484A4B' }} />
        <Typography variant="body2" align="center" color="text.secondary">
          © {new Date().getFullYear()} Fixxy. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;