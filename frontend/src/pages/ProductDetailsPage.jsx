import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { addToCart as addToCartService } from '../services/cartService';
import { getToken } from '../utils/auth';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h6">Product not found.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Card>
        <Grid container>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              sx={{ width: '100%', height: 'auto' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {product.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {product.description}
              </Typography>
              <Typography variant="h5" color="primary">
                ${product.price}
             </Typography>
             <Button
               variant="contained"
               color="primary"
               sx={{ mt: 2 }}
               onClick={async () => {
                 try {
                   const token = getToken();
                   await addToCartService({ productId: product._id, quantity: 1 }, token);
                   alert('Product added to cart!');
                 } catch (error) {
                   console.error('Error adding to cart:', error);
                   alert('Failed to add product to cart.');
                 }
               }}
             >
               Add to Cart
             </Button>
           </CardContent>
         </Grid>
       </Grid>
     </Card>
   </Container>
 );
};

export default ProductDetailsPage;