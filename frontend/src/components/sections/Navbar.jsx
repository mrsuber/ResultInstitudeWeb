import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useAuth } from '../../context/AuthContext';

const pages = ['Home', 'Services', 'About', 'Contact'];

const Navbar = () => {
  const { user } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    handleCloseNavMenu();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo - Desktop */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              background: 'linear-gradient(135deg, #E91E8C 0%, #4A7FC1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: '1.5rem',
            }}
          >
            Result Institute
          </Typography>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: '#1a1a1a' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => scrollToSection(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #E91E8C 0%, #4A7FC1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Result Institute
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => scrollToSection(page)}
                sx={{
                  my: 2,
                  mx: 1,
                  color: '#1a1a1a',
                  display: 'block',
                  fontWeight: 500,
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': {
                    background: 'rgba(233, 30, 140, 0.1)',
                    color: '#E91E8C',
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Login/Dashboard Button */}
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <Button
                component={RouterLink}
                to="/dashboard"
                variant="contained"
                startIcon={<DashboardIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #E91E8C 0%, #4A7FC1 100%)',
                  color: 'white',
                  fontWeight: 600,
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(233, 30, 140, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #C41570 0%, #3A6BA1 100%)',
                    boxShadow: '0 6px 16px rgba(233, 30, 140, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Dashboard
              </Button>
            ) : (
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                startIcon={<LoginIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #E91E8C 0%, #4A7FC1 100%)',
                  color: 'white',
                  fontWeight: 600,
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(233, 30, 140, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #C41570 0%, #3A6BA1 100%)',
                    boxShadow: '0 6px 16px rgba(233, 30, 140, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
