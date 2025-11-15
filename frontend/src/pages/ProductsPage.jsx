import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import ProductList from '../components/ProductList';

const ProductsPage = () => {
  return (
    <Card sx={{ my: 4, backgroundColor: 'grey.200' }}>
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom color="text.primary">
          All Products
        </Typography>
        <ProductList />
      </CardContent>
    </Card>
  );
};

export default ProductsPage;