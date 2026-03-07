const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const trainingRoutes = require('./training.routes');

// API routes
router.use('/auth', authRoutes);
router.use('/trainings', trainingRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Result Institute API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
