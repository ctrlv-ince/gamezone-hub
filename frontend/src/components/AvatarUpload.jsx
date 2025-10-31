import { useState, useRef } from 'react';
import {
  Box,
  Avatar,
  Button,
  CircularProgress,
  Alert,
  Typography,
  IconButton
} from '@mui/material';
import { PhotoCamera, Edit } from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const AvatarUpload = ({ currentAvatar, onAvatarUpdate, editable = true }) => {
  const { token } = useAuth();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(currentAvatar?.url || null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.');
      toast.error('Invalid file type');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must not exceed 5MB');
      toast.error('File size must not exceed 5MB');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload file
    uploadAvatar(file);
  };

  const uploadAvatar = async (file) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/auth/avatar`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        toast.success('Avatar updated successfully');
        if (onAvatarUpdate) {
          onAvatarUpdate(response.data.user);
        }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error uploading avatar';
      setError(errorMessage);
      toast.error(errorMessage);
      setPreview(currentAvatar?.url || null);
    } finally {
      setLoading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      {/* Error Alert */}
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Avatar Display */}
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        <Avatar
          src={preview}
          alt="User Avatar"
          sx={{
            width: 120,
            height: 120,
            border: '3px solid #1976d2',
            fontSize: '3rem'
          }}
        />

        {/* Edit Button Overlay */}
        {editable && (
          <IconButton
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: '#1976d2',
              color: 'white',
              '&:hover': {
                backgroundColor: '#1565c0'
              },
              '&:disabled': {
                backgroundColor: '#ccc'
              }
            }}
          >
            {loading ? <CircularProgress size={24} /> : <PhotoCamera />}
          </IconButton>
        )}
      </Box>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        disabled={loading}
      />

      {/* Upload Button for Non-Interactive Mode */}
      {editable && !loading && (
        <Button
          variant="outlined"
          startIcon={<Edit />}
          onClick={() => fileInputRef.current?.click()}
          size="small"
        >
          Change Avatar
        </Button>
      )}

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CircularProgress size={20} />
          <Typography variant="body2">Uploading...</Typography>
        </Box>
      )}

      {/* Help Text */}
      <Typography variant="caption" color="textSecondary" sx={{ textAlign: 'center' }}>
        JPG, PNG, GIF, or WebP • Max 5MB
      </Typography>
    </Box>
  );
};

export default AvatarUpload;