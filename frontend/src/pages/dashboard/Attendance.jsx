import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Schedule,
  Info,
  Edit,
  Save,
  PersonAdd,
  Assessment
} from '@mui/icons-material';
import * as attendanceService from '../../services/attendance.service';
import * as trainingService from '../../services/training.service';
import { useAuth } from '../../context/AuthContext';

const Attendance = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editMode, setEditMode] = useState(false);

  // Check if user can mark attendance
  const canMarkAttendance = ['super_admin', 'admin', 'trainer'].includes(user?.role);

  // Load training sessions
  useEffect(() => {
    loadSessions();
  }, []);

  // Load enrolled users when session is selected
  useEffect(() => {
    if (selectedSession) {
      loadEnrolledUsers();
      loadSessionStatistics();
      loadAttendance();
    }
  }, [selectedSession, selectedDate]);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const response = await trainingService.getAllSessions({ status: 'active' });
      if (response.success) {
        setSessions(response.data.sessions || response.data);
      }
    } catch (err) {
      setError('Failed to load training sessions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadEnrolledUsers = async () => {
    try {
      setLoading(true);
      const response = await attendanceService.getEnrolledUsers(selectedSession);
      if (response.success) {
        setEnrolledUsers(response.data);
        // Initialize attendance state
        initializeAttendance(response.data);
      }
    } catch (err) {
      setError('Failed to load enrolled users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadAttendance = async () => {
    try {
      const response = await attendanceService.getSessionAttendance(selectedSession, {
        date: selectedDate
      });
      if (response.success && response.data.length > 0) {
        setAttendance(response.data);
        setEditMode(true);
      }
    } catch (err) {
      console.error('Failed to load attendance:', err);
    }
  };

  const loadSessionStatistics = async () => {
    try {
      const response = await attendanceService.getSessionStatistics(selectedSession);
      if (response.success) {
        setStatistics(response.data);
      }
    } catch (err) {
      console.error('Failed to load statistics:', err);
    }
  };

  const initializeAttendance = (users) => {
    const initialAttendance = users.map(user => ({
      user_id: user.id,
      user_name: `${user.first_name} ${user.last_name}`,
      status: 'absent',
      check_in_time: '',
      notes: ''
    }));
    setAttendance(initialAttendance);
  };

  const handleStatusChange = (userId, newStatus) => {
    setAttendance(prev => prev.map(record =>
      record.user_id === userId
        ? {
            ...record,
            status: newStatus,
            check_in_time: newStatus === 'present' && !record.check_in_time
              ? new Date().toLocaleTimeString('en-US', { hour12: false }).substring(0, 5)
              : record.check_in_time
          }
        : record
    ));
  };

  const handleTimeChange = (userId, time) => {
    setAttendance(prev => prev.map(record =>
      record.user_id === userId ? { ...record, check_in_time: time } : record
    ));
  };

  const handleNotesChange = (userId, notes) => {
    setAttendance(prev => prev.map(record =>
      record.user_id === userId ? { ...record, notes } : record
    ));
  };

  const handleSaveAttendance = async () => {
    if (!selectedSession || !selectedDate) {
      setError('Please select a session and date');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const attendanceData = {
        session_id: selectedSession,
        date: selectedDate,
        attendance: attendance.map(record => ({
          user_id: record.user_id,
          status: record.status,
          check_in_time: record.check_in_time || null,
          notes: record.notes || ''
        }))
      };

      const response = await attendanceService.markAttendance(attendanceData);
      if (response.success) {
        setSuccess('Attendance saved successfully!');
        setEditMode(true);
        loadSessionStatistics();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save attendance');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'success';
      case 'absent':
        return 'error';
      case 'late':
        return 'warning';
      case 'excused':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircle />;
      case 'absent':
        return <Cancel />;
      case 'late':
        return <Schedule />;
      case 'excused':
        return <Info />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Attendance Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Mark and track attendance for training sessions
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      {/* Statistics Cards */}
      {statistics && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Total Sessions
                </Typography>
                <Typography variant="h4">
                  {statistics.total_sessions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'success.light' }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Average Attendance
                </Typography>
                <Typography variant="h4">
                  {statistics.average_attendance}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'info.light' }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Present Today
                </Typography>
                <Typography variant="h4">
                  {statistics.present_count || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'error.light' }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Absent Today
                </Typography>
                <Typography variant="h4">
                  {statistics.absent_count || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Session and Date Selection */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Training Session</InputLabel>
              <Select
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                label="Training Session"
              >
                <MenuItem value="">Select a session</MenuItem>
                {sessions.map((session) => (
                  <MenuItem key={session.id} value={session.id}>
                    {session.title_en} ({new Date(session.start_date).toLocaleDateString()})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Attendance Table */}
      {selectedSession && enrolledUsers.length > 0 && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">
              Mark Attendance - {selectedDate}
            </Typography>
            {canMarkAttendance && (
              <Button
                variant="contained"
                color="primary"
                startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                onClick={handleSaveAttendance}
                disabled={loading}
              >
                Save Attendance
              </Button>
            )}
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Participant</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Check-in Time</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendance.map((record) => (
                  <TableRow key={record.user_id}>
                    <TableCell>
                      {record.user_name || enrolledUsers.find(u => u.id === record.user_id)?.first_name + ' ' + enrolledUsers.find(u => u.id === record.user_id)?.last_name}
                    </TableCell>
                    <TableCell>
                      {canMarkAttendance ? (
                        <ToggleButtonGroup
                          value={record.status}
                          exclusive
                          onChange={(e, value) => value && handleStatusChange(record.user_id, value)}
                          size="small"
                        >
                          <ToggleButton value="present" color="success">
                            <Tooltip title="Present">
                              <CheckCircle />
                            </Tooltip>
                          </ToggleButton>
                          <ToggleButton value="late" color="warning">
                            <Tooltip title="Late">
                              <Schedule />
                            </Tooltip>
                          </ToggleButton>
                          <ToggleButton value="excused" color="info">
                            <Tooltip title="Excused">
                              <Info />
                            </Tooltip>
                          </ToggleButton>
                          <ToggleButton value="absent" color="error">
                            <Tooltip title="Absent">
                              <Cancel />
                            </Tooltip>
                          </ToggleButton>
                        </ToggleButtonGroup>
                      ) : (
                        <Chip
                          icon={getStatusIcon(record.status)}
                          label={record.status}
                          color={getStatusColor(record.status)}
                          size="small"
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      {canMarkAttendance ? (
                        <TextField
                          type="time"
                          value={record.check_in_time || ''}
                          onChange={(e) => handleTimeChange(record.user_id, e.target.value)}
                          size="small"
                          disabled={record.status === 'absent'}
                        />
                      ) : (
                        record.check_in_time || '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {canMarkAttendance ? (
                        <TextField
                          value={record.notes || ''}
                          onChange={(e) => handleNotesChange(record.user_id, e.target.value)}
                          size="small"
                          placeholder="Add notes..."
                          fullWidth
                        />
                      ) : (
                        record.notes || '-'
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {selectedSession && enrolledUsers.length === 0 && !loading && (
        <Alert severity="info">
          No enrolled participants found for this session.
        </Alert>
      )}

      {!selectedSession && (
        <Alert severity="info">
          Please select a training session to mark attendance.
        </Alert>
      )}
    </Container>
  );
};

export default Attendance;
