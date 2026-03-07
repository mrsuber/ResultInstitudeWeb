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

const ProgramForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title_en: '',
    title_fr: '',
    description_en: '',
    description_fr: '',
    category: '',
    level: 'beginner',
    duration_hours: '',
    prerequisites_en: '',
    prerequisites_fr: '',
    objectives_en: '',
    objectives_fr: '',
    target_audience_en: '',
    target_audience_fr: '',
    is_public: false,
    show_on_homepage: false,
  });

  useEffect(() => {
    if (isEditMode) {
      fetchProgram();
    }
  }, [id]);

  const fetchProgram = async () => {
    try {
      setLoading(true);
      const response = await trainingService.programs.getProgramById(id);
      setFormData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load program');
      console.error('Error fetching program:', err);
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
        await trainingService.programs.updateProgram(id, formData);
      } else {
        await trainingService.programs.createProgram(formData);
      }
      setSuccess(true);
      setTimeout(() => navigate('/trainings/programs'), 1500);
    } catch (err) {
      setError(err.message || 'Failed to save program');
      console.error('Error saving program:', err);
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
            onClick={() => navigate('/trainings/programs')}
            sx={{ textTransform: 'none' }}
          >
            Back
          </Button>
          <Box>
            <Typography variant="h4" fontWeight="600">
              {isEditMode ? 'Edit Training Program' : 'Create Training Program'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {isEditMode ? 'Update program details' : 'Add a new training program'}
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
          Program {isEditMode ? 'updated' : 'created'} successfully! Redirecting...
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* English Title */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Title (English)"
                name="title_en"
                value={formData.title_en}
                onChange={handleChange}
              />
            </Grid>

            {/* French Title */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Title (French)"
                name="title_fr"
                value={formData.title_fr}
                onChange={handleChange}
              />
            </Grid>

            {/* Category */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Leadership, Technical, Soft Skills"
              />
            </Grid>

            {/* Level */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                select
                label="Level"
                name="level"
                value={formData.level}
                onChange={handleChange}
              >
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
                <MenuItem value="expert">Expert</MenuItem>
              </TextField>
            </Grid>

            {/* Duration */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                type="number"
                label="Duration (hours)"
                name="duration_hours"
                value={formData.duration_hours}
                onChange={handleChange}
                inputProps={{ min: 1 }}
              />
            </Grid>

            {/* English Description */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                multiline
                rows={4}
                label="Description (English)"
                name="description_en"
                value={formData.description_en}
                onChange={handleChange}
              />
            </Grid>

            {/* French Description */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                multiline
                rows={4}
                label="Description (French)"
                name="description_fr"
                value={formData.description_fr}
                onChange={handleChange}
              />
            </Grid>

            {/* English Prerequisites */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Prerequisites (English)"
                name="prerequisites_en"
                value={formData.prerequisites_en}
                onChange={handleChange}
                placeholder="List any prerequisites..."
              />
            </Grid>

            {/* French Prerequisites */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Prerequisites (French)"
                name="prerequisites_fr"
                value={formData.prerequisites_fr}
                onChange={handleChange}
                placeholder="List any prerequisites..."
              />
            </Grid>

            {/* English Objectives */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Learning Objectives (English)"
                name="objectives_en"
                value={formData.objectives_en}
                onChange={handleChange}
                placeholder="List learning objectives..."
              />
            </Grid>

            {/* French Objectives */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Learning Objectives (French)"
                name="objectives_fr"
                value={formData.objectives_fr}
                onChange={handleChange}
                placeholder="List learning objectives..."
              />
            </Grid>

            {/* English Target Audience */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Target Audience (English)"
                name="target_audience_en"
                value={formData.target_audience_en}
                onChange={handleChange}
                placeholder="Who should attend..."
              />
            </Grid>

            {/* French Target Audience */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Target Audience (French)"
                name="target_audience_fr"
                value={formData.target_audience_fr}
                onChange={handleChange}
                placeholder="Who should attend..."
              />
            </Grid>

            {/* Public Toggle */}
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.is_public}
                    onChange={handleChange}
                    name="is_public"
                  />
                }
                label="Make Public (visible on website)"
              />
            </Grid>

            {/* Homepage Toggle */}
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.show_on_homepage}
                    onChange={handleChange}
                    name="show_on_homepage"
                  />
                }
                label="Show on Homepage"
              />
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={() => navigate('/trainings/programs')}
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
                  {submitting ? 'Saving...' : isEditMode ? 'Update Program' : 'Create Program'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ProgramForm;
