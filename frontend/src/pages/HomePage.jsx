import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import FeaturedProducts from '../components/FeaturedProducts';
import ProductList from '../components/ProductList';

const HomePage = () => {
  return (
    <Container>
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Gamezone Hub
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Your one-stop shop for console games, digital codes, and the latest gaming hardware.
        </Typography>
      </Box>
      
      {/* Featured Products Section */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Featured Products
        </Typography>
        <FeaturedProducts />
      </Box>

      {/* All Products Section */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          All Products
        </Typography>
        <ProductList />
      </Box>
    </Container>
  );
};

export default HomePage;