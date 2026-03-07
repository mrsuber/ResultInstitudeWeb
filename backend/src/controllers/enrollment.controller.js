const { Enrollment, TrainingSession, User } = require('../models');
const { Op } = require('sequelize');

// Create enrollment (participant enrolls in a session)
exports.createEnrollment = async (req, res) => {
  try {
    const { session_id, photo_consent = false } = req.body;
    const participant_id = req.user.id;

    // Check if session exists and has available spots
    const session = await TrainingSession.findByPk(session_id);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Training session not found'
      });
    }

    if (session.current_enrollment >= session.max_participants) {
      return res.status(400).json({
        success: false,
        message: 'Session is full'
      });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      where: { session_id, participant_id }
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this session'
      });
    }

    const enrollment = await Enrollment.create({
      session_id,
      participant_id,
      photo_consent,
      consent_date: photo_consent ? new Date() : null,
      status: 'pending'
    });

    // Increment current_enrollment count
    await session.increment('current_enrollment');

    res.status(201).json({
      success: true,
      message: 'Enrollment created successfully. Awaiting admin approval.',
      data: enrollment
    });
  } catch (error) {
    console.error('Error creating enrollment:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating enrollment',
      error: error.message
    });
  }
};

// Get all enrollments (admin)
exports.getAllEnrollments = async (req, res) => {
  try {
    const {
      session_id,
      status,
      participant_id,
      page = 1,
      limit = 10
    } = req.query;

    const where = {};

    if (session_id) where.session_id = session_id;
    if (status) where.status = status;
    if (participant_id) where.participant_id = participant_id;

    const offset = (page - 1) * limit;

    const { count, rows } = await Enrollment.findAndCountAll({
      where,
      include: [
        {
          model: TrainingSession,
          as: 'session',
          attributes: ['id', 'session_name_en', 'session_name_fr', 'start_date', 'end_date']
        },
        {
          model: User,
          as: 'participant',
          attributes: ['id', 'first_name', 'last_name', 'email', 'phone']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['enrollment_date', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        enrollments: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching enrollments',
      error: error.message
    });
  }
};

// Get enrollment by ID
exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id, {
      include: [
        {
          model: TrainingSession,
          as: 'session',
          attributes: ['id', 'session_name_en', 'session_name_fr', 'start_date', 'end_date']
        },
        {
          model: User,
          as: 'participant',
          attributes: ['id', 'first_name', 'last_name', 'email', 'phone']
        }
      ]
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    res.json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    console.error('Error fetching enrollment:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching enrollment',
      error: error.message
    });
  }
};

// Get my enrollments (participant)
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { participant_id: req.user.id },
      include: [
        {
          model: TrainingSession,
          as: 'session',
          attributes: ['id', 'session_name_en', 'session_name_fr', 'start_date', 'end_date', 'location_type', 'location_city', 'status']
        }
      ],
      order: [['enrollment_date', 'DESC']]
    });

    res.json({
      success: true,
      data: enrollments
    });
  } catch (error) {
    console.error('Error fetching my enrollments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching my enrollments',
      error: error.message
    });
  }
};

// Approve enrollment (admin)
exports.approveEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    await enrollment.update({
      status: 'approved',
      approved_by: req.user.id,
      approved_at: new Date()
    });

    res.json({
      success: true,
      message: 'Enrollment approved successfully',
      data: enrollment
    });
  } catch (error) {
    console.error('Error approving enrollment:', error);
    res.status(500).json({
      success: false,
      message: 'Error approving enrollment',
      error: error.message
    });
  }
};

// Reject enrollment (admin)
exports.rejectEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    const session = await TrainingSession.findByPk(enrollment.session_id);

    await enrollment.update({
      status: 'rejected',
      approved_by: req.user.id,
      approved_at: new Date()
    });

    // Decrement enrollment count
    if (session) {
      await session.decrement('current_enrollment');
    }

    res.json({
      success: true,
      message: 'Enrollment rejected successfully',
      data: enrollment
    });
  } catch (error) {
    console.error('Error rejecting enrollment:', error);
    res.status(500).json({
      success: false,
      message: 'Error rejecting enrollment',
      error: error.message
    });
  }
};

// Update photo consent
exports.updatePhotoConsent = async (req, res) => {
  try {
    const { photo_consent } = req.body;
    const enrollment = await Enrollment.findOne({
      where: {
        id: req.params.id,
        participant_id: req.user.id
      }
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    await enrollment.update({
      photo_consent,
      consent_date: photo_consent ? new Date() : null
    });

    res.json({
      success: true,
      message: 'Photo consent updated successfully',
      data: enrollment
    });
  } catch (error) {
    console.error('Error updating photo consent:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating photo consent',
      error: error.message
    });
  }
};

// Withdraw enrollment (participant)
exports.withdrawEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      where: {
        id: req.params.id,
        participant_id: req.user.id,
        status: { [Op.in]: ['pending', 'approved'] }
      }
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found or cannot be withdrawn'
      });
    }

    const session = await TrainingSession.findByPk(enrollment.session_id);

    await enrollment.update({ status: 'dropped' });

    // Decrement enrollment count
    if (session) {
      await session.decrement('current_enrollment');
    }

    res.json({
      success: true,
      message: 'Enrollment withdrawn successfully'
    });
  } catch (error) {
    console.error('Error withdrawing enrollment:', error);
    res.status(500).json({
      success: false,
      message: 'Error withdrawing enrollment',
      error: error.message
    });
  }
};

// Issue certificate (admin)
exports.issueCertificate = async (req, res) => {
  try {
    const { certificate_url } = req.body;
    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    await enrollment.update({
      certificate_issued: true,
      certificate_url,
      status: 'completed',
      completion_date: new Date()
    });

    res.json({
      success: true,
      message: 'Certificate issued successfully',
      data: enrollment
    });
  } catch (error) {
    console.error('Error issuing certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Error issuing certificate',
      error: error.message
    });
  }
};
