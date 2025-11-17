import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { addToCart } from '../services/cartService';
import { UserContext } from '../context/UserContext';

const ProductCard = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { user } = useContext(UserContext);

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please log in to add items to your cart.');
      return;
    }
    try {
      await addToCart(product._id, 1);
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  const images = product.images && product.images.length > 0
    ? product.images.map(img => img.url)
    : ['https://source.unsplash.com/random?gaming'];

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.9) 0%, rgba(37, 42, 69, 0.9) 100%)',
        border: '1px solid rgba(139, 0, 255, 0.3)',
        borderRadius: 2,
        boxShadow: '0 8px 24px rgba(139, 0, 255, 0.2)',
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 32px rgba(139, 0, 255, 0.4)',
          borderColor: 'rgba(0, 212, 255, 0.5)',
        },
      }}
    >
      {/* Image Section with Thumbnails */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={images[selectedImageIndex]}
          alt={product.name}
          sx={{
            objectFit: 'cover',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        />
        
        {/* Image Thumbnail Dots */}
        {images.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              borderRadius: 2,
              padding: '6px 10px',
              border: '1px solid rgba(139, 0, 255, 0.3)',
            }}
          >
            {images.map((_, index) => (
              <Box
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: selectedImageIndex === index 
                    ? '#00d4ff' 
                    : 'rgba(255, 255, 255, 0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedImageIndex === index 
                    ? '0 0 8px rgba(0, 212, 255, 0.8)' 
                    : 'none',
                  '&:hover': {
                    backgroundColor: selectedImageIndex === index 
                      ? '#00d4ff' 
                      : 'rgba(255, 255, 255, 0.7)',
                    transform: 'scale(1.2)',
                  },
                }}
              />
            ))}
          </Box>
        )}

        {/* Stock Badge */}
        {product.stock <= 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: 'rgba(239, 68, 68, 0.9)',
              color: 'white',
              px: 2,
              py: 0.5,
              borderRadius: 1,
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              border: '1px solid rgba(239, 68, 68, 1)',
            }}
          >
            Out of Stock
          </Box>
        )}
        {product.stock > 0 && product.stock < 10 && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: 'rgba(251, 191, 36, 0.9)',
              color: 'white',
              px: 2,
              py: 0.5,
              borderRadius: 1,
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              border: '1px solid rgba(251, 191, 36, 1)',
            }}
          >
            Low Stock
          </Box>
        )}
      </Box>

      {/* Content Section */}
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography 
          variant="h6" 
          component="div"
          sx={{
            color: 'white',
            fontWeight: 700,
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '3em',
          }}
        >
          {product.name}
        </Typography>
        
        {product.category && (
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              textTransform: 'uppercase',
              fontSize: '0.7rem',
              letterSpacing: '0.5px',
              display: 'block',
              mb: 1,
            }}
          >
            {product.category}
          </Typography>
        )}

        <Typography
          variant="h5"
          sx={{
            color: '#00d4ff',
            fontWeight: 700,
            mt: 1,
          }}
        >
          ₱{Number(product.price).toFixed(2)}
        </Typography>
      </CardContent>

      {/* Actions Section */}
      <CardActions 
        sx={{ 
          px: 2, 
          pb: 2,
          pt: 0,
          gap: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Button
          fullWidth
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          sx={{
            background: product.stock <= 0 
              ? 'rgba(139, 0, 255, 0.2)' 
              : 'linear-gradient(135deg, #8b00ff 0%, #00d4ff 100%)',
            color: 'white',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            py: 1,
            '&:hover': {
              boxShadow: product.stock > 0 ? '0 0 20px rgba(139, 0, 255, 0.5)' : 'none',
              transform: product.stock > 0 ? 'translateY(-2px)' : 'none',
            },
            '&:disabled': {
              color: 'rgba(255, 255, 255, 0.3)',
              cursor: 'not-allowed',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>

        <Button
          fullWidth
          variant="outlined"
          component={Link}
          to={`/product/${product._id}`}
          startIcon={<VisibilityIcon />}
          sx={{
            color: 'rgba(255, 255, 255, 0.9)',
            borderColor: 'rgba(139, 0, 255, 0.4)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            py: 1,
            '&:hover': {
              borderColor: 'rgba(0, 212, 255, 0.6)',
              backgroundColor: 'rgba(0, 212, 255, 0.1)',
            },
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;