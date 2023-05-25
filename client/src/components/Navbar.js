import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box, Button, Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../style/Navbar.css'

const Navbar = ({setIsLoggedIn}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [userPoints, setUserPoints] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();  

  useEffect(() => {
    async function getUserPoints() {
      try {
        const repsonse = await axios.get('/api/users/currentPoint')
        setUserPoints(repsonse.data)
      } catch (err) {
        console.error('Error', err);
      }
    }

    getUserPoints();
  }, []);

  async function endSession() {
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/logout`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ 'endSession': true }),
      headers: {
        "Content-Type": "application/json",
        'credentials': 'include'
      },
      credentials: 'include' // enables cookies
    }).then(() => {
      setIsLoggedIn(false);
      localStorage.setItem('isLoggedIn', false)
      return navigate("/login");
    });
  }

    return (
      <>
        <AppBar className='navbar-top' position="static">
          <Toolbar variant={isMobile ? "regular" : "dense"}>
            {isMobile ? null : (
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
                <MenuIcon />
              </IconButton>
            )}
            <Box className='navbar-top-title' component="span" sx={{ flexGrow: 1 }}>
              ArtificialGains
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <p className='navbar-points'>{userPoints} PTS</p>
            <Button className='navbar-top-links' color="inherit" component={Link} to="/app/profile">Profile</Button>
            <Button className='navbar-top-links' color="inherit" onClick={endSession}>Logout</Button>
          </Toolbar>
        </AppBar>
        <Outlet />
        {isMobile ? (
          <AppBar className="navbar-bottom" position="fixed" color="primary" style={{ top: 'auto', bottom: 0 }}>
            <Toolbar sx={{ justifyContent: 'center', padding: 0 }}>
              <IconButton className='navbar-bottom-button' onClick={handleMenuClose} component={Link} to="/app/fitness" edge="start" color="inherit" aria-label="fitness" sx={{ fontSize: '2.5rem', width: '33.3%' }}>
                <FitnessCenterIcon />
              </IconButton>
              <IconButton className='navbar-bottom-button' onClick={handleMenuClose} component={Link} to="/app/home" edge="start" color="inherit" aria-label="home" sx={{ fontSize: '2.5rem', width: '33.3%' }}>
                <HomeIcon />
              </IconButton>
              <IconButton className='navbar-bottom-button' onClick={handleMenuClose} component={Link} to="/app/nutrition" edge="start" color="inherit" aria-label="restaurant" sx={{ fontSize: '2.5rem', width: '33.3%' }}>
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
            <MenuItem onClick={handleMenuClose} component={Link} to="/app/home">Home</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/app/nutrition">Nutrition</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/app/fitness">Fitness</MenuItem>
          </Menu>
        )}

      </>
    );
}
  export default Navbar;
