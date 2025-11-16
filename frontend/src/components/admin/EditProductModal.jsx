import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Grid,
  Fade,
  Backdrop
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { uploadImage } from '../../services/uploadService';
import { updateProduct } from '../../services/productService';
import DeleteIcon from '@mui/icons-material/Delete';

const categories = [
  'PS4 Games',
  'Xbox Games',
  'Consoles',
  'Nintendo Switch Games',
  'Accessories',
  'PC Games',
  'PS5 Games',
  'Digital Games',
];

const EditProductModal = ({ open, handleClose, product, onProductUpdated }) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: [],
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        stock: product.stock || '',
        images: product.images || [],
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...productData.images];
    newImages.splice(index, 1);
    setProductData((prevData) => ({
      ...prevData,
      images: newImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = await updateProduct(product._id, productData);
      onProductUpdated(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      container={() => document.body}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)'
        }
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '500px', md: '600px' },
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.98) 0%, rgba(37, 42, 69, 0.98) 100%)',
            border: '2px solid rgba(139, 0, 255, 0.4)',
            borderRadius: 3,
            boxShadow: '0 24px 48px rgba(139, 0, 255, 0.3)',
            p: 4,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'linear-gradient(to bottom, #8b00ff, #00d4ff)',
              borderRadius: '4px',
            },
          }}
        >
          {/* Header */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 4,
            pb: 3,
            borderBottom: '1px solid rgba(139, 0, 255, 0.3)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                width: '4px', 
                height: '30px', 
                background: 'linear-gradient(to bottom, #8b00ff, #00d4ff)',
                mr: 2,
                borderRadius: '2px',
                boxShadow: '0 0 10px rgba(139, 0, 255, 0.5)'
              }} />
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'white',
                  fontWeight: 700,
                  letterSpacing: '0.5px'
                }}
              >
                Edit Product
              </Typography>
            </Box>
            <IconButton
              onClick={handleClose}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  color: '#ef4444',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  transform: 'rotate(90deg)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Product Name */}
              <Grid item xs={12}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)', 
                    mb: 1,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '0.75rem'
                  }}
                >
                  Product Name
                </Typography>
                <TextField
                  required
                  fullWidth
                  id="name"
                  name="name"
                  placeholder="Enter product name"
                  value={productData.name}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      '& fieldset': {
                        borderColor: 'rgba(139, 0, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(139, 0, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#8b00ff',
                        boxShadow: '0 0 10px rgba(139, 0, 255, 0.3)'
                      },
                    },
                  }}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)', 
                    mb: 1,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '0.75rem'
                  }}
                >
                  Description
                </Typography>
                <TextField
                  required
                  fullWidth
                  id="description"
                  name="description"
                  placeholder="Enter product description"
                  multiline
                  rows={3}
                  value={productData.description}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      '& fieldset': {
                        borderColor: 'rgba(139, 0, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(139, 0, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#8b00ff',
                        boxShadow: '0 0 10px rgba(139, 0, 255, 0.3)'
                      },
                    },
                  }}
                />
              </Grid>

              {/* Price and Stock */}
              <Grid item xs={12} sm={6}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)', 
                    mb: 1,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '0.75rem'
                  }}
                >
                  Price
                </Typography>
                <TextField
                  required
                  fullWidth
                  id="price"
                  name="price"
                  type="number"
                  placeholder="0.00"
                  value={productData.price}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      '& fieldset': {
                        borderColor: 'rgba(139, 0, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(139, 0, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#8b00ff',
                        boxShadow: '0 0 10px rgba(139, 0, 255, 0.3)'
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)', 
                    mb: 1,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '0.75rem'
                  }}
                >
                  Stock
                </Typography>
                <TextField
                  required
                  fullWidth
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="0"
                  value={productData.stock}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      '& fieldset': {
                        borderColor: 'rgba(139, 0, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(139, 0, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#8b00ff',
                        boxShadow: '0 0 10px rgba(139, 0, 255, 0.3)'
                      },
                    },
                  }}
                />
              </Grid>

              {/* Category */}
              <Grid item xs={12}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)', 
                    mb: 1,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '0.75rem'
                  }}
                >
                  Category
                </Typography>
                <FormControl fullWidth required>
                  <Select
                    id="category"
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    displayEmpty
                    sx={{
                      color: 'white',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(139, 0, 255, 0.3)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(139, 0, 255, 0.5)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#8b00ff',
                        boxShadow: '0 0 10px rgba(139, 0, 255, 0.3)'
                      },
                      '& .MuiSvgIcon-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.98) 0%, rgba(37, 42, 69, 0.98) 100%)',
                          border: '1px solid rgba(139, 0, 255, 0.3)',
                          '& .MuiMenuItem-root': {
                            color: 'white',
                            '&:hover': {
                              backgroundColor: 'rgba(139, 0, 255, 0.2)',
                            },
                            '&.Mui-selected': {
                              backgroundColor: 'rgba(139, 0, 255, 0.3)',
                              '&:hover': {
                                backgroundColor: 'rgba(139, 0, 255, 0.4)',
                              }
                            }
                          }
                        }
                      }
                    }}
                  >
                    <MenuItem value="" disabled>
                      Select a category
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Image Upload */}
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    mb: 1,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '0.75rem'
                  }}
                >
                  Product Images
                </Typography>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  style={{
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(139, 0, 255, 0.3)',
                    borderRadius: '4px',
                    padding: '10px',
                    width: '100%'
                  }}
                />
                {productData.images.length > 0 && (
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {productData.images.map((image, index) => (
                      <Box key={index} sx={{ position: 'relative' }}>
                        <img src={image.url} alt={`Product image ${index + 1}`} width="100" height="100" style={{ objectFit: 'cover', borderRadius: '8px' }} />
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveImage(index)}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                )}
              </Grid>

              {/* Action Buttons */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      background: 'linear-gradient(135deg, #8b00ff 0%, #00d4ff 100%)',
                      color: 'white',
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      '&:hover': {
                        boxShadow: '0 0 30px rgba(139, 0, 255, 0.6)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={handleClose}
                    variant="outlined"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      py: 1.5,
                      px: 4,
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditProductModal;