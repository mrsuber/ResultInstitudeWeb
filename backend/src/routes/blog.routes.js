const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// Public routes (no authentication required)
router.get('/posts', blogController.getAllPosts);
router.get('/posts/:identifier', blogController.getPostByIdOrSlug);
router.get('/categories', blogController.getCategories);
router.get('/featured', blogController.getFeaturedPosts);

// Protected routes (authentication required)
router.post('/posts', authenticateToken, blogController.createPost);
router.put('/posts/:id', authenticateToken, blogController.updatePost);
router.delete('/posts/:id', authenticateToken, blogController.deletePost);
router.post('/posts/:id/publish', authenticateToken, blogController.publishPost);

module.exports = router;
