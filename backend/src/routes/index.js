const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const trainingRoutes = require('./training.routes');
const userRoutes = require('./user.routes');
const analyticsRoutes = require('./analytics.routes');
const attendanceRoutes = require('./attendance.routes');
const blogRoutes = require('./blog.routes');
const projectRoutes = require('./project.routes');
const uploadRoutes = require('./upload.routes');

// API routes
router.use('/auth', authRoutes);
router.use('/trainings', trainingRoutes);
router.use('/users', userRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/blog', blogRoutes);
router.use('/projects', projectRoutes);
router.use('/upload', uploadRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Result Institute API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
