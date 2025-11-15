import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom>
        Product List
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography>${product.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;