import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';

const OrderSuccessPage = () => {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #16213e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6
      }}>
        <Container maxWidth="sm">
          <Card
            sx={{
              background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.9) 0%, rgba(37, 42, 69, 0.9) 100%)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(239, 68, 68, 0.2)',
              textAlign: 'center',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ color: '#ef4444', fontWeight: 700, mb: 2 }}>
                Order Not Found
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                No order details were found. Please return to the home page.
              </Typography>
              <Button
                component={Link}
                to="/"
                variant="contained"
                startIcon={<HomeIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #8b00ff 0%, #00d4ff 100%)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  '&:hover': {
                    boxShadow: '0 0 30px rgba(139, 0, 255, 0.6)',
                  }
                }}
              >
                Go to Home
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #16213e 100%)',
      py: 6
    }}>
      <Container maxWidth="md">
        {/* Success Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)',
              border: '3px solid rgba(16, 185, 129, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              boxShadow: '0 0 40px rgba(16, 185, 129, 0.3)',
            }}
          >
            <CheckCircleIcon 
              sx={{ 
                fontSize: 60, 
                color: '#10b981',
              }} 
            />
          </Box>
          <Typography 
            variant="h3" 
            sx={{ 
              color: '#10b981',
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Order Successful!
          </Typography>
          <Typography 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '1.1rem',
            }}
          >
            Thank you for your purchase. Your order has been confirmed.
          </Typography>
        </Box>

        {/* Order Details Card */}
        <Card
          sx={{
            background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.9) 0%, rgba(37, 42, 69, 0.9) 100%)',
            border: '1px solid rgba(139, 0, 255, 0.3)',
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(139, 0, 255, 0.2)',
            mb: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Order Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <ReceiptIcon sx={{ color: '#00d4ff', fontSize: 30, mr: 2 }} />
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'white',
                  fontWeight: 700,
                }}
              >
                Order Details
              </Typography>
            </Box>

            {/* Order ID */}
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.6)',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  letterSpacing: '1px',
                  mb: 0.5,
                }}
              >
                Order ID
              </Typography>
              <Chip
                label={order._id}
                sx={{
                  background: 'rgba(0, 212, 255, 0.1)',
                  color: '#00d4ff',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                }}
              />
            </Box>

            <Divider sx={{ borderColor: 'rgba(139, 0, 255, 0.2)', my: 3 }} />

            {/* Items List */}
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'white',
                fontWeight: 700,
                mb: 2,
              }}
            >
              Items Ordered
            </Typography>

            <List sx={{ mb: 2 }}>
              {order?.orderItems?.map((item) => (
                <ListItem
                  key={item.product._id}
                  sx={{
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: 1,
                    mb: 1,
                    border: '1px solid rgba(139, 0, 255, 0.2)',
                    '&:hover': {
                      borderColor: 'rgba(139, 0, 255, 0.4)',
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ color: 'white', fontWeight: 600 }}>
                          {item.product?.name || 'Product not found'}
                        </Typography>
                        <Typography sx={{ color: '#00d4ff', fontWeight: 700, fontSize: '1.1rem' }}>
                          ₱{((item.product?.price || 0) * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    }
                    secondaryTypographyProps={{ component: 'div' }}
                    secondary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
                          ₱{(item.product?.price || 0).toFixed(2)} × {item.quantity}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ borderColor: 'rgba(139, 0, 255, 0.2)', my: 3 }} />

            {/* Total */}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                p: 2,
                background: 'rgba(139, 0, 255, 0.1)',
                borderRadius: 1,
                border: '1px solid rgba(139, 0, 255, 0.3)',
              }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'white',
                  fontWeight: 700,
                }}
              >
                Total
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#00d4ff',
                  fontWeight: 800,
                }}
              >
                ₱{order.totalPrice.toFixed(2)}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            sx={{
              background: 'linear-gradient(135deg, #8b00ff 0%, #00d4ff 100%)',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              '&:hover': {
                boxShadow: '0 0 30px rgba(139, 0, 255, 0.6)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Back to Home
          </Button>
          <Button
            component={Link}
            to="/products"
            variant="outlined"
            size="large"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              borderColor: 'rgba(139, 0, 255, 0.4)',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              '&:hover': {
                borderColor: 'rgba(0, 212, 255, 0.6)',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
              },
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default OrderSuccessPage;