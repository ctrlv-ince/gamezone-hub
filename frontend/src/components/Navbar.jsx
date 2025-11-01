import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Container,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatarError, setAvatarError] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };

  const handleEditProfile = () => {
    handleMenuClose();
    navigate('/update-profile');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'linear-gradient(135deg, rgb(100, 160, 190) 0%, rgb(60, 120, 150) 100%)',
        boxShadow: '0 4px 30px 0 rgba(0,255,136,0.3), 0 0 20px 0 rgba(100,160,190,0.2)',
        zIndex: 1100,
        borderBottom: '2px solid rgba(0,255,136,0.3)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 0 }}>
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              },
            }}
            onClick={() => navigate('/')}
          >
            <Box
              sx={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <span>🎮</span>
              <span sx={{ display: { xs: 'none', md: 'inline' } }}>GameZone Hub</span>
            </Box>
          </Box>

          {/* User Profile & Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {user?.avatar?.url && !avatarError ? (
                <Avatar
                  src={user.avatar.url}
                  alt={user.name}
                  sx={{ 
                    width: 40, 
                    height: 40,
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                  onError={() => setAvatarError(true)}
                  onClick={handleMenuOpen}
                />
              ) : (
                <Avatar 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    backgroundColor: '#fbbf24',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                  onClick={handleMenuOpen}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
              )}
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                  }}
                >
                  {user?.name}
                </Typography>
              </Box>
            </Box>

            {/* Menu Icon */}
            <Button
              onClick={handleMenuOpen}
              sx={{
                color: '#fff',
                minWidth: '40px',
                p: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <MoreVert />
            </Button>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleMenuClose}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {user?.name}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {user?.email}
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem disabled>
                <Typography variant="caption" color="textSecondary">
                  {user?.address}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleEditProfile}>
                <Typography variant="body2">Edit Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: '#ef4444' }}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;