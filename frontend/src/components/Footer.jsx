import React from 'react';
import { Box, Typography, Container, Grid, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey
            : theme.palette.grey,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gamezone Hub is your one-stop shop for all things gaming.
            </Typography>
          </Grid>
          <Grid xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Customer Service
            </Typography>
            <Link href="#" variant="body2" display="block">Contact Us</Link>
            <Link href="#" variant="body2" display="block">FAQs</Link>
            <Link href="#" variant="body2" display="block">Shipping & Returns</Link>
          </Grid>
          <Grid xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Link href="#" variant="body2" display="block">Facebook</Link>
            <Link href="#" variant="body2" display="block">Twitter</Link>
            <Link href="#" variant="body2" display="block">Instagram</Link>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" color="text.secondary" align="center">
            © 2025 Gamezone Hub
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;