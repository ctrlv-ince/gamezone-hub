import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  CircularProgress,
  Grid,
  Divider
} from '@mui/material';
import { getCart, removeFromCart as removeFromCartService } from '../services/cartService';
import { getToken } from '../utils/auth';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = getToken();
        const response = await getCart(token);
        setCartItems(response.data.items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #16213e 100%)',
      py: 6
    }}>
      <Container>
        {/* Page Header */}
        <Box sx={{ 
          mb: 6,
          pb: 4,
          borderBottom: '1px solid rgba(139, 0, 255, 0.2)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ 
              width: '6px', 
              height: '50px', 
              background: 'linear-gradient(to bottom, #8b00ff, #00d4ff)',
              mr: 3,
              borderRadius: '3px',
              boxShadow: '0 0 20px rgba(139, 0, 255, 0.5)'
            }} />
            <Typography 
              variant="h2" 
              component="h1"
              sx={{ 
                color: 'white',
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '3rem' },
                letterSpacing: '1px'
              }}
            >
              Shopping Cart
            </Typography>
          </Box>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '1.1rem',
              ml: { xs: 0, md: 5 }
            }}
          >
            Review your items and proceed to checkout
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress 
              sx={{ 
                color: '#8b00ff',
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                }
              }} 
              size={60}
            />
          </Box>
        ) : cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 3 }}>
              Your cart is empty
            </Typography>
            <Button
              href="/products"
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #8b00ff 0%, #00d4ff 100%)',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 700,
                '&:hover': {
                  boxShadow: '0 0 30px rgba(139, 0, 255, 0.6)',
                  transform: 'scale(1.02)'
                }
              }}
            >
              Browse Products
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {/* Cart Items */}
            <Grid item xs={12} lg={8}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {cartItems.map((item) => (
                  <Card
                    key={item._id}
                    sx={{
                      background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8) 0%, rgba(37, 42, 69, 0.8) 100%)',
                      border: '1px solid rgba(139, 0, 255, 0.2)',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'rgba(139, 0, 255, 0.4)',
                        boxShadow: '0 8px 24px rgba(139, 0, 255, 0.2)'
                      }
                    }}
                  >
                    <CardContent>
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        justifyContent: 'space-between',
                        gap: 2
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1 }}>
                          <Box
                            component="img"
                            src={item.product.image}
                            alt={item.product.name}
                            sx={{
                              width: 100,
                              height: 100,
                              objectFit: 'cover',
                              borderRadius: 2,
                              border: '2px solid rgba(139, 0, 255, 0.3)',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                borderColor: 'rgba(0, 212, 255, 0.5)',
                                transform: 'scale(1.05)'
                              }
                            }}
                          />
                          <Box sx={{ flex: 1 }}>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                color: 'white', 
                                fontWeight: 700,
                                mb: 0.5
                              }}
                            >
                              {item.product.name}
                            </Typography>
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                color: '#00d4ff', 
                                fontWeight: 600,
                                mb: 0.5
                              }}
                            >
                              ${item.product.price.toFixed(2)}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
                            >
                              Quantity: {item.quantity}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 2,
                          width: { xs: '100%', sm: 'auto' },
                          justifyContent: { xs: 'space-between', sm: 'flex-end' }
                        }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: 'white', 
                              fontWeight: 700 
                            }}
                          >
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </Typography>
                          <Button
                            onClick={async () => {
                              try {
                                const token = getToken();
                                await removeFromCartService(item.product._id, token);
                                setCartItems(cartItems.filter((i) => i.product._id !== item.product._id));
                              } catch (error) {
                                console.error('Error removing item from cart:', error);
                              }
                            }}
                            variant="outlined"
                            sx={{
                              color: '#ef4444',
                              borderColor: 'rgba(239, 68, 68, 0.4)',
                              '&:hover': {
                                borderColor: '#ef4444',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                boxShadow: '0 0 15px rgba(239, 68, 68, 0.3)'
                              }
                            }}
                          >
                            Remove
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Grid>

            {/* Cart Summary */}
            <Grid item xs={12} lg={4}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.9) 0%, rgba(37, 42, 69, 0.9) 100%)',
                  border: '1px solid rgba(139, 0, 255, 0.3)',
                  borderRadius: 2,
                  position: 'sticky',
                  top: 20
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: 'white', 
                      fontWeight: 700,
                      mb: 3,
                      pb: 2,
                      borderBottom: '1px solid rgba(139, 0, 255, 0.2)'
                    }}
                  >
                    Order Summary
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Subtotal
                      </Typography>
                      <Typography sx={{ color: 'white', fontWeight: 600 }}>
                        ${cartTotal.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Shipping
                      </Typography>
                      <Typography sx={{ color: 'white', fontWeight: 600 }}>
                        $5.00
                      </Typography>
                    </Box>
                    <Divider 
                      sx={{ 
                        my: 2, 
                        borderColor: 'rgba(139, 0, 255, 0.2)' 
                      }} 
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                        Total
                      </Typography>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: '#00d4ff', 
                          fontWeight: 700 
                        }}
                      >
                        ${(cartTotal + 5).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      background: 'linear-gradient(135deg, #8b00ff 0%, #00d4ff 100%)',
                      color: 'white',
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      mb: 2,
                      '&:hover': {
                        boxShadow: '0 0 30px rgba(139, 0, 255, 0.6)',
                        transform: 'scale(1.02)'
                      }
                    }}
                  >
                    Proceed to Checkout
                  </Button>

                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      href="/products"
                      sx={{
                        color: '#00d4ff',
                        textTransform: 'none',
                        '&:hover': {
                          color: '#00b8e6',
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      ← Continue Shopping
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CartPage;