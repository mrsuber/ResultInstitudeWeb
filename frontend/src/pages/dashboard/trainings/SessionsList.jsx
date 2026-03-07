import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import trainingService from '../../../services/training.service';

const SessionsList = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await trainingService.sessions.getAllSessions({ limit: 50 });
      setSessions(response.data?.sessions || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load sessions');
      console.error('Error fetching sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this session?')) return;

    try {
      await trainingService.sessions.deleteSession(id);
      fetchSessions();
    } catch (err) {
      alert('Failed to delete session: ' + (err.message || 'Unknown error'));
    }
  };

  const handlePublish = async (id) => {
    try {
      await trainingService.sessions.publishSession(id);
      fetchSessions();
    } catch (err) {
      alert('Failed to publish session: ' + (err.message || 'Unknown error'));
    }
  };

  return (
    <Box>
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="600">
              Training Sessions
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Schedule and manage training sessions
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/trainings/sessions/create')}
            sx={{ textTransform: 'none' }}
          >
            Create Session
          </Button>
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={2}>
        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : sessions.length === 0 ? (
          <Box p={4} textAlign="center">
            <Typography variant="h6" color="text.secondary">
              No sessions found
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/trainings/sessions/create')}
              sx={{ mt: 2, textTransform: 'none' }}
            >
              Create Your First Session
            </Button>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Session Name (EN)</TableCell>
                  <TableCell>Dates</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Enrollment</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Public</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>{session.session_name_en}</TableCell>
                    <TableCell>
                      {session.start_date} to {session.end_date}
                    </TableCell>
                    <TableCell>
                      <Chip label={session.location_type} size="small" />
                      {session.location_city && ` - ${session.location_city}`}
                    </TableCell>
                    <TableCell>
                      {session.current_enrollment} / {session.max_participants}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={session.status}
                        size="small"
                        color={
                          session.status === 'ongoing'
                            ? 'success'
                            : session.status === 'completed'
                            ? 'info'
                            : 'default'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      {session.is_public ? (
                        <Chip label="Public" size="small" color="success" />
                      ) : (
                        <Chip label="Private" size="small" />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => navigate(`/trainings/sessions/edit/${session.id}`)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      {!session.is_public && (
                        <IconButton size="small" onClick={() => handlePublish(session.id)} color="primary">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      )}
                      <IconButton size="small" onClick={() => handleDelete(session.id)} color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default SessionsList;
