const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// All user routes require authentication
router.use(authenticateToken);

// Get user statistics (admin only)
router.get('/stats', userController.getUserStats);

// Get all users with pagination and filters
router.get('/', userController.getAllUsers);

// Get single user by ID
router.get('/:id', userController.getUserById);

// Create new user (admin only)
router.post('/', userController.createUser);

// Update user
router.put('/:id', userController.updateUser);

// Update user password
router.put('/:id/password', userController.updatePassword);

// Delete user (soft delete - admin only)
router.delete('/:id', userController.deleteUser);

module.exports = router;
