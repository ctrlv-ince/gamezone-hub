import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { createProduct } from '../services/productService';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CreateProductModal = ({ open, handleClose }) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    platform: '',
    stock: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(productData);
      handleClose();
    } catch (error) {
      console.error('Failed to create product', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create-product-modal-title"
      aria-describedby="create-product-modal-description"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography id="create-product-modal-title" variant="h6" component="h2">
          Create New Product
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Product Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={productData.name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Product Description"
          name="description"
          autoComplete="description"
          value={productData.description}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="price"
          label="Price"
          name="price"
          type="number"
          autoComplete="price"
          value={productData.price}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="category"
          label="Category"
          name="category"
          autoComplete="category"
          value={productData.category}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="platform"
          label="Platform"
          name="platform"
          autoComplete="platform"
          value={productData.platform}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="stock"
          label="Stock"
          name="stock"
          type="number"
          autoComplete="stock"
          value={productData.stock}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Product
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateProductModal;