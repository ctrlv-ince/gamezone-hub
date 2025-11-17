import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService';
import { Container, Grid } from '@mui/material';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '0-1000',
    rating: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts(filters);
      setProducts(data);
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <ProductFilter filters={filters} onFilterChange={handleFilterChange} />
      <Grid container spacing={4}>
        {Array.isArray(products) && products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;