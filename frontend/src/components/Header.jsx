import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Gamezone Hub
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;