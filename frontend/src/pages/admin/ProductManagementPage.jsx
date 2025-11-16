import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProductDataTable from '../../components/admin/ProductDataTable';
import CreateProductModal from '../../components/admin/CreateProductModal';
import EditProductModal from '../../components/admin/EditProductModal';
import { deleteProducts, getAllProducts } from '../../services/productService';
import { toast } from 'react-toastify';

const ProductManagementPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getAllProducts();
        setProducts(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allProductIds = products.map((product) => product._id);
      setSelectedProductIds(allProductIds);
    } else {
      setSelectedProductIds([]);
    }
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedProductIds.indexOf(id);
    let newSelectedProductIds = [];

    if (selectedIndex === -1) {
      newSelectedProductIds = newSelectedProductIds.concat(selectedProductIds, id);
    } else if (selectedIndex === 0) {
      newSelectedProductIds = newSelectedProductIds.concat(selectedProductIds.slice(1));
    } else if (selectedIndex === selectedProductIds.length - 1) {
      newSelectedProductIds = newSelectedProductIds.concat(selectedProductIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedProductIds = newSelectedProductIds.concat(
        selectedProductIds.slice(0, selectedIndex),
        selectedProductIds.slice(selectedIndex + 1)
      );
    }

    setSelectedProductIds(newSelectedProductIds);
  };

  const handleDeleteSelected = async () => {
    try {
      await deleteProducts(selectedProductIds);
      triggerRefresh();
      setSelectedProductIds([]);
      toast.success('Product(s) deleted successfully!');
    } catch (error) {
      console.error('Error deleting products:', error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditOpen = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setSelectedProduct(null);
    setIsEditModalOpen(false);
  };

  const triggerRefresh = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts();
      setProducts(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductCreated = () => {
    triggerRefresh();
    toast.success('Product created successfully!');
  };

  const handleProductUpdated = () => {
    triggerRefresh();
    handleEditClose();
    toast.success('Product updated successfully!');
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
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleDeleteSelected}
              disabled={selectedProductIds.length === 0}
              sx={{
                backgroundColor: selectedProductIds.length > 0 ? '#ff4d4d' : '#4a4a4a',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                '&:hover': {
                  backgroundColor: selectedProductIds.length > 0 ? '#ff1a1a' : '#4a4a4a',
                  boxShadow: selectedProductIds.length > 0 ? '0 0 30px rgba(255, 77, 77, 0.6)' : 'none',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Delete Selected
            </Button>
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
        </Box>

        {/* Product Table */}
        <ProductDataTable
          products={products}
          loading={loading}
          onEdit={handleEditOpen}
          selectedProducts={selectedProductIds}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
        />

        {/* Create Product Modal */}
        <CreateProductModal open={open} handleClose={handleClose} onProductCreated={handleProductCreated} />

        {/* Edit Product Modal */}
        {selectedProduct && (
          <EditProductModal
            open={isEditModalOpen}
            handleClose={handleEditClose}
            product={selectedProduct}
            onProductUpdated={handleProductUpdated}
          />
        )}
      </Container>
    </Box>
  );
};

export default ProductManagementPage;