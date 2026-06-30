import { useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Fade,
  Grow,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Build as BuildIcon,
  ShoppingCart as ShoppingCartIcon,
  SupportAgent as SupportIcon,
  Security as SecurityIcon,
  Chat as ChatIcon,
  Verified as VerifiedIcon,
  MonetizationOn as MonetizationIcon,
  Star as StarIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Styled component for floating animation
const FloatingBox = styled(Box)(({ theme }) => ({
  animation: 'float 3s ease-in-out infinite',
  '@keyframes float': {
    '0%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-8px)' },
    '100%': { transform: 'translateY(0px)' },
  },
}));

// Sample data (unchanged)
const technicians = [
  { name: 'John Doe', specialty: 'Phone Repair', rating: 4.8, image: 'https://via.placeholder.com/150' },
  { name: 'Jane Smith', specialty: 'Laptop Repair', rating: 4.9, image: 'https://via.placeholder.com/150' },
  { name: 'Mike Johnson', specialty: 'Electronics', rating: 4.7, image: 'https://via.placeholder.com/150' },
];

const parts = [
  { name: 'iPhone 14 Screen', price: '$89', image: 'https://via.placeholder.com/200' },
  { name: 'MacBook Battery', price: '$120', image: 'https://via.placeholder.com/200' },
  { name: 'Samsung Charger', price: '$25', image: 'https://via.placeholder.com/200' },
];

const LandingPage = ({ onLoginOpen, onSignupOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Typing effect for hero subtitle (left side)
  const heroTextRef = useRef(null);
  useEffect(() => {
    const phrases = ['Trusted Technicians', 'Genuine Parts', 'Quick Repairs'];
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    const type = () => {
      const phrase = phrases[index];
      if (!isDeleting) {
        currentText = phrase.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === phrase.length) {
          isDeleting = true;
          setTimeout(type, 2000);
          return;
        }
      } else {
        currentText = phrase.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          index = (index + 1) % phrases.length;
        }
      }
      if (heroTextRef.current) {
        heroTextRef.current.textContent = currentText + '|';
      }
      setTimeout(type, isDeleting ? 50 : 100);
    };
    type();
  }, []);

  // Typing effect for the animated card (right side) – NO EMOJIS, only text
  const cardTextRef = useRef(null);
  useEffect(() => {
    const phrases = ['Find a Technician', 'Buy Genuine Parts', 'Track Your Repair'];
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    const type = () => {
      const phrase = phrases[index];
      if (!isDeleting) {
        currentText = phrase.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === phrase.length) {
          isDeleting = true;
          setTimeout(type, 2000);
          return;
        }
      } else {
        currentText = phrase.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          index = (index + 1) % phrases.length;
        }
      }
      if (cardTextRef.current) {
        cardTextRef.current.textContent = currentText + '|';
      }
      setTimeout(type, isDeleting ? 50 : 100);
    };
    type();
  }, []);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', color: 'text.primary' }}>
      <Navbar onLoginOpen={onLoginOpen} onSignupOpen={onSignupOpen} />

      {/* HERO SECTION with Gradient */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #070709 0%, #10130B 50%, #1a2418 100%)',
          pt: { xs: 4, md: 8 },
          pb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in timeout={800}>
                <Box>
                  <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                    Fixing Your Device Got Easy
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
                    Connect with trusted technicians, buy genuine spare parts, and get your gadgets repaired – all in one place.
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<ChevronRightIcon />}
                      onClick={onSignupOpen}
                    >
                      Find a Technician
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      onClick={onSignupOpen}
                    >
                      Browse Parts
                    </Button>
                  </Stack>
                  <Box sx={{ mt: 4, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    <Box>
                      <Typography variant="h4" color="primary.main">10K+</Typography>
                      <Typography variant="body2">Repairs Completed</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h4" color="primary.main">500+</Typography>
                      <Typography variant="body2">Verified Technicians</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h4" color="primary.main">98%</Typography>
                      <Typography variant="body2">Satisfaction Rate</Typography>
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </Grid>

            {/* RIGHT SIDE – Glassmorphism Card with Icon + Typing */}
            <Grid item xs={12} md={6}>
              <Grow in timeout={1000}>
                <FloatingBox
                  sx={{
                    width: '100%',
                    maxWidth: 400, // modal-like width
                    height: 200, // reduced height
                    margin: '0 auto', // centered
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                    p: 3,
                    textAlign: 'center',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 12px 40px rgba(156, 183, 90, 0.2)',
                    },
                  }}
                >
                  {/* Icon above the typing text */}
                  <BuildIcon sx={{ fontSize: 48, color: '#9CB75A', mb: 1 }} />
                  <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 500 }}>
                    <span ref={cardTextRef}>Find a Technician|</span>
                  </Typography>
                </FloatingBox>
              </Grow>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* --- ALL OTHER SECTIONS REMAIN UNCHANGED --- */}
      {/* Why Choose Fixxy */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Fade in timeout={600}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Why Choose Fixxy?
          </Typography>
        </Fade>
        <Fade in timeout={800}>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Everything you need to keep your devices running smoothly
          </Typography>
        </Fade>
        <Grid container spacing={4}>
          {[
            { icon: <VerifiedIcon />, title: 'Find Trusted Techs', desc: 'Browse verified technicians with real reviews and ratings.' },
            { icon: <ChatIcon />, title: 'Real-Time Chat', desc: 'Discuss your repair needs directly with technicians.' },
            { icon: <SecurityIcon />, title: 'Secure Payments', desc: 'Escrow system releases funds only when you\'re satisfied.' },
            { icon: <MonetizationIcon />, title: 'Buyer Protection', desc: 'Warranty on repairs and dispute resolution support.' },
            { icon: <BuildIcon />, title: 'Quality Parts', desc: 'Genuine and refurbished parts from trusted sellers.' },
            { icon: <ShoppingCartIcon />, title: 'Marketplace', desc: 'Buy and sell pre-loved devices with confidence.' },
          ].map((feature, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Fade in timeout={500 + idx * 150}>
                <Card
                  sx={{
                    height: '100%',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 12px 32px rgba(156, 183, 90, 0.2)',
                    },
                  }}
                >
                  <Box sx={{ color: 'primary.main', fontSize: 40, mb: 1 }}>{feature.icon}</Box>
                  <Typography variant="h6" gutterBottom>{feature.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{feature.desc}</Typography>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Fade in timeout={600}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            How It Works
          </Typography>
        </Fade>
        <Fade in timeout={800}>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Get your device fixed in four simple steps
          </Typography>
        </Fade>
        <Grid container spacing={4} justifyContent="center">
          {[
            { step: '1', title: 'Describe Your Issue', desc: 'Tell us what\'s wrong with your device.' },
            { step: '2', title: 'Find a Technician', desc: 'Match with verified experts near you.' },
            { step: '3', title: 'Get It Fixed', desc: 'Schedule repair, chat, and track progress.' },
            { step: '4', title: 'Pay & Review', desc: 'Release payment only when satisfied.' },
          ].map((item, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Fade in timeout={500 + idx * 200}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Typography variant="h2" color="primary.main" sx={{ fontWeight: 700, opacity: 0.3 }}>
                    {item.step}
                  </Typography>
                  <Typography variant="h6" gutterBottom>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Technicians */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Fade in timeout={600}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
            Featured Technicians
          </Typography>
        </Fade>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {technicians.map((tech, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Fade in timeout={500 + idx * 150}>
                <Card sx={{ textAlign: 'center', height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={tech.image}
                    alt={tech.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6">{tech.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{tech.specialty}</Typography>
                    <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
                      <StarIcon sx={{ color: '#FBE2B4', mr: 0.5 }} />
                      <Typography>{tech.rating}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Popular Parts */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Fade in timeout={600}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
            Popular Parts
          </Typography>
        </Fade>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {parts.map((part, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Fade in timeout={500 + idx * 150}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={part.image}
                    alt={part.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6">{part.name}</Typography>
                    <Typography variant="body1" color="primary.main" fontWeight="bold">{part.price}</Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Ready to Get Started */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a2418 0%, #070709 100%)',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Fade in timeout={800}>
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Ready to Get Started?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Join thousands of users who trust Fixxy for their gadget repair needs.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onSignupOpen}
                sx={{
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                Sign Up Free
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Footer onLoginOpen={onLoginOpen} onSignupOpen={onSignupOpen} />
    </Box>
  );
};

export default LandingPage;