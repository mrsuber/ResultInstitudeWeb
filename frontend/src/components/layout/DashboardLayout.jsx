import { Box, Toolbar } from '@mui/material';
import Sidebar, { DRAWER_WIDTH } from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f5f5f5',
          minHeight: '100vh',
          width: 0, // This forces flexGrow to work properly
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Navbar />
        <Toolbar /> {/* Spacer for fixed navbar */}
        <Box sx={{ p: 3, flex: 1, width: '100%' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
