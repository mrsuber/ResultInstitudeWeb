import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Divider,
  Alert,
  Tab,
  Tabs,
  Card,
  CardContent,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Save as SaveIcon,
  Lock as LockIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import userService from '../../services/user.service';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} style={{ padding: '24px 0' }}>
      {value === index && children}
    </div>
  );
}

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Profile form state
  const [profileData, setProfileData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError(null);
    setSuccess(null);
  };

  const handleProfileUpdate = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await userService.updateUser(user.id, profileData);

      // Update auth context with new user data
      if (response.data) {
        updateUser(response.data);
      }

      setSuccess('Profile updated successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validate passwords match
      if (passwordData.new_password !== passwordData.confirm_password) {
        setError('New passwords do not match');
        setLoading(false);
        return;
      }

      // Validate password strength
      if (passwordData.new_password.length < 6) {
        setError('Password must be at least 6 characters long');
        setLoading(false);
        return;
      }

      await userService.updatePassword(user.id, {
        current_password: passwordData.current_password,
        new_password: passwordData.new_password,
      });

      setSuccess('Password updated successfully');
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: '#eef2ff', borderRadius: 2 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: '#6366f1', width: 56, height: 56 }}>
            <SettingsIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="600" sx={{ mb: 0.5 }}>
              Account Settings
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your account preferences and security
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Alerts */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      {/* Settings Content */}
      <Paper elevation={0} sx={{ border: '1px solid #e5e7eb' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}
        >
          <Tab
            icon={<PersonIcon />}
            label="Profile"
            iconPosition="start"
            sx={{ textTransform: 'none', minHeight: 64 }}
          />
          <Tab
            icon={<LockIcon />}
            label="Security"
            iconPosition="start"
            sx={{ textTransform: 'none', minHeight: 64 }}
          />
        </Tabs>

        {/* Profile Tab */}
        <TabPanel value={activeTab} index={0}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Card elevation={0} sx={{ bgcolor: '#f9fafb', mb: 3 }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={3}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: '#6366f1',
                      fontSize: '2rem',
                    }}
                  >
                    {user?.first_name?.[0]}{user?.last_name?.[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="600">
                      {user?.first_name} {user?.last_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user?.role?.replace('_', ' ').toUpperCase()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Member since {new Date(user?.created_at).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Typography variant="h6" fontWeight="600" gutterBottom>
              Personal Information
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  required
                  value={profileData.first_name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, first_name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  required
                  value={profileData.last_name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, last_name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  required
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  helperText="Contact an administrator to change your email"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  multiline
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                  helperText="Tell us a bit about yourself"
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" gap={2}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleProfileUpdate}
                    disabled={loading}
                    sx={{
                      bgcolor: '#6366f1',
                      '&:hover': { bgcolor: '#4f46e5' },
                      textTransform: 'none',
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      setProfileData({
                        first_name: user?.first_name || '',
                        last_name: user?.last_name || '',
                        email: user?.email || '',
                        phone: user?.phone || '',
                        bio: user?.bio || '',
                      })
                    }
                    sx={{ textTransform: 'none' }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Security Tab */}
        <TabPanel value={activeTab} index={1}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Typography variant="h6" fontWeight="600" gutterBottom>
              Change Password
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Ensure your account is using a long, random password to stay secure
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                  required
                  value={passwordData.current_password}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      current_password: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  required
                  value={passwordData.new_password}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      new_password: e.target.value,
                    })
                  }
                  helperText="Password must be at least 6 characters long"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  required
                  value={passwordData.confirm_password}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirm_password: e.target.value,
                    })
                  }
                  error={
                    passwordData.confirm_password &&
                    passwordData.new_password !== passwordData.confirm_password
                  }
                  helperText={
                    passwordData.confirm_password &&
                    passwordData.new_password !== passwordData.confirm_password
                      ? 'Passwords do not match'
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" gap={2}>
                  <Button
                    variant="contained"
                    startIcon={<LockIcon />}
                    onClick={handlePasswordUpdate}
                    disabled={loading}
                    sx={{
                      bgcolor: '#6366f1',
                      '&:hover': { bgcolor: '#4f46e5' },
                      textTransform: 'none',
                    }}
                  >
                    Update Password
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      setPasswordData({
                        current_password: '',
                        new_password: '',
                        confirm_password: '',
                      })
                    }
                    sx={{ textTransform: 'none' }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Card elevation={0} sx={{ bgcolor: '#fef2f2', border: '1px solid #fecaca' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="600" color="error" gutterBottom>
                  Account Security Tips
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div">
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    <li>Use a strong, unique password</li>
                    <li>Never share your password with anyone</li>
                    <li>Change your password regularly</li>
                    <li>Use a password manager to keep track of passwords</li>
                    <li>Enable two-factor authentication when available</li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Settings;
