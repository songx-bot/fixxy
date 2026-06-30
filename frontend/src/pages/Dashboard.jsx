import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import axios from '../utils/axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/auth/me');
        setUser(res.data.user);
      } catch {
        navigate('/auth/login');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await axios.post('/auth/logout');
    navigate('/');
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, bgcolor: 'background.paper' }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.fullName}!
        </Typography>
        <Typography variant="body1">
          Role: <strong>{user.role}</strong>
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;