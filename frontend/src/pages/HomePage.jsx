import React from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import FeaturedProducts from '../components/FeaturedProducts';
import ProductList from '../components/ProductList';

const HomePage = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #16213e 100%)',
      pb: 6
    }}>
      {/* Hero Section */}
      <Box sx={{ 
        position: 'relative',
        overflow: 'hidden',
        py: 8,
        background: 'linear-gradient(135deg, rgba(139, 0, 255, 0.15) 0%, rgba(0, 212, 255, 0.15) 100%)',
        borderBottom: '2px solid rgba(139, 0, 255, 0.3)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(139, 0, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
          animation: 'pulse 8s ease-in-out infinite',
        }
      }}>
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 900,
                fontSize: { xs: '2.5rem', md: '4rem' },
                background: 'linear-gradient(135deg, #8b00ff 0%, #00d4ff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(139, 0, 255, 0.3)',
                mb: 3,
                letterSpacing: '2px'
              }}
            >
              GAMEZONE HUB
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 300,
                mb: 2,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
              }}
            >
              Level Up Your Gaming Experience
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1.1rem'
              }}
            >
              Premium console games • Digital codes • Latest hardware
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container sx={{ mt: 6 }}>
        {/* Featured Products Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 4,
            position: 'relative'
          }}>
            <Box sx={{ 
              width: '4px', 
              height: '40px', 
              background: 'linear-gradient(to bottom, #8b00ff, #00d4ff)',
              mr: 2,
              borderRadius: '2px'
            }} />
            <Typography 
              variant="h3" 
              sx={{ 
                color: 'white',
                fontWeight: 700,
                fontSize: { xs: '1.8rem', md: '2.5rem' }
              }}
            >
              Featured Products
            </Typography>
          </Box>
          <FeaturedProducts />
        </Box>

        {/* All Products Section */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 4,
            position: 'relative'
          }}>
            <Box sx={{ 
              width: '4px', 
              height: '40px', 
              background: 'linear-gradient(to bottom, #00d4ff, #8b00ff)',
              mr: 2,
              borderRadius: '2px'
            }} />
            <Typography 
              variant="h3" 
              sx={{ 
                color: 'white',
                fontWeight: 700,
                fontSize: { xs: '1.8rem', md: '2.5rem' }
              }}
            >
              All Products
            </Typography>
          </Box>
          <ProductList />
        </Box>
      </Container>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </Box>
  );
};

export default HomePage;