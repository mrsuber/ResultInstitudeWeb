import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  LinearProgress,
  Button,
  IconButton,
  Divider,
  alpha
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  EventAvailable as EventIcon,
  TrendingUp as TrendingUpIcon,
  ArrowUpward,
  ArrowDownward,
  MoreVert,
  Add,
  PersonAdd,
  Assessment
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Enhanced StatCard with trends
const StatCard = ({ title, value, icon: Icon, color, trend, trendValue }) => {
  const isPositive = trend === 'up';

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`,
        border: `1px solid ${alpha(color, 0.1)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 24px ${alpha(color, 0.15)}`,
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
              boxShadow: `0 8px 16px ${alpha(color, 0.25)}`,
            }}
          >
            <Icon sx={{ fontSize: 28, color: 'white' }} />
          </Box>
          <Chip
            size="small"
            icon={isPositive ? <ArrowUpward sx={{ fontSize: 14 }} /> : <ArrowDownward sx={{ fontSize: 14 }} />}
            label={trendValue}
            sx={{
              bgcolor: isPositive ? alpha('#4caf50', 0.1) : alpha('#f44336', 0.1),
              color: isPositive ? '#4caf50' : '#f44336',
              fontWeight: 600,
              '& .MuiChip-icon': {
                color: isPositive ? '#4caf50' : '#f44336'
              }
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography variant="h3" fontWeight="700" sx={{ color: 'text.primary' }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Sample data for charts
  const enrollmentData = [
    { month: 'Jan', enrollments: 65 },
    { month: 'Feb', enrollments: 78 },
    { month: 'Mar', enrollments: 90 },
    { month: 'Apr', enrollments: 81 },
    { month: 'May', enrollments: 95 },
    { month: 'Jun', enrollments: 112 },
  ];

  const programDistribution = [
    { name: 'Leadership', value: 35, color: '#6366f1' },
    { name: 'Technical', value: 25, color: '#8b5cf6' },
    { name: 'Soft Skills', value: 20, color: '#ec4899' },
    { name: 'Management', value: 20, color: '#f59e0b' },
  ];

  const recentEnrollments = [
    { id: 1, name: 'John Doe', program: 'Leadership Training', date: '2 hours ago', status: 'approved' },
    { id: 2, name: 'Jane Smith', program: 'Technical Skills', date: '5 hours ago', status: 'pending' },
    { id: 3, name: 'Mike Johnson', program: 'Project Management', date: '1 day ago', status: 'approved' },
    { id: 4, name: 'Sarah Williams', program: 'Communication Skills', date: '2 days ago', status: 'approved' },
  ];

  const upcomingSessions = [
    { id: 1, title: 'Leadership Fundamentals', date: 'March 10, 2026', participants: 24, capacity: 30 },
    { id: 2, title: 'Advanced Excel Training', date: 'March 15, 2026', participants: 18, capacity: 20 },
    { id: 3, title: 'Public Speaking Workshop', date: 'March 20, 2026', participants: 12, capacity: 15 },
  ];

  const stats = [
    {
      title: 'Total Participants',
      value: '248',
      icon: PeopleIcon,
      color: '#6366f1',
      trend: 'up',
      trendValue: '+12%'
    },
    {
      title: 'Active Programs',
      value: '24',
      icon: SchoolIcon,
      color: '#8b5cf6',
      trend: 'up',
      trendValue: '+8%'
    },
    {
      title: 'Upcoming Sessions',
      value: '18',
      icon: EventIcon,
      color: '#ec4899',
      trend: 'down',
      trendValue: '-3%'
    },
    {
      title: 'Completion Rate',
      value: '89%',
      icon: TrendingUpIcon,
      color: '#10b981',
      trend: 'up',
      trendValue: '+5%'
    }
  ];

  const quickActions = [
    {
      label: 'Create Training Program',
      icon: Add,
      color: '#6366f1',
      action: () => navigate('/trainings/programs/create')
    },
    {
      label: 'Add New User',
      icon: PersonAdd,
      color: '#8b5cf6',
      action: () => navigate('/users')
    },
    {
      label: 'View Analytics',
      icon: Assessment,
      color: '#ec4899',
      action: () => navigate('/analytics')
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      {/* Welcome Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="700" gutterBottom sx={{ color: 'text.primary' }}>
          Welcome back, {user?.first_name}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's your training management overview for today
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Enrollment Trends */}
        <Grid item xs={12} lg={8}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Box>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Enrollment Trends
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Monthly enrollment statistics
                </Typography>
              </Box>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={enrollmentData}>
                <defs>
                  <linearGradient id="colorEnrollments" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="enrollments"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorEnrollments)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Program Distribution */}
        <Grid item xs={12} lg={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Box>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Programs by Category
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Distribution overview
                </Typography>
              </Box>
            </Box>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={programDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {programDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Box mt={2}>
              {programDistribution.map((item, index) => (
                <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: item.color
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {item.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" fontWeight="600">
                    {item.value}%
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Grid container spacing={3} sx={{ pb: 10 }}>
        {/* Recent Enrollments */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight="600">
                Recent Enrollments
              </Typography>
              <Button size="small" onClick={() => navigate('/trainings/enrollments')}>
                View All
              </Button>
            </Box>
            <Box>
              {recentEnrollments.map((enrollment, index) => (
                <Box key={enrollment.id}>
                  <Box display="flex" alignItems="center" gap={2} py={2}>
                    <Avatar
                      sx={{
                        bgcolor: '#6366f1',
                        width: 40,
                        height: 40
                      }}
                    >
                      {enrollment.name.charAt(0)}
                    </Avatar>
                    <Box flex={1}>
                      <Typography variant="body2" fontWeight="600">
                        {enrollment.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {enrollment.program}
                      </Typography>
                    </Box>
                    <Box textAlign="right">
                      <Chip
                        label={enrollment.status}
                        size="small"
                        sx={{
                          bgcolor: alpha(getStatusColor(enrollment.status), 0.1),
                          color: getStatusColor(enrollment.status),
                          fontWeight: 600,
                          textTransform: 'capitalize'
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                        {enrollment.date}
                      </Typography>
                    </Box>
                  </Box>
                  {index < recentEnrollments.length - 1 && <Divider />}
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Upcoming Sessions */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight="600">
                Upcoming Sessions
              </Typography>
              <Button size="small" onClick={() => navigate('/trainings/sessions')}>
                View All
              </Button>
            </Box>
            <Box>
              {upcomingSessions.map((session, index) => (
                <Box key={session.id}>
                  <Box py={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                      <Typography variant="body2" fontWeight="600">
                        {session.title}
                      </Typography>
                      <Chip
                        label={`${session.participants}/${session.capacity}`}
                        size="small"
                        sx={{
                          bgcolor: alpha('#6366f1', 0.1),
                          color: '#6366f1',
                          fontWeight: 600
                        }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary" display="block" mb={1.5}>
                      {session.date}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(session.participants / session.capacity) * 100}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: alpha('#6366f1', 0.1),
                        '& .MuiLinearProgress-bar': {
                          bgcolor: '#6366f1',
                          borderRadius: 3
                        }
                      }}
                    />
                  </Box>
                  {index < upcomingSessions.length - 1 && <Divider />}
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions Floating Button */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="contained"
            startIcon={<action.icon />}
            onClick={action.action}
            sx={{
              bgcolor: action.color,
              color: 'white',
              boxShadow: `0 8px 16px ${alpha(action.color, 0.25)}`,
              '&:hover': {
                bgcolor: action.color,
                transform: 'translateY(-2px)',
                boxShadow: `0 12px 24px ${alpha(action.color, 0.35)}`,
              },
              transition: 'all 0.3s ease',
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            {action.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
