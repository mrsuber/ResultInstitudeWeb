const db = require('../models');
const { Op } = require('sequelize');
const Project = db.Project;
const Task = db.Task;
const User = db.User;

// ==================== PROJECTS ====================

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const { status, owner_id } = req.query;
    const where = {};

    if (status) where.status = status;
    if (owner_id) where.owner_id = owner_id;

    const projects = await Project.findAll({
      where,
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'first_name', 'last_name', 'email', 'avatar_url']
        },
        {
          model: Task,
          as: 'tasks',
          attributes: ['id', 'status']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    // Add task statistics to each project
    const projectsWithStats = projects.map(project => {
      const tasks = project.tasks || [];
      const stats = {
        total: tasks.length,
        todo: tasks.filter(t => t.status === 'todo').length,
        in_progress: tasks.filter(t => t.status === 'in_progress').length,
        review: tasks.filter(t => t.status === 'review').length,
        done: tasks.filter(t => t.status === 'done').length
      };

      return {
        ...project.toJSON(),
        taskStats: stats
      };
    });

    res.json({
      success: true,
      data: projectsWithStats
    });
  } catch (error) {
    console.error('Get all projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
};

// Get single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'first_name', 'last_name', 'email', 'avatar_url']
        }
      ]
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
};

// Create new project
exports.createProject = async (req, res) => {
  try {
    const { name, description, status, priority, start_date, end_date, color } = req.body;

    const project = await Project.create({
      name,
      description,
      status: status || 'planning',
      priority: priority || 'medium',
      start_date,
      end_date,
      owner_id: req.user.id,
      color: color || '#6366f1'
    });

    const createdProject = await Project.findByPk(project.id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'first_name', 'last_name', 'email', 'avatar_url']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: createdProject
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status, priority, start_date, end_date, color } = req.body;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Only owner or admins can update
    if (project.owner_id !== req.user.id && req.user.role !== 'super_admin' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own projects'
      });
    }

    await project.update({
      name,
      description,
      status,
      priority,
      start_date,
      end_date,
      color
    });

    const updatedProject = await Project.findByPk(id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'first_name', 'last_name', 'email', 'avatar_url']
        }
      ]
    });

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Only owner or admins can delete
    if (project.owner_id !== req.user.id && req.user.role !== 'super_admin' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own projects'
      });
    }

    await project.destroy();

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
};

// ==================== TASKS ====================

// Get all tasks for a project
exports.getProjectTasks = async (req, res) => {
  try {
    const { project_id } = req.params;
    const { status, assigned_to } = req.query;

    const where = { project_id };
    if (status) where.status = status;
    if (assigned_to) where.assigned_to = assigned_to;

    const tasks = await Task.findAll({
      where,
      include: [
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'first_name', 'last_name', 'email', 'avatar_url']
        },
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'first_name', 'last_name']
        }
      ],
      order: [['order_index', 'ASC'], ['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error('Get project tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tasks',
      error: error.message
    });
  }
};

// Create new task
exports.createTask = async (req, res) => {
  try {
    const {
      project_id,
      title,
      description,
      status,
      priority,
      assigned_to,
      due_date,
      tags,
      estimated_hours
    } = req.body;

    // Verify project exists
    const project = await Project.findByPk(project_id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Get the highest order_index for the project
    const maxOrder = await Task.max('order_index', { where: { project_id } }) || 0;

    const task = await Task.create({
      project_id,
      title,
      description,
      status: status || 'todo',
      priority: priority || 'medium',
      assigned_to,
      due_date,
      tags,
      estimated_hours,
      order_index: maxOrder + 1,
      created_by: req.user.id
    });

    const createdTask = await Task.findByPk(task.id, {
      include: [
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'first_name', 'last_name', 'email', 'avatar_url']
        },
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'first_name', 'last_name']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: createdTask
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating task',
      error: error.message
    });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      status,
      priority,
      assigned_to,
      due_date,
      tags,
      estimated_hours,
      actual_hours,
      order_index
    } = req.body;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    await task.update({
      title,
      description,
      status,
      priority,
      assigned_to,
      due_date,
      tags,
      estimated_hours,
      actual_hours,
      order_index
    });

    const updatedTask = await Task.findByPk(id, {
      include: [
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'first_name', 'last_name', 'email', 'avatar_url']
        },
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'first_name', 'last_name']
        }
      ]
    });

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating task',
      error: error.message
    });
  }
};

// Update task status (for drag and drop)
exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, order_index } = req.body;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    await task.update({ status, order_index });

    res.json({
      success: true,
      message: 'Task status updated successfully',
      data: task
    });
  } catch (error) {
    console.error('Update task status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating task status',
      error: error.message
    });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    await task.destroy();

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting task',
      error: error.message
    });
  }
};
