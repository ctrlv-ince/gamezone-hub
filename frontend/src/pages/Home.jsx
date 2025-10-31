import { useState } from 'react';
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Paper,
  Rating,
} from '@mui/material';
import {
  ShoppingCart,
  Star,
  LocalShipping,
  Security,
  Favorite,
} from '@mui/icons-material';
import './Home.css';

const Home = () => {
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Gaming Categories
  const categories = [
    { id: 1, name: 'PS4 CDs', icon: '🎮', color: '#003087' },
    { id: 2, name: 'PS5 CDs', icon: '🕹️', color: '#0070cc' },
    { id: 3, name: 'Consoles', icon: '💾', color: '#64a0be' },
    { id: 4, name: 'XBOX CDs', icon: '✔️', color: '#107c10' },
    { id: 5, name: 'SWITCH Games', icon: '🎲', color: '#e60012' },
  ];

  // Sample Products
  const products = [
    {
      id: 1,
      name: 'The Last of Us Part II',
      price: '$49.99',
      rating: 4.8,
      reviews: 2341,
      image: 'https://via.placeholder.com/300x200?text=PS4+Game',
      category: 'PS4 CDs',
      inStock: true,
    },
    {
      id: 2,
      name: 'Elden Ring',
      price: '$59.99',
      rating: 4.7,
      reviews: 5892,
      image: 'https://via.placeholder.com/300x200?text=PS5+Game',
      category: 'PS5 CDs',
      inStock: true,
    },
    {
      id: 3,
      name: 'PlayStation 5 Console',
      price: '$499.99',
      rating: 4.9,
      reviews: 1234,
      image: 'https://via.placeholder.com/300x200?text=PS5+Console',
      category: 'Consoles',
      inStock: false,
    },
    {
      id: 4,
      name: 'Halo Infinite',
      price: '$59.99',
      rating: 4.5,
      reviews: 3421,
      image: 'https://via.placeholder.com/300x200?text=Xbox+Game',
      category: 'XBOX CDs',
      inStock: true,
    },
    {
      id: 5,
      name: 'Super Mario Odyssey',
      price: '$59.99',
      rating: 4.8,
      reviews: 4567,
      image: 'https://via.placeholder.com/300x200?text=Switch+Game',
      category: 'SWITCH Games',
      inStock: true,
    },
    {
      id: 6,
      name: 'Xbox Series X Console',
      price: '$499.99',
      rating: 4.7,
      reviews: 892,
      image: 'https://via.placeholder.com/300x200?text=Xbox+Console',
      category: 'Consoles',
      inStock: true,
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0d1117 100%)' }}>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgb(100, 160, 190) 0%, rgb(60, 120, 150) 100%)',
          color: '#fff',
          py: 8,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '2px solid rgba(0,255,136,0.3)',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '2rem', md: '3.5rem' },
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
          >
            Welcome to GameZone Hub
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              fontSize: { xs: '1rem', md: '1.25rem' },
              opacity: 0.95,
            }}
          >
            Your Ultimate Gaming & Tech Destination
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, rgb(100, 160, 190) 0%, rgb(60, 120, 150) 100%)',
                color: '#fff',
                fontWeight: 'bold',
                py: 1.5,
                px: 4,
                fontSize: '1rem',
                '&:hover': {
                  background: 'linear-gradient(135deg, rgb(120, 175, 205) 0%, rgb(80, 135, 165) 100%)',
                  boxShadow: '0 8px 20px rgba(60, 120, 150, 0.4)',
                },
              }}
              startIcon={<ShoppingCart />}
            >
              Shop Now
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#fff',
                color: '#fff',
                fontWeight: 'bold',
                py: 1.5,
                px: 4,
                fontSize: '1rem',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: '#fff',
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {[
            {
              icon: <LocalShipping sx={{ fontSize: 40, color: 'rgb(100, 160, 190)' }} />,
              title: 'Free Shipping',
              description: 'On orders over $50',
            },
            {
              icon: <Security sx={{ fontSize: 40, color: 'rgb(100, 160, 190)' }} />,
              title: 'Secure Payment',
              description: 'Your transactions are protected',
            },
            {
              icon: <Favorite sx={{ fontSize: 40, color: 'rgb(100, 160, 190)' }} />,
              title: 'Best Quality',
              description: 'Premium products only',
            },
          ].map((feature, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: 'rgba(26, 31, 58, 0.7)',
                  border: '1px solid rgba(0,255,136,0.2)',
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: '0 0 20px rgba(0,255,136,0.3), 0 10px 30px rgba(0,0,0,0.5)',
                    backgroundColor: 'rgba(26, 31, 58, 0.9)',
                    borderColor: 'rgba(0,255,136,0.5)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#fff' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories Section */}
      <Box sx={{ backgroundColor: 'rgba(26, 31, 58, 0.5)', py: 8, borderTop: '1px solid rgba(0,255,136,0.1)', borderBottom: '1px solid rgba(0,255,136,0.1)' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              mb: 6,
              textAlign: 'center',
              color: '#fff',
            }}
          >
            Shop by Category
          </Typography>
          <Grid container spacing={3}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={3} key={category.id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: 'rgba(26, 31, 58, 0.7)',
                    border: `2px solid ${category.color}40`,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: `0 10px 30px ${category.color}40, 0 0 20px rgba(0,255,136,0.2)`,
                      borderColor: category.color,
                      backgroundColor: 'rgba(26, 31, 58, 0.9)',
                    },
                  }}
                >
                  <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>
                    {category.icon}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: category.color,
                      textShadow: `0 0 10px ${category.color}60`,
                    }}
                  >
                    {category.name}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            mb: 6,
            textAlign: 'center',
            color: '#fff',
          }}
        >
          Featured Products
        </Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'rgba(26, 31, 58, 0.8)',
                  border: '1px solid rgba(0,255,136,0.2)',
                  '&:hover': {
                    boxShadow: '0 15px 40px rgba(0,0,0,0.5), 0 0 20px rgba(0,255,136,0.3)',
                    transform: 'translateY(-5px)',
                    borderColor: 'rgba(0,255,136,0.5)',
                    backgroundColor: 'rgba(26, 31, 58, 0.95)',
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      borderRadius: '50%',
                      p: 1,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': {
                        backgroundColor: '#fff',
                      },
                    }}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Favorite
                      sx={{
                        color: favorites[product.id] ? '#ef4444' : '#d1d5db',
                        fontSize: 20,
                      }}
                    />
                  </Box>
                  {!product.inStock && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: '1.2rem',
                        }}
                      >
                        Out of Stock
                      </Typography>
                    </Box>
                  )}
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    sx={{
                      color: '#00d4ff',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      textShadow: '0 0 8px rgba(0,212,255,0.4)',
                    }}
                  >
                    {product.category}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      color: '#ffffff',
                      minHeight: '3rem',
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Rating value={product.rating} readOnly size="small" sx={{ color: '#ff006e' }} />
                    <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                      ({product.reviews} reviews)
                    </Typography>
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      color: '#00ff88',
                      fontWeight: 'bold',
                      textShadow: '0 0 10px rgba(0,255,136,0.5)',
                    }}
                  >
                    {product.price}
                  </Typography>
                </CardContent>

                <Box sx={{ p: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(135deg, rgb(100, 160, 190) 0%, rgb(60, 120, 150) 100%)',
                      fontWeight: 'bold',
                      py: 1,
                      color: '#ffffff',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 0 20px rgba(100,160,190,0.6), 0 5px 15px rgba(0,0,0,0.3)',
                        transform: 'translateY(-2px)',
                      },
                      '&:disabled': {
                        backgroundColor: '#505065',
                        color: '#707070',
                      },
                    }}
                    startIcon={<ShoppingCart />}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgb(100, 160, 190) 0%, rgb(60, 120, 150) 100%)',
          color: '#ffffff',
          py: 8,
          textAlign: 'center',
          borderTop: '2px solid rgba(0,255,136,0.3)',
          borderBottom: '2px solid rgba(0,255,136,0.3)',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            Ready to Start Shopping?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              opacity: 0.95,
            }}
          >
            Browse our extensive collection of premium gaming and tech products
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              background: 'linear-gradient(135deg, rgb(100, 160, 190) 0%, rgb(60, 120, 150) 100%)',
              color: '#fff',
              fontWeight: 'bold',
              py: 1.5,
              px: 5,
              '&:hover': {
                background: 'linear-gradient(135deg, rgb(120, 175, 205) 0%, rgb(80, 135, 165) 100%)',
                boxShadow: '0 8px 20px rgba(60, 120, 150, 0.4)',
              },
            }}
            startIcon={<ShoppingCart />}
          >
            Continue Shopping
          </Button>
        </Container>
      </Box>

      {/* Gaming-Themed Footer */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #0d1117 100%)',
          color: '#e0e0e0',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #00ff88, #667eea, #ff006e, transparent)',
            opacity: 0.6,
          }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {/* Brand Section */}
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 2,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    textShadow: '0 0 10px #667eea',
                  }
                }}
              >
                <Typography 
                  sx={{ 
                    fontSize: '28px',
                    fontWeight: 'bold',
                  }}
                >
                  🎮
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #667eea, #ff006e)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  GameZone
                </Typography>
              </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#a0a0a0',
                  lineHeight: 1.8,
                  fontStyle: 'italic'
                }}
              >
                Level up your gaming experience. Your ultimate destination for the rarest gaming treasures.
              </Typography>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: '700',
                  mb: 2.5,
                  color: '#00ff88',
                  fontSize: '0.95rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                Menu
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {['Browse Games', 'Top Sellers', 'New Arrivals', 'Deals'].map((link) => (
                  <Typography
                    key={link}
                    variant="body2"
                    sx={{
                      color: '#b0b0b0',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: '#00ff88',
                        paddingLeft: '8px',
                        textShadow: '0 0 8px #00ff88',
                      }
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Box>
            </Grid>

            {/* Support */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: '700',
                  mb: 2.5,
                  color: '#667eea',
                  fontSize: '0.95rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                Support
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {['Help Center', 'Track Order', 'Returns', 'Contact'].map((link) => (
                  <Typography
                    key={link}
                    variant="body2"
                    sx={{
                      color: '#b0b0b0',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: '#667eea',
                        paddingLeft: '8px',
                        textShadow: '0 0 8px #667eea',
                      }
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Box>
            </Grid>

            {/* Social Links */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: '700',
                  mb: 2.5,
                  color: '#ff006e',
                  fontSize: '0.95rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                Follow
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {['Discord', 'Twitch', 'YouTube', 'Twitter'].map((platform) => (
                  <Typography
                    key={platform}
                    variant="body2"
                    sx={{
                      color: '#b0b0b0',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: '#ff006e',
                        paddingLeft: '8px',
                        textShadow: '0 0 8px #ff006e',
                      }
                    }}
                  >
                    {platform}
                  </Typography>
                ))}
              </Box>
            </Grid>

            {/* Newsletter */}
            <Grid item xs={12} md={3}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: '700',
                  mb: 2.5,
                  color: '#00d4ff',
                  fontSize: '0.95rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                Stay Updated
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#a0a0a0',
                  mb: 2,
                  fontSize: '0.85rem'
                }}
              >
                Get exclusive deals & new releases
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: '6px',
                  padding: '4px',
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:focus-within': {
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.15)',
                  }
                }}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#fff',
                    padding: '8px',
                    outline: 'none',
                    fontSize: '0.85rem',
                  }}
                />
                <Button
                  sx={{
                    color: '#fff',
                    padding: '0 12px',
                    backgroundColor: 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(102, 126, 234, 0.3)',
                    }
                  }}
                >
                  →
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Bottom Section */}
          <Box 
            sx={{ 
              borderTop: '1px solid rgba(102, 126, 234, 0.2)',
              pt: 4,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'center' },
              gap: 2,
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#707070',
                fontSize: '0.8rem'
              }}
            >
              © 2024 GameZone Hub. All rights reserved. | Crafted for gamers, by gamers.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              {['Privacy', 'Terms', 'Cookies'].map((item) => (
                <Typography
                  key={item}
                  variant="body2"
                  sx={{
                    color: '#707070',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: '#667eea'
                    }
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;