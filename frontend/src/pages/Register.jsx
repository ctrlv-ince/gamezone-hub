import { useState, useEffect, useRef } from 'react';
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
  IconButton,
  Divider
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import { validateRegisterForm, hasErrors } from '../utils/validation';
import AvatarUpload from '../components/AvatarUpload';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error, clearError, isLoggedIn } = useAuth();
  const fileInputRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    contactNumber: ''
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle avatar file selection
  const handleAvatarSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must not exceed 5MB');
      return;
    }

    setAvatarFile(file);

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setFormErrors({});
    clearError();

    // Validate form
    const errors = validateRegisterForm(
      formData.name,
      formData.email,
      formData.password,
      formData.confirmPassword,
      formData.address,
      formData.contactNumber
    );

    if (hasErrors(errors)) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);

    try {
      const result = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.address,
        formData.contactNumber,
        avatarFile
      );

      if (result.success) {
        toast.success('Registration successful! Redirecting...');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch (err) {
      toast.error(err.message || 'Registration failed');
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
              Create Account
            </Typography>
            <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
              Join GameZone Hub today
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
              {error}
            </Alert>
          )}

          {/* Avatar Upload Section */}
          <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#fff' }}>
              Profile Picture (Optional)
            </Typography>
            <Box
              onClick={() => fileInputRef.current?.click()}
              sx={{
                width: 120,
                height: 120,
                border: '2px dashed #00d4ff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: avatarPreview ? 'transparent' : 'rgba(10, 14, 39, 0.5)',
                backgroundImage: avatarPreview ? `url(${avatarPreview})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#00ff88',
                  backgroundColor: avatarPreview ? 'transparent' : 'rgba(10, 14, 39, 0.7)',
                  boxShadow: '0 0 15px rgba(0,212,255,0.3)'
                }
              }}
            >
              {!avatarPreview && (
                <Typography variant="caption" sx={{ textAlign: 'center', color: '#a0a0a0' }}>
                  Click to upload
                </Typography>
              )}
            </Box>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarSelect}
              style={{ display: 'none' }}
              disabled={submitting || loading}
            />
            <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
              JPG, PNG, GIF, or WebP • Max 5MB
            </Typography>
          </Box>

          <Divider sx={{ my: 2, borderColor: 'rgba(0,255,136,0.2)' }} />

          {/* Registration Form */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* Name Field */}
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
              margin="normal"
              placeholder="Enter your full name"
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
                '& .MuiInputLabel-root': {
                  color: '#a0a0a0',
                },
              }}
            />

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

            {/* Confirm Password Field */}
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              margin="normal"
              placeholder="Confirm your password"
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
                '& .MuiInputLabel-root': {
                  color: '#a0a0a0',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmPassword}
                      edge="end"
                      disabled={submitting || loading}
                      sx={{ color: '#b0b0b0' }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {/* Address Field */}
            <TextField
              fullWidth
              label="Address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              error={!!formErrors.address}
              helperText={formErrors.address}
              margin="normal"
              placeholder="Enter your full address"
              disabled={submitting || loading}
              multiline
              rows={2}
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
                '& .MuiInputLabel-root': {
                  color: '#a0a0a0',
                },
              }}
            />

            {/* Contact Number Field */}
            <TextField
              fullWidth
              label="Contact Number"
              name="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={handleChange}
              error={!!formErrors.contactNumber}
              helperText={formErrors.contactNumber}
              margin="normal"
              placeholder="Enter your contact number (e.g., +1234567890)"
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
                '& .MuiInputLabel-root': {
                  color: '#a0a0a0',
                },
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
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
              Already have an account?{' '}
              <Link
                to="/login"
                style={{
                  color: '#00d4ff',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.textShadow = '0 0 10px rgba(0,212,255,0.5)'}
                onMouseLeave={(e) => e.target.style.textShadow = 'none'}
              >
                Login here
              </Link>
            </Typography>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default Register;