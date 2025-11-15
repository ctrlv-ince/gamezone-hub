import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { getAllProducts } from '../services/productService';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setFeaturedProducts(data.slice(0, 4));
    };

    fetchProducts();
  }, []);

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Featured Products
      </Typography>
      <Grid container spacing={4}>
        {Array.isArray(featuredProducts) && featuredProducts.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedProducts;