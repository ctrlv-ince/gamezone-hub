import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const RainbowText = styled('span')({
  background: 'linear-gradient(to right, #ff00ff, #00ff00, #0000ff)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'rainbow-animation 5s ease-in-out infinite',
  backgroundSize: '200% 200%',
  '@keyframes rainbow-animation': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
});

const Header = () => {
  return (
    <AppBar position="static" sx={{ background: '#1a1a1a', borderBottom: '1px solid #333', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <RainbowText>Gamezone Hub</RainbowText>
          </Link>
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" component={Link} to="/" sx={{ '&:hover': { color: '#00d9ff' } }}>Home</Button>
        <Button color="inherit" component={Link} to="/products" sx={{ '&:hover': { color: '#00d9ff' } }}>Products</Button>
        <Button color="inherit" component={Link} to="/login" sx={{ '&:hover': { color: '#00d9ff' } }}>Login</Button>
        <Button color="inherit" component={Link} to="/register" sx={{ '&:hover': { color: '#00d9ff' } }}>Register</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;