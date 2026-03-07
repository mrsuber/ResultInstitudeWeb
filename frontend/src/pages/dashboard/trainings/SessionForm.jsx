import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Alert,
  CircularProgress,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from '@mui/icons-material';
import trainingService from '../../../services/training.service';

const SessionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [programs, setPrograms] = useState([]);

  const [formData, setFormData] = useState({
    program_id: '',
    session_name_en: '',
    session_name_fr: '',
    description_en: '',
    description_fr: '',
    start_date: '',
    end_date: '',
    location_type: 'physical',
    location_city: '',
    location_address: '',
    online_platform: '',
    meeting_url: '',
    max_participants: '',
    registration_deadline: '',
    fee_amount: '',
    is_public: false,
  });

  useEffect(() => {
    fetchPrograms();
    if (isEditMode) {
      fetchSession();
    }
  }, [id]);

  const fetchPrograms = async () => {
    try {
      const response = await trainingService.programs.getAllPrograms({ limit: 100 });
      setPrograms(response.data?.programs || []);
    } catch (err) {
      console.error('Error fetching programs:', err);
    }
  };

  const fetchSession = async () => {
    try {
      setLoading(true);
      const response = await trainingService.sessions.getSessionById(id);
      const session = response.data;

      // Format dates for input fields
      setFormData({
        ...session,
        start_date: session.start_date ? session.start_date.split('T')[0] : '',
        end_date: session.end_date ? session.end_date.split('T')[0] : '',
        registration_deadline: session.registration_deadline ? session.registration_deadline.split('T')[0] : '',
      });
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load session');
      console.error('Error fetching session:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      if (isEditMode) {
        await trainingService.sessions.updateSession(id, formData);
      } else {
        await trainingService.sessions.createSession(formData);
      }
      setSuccess(true);
      setTimeout(() => navigate('/trainings/sessions'), 1500);
    } catch (err) {
      setError(err.message || 'Failed to save session');
      console.error('Error saving session:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/trainings/sessions')}
            sx={{ textTransform: 'none' }}
          >
            Back
          </Button>
          <Box>
            <Typography variant="h4" fontWeight="600">
              {isEditMode ? 'Edit Training Session' : 'Create Training Session'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {isEditMode ? 'Update session details' : 'Schedule a new training session'}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Session {isEditMode ? 'updated' : 'created'} successfully! Redirecting...
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Program Selection */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                select
                label="Training Program"
                name="program_id"
                value={formData.program_id}
                onChange={handleChange}
                disabled={isEditMode}
              >
                {programs.map((program) => (
                  <MenuItem key={program.id} value={program.id}>
                    {program.title_en}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* English Session Name */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Session Name (English)"
                name="session_name_en"
                value={formData.session_name_en}
                onChange={handleChange}
                placeholder="e.g., Spring 2026 Cohort"
              />
            </Grid>

            {/* French Session Name */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Session Name (French)"
                name="session_name_fr"
                value={formData.session_name_fr}
                onChange={handleChange}
                placeholder="e.g., Cohorte Printemps 2026"
              />
            </Grid>

            {/* Start Date */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                type="date"
                label="Start Date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* End Date */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                type="date"
                label="End Date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Registration Deadline */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                type="date"
                label="Registration Deadline"
                name="registration_deadline"
                value={formData.registration_deadline}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Location Type */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                select
                label="Location Type"
                name="location_type"
                value={formData.location_type}
                onChange={handleChange}
              >
                <MenuItem value="physical">Physical</MenuItem>
                <MenuItem value="online">Online</MenuItem>
                <MenuItem value="hybrid">Hybrid</MenuItem>
              </TextField>
            </Grid>

            {/* Max Participants */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                type="number"
                label="Max Participants"
                name="max_participants"
                value={formData.max_participants}
                onChange={handleChange}
                inputProps={{ min: 1 }}
              />
            </Grid>

            {/* Fee Amount */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Fee Amount (USD)"
                name="fee_amount"
                value={formData.fee_amount}
                onChange={handleChange}
                inputProps={{ min: 0, step: 0.01 }}
                placeholder="0.00"
              />
            </Grid>

            {/* Physical Location Fields */}
            {(formData.location_type === 'physical' || formData.location_type === 'hybrid') && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required={formData.location_type === 'physical'}
                    label="City"
                    name="location_city"
                    value={formData.location_city}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required={formData.location_type === 'physical'}
                    label="Address"
                    name="location_address"
                    value={formData.location_address}
                    onChange={handleChange}
                  />
                </Grid>
              </>
            )}

            {/* Online Fields */}
            {(formData.location_type === 'online' || formData.location_type === 'hybrid') && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required={formData.location_type === 'online'}
                    label="Online Platform"
                    name="online_platform"
                    value={formData.online_platform}
                    onChange={handleChange}
                    placeholder="e.g., Zoom, Google Meet"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Meeting URL"
                    name="meeting_url"
                    value={formData.meeting_url}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </Grid>
              </>
            )}

            {/* English Description */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description (English)"
                name="description_en"
                value={formData.description_en}
                onChange={handleChange}
                placeholder="Additional details about this session..."
              />
            </Grid>

            {/* French Description */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description (French)"
                name="description_fr"
                value={formData.description_fr}
                onChange={handleChange}
                placeholder="Additional details about this session..."
              />
            </Grid>

            {/* Public Toggle */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.is_public}
                    onChange={handleChange}
                    name="is_public"
                  />
                }
                label="Make Public (visible on website for registration)"
              />
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={() => navigate('/trainings/sessions')}
                  disabled={submitting}
                  sx={{ textTransform: 'none' }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={submitting}
                  sx={{ textTransform: 'none' }}
                >
                  {submitting ? 'Saving...' : isEditMode ? 'Update Session' : 'Create Session'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default SessionForm;
