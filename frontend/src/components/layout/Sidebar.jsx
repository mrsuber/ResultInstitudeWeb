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
  EventAvailable as AttendanceIcon,
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
  { text: 'Attendance', icon: <AttendanceIcon />, path: '/attendance', roles: ['super_admin', 'admin', 'trainer'] },
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
          backgroundColor: '#ffffff',
          color: '#1f2937',
          borderRight: '1px solid #e5e7eb',
          boxShadow: '2px 0 8px rgba(0,0,0,0.05)'
        },
      }}
    >
      {/* Logo Section */}
      <Box sx={{ p: 3, textAlign: 'center', bgcolor: '#6366f1' }}>
        <Typography variant="h5" fontWeight="bold" sx={{ color: '#fff' }}>
          Result Institute
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '0.75rem' }}>
          Training Management
        </Typography>
      </Box>

      <Divider sx={{ borderColor: '#e5e7eb' }} />

      {/* User Info */}
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#f9fafb' }}>
        <Avatar
          sx={{
            width: 48,
            height: 48,
            bgcolor: '#6366f1',
            fontSize: '1.2rem',
            fontWeight: 'bold'
          }}
        >
          {user?.first_name?.[0]}{user?.last_name?.[0]}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap fontWeight="600" sx={{ color: '#111827' }}>
            {user?.first_name} {user?.last_name}
          </Typography>
          <Chip
            label={user?.role?.replace('_', ' ').toUpperCase()}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.65rem',
              fontWeight: 600,
              bgcolor: '#dbeafe',
              color: '#1e40af',
              mt: 0.5
            }}
          />
        </Box>
      </Box>

      <Divider sx={{ borderColor: '#e5e7eb', my: 1 }} />

      {/* Navigation Menu */}
      <List sx={{ px: 2, flex: 1, py: 2 }}>
        {filteredMenuItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive ? '#eef2ff' : 'transparent',
                  border: isActive ? '1px solid #c7d2fe' : '1px solid transparent',
                  '&:hover': {
                    backgroundColor: isActive ? '#e0e7ff' : '#f3f4f6',
                  },
                  color: isActive ? '#4338ca' : '#6b7280',
                  transition: 'all 0.2s',
                  py: 1.25,
                  px: 2
                }}
              >
                <ListItemIcon sx={{ color: isActive ? '#6366f1' : '#9ca3af', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.95rem',
                    color: isActive ? '#111827' : '#374151'
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Footer */}
      <Box sx={{ p: 2, textAlign: 'center', bgcolor: '#f9fafb' }}>
        <Typography variant="caption" sx={{ color: '#9ca3af', fontSize: '0.7rem' }}>
          © 2026 Result Institute
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
export { DRAWER_WIDTH };
