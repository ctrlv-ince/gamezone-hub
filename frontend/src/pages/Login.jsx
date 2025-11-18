import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  styled,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCustomToken,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import authService from '../services/authService';
import { UserContext } from '../context/UserContext';
import api from '../services/api';

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
});

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
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data) => {
    try {
      const response = await authService.login({ loginIdentifier: data.email, password: data.password });
      const { customToken } = response;
      await signInWithCustomToken(auth, customToken);
      const idToken = await auth.currentUser.getIdToken();
      localStorage.setItem('token', idToken);

      const userResponse = await api.get('/auth/me');
      const userData = userResponse.data;

      login(userData, idToken);
      if (userData.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      // TODO: Show error message to user
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error('Google Sign-In error:', error);
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
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email or Username"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputLabelProps={{
                style: { color: '#bbbbbb' },
              }}
              FormHelperTextProps={{
                style: { color: '#f44336' },
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
                          fullWidth
                          name="password"
                          label="Password"
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          autoComplete="current-password"
                          {...register('password')}
                          error={!!errors.password}
                          helperText={errors.password?.message}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => setShowPassword(!showPassword)}
                                  onMouseDown={(e) => e.preventDefault()}
                                  edge="end"
                                  sx={{ color: '#bbbbbb' }}
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          InputLabelProps={{
                            style: { color: '#bbbbbb' },
                          }}
                          FormHelperTextProps={{
                            style: { color: '#f44336' },
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
            <AnimatedButton
              fullWidth
              variant="contained"
              onClick={handleGoogleSignIn}
              sx={{ mt: 1, mb: 2, py: 1.5 }}
            >
              Sign in with Google
            </AnimatedButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;