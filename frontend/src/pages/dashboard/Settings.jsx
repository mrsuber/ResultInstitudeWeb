import { Box, Typography, Paper } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';

const Settings = () => {
  return (
    <Box>
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <SettingsIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="600">
              Settings
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Configure system settings
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Settings page coming soon...
        </Typography>
      </Paper>
    </Box>
  );
};

export default Settings;
