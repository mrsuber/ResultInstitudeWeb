import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardActions,
  Stack,
  Tooltip,
  Select,
  FormControl,
  InputLabel,
  Menu
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  MoreVert,
  Assignment,
  Circle
} from '@mui/icons-material';
import * as projectService from '../../services/project.service';
import { useAuth } from '../../context/AuthContext';

const TASK_STATUSES = ['todo', 'in_progress', 'review', 'done'];
const STATUS_LABELS = {
  todo: 'To Do',
  in_progress: 'In Progress',
  review: 'Review',
  done: 'Done'
};

const STATUS_COLORS = {
  todo: '#9CA3AF',
  in_progress: '#3B82F6',
  review: '#F59E0B',
  done: '#10B981'
};

const PRIORITY_COLORS = {
  low: 'info',
  medium: 'warning',
  high: 'error'
};

const Projects = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [openProjectDialog, setOpenProjectDialog] = useState(false);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    status: 'active',
    priority: 'medium',
    start_date: '',
    end_date: '',
    color: '#6366f1'
  });
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    assigned_to: '',
    due_date: '',
    estimated_hours: '',
    tags: ''
  });

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      loadTasks();
    }
  }, [selectedProject]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await projectService.getAllProjects();
      if (response.success) {
        setProjects(response.data);
        if (response.data.length > 0 && !selectedProject) {
          setSelectedProject(response.data[0]);
        }
      }
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadTasks = async () => {
    if (!selectedProject) return;

    try {
      setLoading(true);
      const response = await projectService.getProjectTasks(selectedProject.id);
      if (response.success) {
        setTasks(response.data);
      }
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenProjectDialog = (project = null) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({
        name: project.name,
        description: project.description || '',
        status: project.status,
        priority: project.priority,
        start_date: project.start_date?.split('T')[0] || '',
        end_date: project.end_date?.split('T')[0] || '',
        color: project.color || '#6366f1'
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        name: '',
        description: '',
        status: 'active',
        priority: 'medium',
        start_date: '',
        end_date: '',
        color: '#6366f1'
      });
    }
    setOpenProjectDialog(true);
  };

  const handleOpenTaskDialog = (task = null) => {
    if (task) {
      setEditingTask(task);
      setTaskForm({
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
        assigned_to: task.assigned_to || '',
        due_date: task.due_date?.split('T')[0] || '',
        estimated_hours: task.estimated_hours || '',
        tags: Array.isArray(task.tags) ? task.tags.join(', ') : ''
      });
    } else {
      setEditingTask(null);
      setTaskForm({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        assigned_to: '',
        due_date: '',
        estimated_hours: '',
        tags: ''
      });
    }
    setOpenTaskDialog(true);
  };

  const handleSaveProject = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      let response;
      if (editingProject) {
        response = await projectService.updateProject(editingProject.id, projectForm);
      } else {
        response = await projectService.createProject(projectForm);
      }

      if (response.success) {
        setSuccess(editingProject ? 'Project updated!' : 'Project created!');
        setOpenProjectDialog(false);
        loadProjects();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTask = async () => {
    if (!selectedProject) return;

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const taskData = {
        ...taskForm,
        tags: taskForm.tags ? taskForm.tags.split(',').map(t => t.trim()) : []
      };

      let response;
      if (editingTask) {
        response = await projectService.updateTask(selectedProject.id, editingTask.id, taskData);
      } else {
        response = await projectService.createTask(selectedProject.id, taskData);
      }

      if (response.success) {
        setSuccess(editingTask ? 'Task updated!' : 'Task created!');
        setOpenTaskDialog(false);
        loadTasks();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      setLoading(true);
      const response = await projectService.deleteProject(projectId);
      if (response.success) {
        setSuccess('Project deleted!');
        loadProjects();
        if (selectedProject?.id === projectId) {
          setSelectedProject(null);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete project');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    if (!selectedProject) return;

    try {
      setLoading(true);
      const response = await projectService.deleteTask(selectedProject.id, taskId);
      if (response.success) {
        setSuccess('Task deleted!');
        loadTasks();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskStatusChange = async (taskId, newStatus) => {
    if (!selectedProject) return;

    try {
      const response = await projectService.updateTaskStatus(selectedProject.id, taskId, {
        status: newStatus
      });
      if (response.success) {
        loadTasks();
      }
    } catch (err) {
      setError('Failed to update task status');
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Project Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kanban board for task management
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Add />}
            onClick={() => handleOpenProjectDialog()}
          >
            New Project
          </Button>
          {selectedProject && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => handleOpenTaskDialog()}
            >
              New Task
            </Button>
          )}
        </Stack>
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

      {/* Project Selection */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Select Project</InputLabel>
              <Select
                value={selectedProject?.id || ''}
                onChange={(e) => {
                  const project = projects.find(p => p.id === e.target.value);
                  setSelectedProject(project);
                }}
                label="Select Project"
              >
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Circle sx={{ fontSize: 12, color: project.color }} />
                      {project.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {selectedProject && (
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => handleOpenProjectDialog(selectedProject)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDeleteProject(selectedProject.id)}
                >
                  Delete
                </Button>
              </Stack>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* Kanban Board */}
      {selectedProject ? (
        <Grid container spacing={3}>
          {TASK_STATUSES.map((status) => (
            <Grid item xs={12} md={3} key={status}>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: '#F9FAFB',
                  border: '1px solid #E5E7EB',
                  minHeight: 400
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Circle sx={{ fontSize: 12, color: STATUS_COLORS[status] }} />
                    {STATUS_LABELS[status]}
                  </Typography>
                  <Chip
                    label={getTasksByStatus(status).length}
                    size="small"
                    sx={{ bgcolor: STATUS_COLORS[status], color: 'white' }}
                  />
                </Box>

                <Stack spacing={2}>
                  {getTasksByStatus(status).map((task) => (
                    <Card key={task.id} sx={{ cursor: 'pointer', '&:hover': { boxShadow: 3 } }}>
                      <CardContent sx={{ pb: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {task.title}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenTaskDialog(task)}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Box>
                        {task.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {task.description.substring(0, 100)}
                            {task.description.length > 100 ? '...' : ''}
                          </Typography>
                        )}
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                          <Chip
                            label={task.priority}
                            size="small"
                            color={PRIORITY_COLORS[task.priority]}
                          />
                          {task.due_date && (
                            <Chip
                              label={new Date(task.due_date).toLocaleDateString()}
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </Box>
                        {task.tags && task.tags.length > 0 && (
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {task.tags.slice(0, 3).map((tag, idx) => (
                              <Chip key={idx} label={tag} size="small" variant="outlined" />
                            ))}
                          </Box>
                        )}
                      </CardContent>
                      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                        <FormControl size="small" fullWidth>
                          <Select
                            value={task.status}
                            onChange={(e) => handleTaskStatusChange(task.id, e.target.value)}
                            sx={{ fontSize: '0.875rem' }}
                          >
                            {TASK_STATUSES.map((s) => (
                              <MenuItem key={s} value={s}>
                                {STATUS_LABELS[s]}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </CardActions>
                    </Card>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert severity="info">
          {projects.length === 0
            ? 'No projects found. Create your first project to get started!'
            : 'Select a project to view its tasks.'}
        </Alert>
      )}

      {/* Project Dialog */}
      <Dialog open={openProjectDialog} onClose={() => setOpenProjectDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingProject ? 'Edit Project' : 'Create New Project'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Name"
                value={projectForm.name}
                onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Status"
                value={projectForm.status}
                onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                select
              >
                <MenuItem value="planning">Planning</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="on_hold">On Hold</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Priority"
                value={projectForm.priority}
                onChange={(e) => setProjectForm({ ...projectForm, priority: e.target.value })}
                select
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                value={projectForm.start_date}
                onChange={(e) => setProjectForm({ ...projectForm, start_date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                value={projectForm.end_date}
                onChange={(e) => setProjectForm({ ...projectForm, end_date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="color"
                label="Color"
                value={projectForm.color}
                onChange={(e) => setProjectForm({ ...projectForm, color: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProjectDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSaveProject}
            variant="contained"
            disabled={loading || !projectForm.name}
          >
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Task Dialog */}
      <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingTask ? 'Edit Task' : 'Create New Task'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Title"
                value={taskForm.title}
                onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={taskForm.description}
                onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Status"
                value={taskForm.status}
                onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
                select
              >
                {TASK_STATUSES.map((s) => (
                  <MenuItem key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Priority"
                value={taskForm.priority}
                onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                select
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Due Date"
                value={taskForm.due_date}
                onChange={(e) => setTaskForm({ ...taskForm, due_date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Estimated Hours"
                value={taskForm.estimated_hours}
                onChange={(e) => setTaskForm({ ...taskForm, estimated_hours: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tags (comma separated)"
                value={taskForm.tags}
                onChange={(e) => setTaskForm({ ...taskForm, tags: e.target.value })}
                placeholder="design, frontend, urgent"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTaskDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSaveTask}
            variant="contained"
            disabled={loading || !taskForm.title}
          >
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Projects;
