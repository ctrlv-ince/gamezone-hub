import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Chip, Avatar, Tooltip, IconButton, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ProductDataTable = ({
  products,
  loading,
  onEdit,
  selectedProducts,
  onSelectAll,
  onSelectOne
}) => {
  const columns = [
    {
      field: 'select',
      headerName: '',
      width: 50,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <Checkbox
          checked={products.length > 0 && selectedProducts.length === products.length}
          indeterminate={selectedProducts.length > 0 && selectedProducts.length < products.length}
          onChange={onSelectAll}
          sx={{
            color: 'rgba(139, 0, 255, 0.5)',
            '&.Mui-checked': { color: '#8b00ff' },
            '&.MuiCheckbox-indeterminate': { color: '#8b00ff' }
          }}
        />
      ),
      renderCell: (params) => (
        <Checkbox
          checked={selectedProducts.includes(params.id)}
          onChange={(event) => onSelectOne(event, params.id)}
          sx={{
            color: 'rgba(139, 0, 255, 0.5)',
            '&.Mui-checked': { color: '#8b00ff' }
          }}
        />
      ),
    },
    {
      field: 'images',
      headerName: 'Images',
      width: 200,
      sortable: false,
      renderCell: (params) => {
        const images = params.value || [];
        return (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            height: '100%',
            py: 1,
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              height: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0, 0, 0, 0.2)',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(139, 0, 255, 0.5)',
              borderRadius: '2px',
            },
          }}>
            {images.length > 0 ? (
              images.map((image, index) => (
                <Tooltip key={index} title={`Image ${index + 1}`} arrow>
                  <Avatar
                    src={image.url}
                    alt={`${params.row.name}-${index}`}
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
        );
      }
    },
    {
      field: 'name',
      headerName: 'Product Name',
      width: 250,
      renderCell: (params) => (
        <Box sx={{ py: 1 }}>
          <Box sx={{ 
            color: 'white', 
            fontWeight: 600,
            fontSize: '0.95rem'
          }}>
            {params.value}
          </Box>
        </Box>
      )
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 350,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Box sx={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            py: 1
          }}>
            {params.value}
          </Box>
        </Tooltip>
      )
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ 
          color: '#00d4ff', 
          fontWeight: 700,
          fontSize: '1rem',
          py: 1
        }}>
          ₱{Number(params.value).toFixed(2)}
        </Box>
      )
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 180,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            background: 'linear-gradient(135deg, rgba(139, 0, 255, 0.2) 0%, rgba(0, 212, 255, 0.2) 100%)',
            color: 'white',
            border: '1px solid rgba(139, 0, 255, 0.4)',
            fontWeight: 600,
            fontSize: '0.8rem'
          }}
        />
      )
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 120,
      renderCell: (params) => {
        const stock = params.value;
        const isLowStock = stock < 10;
        const isOutOfStock = stock === 0;
        
        return (
          <Chip
            label={stock}
            size="small"
            sx={{
              backgroundColor: isOutOfStock 
                ? 'rgba(239, 68, 68, 0.2)' 
                : isLowStock 
                ? 'rgba(251, 191, 36, 0.2)' 
                : 'rgba(16, 185, 129, 0.2)',
              color: isOutOfStock 
                ? '#ef4444' 
                : isLowStock 
                ? '#fbbf24' 
                : '#10b981',
              border: `1px solid ${isOutOfStock 
                ? 'rgba(239, 68, 68, 0.4)' 
                : isLowStock 
                ? 'rgba(251, 191, 36, 0.4)' 
                : 'rgba(16, 185, 129, 0.4)'}`,
              fontWeight: 700
            }}
          />
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Tooltip title="Edit Product" arrow>
          <IconButton
            onClick={() => onEdit(params.row)}
            sx={{
              color: '#00d4ff',
              '&:hover': {
                backgroundColor: 'rgba(0, 212, 255, 0.1)'
              }
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      )
    }
  ];

  return (
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
      '& .MuiCheckbox-root': {
        color: 'rgba(139, 0, 255, 0.5)',
        '&.Mui-checked': {
          color: '#8b00ff'
        },
        '&.MuiCheckbox-indeterminate': {
          color: '#8b00ff'
        }
      },
      '& .MuiDataGrid-virtualScroller': {
        minHeight: '400px'
      }
    }}>
      <DataGrid
        rows={products}
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
        rowHeight={80}
        disableRowSelectionOnClick
        checkboxSelection={false}
      />
    </Box>
  );
};

export default ProductDataTable;