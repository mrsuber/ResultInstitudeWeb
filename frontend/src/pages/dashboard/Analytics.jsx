import { Box, Typography, Paper } from '@mui/material';
import { BarChart as BarChartIcon } from '@mui/icons-material';

const Analytics = () => {
  return (
    <Box>
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <BarChartIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="600">
              Analytics
            </Typography>
            <Typography variant="body1" color="text.secondary">
              View statistics and reports
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Analytics dashboard coming soon...
        </Typography>
      </Paper>
    </Box>
  );
};

export default Analytics;
