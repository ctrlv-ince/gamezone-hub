import React, { useState, useEffect, useContext } from 'react';
import { getAllOrders, updateOrderStatus } from '../../services/adminService';
import { UserContext } from '../../context/UserContext';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Typography,
  Container,
  Select,
  MenuItem,
  Avatar
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return {
          bg: 'rgba(251, 191, 36, 0.2)',
          color: '#fbbf24',
          border: 'rgba(251, 191, 36, 0.4)'
        };
      case 'Shipped':
        return {
          bg: 'rgba(59, 130, 246, 0.2)',
          color: '#3b82f6',
          border: 'rgba(59, 130, 246, 0.4)'
        };
      case 'Completed':
        return {
          bg: 'rgba(16, 185, 129, 0.2)',
          color: '#10b981',
          border: 'rgba(16, 185, 129, 0.4)'
        };
      case 'Cancelled':
        return {
          bg: 'rgba(239, 68, 68, 0.2)',
          color: '#ef4444',
          border: 'rgba(239, 68, 68, 0.4)'
        };
      default:
        return {
          bg: 'rgba(139, 0, 255, 0.2)',
          color: '#8b00ff',
          border: 'rgba(139, 0, 255, 0.4)'
        };
    }
  };

  const columns = [
    {
      field: 'orderId',
      headerName: 'Order ID',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <ReceiptIcon sx={{ color: '#00d4ff', fontSize: 24 }} />
          <Typography sx={{ 
            color: 'white', 
            fontWeight: 600, 
            fontSize: '0.9rem'
          }}>
            #{params.row._id.slice(-8)}
          </Typography>
        </Box>
      )
    },
    {
      field: 'customer',
      headerName: 'Customer',
      width: 300,
      valueGetter: (value, row) => row.user?.email || 'N/A',
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
            {params.row.user ? params.row.user.email : 'N/A'}
          </Typography>
        </Box>
      )
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 200,
      valueGetter: (value, row) => new Date(row.createdAt),
      renderCell: (params) => (
        <Typography sx={{ 
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '0.9rem'
        }}>
          {new Date(params.row.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </Typography>
      )
    },
    {
      field: 'totalPrice',
      headerName: 'Total Price',
      width: 150,
      renderCell: (params) => (
        <Typography sx={{ 
          color: '#00d4ff', 
          fontWeight: 700, 
          fontSize: '1rem' 
        }}>
          ₱{params.row.totalPrice ? params.row.totalPrice.toFixed(2) : '0.00'}
        </Typography>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: (params) => (
        <Select
          value={params.row.status}
          onChange={(e) => handleStatusChange(params.row._id, e.target.value)}
          size="small"
          sx={{
            minWidth: 140,
            backgroundColor: getStatusColor(params.row.status).bg,
            color: getStatusColor(params.row.status).color,
            border: `1px solid ${getStatusColor(params.row.status).border}`,
            fontWeight: 600,
            fontSize: '0.85rem',
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: 'none'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: 'none'
            },
            '& .MuiSelect-icon': {
              color: getStatusColor(params.row.status).color
            }
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.95) 0%, rgba(37, 42, 69, 0.95) 100%)',
                border: '1px solid rgba(139, 0, 255, 0.3)',
                '& .MuiMenuItem-root': {
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(139, 0, 255, 0.2)'
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(139, 0, 255, 0.3)',
                    '&:hover': {
                      backgroundColor: 'rgba(139, 0, 255, 0.4)'
                    }
                  }
                }
              }
            }
          }}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Shipped">Shipped</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </Select>
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
              Order Management
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
            Manage and update order statuses
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
            rows={orders}
            columns={columns}
            loading={loading}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
              sorting: {
                sortModel: [{ field: 'createdAt', sort: 'desc' }],
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

export default OrderManagementPage;