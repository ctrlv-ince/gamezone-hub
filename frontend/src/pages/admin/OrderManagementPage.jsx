import React, { useState, useEffect, useContext } from 'react';
import { getAllOrders, updateOrderStatus } from '../../services/adminService';
import { UserContext } from '../../context/UserContext';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Typography,
  Container,
  Select,
  MenuItem,
  Chip,
  CircularProgress,
  Tooltip,
  Avatar
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
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

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (orderBy === 'createdAt') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (orderBy === 'totalPrice') {
      return b.totalPrice - a.totalPrice;
    }
    if (orderBy === 'customer') {
      const emailA = a.user?.email || '';
      const emailB = b.user?.email || '';
      return emailB.localeCompare(emailA);
    }
    if (orderBy === 'status') {
      return b.status.localeCompare(a.status);
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const sortedOrders = React.useMemo(() => {
    return [...orders].sort(getComparator(order, orderBy));
  }, [orders, order, orderBy]);

  const paginatedOrders = sortedOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
    { id: 'orderId', label: 'Order ID', width: 200, sortable: false },
    { id: 'customer', label: 'Customer', width: 300, sortable: true },
    { id: 'createdAt', label: 'Date', width: 200, sortable: true },
    { id: 'totalPrice', label: 'Total Price', width: 150, sortable: true },
    { id: 'status', label: 'Status', width: 200, sortable: true }
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

        <Paper
          sx={{
            border: '1px solid rgba(139, 0, 255, 0.3)',
            borderRadius: 2,
            background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.6) 0%, rgba(37, 42, 69, 0.6) 100%)',
            display: 'flex',
            flexDirection: 'column',
            height: '600px'
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <CircularProgress sx={{ color: '#8b00ff' }} />
            </Box>
          ) : (
            <>
              <TableContainer sx={{ flex: 1, overflow: 'auto' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'rgba(139, 0, 255, 0.15)' }}>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          sx={{
                            width: column.width,
                            color: 'white',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            backgroundColor: 'rgba(139, 0, 255, 0.15)',
                            borderBottom: '2px solid rgba(139, 0, 255, 0.3)'
                          }}
                        >
                          {column.sortable ? (
                            <TableSortLabel
                              active={orderBy === column.id}
                              direction={orderBy === column.id ? order : 'asc'}
                              onClick={() => handleRequestSort(column.id)}
                              sx={{
                                color: 'white !important',
                                '&:hover': { color: 'white' },
                                '& .MuiTableSortLabel-icon': { color: 'white !important' }
                              }}
                            >
                              {column.label}
                            </TableSortLabel>
                          ) : (
                            column.label
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedOrders.map((orderItem) => (
                      <TableRow
                        key={orderItem._id}
                        sx={{
                          '&:hover': { backgroundColor: 'rgba(139, 0, 255, 0.1)' },
                          height: 70
                        }}
                      >
                        <TableCell sx={{ borderBottom: '1px solid rgba(139, 0, 255, 0.15)' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <ReceiptIcon sx={{ color: '#00d4ff', fontSize: 24 }} />
                            <Tooltip title={orderItem._id} arrow>
                              <Typography sx={{ 
                                color: 'white', 
                                fontWeight: 600, 
                                fontSize: '0.9rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                maxWidth: 150
                              }}>
                                #{orderItem._id.slice(-8)}
                              </Typography>
                            </Tooltip>
                          </Box>
                        </TableCell>

                        <TableCell sx={{ borderBottom: '1px solid rgba(139, 0, 255, 0.15)' }}>
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
                              {orderItem.user ? orderItem.user.email : 'N/A'}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell sx={{ borderBottom: '1px solid rgba(139, 0, 255, 0.15)' }}>
                          <Typography sx={{ 
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: '0.9rem'
                          }}>
                            {new Date(orderItem.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </Typography>
                        </TableCell>

                        <TableCell sx={{ borderBottom: '1px solid rgba(139, 0, 255, 0.15)' }}>
                          <Typography sx={{ 
                            color: '#00d4ff', 
                            fontWeight: 700, 
                            fontSize: '1rem' 
                          }}>
                            ${orderItem.totalPrice.toFixed(2)}
                          </Typography>
                        </TableCell>

                        <TableCell sx={{ borderBottom: '1px solid rgba(139, 0, 255, 0.15)' }}>
                          <Select
                            value={orderItem.status}
                            onChange={(e) => handleStatusChange(orderItem._id, e.target.value)}
                            size="small"
                            sx={{
                              minWidth: 140,
                              backgroundColor: getStatusColor(orderItem.status).bg,
                              color: getStatusColor(orderItem.status).color,
                              border: `1px solid ${getStatusColor(orderItem.status).border}`,
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
                                color: getStatusColor(orderItem.status).color
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
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                component="div"
                count={orders.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
                sx={{
                  borderTop: '1px solid rgba(139, 0, 255, 0.3)',
                  backgroundColor: 'rgba(139, 0, 255, 0.1)',
                  color: 'white',
                  minHeight: '52px',
                  '& .MuiTablePagination-selectIcon': { color: 'white' },
                  '& .MuiTablePagination-displayedRows': { color: 'rgba(255, 255, 255, 0.7)' },
                  '& .MuiIconButton-root': {
                    color: 'white',
                    '&:hover': { backgroundColor: 'rgba(139, 0, 255, 0.2)' },
                    '&.Mui-disabled': { color: 'rgba(255, 255, 255, 0.3)' }
                  }
                }}
              />
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default OrderManagementPage;