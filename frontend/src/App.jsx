import { ThemeProvider, CssBaseline, Container, Box, Typography, Button } from '@mui/material';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            py: 4,
          }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="Result Institute Logo"
            sx={{
              width: { xs: 200, sm: 300, md: 400 },
              height: 'auto',
              mb: 4,
            }}
          />

          <Typography variant="h2" gutterBottom>
            Welcome to Result Institute
          </Typography>

          <Typography variant="h5" color="text.secondary" gutterBottom>
            Training Management System
          </Typography>

          <Typography variant="body1" sx={{ mt: 2, mb: 4, maxWidth: 600 }}>
            Empowering Change Makers and Global Emerging Leaders through comprehensive
            training programs, real-time monitoring, and project coordination.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" size="large">
              Get Started
            </Button>
            <Button variant="outlined" color="secondary" size="large">
              Learn More
            </Button>
          </Box>

          <Box sx={{ mt: 6, p: 3, bgcolor: 'background.paper', borderRadius: 2, width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Key Features
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mt: 2 }}>
              <Box>
                <Typography variant="subtitle1" color="primary" fontWeight="bold">
                  Training Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create and manage comprehensive training programs
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" color="secondary" fontWeight="bold">
                  Ground Follow-Up
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Real-time monitoring and progress tracking
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" color="primary" fontWeight="bold">
                  Content Delivery
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Blog posts with embedded YouTube videos
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" color="secondary" fontWeight="bold">
                  Project Coordination
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kanban-style boards for task management
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 4 }}>
            © 2026 Result Institute • Developed by Camsol Technologies Ltd.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
