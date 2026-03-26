import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Event as EventIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import analyticsService from '../../services/analytics.service';

const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
  <Card elevation={0} sx={{ height: '100%', border: '1px solid #e5e7eb' }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="700">
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Avatar sx={{ bgcolor: color, width: 48, height: 48 }}>
          <Icon />
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

const Analytics = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [overviewStats, setOverviewStats] = useState(null);
  const [enrollmentTrends, setEnrollmentTrends] = useState([]);
  const [programDistribution, setProgramDistribution] = useState([]);
  const [enrollmentStatus, setEnrollmentStatus] = useState([]);
  const [topPrograms, setTopPrograms] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const [completionRates, setCompletionRates] = useState(null);

  const isAdmin = user?.role === 'super_admin' || user?.role === 'admin';

  useEffect(() => {
    if (isAdmin) {
      fetchAllAnalytics();
    }
  }, [isAdmin]);

  const fetchAllAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        overview,
        trends,
        distribution,
        status,
        programs,
        growth,
        completion,
      ] = await Promise.all([
        analyticsService.getOverviewStats(),
        analyticsService.getEnrollmentTrends(),
        analyticsService.getProgramDistribution(),
        analyticsService.getEnrollmentStatusBreakdown(),
        analyticsService.getTopPrograms(),
        analyticsService.getUserGrowth(),
        analyticsService.getCompletionRates(),
      ]);

      setOverviewStats(overview.data);
      setEnrollmentTrends(formatTrendsData(trends.data));
      setProgramDistribution(formatDistributionData(distribution.data));
      setEnrollmentStatus(formatStatusData(status.data));
      setTopPrograms(programs.data);
      setUserGrowth(formatGrowthData(growth.data));
      setCompletionRates(completion.data);
    } catch (err) {
      setError(err.message || 'Failed to load analytics');
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatTrendsData = (data) => {
    return data.map(item => ({
      month: new Date(item.month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      enrollments: parseInt(item.count),
    }));
  };

  const formatDistributionData = (data) => {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
    return data.map((item, index) => ({
      name: item.category,
      value: parseInt(item.count),
      color: colors[index % colors.length],
    }));
  };

  const formatStatusData = (data) => {
    return data.map(item => ({
      status: item.status,
      count: parseInt(item.count),
    }));
  };

  const formatGrowthData = (data) => {
    return data.map(item => ({
      month: new Date(item.month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      users: parseInt(item.count),
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (!isAdmin) {
    return (
      <Box>
        <Alert severity="warning">
          Only administrators can access analytics
        </Alert>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: '#eef2ff', borderRadius: 2 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: '#6366f1', width: 56, height: 56 }}>
            <AssessmentIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="600" sx={{ mb: 0.5 }}>
              Analytics Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Comprehensive insights and statistics
            </Typography>
          </Box>
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Overview Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Users"
            value={overviewStats?.users?.total || 0}
            subtitle={`${overviewStats?.users?.active || 0} active`}
            icon={PeopleIcon}
            color="#6366f1"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Training Programs"
            value={overviewStats?.programs?.total || 0}
            subtitle={`${overviewStats?.programs?.published || 0} published`}
            icon={SchoolIcon}
            color="#8b5cf6"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Training Sessions"
            value={overviewStats?.sessions?.total || 0}
            subtitle={`${overviewStats?.sessions?.upcoming || 0} upcoming`}
            icon={EventIcon}
            color="#ec4899"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Enrollments"
            value={overviewStats?.enrollments?.total || 0}
            subtitle={`${overviewStats?.enrollments?.approved || 0} approved`}
            icon={TrendingUpIcon}
            color="#f59e0b"
          />
        </Grid>
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Enrollment Trends */}
        <Grid item xs={12} lg={8}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid #e5e7eb' }}>
            <Typography variant="h6" fontWeight="600" gutterBottom>
              Enrollment Trends (Last 6 Months)
            </Typography>
            <Box sx={{ height: 300, mt: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={enrollmentTrends}>
                  <defs>
                    <linearGradient id="colorEnrollments" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Tooltip />
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
            </Box>
          </Paper>
        </Grid>

        {/* Completion Rate */}
        <Grid item xs={12} lg={4}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid #e5e7eb', height: '100%' }}>
            <Typography variant="h6" fontWeight="600" gutterBottom>
              Course Completion Rate
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ height: 250 }}>
              <Box position="relative" display="inline-flex">
                <CircularProgress
                  variant="determinate"
                  value={completionRates?.rate || 0}
                  size={150}
                  thickness={5}
                  sx={{ color: '#10b981' }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h3" fontWeight="700" color="text.primary">
                    {completionRates?.rate || 0}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Completion
                  </Typography>
                </Box>
              </Box>
              <Box mt={3} textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  {completionRates?.completed || 0} completed out of {completionRates?.total || 0} enrollments
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Program Distribution */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid #e5e7eb' }}>
            <Typography variant="h6" fontWeight="600" gutterBottom>
              Programs by Category
            </Typography>
            <Box sx={{ height: 300, mt: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={programDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {programDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* User Growth */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid #e5e7eb' }}>
            <Typography variant="h6" fontWeight="600" gutterBottom>
              User Growth (Last 6 Months)
            </Typography>
            <Box sx={{ height: 300, mt: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Top Programs Table */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid #e5e7eb' }}>
            <Typography variant="h6" fontWeight="600" gutterBottom>
              Top Programs by Enrollment
            </Typography>
            <TableContainer sx={{ mt: 2 }}>
              <Table>
                <TableHead sx={{ bgcolor: '#f9fafb' }}>
                  <TableRow>
                    <TableCell>Program</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Enrollments</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topPrograms.map((program, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="600">
                          {program.title_en}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={program.category} size="small" />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="600" color="primary">
                          {program.enrollment_count}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Enrollment Status */}
        <Grid item xs={12} lg={5}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid #e5e7eb' }}>
            <Typography variant="h6" fontWeight="600" gutterBottom>
              Enrollment Status Breakdown
            </Typography>
            <Box sx={{ mt: 3 }}>
              {enrollmentStatus.map((status, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2" fontWeight="600" sx={{ textTransform: 'capitalize' }}>
                      {status.status}
                    </Typography>
                    <Typography variant="body2" fontWeight="700">
                      {status.count}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '100%', height: 8, bgcolor: '#e5e7eb', borderRadius: 1 }}>
                    <Box
                      sx={{
                        width: `${(status.count / overviewStats?.enrollments?.total) * 100}%`,
                        height: '100%',
                        bgcolor: getStatusColor(status.status),
                        borderRadius: 1,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
