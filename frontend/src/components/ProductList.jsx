import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService';
import { getToken } from '../utils/auth';
import { Container, Grid } from '@mui/material';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = getToken();
      const data = await getAllProducts(token);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;