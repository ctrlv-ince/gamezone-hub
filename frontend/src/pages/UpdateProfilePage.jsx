import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Snackbar,
  Avatar
} from '@mui/material';
import { UserContext } from '../context/UserContext';
import authService from '../services/authService';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

const UpdateProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
    }
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const onSubmit = async (data) => {
    try {
      const updatedUser = await authService.updateProfile(data);
      setUser(updatedUser);
      setSnackbar({
        open: true,
        message: 'Profile updated successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: 'Failed to update profile. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #16213e 100%)',
      py: 6
    }}>
      <Container maxWidth="md">
        {/* Page Header */}
        <Box sx={{ 
          mb: 6,
          pb: 4,
          borderBottom: '1px solid rgba(139, 0, 255, 0.2)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ 
              width: '6px', 
              height: '50px', 
              background: 'linear-gradient(to bottom, #8b00ff, #00d4ff)',
              mr: 3,
              borderRadius: '3px',
              boxShadow: '0 0 20px rgba(139, 0, 255, 0.5)'
            }} />
            <Typography 
              variant="h2" 
              component="h1"
              sx={{ 
                color: 'white',
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '3rem' },
                letterSpacing: '1px'
              }}
            >
              Update Profile
            </Typography>
          </Box>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '1.1rem',
              ml: { xs: 0, md: 5 }
            }}
          >
            Manage your account information
          </Typography>
        </Box>

        {/* Profile Form Card */}
        <Card
          sx={{
            background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.9) 0%, rgba(37, 42, 69, 0.9) 100%)',
            border: '1px solid rgba(139, 0, 255, 0.3)',
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(139, 0, 255, 0.2)'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Avatar
                src={user?.avatar}
                sx={{ width: 120, height: 120, border: '3px solid #8b00ff' }}
              />
            </Box>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    mb: 1,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '0.75rem'
                  }}
                >
                  Username
                </Typography>
                <TextField
                  fullWidth
                  type="text"
                  id="username"
                  name="username"
                  {...register('username')}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      '& fieldset': {
                        borderColor: 'rgba(139, 0, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(139, 0, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#8b00ff',
                        boxShadow: '0 0 10px rgba(139, 0, 255, 0.3)'
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#8b00ff',
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    mb: 1,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '0.75rem'
                  }}
                >
                  Email
                </Typography>
                <TextField
                  fullWidth
                  type="email"
                  id="email"
                  name="email"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      '& fieldset': {
                        borderColor: 'rgba(139, 0, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(139, 0, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#8b00ff',
                        boxShadow: '0 0 10px rgba(139, 0, 255, 0.3)'
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#8b00ff',
                    },
                  }}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  background: 'linear-gradient(135deg, #8b00ff 0%, #00d4ff 100%)',
                  color: 'white',
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  '&:hover': {
                    boxShadow: '0 0 30px rgba(139, 0, 255, 0.6)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Update Profile
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Additional Info Card */}
        <Card
          sx={{
            background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.6) 0%, rgba(37, 42, 69, 0.6) 100%)',
            border: '1px solid rgba(0, 212, 255, 0.2)',
            borderRadius: 2,
            mt: 3
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: 'center'
              }}
            >
              💡 Your profile information is used to personalize your gaming experience
            </Typography>
          </CardContent>
        </Card>
      </Container>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{
            backgroundColor: snackbar.severity === 'success' 
              ? 'rgba(0, 212, 255, 0.9)' 
              : 'rgba(239, 68, 68, 0.9)',
            color: 'white',
            fontWeight: 600,
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UpdateProfilePage;