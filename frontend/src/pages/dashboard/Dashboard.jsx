import { Box, Grid, Paper, Typography, Card, CardContent, Container } from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const StatCard = ({ title, value, icon, color }) => (
  <Card elevation={2} sx={{ height: '100%' }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: `${color}.50`,
            color: `${color}.main`
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Users', value: '45', icon: <PeopleIcon />, color: 'primary' },
    { title: 'Active Trainings', value: '12', icon: <SchoolIcon />, color: 'success' },
    { title: 'Projects', value: '8', icon: <AssignmentIcon />, color: 'warning' },
    { title: 'Completion Rate', value: '87%', icon: <TrendingUpIcon />, color: 'info' }
  ];

  return (
    <Box>
      {/* Welcome Section */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom fontWeight="600">
          Welcome back, {user?.first_name}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your training programs today.
        </Typography>
      </Paper>

      {/* Stats Grid */}
      <Grid container spacing={3} mb={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Recent Activity
            </Typography>
            <Box mt={2}>
              <Typography variant="body2" color="text.secondary">
                No recent activity to display
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Quick Actions
            </Typography>
            <Box mt={2} display="flex" flexDirection="column" gap={2}>
              <Card
                variant="outlined"
                sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                onClick={() => navigate('/trainings/programs/create')}
              >
                <CardContent>
                  <Typography variant="body2">Create New Training</Typography>
                </CardContent>
              </Card>
              <Card
                variant="outlined"
                sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                onClick={() => navigate('/users')}
              >
                <CardContent>
                  <Typography variant="body2">Add New User</Typography>
                </CardContent>
              </Card>
              <Card
                variant="outlined"
                sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                onClick={() => navigate('/analytics')}
              >
                <CardContent>
                  <Typography variant="body2">View Reports</Typography>
                </CardContent>
              </Card>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
