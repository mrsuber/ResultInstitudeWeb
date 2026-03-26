const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const { uploadSingle, uploadMultiple } = require('../middleware/upload.middleware');
const { authenticateToken } = require('../middleware/auth.middleware');

// All upload routes require authentication
router.use(authenticateToken);

// Upload routes
router.post('/single/:type', uploadSingle, uploadController.uploadSingle);
router.post('/multiple/:type', uploadMultiple, uploadController.uploadMultiple);

// File management routes
router.get('/:type/:filename', uploadController.getFileInfo);
router.delete('/:type/:filename', uploadController.deleteFile);

module.exports = router;
