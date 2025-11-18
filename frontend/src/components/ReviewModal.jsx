import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Rating,
  TextField,
  IconButton,
  Fade,
  Backdrop,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';








const ReviewModal = ({ open, onClose, onSubmit, review }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setComment(review.comment);
    } else {
      setRating(0);
      setComment('');
    }
  }, [review, open]);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    onSubmit({ rating, comment });
    onClose();
  };

  const handleClose = () => {
    setRating(0);
    setComment('');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)'
        }
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '500px', md: '550px' },
            background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.98) 0%, rgba(37, 42, 69, 0.98) 100%)',
            border: '2px solid rgba(139, 0, 255, 0.4)',
            borderRadius: 3,
            boxShadow: '0 24px 48px rgba(139, 0, 255, 0.3)',
            p: 4,
          }}
        >
          {/* Header */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3,
            pb: 3,
            borderBottom: '1px solid rgba(139, 0, 255, 0.3)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                width: '4px', 
                height: '30px', 
                background: 'linear-gradient(to bottom, #8b00ff, #00d4ff)',
                mr: 2,
                borderRadius: '2px',
                boxShadow: '0 0 10px rgba(139, 0, 255, 0.5)'
              }} />
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'white',
                  fontWeight: 700,
                  letterSpacing: '0.5px'
                }}
              >
                {review ? 'Edit Your Review' : 'Leave a Review'}
              </Typography>
            </Box>
            <IconButton
              onClick={handleClose}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  color: '#ef4444',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  transform: 'rotate(90deg)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Rating Section */}
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                mb: 2,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: '0.75rem'
              }}
            >
              Your Rating
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: 2,
                border: '1px solid rgba(139, 0, 255, 0.3)',
              }}
            >
              <Rating
                name="product-rating"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                size="large"
                sx={{
                  fontSize: '3rem',
                  '& .MuiRating-iconFilled': {
                    color: '#fbbf24',
                  },
                  '& .MuiRating-iconEmpty': {
                    color: 'rgba(251, 191, 36, 0.3)',
                  },
                  '& .MuiRating-iconHover': {
                    color: '#fbbf24',
                    transform: 'scale(1.1)',
                  }
                }}
              />
            </Box>
            {rating > 0 && (
              <Typography 
                sx={{ 
                  color: '#fbbf24', 
                  textAlign: 'center', 
                  mt: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600
                }}
              >
                {rating === 1 && '⭐ Poor'}
                {rating === 2 && '⭐⭐ Fair'}
                {rating === 3 && '⭐⭐⭐ Good'}
                {rating === 4 && '⭐⭐⭐⭐ Very Good'}
                {rating === 5 && '⭐⭐⭐⭐⭐ Excellent'}
              </Typography>
            )}
          </Box>

          {/* Comment Section */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                mb: 1.5,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: '0.75rem'
              }}
            >
              Your Review (Optional)
            </Typography>
            <TextField
              id="review-comment"
              placeholder="Share your thoughts about this product..."
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.5)',
                }
              }}
            />
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              fullWidth
              disabled={rating === 0}
              sx={{
                background: rating === 0 
                  ? 'rgba(139, 0, 255, 0.2)' 
                  : 'linear-gradient(135deg, #8b00ff 0%, #00d4ff 100%)',
                color: 'white',
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                '&:hover': {
                  boxShadow: rating > 0 ? '0 0 30px rgba(139, 0, 255, 0.6)' : 'none',
                  transform: rating > 0 ? 'translateY(-2px)' : 'none',
                },
                '&:disabled': {
                  color: 'rgba(255, 255, 255, 0.3)',
                  cursor: 'not-allowed',
                },
                transition: 'all 0.3s ease'
              }}
            >
              {review ? 'Update Review' : 'Submit Review'}
            </Button>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                py: 1.5,
                px: 4,
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }
              }}
            >
              Cancel
            </Button>
          </Box>

          {/* Helper Text */}
          <Typography 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.5)', 
              fontSize: '0.75rem',
              textAlign: 'center',
              mt: 3,
              fontStyle: 'italic'
            }}
          >
            Your review helps other gamers make informed decisions
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ReviewModal;