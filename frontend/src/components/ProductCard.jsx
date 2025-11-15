import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{
      background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8), rgba(15, 20, 40, 0.8))',
      border: '1px solid rgba(0, 217, 255, 0.2)',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0, 217, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0 8px 30px rgba(0, 217, 255, 0.2)',
      },
    }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image || 'https://source.unsplash.com/random?gaming'}
        alt={product.name}
        sx={{
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      />
      <CardContent sx={{ color: '#fff' }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{ color: '#00d9ff' }}>Add to Cart</Button>
        <Button size="small" sx={{ color: '#00d9ff' }}>View Details</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;