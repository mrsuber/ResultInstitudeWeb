import { useState, useEffect } from 'react';
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
  TablePagination,
  Chip,
  IconButton,
  Alert,
  CircularProgress,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  People as PeopleIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import userService from '../../services/user.service';

const Users = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Dialog states
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: 'participant',
    phone: '',
    bio: '',
    status: 'active',
  });

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage, searchTerm, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {
        page: page + 1,
        limit: rowsPerPage,
        search: searchTerm,
        role: roleFilter,
        status: statusFilter,
      };
      const response = await userService.getAllUsers(params);
      setUsers(response.data || []);
      setTotalUsers(response.pagination?.total || 0);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        email: user.email,
        password: '',
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        phone: user.phone || '',
        bio: user.bio || '',
        status: user.status,
      });
    } else {
      setEditingUser(null);
      setFormData({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        role: 'participant',
        phone: '',
        bio: '',
        status: 'active',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
    setFormData({
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      role: 'participant',
      phone: '',
      bio: '',
      status: 'active',
    });
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      if (editingUser) {
        // Update user - don't send password if empty
        const updateData = { ...formData };
        if (!updateData.password) {
          delete updateData.password;
        }
        await userService.updateUser(editingUser.id, updateData);
        setSuccess('User updated successfully');
      } else {
        // Create user - password is required
        if (!formData.password) {
          setError('Password is required for new users');
          return;
        }
        await userService.createUser(formData);
        setSuccess('User created successfully');
      }
      handleCloseDialog();
      fetchUsers();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save user');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user? This will set their status to inactive.')) return;

    try {
      await userService.deleteUser(id);
      setSuccess('User deleted successfully');
      fetchUsers();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete user');
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'super_admin':
        return 'error';
      case 'admin':
        return 'warning';
      case 'trainer':
        return 'info';
      case 'participant':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      case 'suspended':
        return 'error';
      default:
        return 'default';
    }
  };

  const isAdmin = currentUser?.role === 'super_admin' || currentUser?.role === 'admin';

  return (
    <Box>
      {/* Header */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: '#eef2ff', borderRadius: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: '#6366f1', width: 56, height: 56 }}>
              <PeopleIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" gutterBottom fontWeight="600" sx={{ mb: 0.5 }}>
                Users Management
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage users, roles, and permissions
              </Typography>
            </Box>
          </Box>
          {isAdmin && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{
                textTransform: 'none',
                bgcolor: '#6366f1',
                '&:hover': { bgcolor: '#4f46e5' },
              }}
            >
              Add User
            </Button>
          )}
        </Box>
      </Paper>

      {/* Alerts */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      {/* Filters */}
      <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid #e5e7eb' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Role</InputLabel>
              <Select
                value={roleFilter}
                label="Role"
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setPage(0);
                }}
              >
                <MenuItem value="">All Roles</MenuItem>
                <MenuItem value="super_admin">Super Admin</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="trainer">Trainer</MenuItem>
                <MenuItem value="participant">Participant</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(0);
                }}
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="suspended">Suspended</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Users Table */}
      <Paper elevation={0} sx={{ border: '1px solid #e5e7eb' }}>
        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : users.length === 0 ? (
          <Box p={4} textAlign="center">
            <PeopleIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No users found
            </Typography>
            {isAdmin && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
                sx={{ mt: 2, textTransform: 'none', bgcolor: '#6366f1' }}
              >
                Add Your First User
              </Button>
            )}
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: '#f9fafb' }}>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Last Login</TableCell>
                    {isAdmin && <TableCell align="right">Actions</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar sx={{ bgcolor: '#6366f1' }}>
                            {user.first_name?.[0]}{user.last_name?.[0]}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="600">
                              {user.first_name} {user.last_name}
                            </Typography>
                            {user.bio && (
                              <Typography variant="caption" color="text.secondary">
                                {user.bio.substring(0, 40)}...
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.role.replace('_', ' ')}
                          size="small"
                          color={getRoleColor(user.role)}
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell>{user.phone || '-'}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.status}
                          size="small"
                          color={getStatusColor(user.status)}
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell>
                        {user.last_login_at
                          ? new Date(user.last_login_at).toLocaleDateString()
                          : 'Never'}
                      </TableCell>
                      {isAdmin && (
                        <TableCell align="right">
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              onClick={() => handleOpenDialog(user)}
                              sx={{ color: '#6366f1' }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          {currentUser.id !== user.id && (
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                onClick={() => handleDelete(user.id)}
                                color="error"
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={totalUsers}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>

      {/* Create/Edit User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="600">
              {editingUser ? 'Edit User' : 'Create New User'}
            </Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                required
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                required
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!!editingUser && currentUser.role !== 'super_admin'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                required={!editingUser}
                placeholder={editingUser ? 'Leave blank to keep current password' : ''}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Role</InputLabel>
                <Select
                  value={formData.role}
                  label="Role"
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  {currentUser.role === 'super_admin' && (
                    <MenuItem value="super_admin">Super Admin</MenuItem>
                  )}
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="trainer">Trainer</MenuItem>
                  <MenuItem value="participant">Participant</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="suspended">Suspended</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                multiline
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ bgcolor: '#6366f1', '&:hover': { bgcolor: '#4f46e5' } }}
          >
            {editingUser ? 'Update User' : 'Create User'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
