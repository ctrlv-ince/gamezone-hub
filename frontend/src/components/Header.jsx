import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import { UserContext } from '../context/UserContext';

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
  const { user, logout } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <AppBar
      position="static"
      sx={{
        background:
          'linear-gradient(90deg, rgba(10, 14, 39, 0.95), rgba(26, 31, 58, 0.95))',
        borderBottom: '1px solid #333',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <RainbowText>Gamezone Hub</RainbowText>
          </Link>
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{ '&:hover': { color: '#00d9ff' } }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/products"
          sx={{ '&:hover': { color: '#00d9ff' } }}
        >
          Products
        </Button>
        {user ? (
          <div>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar alt={user.username} src={user.profilePicture} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                component={Link}
                to="/update-profile"
                onClick={handleClose}
              >
                Update Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{ '&:hover': { color: '#00d9ff' } }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/register"
              sx={{ '&:hover': { color: '#00d9ff' } }}
            >
              Register
            </Button>
          </>
        )}
        <IconButton
          color="inherit"
          component={Link}
          to="/cart"
          sx={{ '&:hover': { color: '#00d9ff' } }}
        >
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;