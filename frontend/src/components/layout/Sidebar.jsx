import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Avatar,
  Chip
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  Article as ArticleIcon,
  Assignment as AssignmentIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const DRAWER_WIDTH = 280;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', roles: ['super_admin', 'admin', 'trainer', 'participant'] },
  { text: 'Trainings', icon: <SchoolIcon />, path: '/trainings', roles: ['super_admin', 'admin', 'trainer', 'participant'] },
  { text: 'Users', icon: <PeopleIcon />, path: '/users', roles: ['super_admin', 'admin'] },
  { text: 'Blog', icon: <ArticleIcon />, path: '/blog', roles: ['super_admin', 'admin', 'trainer'] },
  { text: 'Projects', icon: <AssignmentIcon />, path: '/projects', roles: ['super_admin', 'admin', 'trainer'] },
  { text: 'Analytics', icon: <BarChartIcon />, path: '/analytics', roles: ['super_admin', 'admin'] },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings', roles: ['super_admin', 'admin', 'trainer', 'participant'] }
];

const Sidebar = ({ open, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const filteredMenuItems = menuItems.filter(item =>
    item.roles.includes(user?.role)
  );

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 900) {
      onClose();
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: '#1a1a2e',
          color: 'white',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)'
        },
      }}
    >
      {/* Logo Section */}
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold" sx={{ color: '#fff' }}>
          Result Institute
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          Training Management
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      {/* User Info */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          sx={{
            width: 48,
            height: 48,
            bgcolor: 'primary.main',
            fontSize: '1.2rem',
            fontWeight: 'bold'
          }}
        >
          {user?.first_name?.[0]}{user?.last_name?.[0]}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap fontWeight="600">
            {user?.first_name} {user?.last_name}
          </Typography>
          <Chip
            label={user?.role?.replace('_', ' ').toUpperCase()}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.65rem',
              fontWeight: 600,
              bgcolor: 'primary.main',
              color: 'white',
              mt: 0.5
            }}
          />
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 1 }} />

      {/* Navigation Menu */}
      <List sx={{ px: 1, flex: 1 }}>
        {filteredMenuItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
                  '&:hover': {
                    backgroundColor: isActive
                      ? 'rgba(102, 126, 234, 0.3)'
                      : 'rgba(255, 255, 255, 0.05)',
                  },
                  color: isActive ? '#667eea' : '#ffffff',
                  transition: 'all 0.2s'
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '0.95rem'
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Footer */}
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          © 2026 Result Institute
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
export { DRAWER_WIDTH };
