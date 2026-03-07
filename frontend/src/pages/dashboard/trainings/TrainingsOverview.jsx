import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Paper, Typography, Button, Card, CardContent } from '@mui/material';
import {
  School as SchoolIcon,
  Event as EventIcon,
  People as PeopleIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import trainingService from '../../../services/training.service';

const StatCard = ({ title, value, icon, color, onClick }) => (
  <Card
    elevation={2}
    sx={{
      height: '100%',
      cursor: onClick ? 'pointer' : 'default',
      '&:hover': onClick ? { boxShadow: 4 } : {}
    }}
    onClick={onClick}
  >
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

const TrainingsOverview = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPrograms: 0,
    totalSessions: 0,
    totalEnrollments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [programsRes, sessionsRes, enrollmentsRes] = await Promise.all([
        trainingService.programs.getAllPrograms({ limit: 1 }),
        trainingService.sessions.getAllSessions({ limit: 1 }),
        trainingService.enrollments.getAllEnrollments({ limit: 1 }),
      ]);

      setStats({
        totalPrograms: programsRes.data?.pagination?.total || 0,
        totalSessions: sessionsRes.data?.pagination?.total || 0,
        totalEnrollments: enrollmentsRes.data?.pagination?.total || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="600">
              Training Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage training programs, sessions, and enrollments
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/trainings/programs/create')}
              sx={{ textTransform: 'none' }}
            >
              New Program
            </Button>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => navigate('/trainings/sessions/create')}
              sx={{ textTransform: 'none' }}
            >
              New Session
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Programs"
            value={loading ? '...' : stats.totalPrograms}
            icon={<SchoolIcon />}
            color="primary"
            onClick={() => navigate('/trainings/programs')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Sessions"
            value={loading ? '...' : stats.totalSessions}
            icon={<EventIcon />}
            color="success"
            onClick={() => navigate('/trainings/sessions')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Enrollments"
            value={loading ? '...' : stats.totalEnrollments}
            icon={<PeopleIcon />}
            color="info"
            onClick={() => navigate('/trainings/enrollments')}
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Quick Actions
            </Typography>
            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/trainings/programs')}
                sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
              >
                View All Programs
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/trainings/sessions')}
                sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
              >
                View All Sessions
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/trainings/enrollments')}
                sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
              >
                Manage Enrollments
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Getting Started
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Welcome to the Training Management System!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              1. Create training programs with bilingual content<br/>
              2. Schedule sessions for your programs<br/>
              3. Manage participant enrollments<br/>
              4. Track attendance and issue certificates<br/>
              5. Publish trainings to the public website
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrainingsOverview;
