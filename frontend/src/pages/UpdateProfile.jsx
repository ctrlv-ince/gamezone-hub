import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Avatar,
  Paper,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';
import './UpdateProfile.css';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { user, updateAuthUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarError, setAvatarError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    contactNumber: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        address: user.address || '',
        contactNumber: user.contactNumber || '',
      });
      if (user.avatar?.url) {
        setAvatarPreview(user.avatar.url);
      }
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Update profile
      const updatedUser = await authService.updateProfile({
        name: formData.name,
        email: formData.email,
        address: formData.address,
        contactNumber: formData.contactNumber
      });

      // Update avatar if changed
      if (avatarFile) {
        try {
          await authService.updateAvatar(avatarFile);
        } catch (avatarErr) {
          console.error('Avatar update failed:', avatarErr);
          // Profile was updated successfully, but avatar failed
          toast.warning('Profile updated but avatar upload failed');
        }
      }

      // Update auth context
      if (updatedUser) {
        updateAuthUser(updatedUser);
      }

      toast.success('Profile updated successfully!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      const errorMessage = err.message || 'Failed to update profile';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0d1117 100%)',
        py: 8,
        pt: 12,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            backgroundColor: 'rgba(26, 31, 58, 0.8)',
            border: '1px solid rgba(0,255,136,0.2)',
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Orbitron', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 700,
                color: '#fff',
                mb: 4,
                textAlign: 'center',
              }}
            >
              Update Profile
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {/* Avatar Upload Section */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography
                variant="subtitle1"
                sx={{
                  color: '#b0b0b0',
                  mb: 2,
                  fontWeight: 600,
                }}
              >
                Profile Picture
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                {avatarPreview ? (
                  <Avatar
                    src={avatarPreview}
                    alt={formData.name}
                    onError={() => setAvatarError(true)}
                    sx={{
                      width: 100,
                      height: 100,
                      border: '2px solid rgba(0,255,136,0.3)',
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      backgroundColor: '#fbbf24',
                      fontSize: '2rem',
                      border: '2px solid rgba(0,255,136,0.3)',
                    }}
                  >
                    {formData.name?.charAt(0).toUpperCase()}
                  </Avatar>
                )}
              </Box>

              <Box
                component="label"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  border: '2px solid rgba(100,160,190,0.4)',
                  cursor: 'pointer',
                  color: 'rgb(100, 160, 190)',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(100,160,190,0.1)',
                    borderColor: 'rgba(100,160,190,0.7)',
                  },
                }}
              >
                <PhotoCamera sx={{ fontSize: 20 }} />
                Change Picture
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleAvatarChange}
                />
              </Box>
            </Box>

            {/* Form Fields */}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                margin="normal"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: 'rgba(100,160,190,0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(100,160,190,0.6)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgb(100,160,190)',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#666',
                    opacity: 1,
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b0b0b0',
                    '&.Mui-focused': {
                      color: 'rgb(100,160,190)',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                margin="normal"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: 'rgba(100,160,190,0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(100,160,190,0.6)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgb(100,160,190)',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#666',
                    opacity: 1,
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b0b0b0',
                    '&.Mui-focused': {
                      color: 'rgb(100,160,190)',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                margin="normal"
                required
                multiline
                rows={2}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: 'rgba(100,160,190,0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(100,160,190,0.6)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgb(100,160,190)',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#666',
                    opacity: 1,
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b0b0b0',
                    '&.Mui-focused': {
                      color: 'rgb(100,160,190)',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                margin="normal"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: 'rgba(100,160,190,0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(100,160,190,0.6)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgb(100,160,190)',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#666',
                    opacity: 1,
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b0b0b0',
                    '&.Mui-focused': {
                      color: 'rgb(100,160,190)',
                    },
                  },
                }}
              />

              {/* Buttons */}
              <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                <Button
                  fullWidth
                  type="submit"
                  disabled={loading}
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, rgb(100, 160, 190) 0%, rgb(60, 120, 150) 100%)',
                    color: '#fff',
                    fontWeight: 'bold',
                    py: 1.5,
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgb(120, 175, 205) 0%, rgb(80, 135, 165) 100%)',
                      boxShadow: '0 8px 20px rgba(60, 120, 150, 0.4)',
                    },
                    '&:disabled': {
                      background: 'rgba(100,160,190,0.3)',
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                </Button>
                <Button
                  fullWidth
                  onClick={() => navigate('/')}
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(100,160,190,0.5)',
                    color: 'rgb(100,160,190)',
                    fontWeight: 'bold',
                    py: 1.5,
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    '&:hover': {
                      borderColor: 'rgb(100,160,190)',
                      backgroundColor: 'rgba(100,160,190,0.1)',
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default UpdateProfile;