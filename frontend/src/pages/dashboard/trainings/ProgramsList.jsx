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

const ProgramsList = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await trainingService.programs.getAllPrograms({ limit: 50 });
      setPrograms(response.data?.programs || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load programs');
      console.error('Error fetching programs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this program?')) return;

    try {
      await trainingService.programs.deleteProgram(id);
      fetchPrograms();
    } catch (err) {
      alert('Failed to delete program: ' + (err.message || 'Unknown error'));
    }
  };

  const handlePublish = async (id) => {
    try {
      await trainingService.programs.publishProgram(id);
      fetchPrograms();
    } catch (err) {
      alert('Failed to publish program: ' + (err.message || 'Unknown error'));
    }
  };

  return (
    <Box>
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="600">
              Training Programs
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your training programs
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/trainings/programs/create')}
            sx={{ textTransform: 'none' }}
          >
            Create Program
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
        ) : programs.length === 0 ? (
          <Box p={4} textAlign="center">
            <Typography variant="h6" color="text.secondary">
              No programs found
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/trainings/programs/create')}
              sx={{ mt: 2, textTransform: 'none' }}
            >
              Create Your First Program
            </Button>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title (EN)</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Public</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {programs.map((program) => (
                  <TableRow key={program.id}>
                    <TableCell>{program.title_en}</TableCell>
                    <TableCell>
                      <Chip label={program.category} size="small" />
                    </TableCell>
                    <TableCell>{program.level}</TableCell>
                    <TableCell>{program.duration_hours}h</TableCell>
                    <TableCell>
                      <Chip
                        label={program.status}
                        size="small"
                        color={program.status === 'published' ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      {program.is_public ? (
                        <Chip label="Public" size="small" color="success" />
                      ) : (
                        <Chip label="Private" size="small" />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => navigate(`/trainings/programs/edit/${program.id}`)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      {!program.is_public && (
                        <IconButton size="small" onClick={() => handlePublish(program.id)} color="primary">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      )}
                      <IconButton size="small" onClick={() => handleDelete(program.id)} color="error">
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

export default ProgramsList;
