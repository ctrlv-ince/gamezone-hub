import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../services/productService';
import { adminDeleteReview } from '../../services/adminService';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from '@mui/material';

const ReviewManagementPage = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const products = await getAllProducts();
      const allReviews = products.flatMap((product) =>
        product.reviews.map((review) => ({
          ...review,
          productName: product.name,
          productId: product._id,
        }))
      );
      setReviews(allReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (productId, reviewId) => {
    try {
      await adminDeleteReview(productId, reviewId);
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Review Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review._id}>
                <TableCell>{review.productName}</TableCell>
                <TableCell>{review.name}</TableCell>
                <TableCell>{review.rating}</TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(review.productId, review._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReviewManagementPage;