import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Card,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import { validateLoginForm, hasErrors } from '../utils/validation';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error, clearError, isLoggedIn } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // Clear error when component unmounts or error changes
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setFormErrors({});
    clearError();

    // Validate form
    const errors = validateLoginForm(formData.email, formData.password);

    if (hasErrors(errors)) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        toast.success('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 4
        }}
      >
        <Card
          sx={{
            p: 4,
            boxShadow: '0 0 30px rgba(0,255,136,0.2), 0 10px 40px rgba(0,0,0,0.5)',
            borderRadius: 2,
            backgroundColor: 'rgba(26, 31, 58, 0.9)',
            border: '1px solid rgba(0,255,136,0.3)',
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, rgb(100, 160, 190) 0%, rgb(60, 120, 150) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
              Sign in to GameZone Hub
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              margin="normal"
              placeholder="Enter your email"
              disabled={submitting || loading}
              autoFocus
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#b0b0b0',
                  backgroundColor: 'rgba(10, 14, 39, 0.5)',
                  '& fieldset': {
                    borderColor: 'rgba(0,255,136,0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0,255,136,0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00d4ff',
                    boxShadow: '0 0 10px rgba(0,212,255,0.3)',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#707070',
                  opacity: 1,
                },
                '& .MuiInputLabel-root': {
                  color: '#a0a0a0',
                },
              }}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              margin="normal"
              placeholder="Enter your password"
              disabled={submitting || loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#b0b0b0',
                  backgroundColor: 'rgba(10, 14, 39, 0.5)',
                  '& fieldset': {
                    borderColor: 'rgba(0,255,136,0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0,255,136,0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00d4ff',
                    boxShadow: '0 0 10px rgba(0,212,255,0.3)',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#707070',
                  opacity: 1,
                },
                '& .MuiInputLabel-root': {
                  color: '#a0a0a0',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      disabled={submitting || loading}
                      sx={{ color: '#b0b0b0' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {/* Submit Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
              disabled={submitting || loading}
            >
              {submitting || loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ mb: 1, color: '#a0a0a0' }}>
              <Link
                to="/forgot-password"
                style={{
                  color: '#00d4ff',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.textShadow = '0 0 10px rgba(0,212,255,0.5)'}
                onMouseLeave={(e) => e.target.style.textShadow = 'none'}
              >
                Forgot your password?
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', color: '#a0a0a0' }}>
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                style={{
                  color: '#00ff88',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.textShadow = '0 0 10px rgba(0,255,136,0.5)'}
                onMouseLeave={(e) => e.target.style.textShadow = 'none'}
              >
                Create one now
              </Link>
            </Typography>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;