import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService';
import { Container, Grid, CircularProgress, Box } from '@mui/material';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '0-1000',
    rating: '',
  });
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (pageNum = 1, filterParams = filters) => {
    setLoading(true);
    try {
      const { products: newProducts, pages: totalPages } = await getAllProducts(filterParams, pageNum);
      if (pageNum === 1) {
        setProducts(newProducts);
      } else {
        setProducts((prevProducts) => {
          // Filter out duplicates based on _id
          const existingIds = new Set(prevProducts.map(p => p._id));
          const uniqueNewProducts = newProducts.filter(p => !existingIds.has(p._id));
          return [...prevProducts, ...uniqueNewProducts];
        });
      }
      setPages(totalPages);
      setHasMore(pageNum < totalPages && newProducts.length > 0);
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching products:', error);
      setHasMore(false); // Stop infinite scroll on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]); // Clear products when filters change
    setPage(1);
    setHasMore(true);
    fetchProducts(1, filters);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const fetchMoreData = () => {
    if (!hasMore || loading) {
      return;
    }
    fetchProducts(page + 1);
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <ProductFilter filters={filters} onFilterChange={handleFilterChange} />
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress color="secondary" />
          </Box>
        }
        endMessage={
          <p style={{ textAlign: 'center', color: 'white' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Grid container spacing={4}>
          {Array.isArray(products) && products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
      {loading && products.length === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress color="secondary" />
        </Box>
      )}
    </Container>
  );
  };

export default ProductList;