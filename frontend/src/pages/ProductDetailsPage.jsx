import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { addToCart as addToCartService } from '../services/cartService';
import { getToken } from '../utils/auth';
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Chip,
  Divider,
  Rating,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = getToken();
        const data = await getProductById(id, token);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #16213e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CircularProgress 
          sx={{ 
            color: '#8b00ff',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            }
          }} 
          size={60}
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #16213e 100%)',
        py: 6
      }}>
        <Container>
          <Alert 
            severity="error"
            sx={{
              backgroundColor: 'rgba(239, 68, 68, 0.9)',
              color: 'white',
              '& .MuiAlert-icon': {
                color: 'white'
              }
            }}
          >
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #16213e 100%)',
        py: 6
      }}>
        <Container>
          <Typography variant="h6" sx={{ color: 'white' }}>
            Product not found.
          </Typography>
        </Container>
      </Box>
    );
  }

  // Get images array from product
  const images = product.images && product.images.length > 0
    ? product.images.map(img => img.url)
    : ['https://source.unsplash.com/random?gaming'];

  const handleAddToCart = async () => {
    try {
      await addToCartService(product._id, quantity);
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #16213e 100%)',
      py: 6
    }}>
      <Container maxWidth="xl">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            mb: 4,
            '&:hover': {
              color: '#00d4ff',
              backgroundColor: 'rgba(0, 212, 255, 0.1)',
            }
          }}
        >
          Back to Products
        </Button>

        <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
        <Grid container spacing={5} justifyContent="center">
          {/* Image Gallery Section */}
          <Grid item xs={12} md={6} lg={5}>
            <Box
              sx={{
                position: 'sticky',
                top: 20,
              }}
            >
              {/* Main Image */}
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1 / 1',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  mb: 2,
                  border: '2px solid rgba(139, 0, 255, 0.3)',
                  boxShadow: '0 8px 32px rgba(139, 0, 255, 0.2)',
                }}
              >
                <Box
                  component="img"
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                  {images.map((image, index) => (
                    <Box
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      sx={{
                        width: 90,
                        height: 90,
                        borderRadius: 1.5,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: selectedImageIndex === index 
                          ? '3px solid #00d4ff' 
                          : '2px solid rgba(139, 0, 255, 0.3)',
                        transition: 'all 0.3s ease',
                        boxShadow: selectedImageIndex === index 
                          ? '0 0 20px rgba(0, 212, 255, 0.5)' 
                          : 'none',
                        '&:hover': {
                          borderColor: '#00d4ff',
                          transform: 'scale(1.05)',
                        }
                      }}
                    >
                      <Box
                        component="img"
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Grid>

          {/* Product Info Section */}
          <Grid item xs={12} md={6} lg={7}>
            <Box>
              {/* Category */}
              {product.category && (
                <Chip
                  label={product.category}
                  sx={{
                    background: 'linear-gradient(135deg, rgba(139, 0, 255, 0.3) 0%, rgba(0, 212, 255, 0.3) 100%)',
                    color: '#00d4ff',
                    border: '1px solid rgba(139, 0, 255, 0.5)',
                    fontWeight: 700,
                    mb: 2,
                    fontSize: '0.85rem',
                  }}
                />
              )}
              <Typography 
                variant="h3" 
                sx={{ 
                  color: 'white',
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                  lineHeight: 1.2,
                }}
              >
                {product.name}
              </Typography>
              {/* Rating and Reviews */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating 
                    value={product.rating || 0} 
                    readOnly 
                    precision={0.1}
                    sx={{
                      '& .MuiRating-iconFilled': {
                        color: '#fbbf24',
                      },
                      '& .MuiRating-iconEmpty': {
                        color: 'rgba(251, 191, 36, 0.3)',
                      }
                    }}
                  />
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>
                    {product.rating?.toFixed(1) || '0.0'}
                  </Typography>
                </Box>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                  ({product.numReviews || 0} reviews)
                </Typography>
              </Box>

              <Divider sx={{ borderColor: 'rgba(139, 0, 255, 0.2)', my: 2 }} />

              {/* Price */}
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#00d4ff',
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                ₱{Number(product.price).toFixed(2)}
              </Typography>
              <Box sx={{ mb: 3 }}>
                {product.stock > 10 ? (
                  <Chip
                    label={`${product.stock} in stock`}
                    sx={{
                      backgroundColor: 'rgba(16, 185, 129, 0.2)',
                      color: '#10b981',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      fontWeight: 700,
                    }}
                  />
                ) : product.stock > 0 ? (
                  <Chip
                    label={`Only ${product.stock} left!`}
                    sx={{
                      backgroundColor: 'rgba(251, 191, 36, 0.2)',
                      color: '#fbbf24',
                      border: '1px solid rgba(251, 191, 36, 0.4)',
                      fontWeight: 700,
                    }}
                  />
                ) : (
                  <Chip
                    label="Out of Stock"
                    sx={{
                      backgroundColor: 'rgba(239, 68, 68, 0.2)',
                      color: '#ef4444',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      fontWeight: 700,
                    }}
                  />
                )}
              </Box>

              {/* Description */}
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'white',
                    fontWeight: 700,
                    mb: 1.5,
                    fontSize: '1.1rem',
                  }}
                >
                  Description
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.8,
                    fontSize: '1rem',
                  }}
                >
                  {product.description}
                </Typography>
              </Box>

              <Divider sx={{ borderColor: 'rgba(139, 0, 255, 0.2)', my: 3 }} />

              {/* Quantity and Add to Cart in Row */}
              <Grid container spacing={3} alignItems="flex-end">
                {/* Quantity Selector */}
                <Grid item xs={12} sm={4}>
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
                    Quantity
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      sx={{
                        minWidth: 45,
                        height: 45,
                        background: 'rgba(139, 0, 255, 0.2)',
                        color: 'white',
                        border: '1px solid rgba(139, 0, 255, 0.4)',
                        fontSize: '1.2rem',
                        '&:hover': {
                          background: 'rgba(139, 0, 255, 0.3)',
                          borderColor: 'rgba(139, 0, 255, 0.6)',
                        },
                        '&:disabled': {
                          color: 'rgba(255, 255, 255, 0.3)',
                          borderColor: 'rgba(139, 0, 255, 0.2)',
                        }
                      }}
                    >
                      −
                    </Button>
                    <Box
                      sx={{
                        minWidth: 70,
                        height: 45,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(139, 0, 255, 0.4)',
                        borderRadius: 1,
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                      }}
                    >
                      {quantity}
                    </Box>
                    <Button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                      sx={{
                        minWidth: 45,
                        height: 45,
                        background: 'rgba(139, 0, 255, 0.2)',
                        color: 'white',
                        border: '1px solid rgba(139, 0, 255, 0.4)',
                        fontSize: '1.2rem',
                        '&:hover': {
                          background: 'rgba(139, 0, 255, 0.3)',
                          borderColor: 'rgba(139, 0, 255, 0.6)',
                        },
                        '&:disabled': {
                          color: 'rgba(255, 255, 255, 0.3)',
                          borderColor: 'rgba(139, 0, 255, 0.2)',
                        }
                      }}
                    >
                      +
                    </Button>
                  </Box>
                </Grid>

                {/* Add to Cart Button */}
                <Grid item xs={12} sm={8}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingCartIcon />}
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    sx={{
                      background: product.stock <= 0 
                        ? 'rgba(139, 0, 255, 0.2)' 
                        : 'linear-gradient(135deg, #8b00ff 0%, #00d4ff 100%)',
                      color: 'white',
                      py: 2.2,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      '&:hover': {
                        boxShadow: product.stock > 0 ? '0 0 30px rgba(139, 0, 255, 0.6)' : 'none',
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
                </Grid>
              </Grid>

              {/* Product Info Grid */}
              <Box 
                sx={{ 
                  mt: 3,
                  pt: 3,
                  borderTop: '1px solid rgba(139, 0, 255, 0.2)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 2,
                }}
              >
                <Box>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.85rem', mb: 0.5 }}>
                    Category
                  </Typography>
                  <Typography sx={{ color: 'white', fontWeight: 600 }}>
                    {product.category}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.85rem', mb: 0.5 }}>
                    Stock
                  </Typography>
                  <Typography sx={{ color: 'white', fontWeight: 600 }}>
                    {product.stock} units
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        </Box>
        <Box sx={{ maxWidth: '1600px', mx: 'auto', mt: 6 }}>
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 3 }}>
            Reviews
          </Typography>
          {product.reviews && product.reviews.length > 0 ? (
            <Box>
              {product.reviews.map((review) => (
                <Box key={review._id} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ color: 'white', fontWeight: 600, mr: 1 }}>
                      {review.name || (review.user && review.user.username) || 'Anonymous'}
                    </Typography>
                    <Rating value={review.rating} readOnly size="small" />
                  </Box>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {review.comment}
                  </Typography>
                  <Divider sx={{ borderColor: 'rgba(139, 0, 255, 0.2)', mt: 3 }} />
                </Box>
              ))}
            </Box>
          ) : (
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              No reviews yet.
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ProductDetailsPage;