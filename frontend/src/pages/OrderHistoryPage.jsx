import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Divider,
  Chip,
  Button,
} from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { getMyOrders } from '../services/orderService';
import {
  createReview,
  updateReview,
  deleteReview,
} from '../services/productService';
import { UserContext } from '../context/UserContext';
import ReviewModal from '../components/ReviewModal';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const navigate = useNavigate();
  const { user, loading: userLoading } = useContext(UserContext);

  const fetchOrders = async () => {
    try {
      const response = await getMyOrders();
      if (response) {
        setOrders(response);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userLoading) return;
    fetchOrders();
  }, [userLoading]);

  const handleOpenReviewModal = (product, orderId) => {
    setSelectedProduct(product);
    setSelectedOrderId(orderId);
    setReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setSelectedProduct(null);
    setReviewModalOpen(false);
  };

  const handleReviewSubmit = async (reviewData) => {
    if (!selectedProduct || !user) return;

    try {
      await createReview(selectedProduct._id, {
        ...reviewData,
        orderId: selectedOrderId
      });
      handleCloseReviewModal();
      fetchOrders(); // Refresh orders to update review status
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleOpenEditModal = (product, review) => {
    setSelectedProduct(product);
    setEditingReview(review);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedProduct(null);
    setEditingReview(null);
    setEditModalOpen(false);
  };

  const handleEditSubmit = async (reviewData) => {
    if (!selectedProduct || !editingReview || !user) return;

    try {
      await updateReview(selectedProduct._id, editingReview._id, {
        ...reviewData,
      });
      handleCloseEditModal();
      fetchOrders();
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const handleDeleteReview = async (productId, reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(productId, reviewId);
        fetchOrders();
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };



  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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
              Order History
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
            View all your past orders and purchases
          </Typography>
        </Box>

        {loading || userLoading ? (
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
        ) : orders.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 3 }}>
              No orders found
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', mb: 4 }}>
              You haven't placed any orders yet. Start shopping to see your order history here.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {orders.map((order) => (
              <Grid item xs={12} key={order._id}>
                <Card
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
                  <CardContent sx={{ p: 3 }}>
                    {/* Order Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ReceiptIcon sx={{ color: '#00d4ff', fontSize: 30, mr: 2 }} />
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              color: 'white',
                              fontWeight: 700,
                              mb: 0.5
                            }}
                          >
                            Order #{order._id.slice(-8)}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'rgba(255, 255, 255, 0.6)'
                            }}
                          >
                            {formatDate(order.createdAt)}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={order.status.toUpperCase()}
                        sx={{
                          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Example gradient, adjust as needed
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          mr: 1,
                        }}
                      />
                      <Chip
                        label={`₱${order.totalPrice.toFixed(2)}`}
                        sx={{
                          background: 'rgba(0, 212, 255, 0.1)',
                          color: '#00d4ff',
                          border: '1px solid rgba(0, 212, 255, 0.3)',
                          fontWeight: 700,
                          fontSize: '1rem'
                        }}
                      />
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(139, 0, 255, 0.2)', mb: 3 }} />

                    {/* Order Items */}
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        mb: 2
                      }}
                    >
                      Items ({order.orderItems?.length || 0})
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {order.orderItems?.map((item) => (
                        <Box
                          key={item.product._id}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 2,
                            background: 'rgba(0, 0, 0, 0.2)',
                            borderRadius: 1,
                            border: '1px solid rgba(139, 0, 255, 0.1)'
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box
                              component="img"
                              src={item.product.images?.[0]?.url}
                              alt={item.product.name}
                              sx={{
                                width: 50,
                                height: 50,
                                objectFit: 'cover',
                                borderRadius: 1,
                                border: '1px solid rgba(139, 0, 255, 0.2)'
                              }}
                            />
                            <Box>
                              <Typography
                                sx={{
                                  color: 'white',
                                  fontWeight: 600,
                                  fontSize: '0.95rem'
                                }}
                              >
                                {item.product.name}
                              </Typography>
                              <Typography
                                sx={{
                                  color: 'rgba(255, 255, 255, 0.6)',
                                  fontSize: '0.85rem'
                                }}
                              >
                                ₱{item.product.price.toFixed(2)} × {item.quantity}
                              </Typography>
                            </Box>
                          </Box>
                          <Box>
                           <Typography
                             sx={{
                               color: '#00d4ff',
                               fontWeight: 700,
                               fontSize: '1rem',
                               textAlign: 'right',
                             }}
                           >
                             {$(item.product.price * item.quantity).toFixed(2)}
                           </Typography>
                           {order.status === 'Completed' && (() => {
                              const userReview = user && item.product.reviews
                                ? item.product.reviews.find((r) => r.user === user._id)
                                : null;

                              return (
                                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                  {userReview ? (
                                    <>
                                      <Button
                                        size="small"
                                        onClick={() =>
                                          handleOpenEditModal(
                                            item.product,
                                            userReview
                                          )
                                        }
                                        sx={{
                                          background:
                                            'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                          color: 'white',
                                          fontWeight: 700,
                                          fontSize: '0.8rem',
                                          padding: '6px 12px',
                                          borderRadius: '8px',
                                          '&:hover': {
                                            opacity: 0.9,
                                          },
                                        }}
                                      >
                                        Edit Review
                                      </Button>
                                      <Button
                                        size="small"
                                        onClick={() =>
                                          handleDeleteReview(
                                            item.product._id,
                                            userReview._id
                                          )
                                        }
                                        sx={{
                                          background:
                                            'linear-gradient(45deg, #f44336 30%, #ff6e6e 90%)',
                                          color: 'white',
                                          fontWeight: 700,
                                          fontSize: '0.8rem',
                                          padding: '6px 12px',
                                          borderRadius: '8px',
                                          '&:hover': {
                                            opacity: 0.9,
                                          },
                                        }}
                                      >
                                        Delete Review
                                      </Button>
                                    </>
                                  ) : (
                                    <Button
                                      size="small"
                                      onClick={() =>
                                        handleOpenReviewModal(item.product, order._id)
                                      }
                                      sx={{
                                        mt: 1,
                                        background:
                                          'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                        color: 'white',
                                        fontWeight: 700,
                                        fontSize: '0.8rem',
                                        padding: '6px 12px',
                                        borderRadius: '8px',
                                        '&:hover': {
                                          opacity: 0.9,
                                        },
                                      }}
                                    >
                                      Leave Review
                                    </Button>
                                  )}
                                </Box>
                              );
                            })()}
                         </Box>
                       </Box>
                     ))}
                   </Box>
                 </CardContent>
               </Card>
             </Grid>
           ))}
         </Grid>
       )}
       <ReviewModal
         open={reviewModalOpen}
         onClose={handleCloseReviewModal}
         onSubmit={handleReviewSubmit}
       />
       {editingReview && (
         <ReviewModal
           open={editModalOpen}
           onClose={handleCloseEditModal}
           onSubmit={handleEditSubmit}
           review={editingReview}
         />
       )}
     </Container>
   </Box>
 );
};

export default OrderHistoryPage;