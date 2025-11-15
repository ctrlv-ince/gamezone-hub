import React from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import FeaturedProducts from '../components/FeaturedProducts';
import ProductList from '../components/ProductList';

const HomePage = () => {
  return (
    <Container>
      <Card sx={{ my: 4, backgroundColor: 'grey.200' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom color="text.primary">
            Welcome to Gamezone Hub
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Your one-stop shop for console games, digital codes, and the latest gaming hardware.
          </Typography>
        </CardContent>
      </Card>
      
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