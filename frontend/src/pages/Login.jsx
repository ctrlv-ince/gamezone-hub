import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  styled,
} from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const AnimatedButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(90deg, #9c27b0, #3f51b5)',
  transition: 'background 0.3s ease',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
    transform: 'rotate(45deg)',
    animation: 'gradient-animation 4s infinite linear',
  },
  '@keyframes gradient-animation': {
    '0%': {
      transform: 'translate(-50%, -50%) rotate(0deg)',
    },
    '100%': {
      transform: 'translate(-50%, -50%) rotate(360deg)',
    },
  },
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      // TODO: Redirect user or show success message
    } catch (error) {
      console.error('Error signing in:', error);
      // TODO: Show error message to user
    }
  };

  const wrapperStyles = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1a1a3d 0%, #0a0a1f 100%)',
  };

  return (
    <Box sx={wrapperStyles}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            padding: 4,
            borderRadius: '12px',
            background: 'rgba(26, 31, 58, 0.9)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ color: '#ffffff', mb: 3 }}>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{
                style: { color: '#bbbbbb' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#3f51b5',
                  },
                  '&:hover fieldset': {
                    borderColor: '#9c27b0',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#9c27b0',
                  },
                },
                input: { color: '#ffffff' },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{
                style: { color: '#bbbbbb' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#3f51b5',
                  },
                  '&:hover fieldset': {
                    borderColor: '#9c27b0',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#9c27b0',
                  },
                },
                input: { color: '#ffffff' },
              }}
            />
            <AnimatedButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Login
            </AnimatedButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;