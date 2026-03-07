import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Typography,
  Divider,
  ListItemIcon,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DRAWER_WIDTH } from './Sidebar';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNotifications = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleProfile = () => {
    handleCloseUserMenu();
    // Navigate to profile page when created
    // navigate('/profile');
  };

  const handleSettings = () => {
    handleCloseUserMenu();
    navigate('/settings');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
        bgcolor: 'white',
        color: '#1a1a1a',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />

        {/* Notifications */}
        <IconButton
          size="large"
          color="inherit"
          onClick={handleOpenNotifications}
          sx={{ mr: 1 }}
        >
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* User Profile */}
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              width: 40,
              height: 40,
            }}
          >
            {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
          </Avatar>
        </IconButton>

        {/* Notifications Menu */}
        <Menu
          anchorEl={anchorElNotifications}
          open={Boolean(anchorElNotifications)}
          onClose={handleCloseNotifications}
          PaperProps={{
            sx: {
              mt: 1.5,
              width: 320,
              maxHeight: 400,
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="h6" fontWeight="600">
              Notifications
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleCloseNotifications}>
            <Box>
              <Typography variant="body2" fontWeight="600">
                New training assigned
              </Typography>
              <Typography variant="caption" color="text.secondary">
                2 hours ago
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleCloseNotifications}>
            <Box>
              <Typography variant="body2" fontWeight="600">
                User registration approved
              </Typography>
              <Typography variant="caption" color="text.secondary">
                5 hours ago
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleCloseNotifications}>
            <Box>
              <Typography variant="body2" fontWeight="600">
                New blog post published
              </Typography>
              <Typography variant="caption" color="text.secondary">
                1 day ago
              </Typography>
            </Box>
          </MenuItem>
        </Menu>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorElUser}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 200,
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle1" fontWeight="600">
              {user?.first_name} {user?.last_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: 'inline-block',
                mt: 0.5,
                px: 1,
                py: 0.25,
                borderRadius: 1,
                bgcolor: 'primary.50',
                color: 'primary.main',
                fontWeight: 600,
              }}
            >
              {user?.role?.replace('_', ' ').toUpperCase()}
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleProfile}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleSettings}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            <Typography color="error">Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
