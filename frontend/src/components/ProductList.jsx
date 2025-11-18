import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService';
import { Container, Grid, CircularProgress, Box, Pagination, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '0-1000',
    rating: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (pageNum = 1, filterParams = filters) => {
    setLoading(true);
    try {
      const { products: newProducts, pages: totalPages } = await getAllProducts(filterParams, pageNum);
      setProducts(newProducts);
      setTotalPages(totalPages);
      setCurrentPage(pageNum);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(1, filters);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (event, value) => {
    fetchProducts(value, filters);
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <ProductFilter filters={filters} onFilterChange={handleFilterChange} />

      {loading && products.length === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress color="secondary" />
        </Box>
      )}

      <Grid container spacing={4}>
        {Array.isArray(products) && products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="secondary"
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(139, 0, 255, 0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(139, 0, 255, 0.5)',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              },
            }}
          />
        </Box>
      )}

      {products.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            No products found matching your criteria.
          </Typography>
        </Box>
      )}
    </Container>
  );
  };

export default ProductList;