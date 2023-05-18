import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box, Button, Menu, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar variant={isMobile ? "regular" : "dense"}>
          {isMobile ? null : (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
          )}
          <Box component="span" sx={{ flexGrow: 1 }}>
            ArtificialGains
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" component={Link} to="/app/profile">Profile</Button>
          <Button color="inherit" component={Link} to="/register">Register</Button>
        </Toolbar>
      </AppBar>
      <Outlet />
      {isMobile ? (
        <AppBar position="fixed" color="primary" style={{ top: 'auto', bottom: 0 }}>
          <Toolbar sx={{ justifyContent: 'center', padding: 0 }}>
            <IconButton onClick={handleMenuClose} component={Link} to="/app/fitness" edge="start" color="inherit" aria-label="fitness" sx={{ fontSize: '2.5rem', width: '33.3%' }}>
              <FitnessCenterIcon />
            </IconButton>
            <IconButton onClick={handleMenuClose} component={Link} to="/app" edge="start" color="inherit" aria-label="home" sx={{ fontSize: '2.5rem', width: '33.3%' }}>
              <HomeIcon />
            </IconButton>
            <IconButton onClick={handleMenuClose} component={Link} to="/app/nutrition" edge="start" color="inherit" aria-label="restaurant" sx={{ fontSize: '2.5rem', width: '33.3%' }}>
              <RestaurantMenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      ) : (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/">Home</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/app/nutrition">Nutrition</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/app/fitness">Fitness</MenuItem>
        </Menu>
      )}

    </>
  );
}

export default Navbar;
