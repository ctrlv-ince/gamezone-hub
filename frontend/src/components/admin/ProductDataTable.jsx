import React, { useState, useEffect } from 'react';
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
  Chip,
  Avatar,
  Tooltip,
  IconButton,
  Checkbox,
  Paper,
  CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ProductDataTable = ({
  products,
  loading,
  onEdit,
  selectedProducts,
  onSelectAll,
  onSelectOne
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');


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
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const sortedProducts = React.useMemo(() => {
    return [...products].sort(getComparator(order, orderBy));
  }, [products, order, orderBy]);

  const paginatedProducts = sortedProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const columns = [
    { id: 'select', label: '', width: 50, sortable: false },
    { id: 'images', label: 'Images', width: 200, sortable: false },
    { id: 'name', label: 'Product Name', width: 250, sortable: true },
    { id: 'description', label: 'Description', width: 350, sortable: false },
    { id: 'price', label: 'Price', width: 120, sortable: true },
    { id: 'category', label: 'Category', width: 180, sortable: true },
    { id: 'stock', label: 'Stock', width: 120, sortable: true },
    { id: 'actions', label: 'Actions', width: 100, sortable: false }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer
        component={Paper}
        sx={{
          border: '1px solid rgba(139, 0, 255, 0.3)',
          borderRadius: 2,
          background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.6) 0%, rgba(37, 42, 69, 0.6) 100%)',
          minHeight: '400px'
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <CircularProgress sx={{ color: '#8b00ff' }} />
          </Box>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'rgba(139, 0, 255, 0.15)', borderBottom: '2px solid rgba(139, 0, 255, 0.3)' }}>
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
                        borderBottom: '2px solid rgba(139, 0, 255, 0.3)'
                      }}
                    >
                      {column.id === 'select' ? (
                        <Checkbox
                          checked={products.length > 0 && selectedProducts.length === products.length}
                          indeterminate={selectedProducts.length > 0 && selectedProducts.length < products.length}
                          onChange={onSelectAll}
                          sx={{
                            color: 'rgba(139, 0, 255, 0.5)',
                            '&.Mui-checked': { color: '#8b00ff' }
                          }}
                        />
                      ) : column.sortable ? (
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
                {paginatedProducts.map((product) => (
                  <TableRow
                    key={product._id}
                    sx={{
                      '&:hover': { backgroundColor: 'rgba(139, 0, 255, 0.1)' },
                      height: 80
                    }}
                  >
                    <TableCell sx={{ borderBottom: '1px solid rgba(139, 0, 255, 0.15)' }}>
                      <Checkbox
                        checked={selectedProducts.includes(product._id)}
                        onChange={(event) => onSelectOne(event, product._id)}
                        sx={{
                          color: 'rgba(139, 0, 255, 0.5)',
                          '&.Mui-checked': { color: '#8b00ff' }
                        }}
                      />
                    </TableCell>
                    
                    <TableCell sx={{ borderBottom: '1px solid rgba(139, 0, 255, 0.15)' }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        overflowX: 'auto',
                        '&::-webkit-scrollbar': { height: '4px' },
                        '&::-webkit-scrollbar-track': { background: 'rgba(0, 0, 0, 0.2)' },
                        '&::-webkit-scrollbar-thumb': { background: 'rgba(139, 0, 255, 0.5)', borderRadius: '2px' }
                      }}>
                        {product.images && product.images.length > 0 ? (
                          product.images.map((image, index) => (
                            <Tooltip key={index} title={`Image ${index + 1}`} arrow>
                              <Avatar
                                src={image.url}
                                alt={`${product.name}-${index}`}
                                variant="rounded"
                                sx={{
                                  width: 60,
                                  height: 60,
                                  border: '2px solid rgba(139, 0, 255, 0.3)',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease',
                                  flexShrink: 0,
                                  '&:hover': {
                                    border: '2px solid rgba(0, 212, 255, 0.6)',
                                    transform: 'scale(1.15)',
                                    zIndex: 10,
                                    boxShadow: '0 0 15px rgba(139, 0, 255, 0.5)'
                                  }
                                }}
                              />
                            </Tooltip>
                          ))
                        ) : (
                          <Box
                            sx={{
                              width: 60,
                              height: 60,
                              backgroundColor: 'rgba(0, 0, 0, 0.3)',
                              border: '2px solid rgba(139, 0, 255, 0.2)',
                              borderRadius: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'rgba(255, 255, 255, 0.5)',
                              fontSize: '0.75rem'
                            }}
                          >
                            No Image
                          </Box>
                        )}
                      </Box>
                    </TableCell>

                    <TableCell sx={{ borderBottom: '1px solid rgba(139, 0, 255, 0.15)' }}>
                      <Box sx={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                        {product.name}
                      </Box>
                    </TableCell>

                    <TableCell sx={{ borderBottom: '1px solid rgba(139, 0, 255, 0.15)' }}>
                      <Tooltip title={product.description} arrow>
                        <Box sx={{ 
                          color: 'rgba(255, 255, 255, 0.7)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: 350
                        }}>
                          {product.description}
                        </Box>
                      </Tooltip>
                    </TableCell>

                    <TableCell sx={{ borderBottom: '1px solid rgba(139, 0, 255, 0.15)' }}>
                      <Box sx={{ color: '#00d4ff', fontWeight: 700, fontSize: '1rem' }}>
                        ₱{Number(product.price).toFixed(2)}
                      </Box>
                    </TableCell>

                    <TableCell sx={{ borderBottom: '1px solid rgba(139, 0, 255, 0.15)' }}>
                      <Chip
                        label={product.category}
                        size="small"
                        sx={{
                          background: 'linear-gradient(135deg, rgba(139, 0, 255, 0.2) 0%, rgba(0, 212, 255, 0.2) 100%)',
                          color: 'white',
                          border: '1px solid rgba(139, 0, 255, 0.4)',
                          fontWeight: 600,
                          fontSize: '0.8rem'
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{ borderBottom: '1px solid rgba(139, 0, 255, 0.15)' }}>
                      <Chip
                        label={product.stock}
                        size="small"
                        sx={{
                          backgroundColor: product.stock === 0
                            ? 'rgba(239, 68, 68, 0.2)' 
                            : product.stock < 10
                            ? 'rgba(251, 191, 36, 0.2)' 
                            : 'rgba(16, 185, 129, 0.2)',
                          color: product.stock === 0
                            ? '#ef4444' 
                            : product.stock < 10
                            ? '#fbbf24' 
                            : '#10b981',
                          border: `1px solid ${product.stock === 0
                            ? 'rgba(239, 68, 68, 0.4)' 
                            : product.stock < 10
                            ? 'rgba(251, 191, 36, 0.4)' 
                            : 'rgba(16, 185, 129, 0.4)'}`,
                          fontWeight: 700
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{ borderBottom: '1px solid rgba(139, 0, 255, 0.15)' }}>
                      <Tooltip title="Edit Product" arrow>
                        <IconButton
                          onClick={() => onEdit(product)}
                          sx={{
                            color: '#00d4ff',
                            '&:hover': { backgroundColor: 'rgba(0, 212, 255, 0.1)' }
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <TablePagination
              component="div"
              count={products.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
              sx={{
                borderTop: '1px solid rgba(139, 0, 255, 0.3)',
                backgroundColor: 'rgba(139, 0, 255, 0.1)',
                color: 'white',
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
      </TableContainer>
    </Box>
  );
};

export default ProductDataTable;