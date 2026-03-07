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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  PhotoCamera as PhotoIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import trainingService from '../../../services/training.service';

const EnrollmentsList = () => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [photoConsentDialog, setPhotoConsentDialog] = useState({ open: false, enrollment: null });

  useEffect(() => {
    fetchEnrollments();
  }, [filterStatus]);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const params = { limit: 100 };
      if (filterStatus !== 'all') {
        params.status = filterStatus;
      }
      const response = await trainingService.enrollments.getAllEnrollments(params);
      setEnrollments(response.data?.enrollments || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load enrollments');
      console.error('Error fetching enrollments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await trainingService.enrollments.approveEnrollment(id);
      fetchEnrollments();
    } catch (err) {
      alert('Failed to approve enrollment: ' + (err.message || 'Unknown error'));
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Are you sure you want to reject this enrollment?')) return;

    try {
      await trainingService.enrollments.rejectEnrollment(id);
      fetchEnrollments();
    } catch (err) {
      alert('Failed to reject enrollment: ' + (err.message || 'Unknown error'));
    }
  };

  const handlePhotoConsentUpdate = async () => {
    try {
      const { enrollment } = photoConsentDialog;
      await trainingService.enrollments.updatePhotoConsent(enrollment.id, !enrollment.photo_consent);
      setPhotoConsentDialog({ open: false, enrollment: null });
      fetchEnrollments();
    } catch (err) {
      alert('Failed to update photo consent: ' + (err.message || 'Unknown error'));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      case 'completed':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="600">
              Training Enrollments
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage participant enrollments and photo consent
            </Typography>
          </Box>
          <TextField
            select
            size="small"
            label="Filter by Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
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
        ) : enrollments.length === 0 ? (
          <Box p={4} textAlign="center">
            <Typography variant="h6" color="text.secondary">
              No enrollments found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {filterStatus !== 'all' ? `No ${filterStatus} enrollments` : 'No enrollments yet'}
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Participant</TableCell>
                  <TableCell>Session</TableCell>
                  <TableCell>Program</TableCell>
                  <TableCell>Enrolled Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Photo Consent</TableCell>
                  <TableCell>Certificate</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {enrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell>
                      {enrollment.Participant?.username || 'Unknown'}
                    </TableCell>
                    <TableCell>
                      {enrollment.Session?.session_name_en || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {enrollment.Session?.TrainingProgram?.title_en || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {new Date(enrollment.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={enrollment.status}
                        size="small"
                        color={getStatusColor(enrollment.status)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        {enrollment.photo_consent ? (
                          <Chip label="Yes" size="small" color="success" />
                        ) : (
                          <Chip label="No" size="small" color="default" />
                        )}
                        <IconButton
                          size="small"
                          onClick={() => setPhotoConsentDialog({ open: true, enrollment })}
                          color="primary"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {enrollment.certificate_issued ? (
                        <Chip label="Issued" size="small" color="success" />
                      ) : (
                        <Chip label="Not Issued" size="small" color="default" />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {enrollment.status === 'pending' && (
                        <>
                          <IconButton
                            size="small"
                            onClick={() => handleApprove(enrollment.id)}
                            color="success"
                            title="Approve"
                          >
                            <ApproveIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleReject(enrollment.id)}
                            color="error"
                            title="Reject"
                          >
                            <RejectIcon fontSize="small" />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Photo Consent Dialog */}
      <Dialog
        open={photoConsentDialog.open}
        onClose={() => setPhotoConsentDialog({ open: false, enrollment: null })}
      >
        <DialogTitle>Update Photo Consent</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Current status: {photoConsentDialog.enrollment?.photo_consent ? 'Consented' : 'Not Consented'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Do you want to {photoConsentDialog.enrollment?.photo_consent ? 'revoke' : 'grant'} photo consent for this participant?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setPhotoConsentDialog({ open: false, enrollment: null })}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePhotoConsentUpdate}
            variant="contained"
            sx={{ textTransform: 'none' }}
          >
            {photoConsentDialog.enrollment?.photo_consent ? 'Revoke Consent' : 'Grant Consent'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EnrollmentsList;
