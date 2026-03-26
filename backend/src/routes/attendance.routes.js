const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// All attendance routes require authentication
router.use(authenticateToken);

// Mark attendance for multiple users
router.post('/mark', attendanceController.markAttendance);

// Get attendance for a specific session
router.get('/session/:session_id', attendanceController.getSessionAttendance);

// Get attendance for a specific user
router.get('/user/:user_id', attendanceController.getUserAttendance);

// Get attendance statistics for a session
router.get('/session/:session_id/statistics', attendanceController.getSessionStatistics);

// Get enrolled users for attendance marking
router.get('/session/:session_id/enrolled-users', attendanceController.getEnrolledUsers);

// Update single attendance record
router.put('/:id', attendanceController.updateAttendance);

// Delete attendance record
router.delete('/:id', attendanceController.deleteAttendance);

module.exports = router;
