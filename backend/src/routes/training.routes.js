const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth.middleware');

// Controllers
const programController = require('../controllers/trainingProgram.controller');
const sessionController = require('../controllers/trainingSession.controller');
const enrollmentController = require('../controllers/enrollment.controller');

// ============================================================
// TRAINING PROGRAMS ROUTES
// ============================================================

// Admin/Trainer routes (protected)
router.post(
  '/programs',
  authenticate,
  authorize(['super_admin', 'admin']),
  programController.createProgram
);

router.get(
  '/programs',
  authenticate,
  authorize(['super_admin', 'admin', 'trainer']),
  programController.getAllPrograms
);

router.get(
  '/programs/:id',
  authenticate,
  authorize(['super_admin', 'admin', 'trainer']),
  programController.getProgramById
);

router.put(
  '/programs/:id',
  authenticate,
  authorize(['super_admin', 'admin']),
  programController.updateProgram
);

router.delete(
  '/programs/:id',
  authenticate,
  authorize(['super_admin', 'admin']),
  programController.deleteProgram
);

router.post(
  '/programs/:id/publish',
  authenticate,
  authorize(['super_admin', 'admin']),
  programController.publishProgram
);

// Public routes (no auth required)
router.get('/public/programs', programController.getPublicPrograms);
router.get('/public/programs/:slug', programController.getPublicProgramBySlug);

// ============================================================
// TRAINING SESSIONS ROUTES
// ============================================================

// Admin/Trainer routes (protected)
router.post(
  '/sessions',
  authenticate,
  authorize(['super_admin', 'admin']),
  sessionController.createSession
);

router.get(
  '/sessions',
  authenticate,
  authorize(['super_admin', 'admin', 'trainer']),
  sessionController.getAllSessions
);

router.get(
  '/sessions/:id',
  authenticate,
  authorize(['super_admin', 'admin', 'trainer']),
  sessionController.getSessionById
);

router.put(
  '/sessions/:id',
  authenticate,
  authorize(['super_admin', 'admin']),
  sessionController.updateSession
);

router.delete(
  '/sessions/:id',
  authenticate,
  authorize(['super_admin', 'admin']),
  sessionController.deleteSession
);

router.post(
  '/sessions/:session_id/trainers',
  authenticate,
  authorize(['super_admin', 'admin']),
  sessionController.assignTrainer
);

router.delete(
  '/sessions/:session_id/trainers/:trainer_id',
  authenticate,
  authorize(['super_admin', 'admin']),
  sessionController.removeTrainer
);

router.post(
  '/sessions/:id/publish',
  authenticate,
  authorize(['super_admin', 'admin']),
  sessionController.publishSession
);

// Public routes (no auth required)
router.get('/public/sessions', sessionController.getPublicSessions);

// ============================================================
// ENROLLMENTS ROUTES
// ============================================================

// Admin routes
router.get(
  '/enrollments',
  authenticate,
  authorize(['super_admin', 'admin', 'trainer']),
  enrollmentController.getAllEnrollments
);

router.get(
  '/enrollments/:id',
  authenticate,
  authorize(['super_admin', 'admin', 'trainer']),
  enrollmentController.getEnrollmentById
);

router.put(
  '/enrollments/:id/approve',
  authenticate,
  authorize(['super_admin', 'admin']),
  enrollmentController.approveEnrollment
);

router.put(
  '/enrollments/:id/reject',
  authenticate,
  authorize(['super_admin', 'admin']),
  enrollmentController.rejectEnrollment
);

router.post(
  '/enrollments/:id/certificate',
  authenticate,
  authorize(['super_admin', 'admin']),
  enrollmentController.issueCertificate
);

// Participant routes
router.post(
  '/enrollments',
  authenticate,
  enrollmentController.createEnrollment
);

router.get(
  '/my-enrollments',
  authenticate,
  enrollmentController.getMyEnrollments
);

router.put(
  '/enrollments/:id/consent',
  authenticate,
  enrollmentController.updatePhotoConsent
);

router.delete(
  '/enrollments/:id',
  authenticate,
  enrollmentController.withdrawEnrollment
);

module.exports = router;
