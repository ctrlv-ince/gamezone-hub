import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProductDataTable from '../../components/admin/ProductDataTable';
import CreateProductModal from '../../components/admin/CreateProductModal';

const ProductManagementPage = () => {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const triggerRefresh = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #16213e 100%)',
      py: 6
    }}>
      <Container maxWidth="xl">
        {/* Page Header */}
        <Box sx={{ 
          mb: 6,
          pb: 4,
          borderBottom: '1px solid rgba(139, 0, 255, 0.2)',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 3
        }}>
          <Box>
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
                Product Management
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
              Manage your store inventory and product listings
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpen}
            sx={{
              background: 'linear-gradient(135deg, #8b00ff 0%, #00d4ff 100%)',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              whiteSpace: 'nowrap',
              '&:hover': {
                boxShadow: '0 0 30px rgba(139, 0, 255, 0.6)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Create Product
          </Button>
        </Box>

        {/* Product Table */}
        <ProductDataTable refreshKey={refreshKey} />

        {/* Create Product Modal */}
        <CreateProductModal open={open} handleClose={handleClose} onProductCreated={triggerRefresh} />
      </Container>
    </Box>
  );
};

export default ProductManagementPage;