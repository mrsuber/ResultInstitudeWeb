const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// All analytics routes require authentication
router.use(authenticateToken);

// Overview statistics
router.get('/overview', analyticsController.getOverviewStats);

// Enrollment trends
router.get('/enrollment-trends', analyticsController.getEnrollmentTrends);

// Program distribution by category
router.get('/program-distribution', analyticsController.getProgramDistribution);

// Enrollment status breakdown
router.get('/enrollment-status', analyticsController.getEnrollmentStatusBreakdown);

// Top programs by enrollment
router.get('/top-programs', analyticsController.getTopPrograms);

// User growth over time
router.get('/user-growth', analyticsController.getUserGrowth);

// Completion rates
router.get('/completion-rates', analyticsController.getCompletionRates);

module.exports = router;
