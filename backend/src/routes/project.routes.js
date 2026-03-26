const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// All project routes require authentication
router.use(authenticateToken);

// Project routes
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

// Task routes
router.get('/:project_id/tasks', projectController.getProjectTasks);
router.post('/tasks', projectController.createTask);
router.put('/tasks/:id', projectController.updateTask);
router.patch('/tasks/:id/status', projectController.updateTaskStatus);
router.delete('/tasks/:id', projectController.deleteTask);

module.exports = router;
