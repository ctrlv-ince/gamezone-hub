import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey
            : theme.palette.grey,
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        © 2025 Gamezone Hub
      </Typography>
    </Box>
  );
};

export default Footer;