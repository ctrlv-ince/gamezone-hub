import React from 'react';
import { Typography, Box } from '@mui/material';

const FeaturedProducts = () => {
  return (
    <Box sx={{ my: 4, textAlign: 'center' }}>
      <Typography variant="body1" color="text.secondary">
        Featured products will be displayed here.
      </Typography>
    </Box>
  );
};

export default FeaturedProducts;