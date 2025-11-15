import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(90deg, rgba(10, 14, 39, 0.95), rgba(26, 31, 58, 0.95))',
        borderTop: '2px solid',
        borderImageSource: 'linear-gradient(90deg, #9c27b0, #3f51b5)',
        borderImageSlice: 1,
        color: '#e0e0e0',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-evenly">
          <Grid xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', fontWeight: 'bold' }}>
              About Us
            </Typography>
            <Typography variant="body2">
              Gamezone Hub is your one-stop shop for all things gaming.
            </Typography>
          </Grid>
          <Grid xs={6} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', fontWeight: 'bold' }}>
              Customer Service
            </Typography>
            <Link href="#" display="block" variant="body2" sx={{ color: '#bbbbbb', '&:hover': { color: '#ffffff' } }}>Contact Us</Link>
            <Link href="#" display="block" variant="body2" sx={{ color: '#bbbbbb', '&:hover': { color: '#ffffff' } }}>FAQs</Link>
            <Link href="#" display="block" variant="body2" sx={{ color: '#bbbbbb', '&:hover': { color: '#ffffff' } }}>Shipping & Returns</Link>
          </Grid>
          <Grid xs={6} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', fontWeight: 'bold' }}>
              Follow Us
            </Typography>
            <Link href="#" display="block" variant="body2" sx={{ color: '#bbbbbb', '&:hover': { color: '#ffffff' } }}>Facebook</Link>
            <Link href="#" display="block" variant="body2" sx={{ color: '#bbbbbb', '&:hover': { color: '#ffffff' } }}>Twitter</Link>
            <Link href="#" display="block" variant="body2" sx={{ color: '#bbbbbb', '&:hover': { color: '#ffffff' } }}>Instagram</Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Gamezone Hub
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;