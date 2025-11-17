import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../services/productService';
import { adminDeleteReview } from '../../services/adminService';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Typography,
  Container,
  IconButton,
  Tooltip,
  Chip,
  Rating,
  Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ReviewsIcon from '@mui/icons-material/Reviews';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const ReviewManagementPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts();
      const products = response.products || [];
      const allReviews = products.flatMap((product) =>
        product.reviews.map((review) => ({
          ...review,
          name: review.user?.username || review.name,
          productName: product.name,
          productId: product._id,
        }))
      );
      setReviews(allReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (productId, reviewId) => {
    try {
      await adminDeleteReview(productId, reviewId);
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const columns = [
    {
      field: 'productName',
      headerName: 'Product Name',
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <ShoppingBagIcon sx={{ color: '#00d4ff', fontSize: 22 }} />
          <Typography sx={{ 
            color: 'white',
            fontWeight: 600,
            fontSize: '0.95rem'
          }}>
            {params.value}
          </Typography>
        </Box>
      )
    },
    {
      field: 'name',
      headerName: 'User',
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            sx={{
              width: 35,
              height: 35,
              background: 'linear-gradient(135deg, rgba(139, 0, 255, 0.3) 0%, rgba(0, 212, 255, 0.3) 100%)',
              border: '1px solid rgba(139, 0, 255, 0.4)'
            }}
          >
            <PersonIcon sx={{ color: '#00d4ff', fontSize: 20 }} />
          </Avatar>
          <Typography sx={{ 
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '0.9rem',
            fontWeight: 500
          }}>
            {params.value}
          </Typography>
        </Box>
      )
    },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rating 
            value={params.value} 
            readOnly 
            size="small"
            sx={{
              '& .MuiRating-iconFilled': {
                color: '#fbbf24'
              },
              '& .MuiRating-iconEmpty': {
                color: 'rgba(251, 191, 36, 0.3)'
              }
            }}
          />
          <Chip
            label={params.value}
            size="small"
            sx={{
              backgroundColor: params.value >= 4 
                ? 'rgba(16, 185, 129, 0.2)' 
                : params.value >= 3 
                ? 'rgba(251, 191, 36, 0.2)' 
                : 'rgba(239, 68, 68, 0.2)',
              color: params.value >= 4 
                ? '#10b981' 
                : params.value >= 3 
                ? '#fbbf24' 
                : '#ef4444',
              border: `1px solid ${params.value >= 4 
                ? 'rgba(16, 185, 129, 0.4)' 
                : params.value >= 3 
                ? 'rgba(251, 191, 36, 0.4)' 
                : 'rgba(239, 68, 68, 0.4)'}`,
              fontWeight: 700,
              minWidth: '35px'
            }}
          />
        </Box>
      )
    },
    {
      field: 'comment',
      headerName: 'Comment',
      width: 400,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography sx={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '0.9rem'
          }}>
            {params.value}
          </Typography>
        </Tooltip>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Tooltip title="Delete Review" arrow>
          <IconButton
            onClick={() => handleDelete(params.row.productId, params.row._id)}
            sx={{
              color: '#ef4444',
              '&:hover': {
                backgroundColor: 'rgba(239, 68, 68, 0.1)'
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )
    }
  ];

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
              Review Management
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
            Manage and moderate product reviews
          </Typography>
        </Box>

        <Box sx={{
          width: '100%',
          '& .MuiDataGrid-root': {
            border: '1px solid rgba(139, 0, 255, 0.3)',
            borderRadius: 2,
            background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.6) 0%, rgba(37, 42, 69, 0.6) 100%)',
            color: 'white',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid rgba(139, 0, 255, 0.15)',
            display: 'flex',
            alignItems: 'center'
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'rgba(139, 0, 255, 0.15)',
            borderBottom: '2px solid rgba(139, 0, 255, 0.3)',
            color: 'white',
            fontSize: '0.9rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 700,
            color: 'white'
          },
          '& .MuiDataGrid-row': {
            '&:hover': {
              backgroundColor: 'rgba(139, 0, 255, 0.1)',
            }
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid rgba(139, 0, 255, 0.3)',
            backgroundColor: 'rgba(139, 0, 255, 0.1)',
            color: 'white',
            minHeight: '52px'
          },
          '& .MuiTablePagination-root': {
            color: 'white'
          },
          '& .MuiTablePagination-selectIcon': {
            color: 'white'
          },
          '& .MuiDataGrid-selectedRowCount': {
            color: 'rgba(255, 255, 255, 0.7)'
          },
          '& .MuiIconButton-root': {
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(139, 0, 255, 0.2)'
            },
            '&.Mui-disabled': {
              color: 'rgba(255, 255, 255, 0.3)'
            }
          },
          '& .MuiDataGrid-columnSeparator': {
            color: 'rgba(139, 0, 255, 0.2)'
          },
          '& .MuiDataGrid-sortIcon': {
            color: 'white'
          },
          '& .MuiDataGrid-menuIconButton': {
            color: 'white'
          },
          '& .MuiDataGrid-virtualScroller': {
            minHeight: '400px'
          }
        }}>
          <DataGrid
            rows={reviews}
            columns={columns}
            loading={loading}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 25, 50]}
            getRowId={(row) => row._id}
            autoHeight
            rowHeight={70}
            disableRowSelectionOnClick
          />
        </Box>
      </Container>
    </Box>
  );
};

export default ReviewManagementPage;