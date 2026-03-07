const { TrainingSession, TrainingProgram, Enrollment } = require('../models');
const { Op } = require('sequelize');
const db = require('../models');
const sequelize = db.sequelize;

// Create a new training session
exports.createSession = async (req, res) => {
  try {
    const {
      program_id,
      session_name_en,
      session_name_fr,
      start_date,
      end_date,
      schedule,
      location_type,
      location_address,
      location_city,
      location_region,
      online_meeting_link,
      max_participants,
      status,
      is_public,
      public_summary_en,
      public_summary_fr
    } = req.body;

    // Verify program exists
    const program = await TrainingProgram.findByPk(program_id);
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Training program not found'
      });
    }

    const session = await TrainingSession.create({
      program_id,
      session_name_en,
      session_name_fr,
      start_date,
      end_date,
      schedule,
      location_type,
      location_address,
      location_city,
      location_region,
      online_meeting_link,
      max_participants,
      status,
      is_public,
      public_summary_en,
      public_summary_fr,
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Training session created successfully',
      data: session
    });
  } catch (error) {
    console.error('Error creating training session:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating training session',
      error: error.message
    });
  }
};

// Get all training sessions with filters
exports.getAllSessions = async (req, res) => {
  try {
    const {
      program_id,
      status,
      location_type,
      start_date,
      end_date,
      search,
      page = 1,
      limit = 10
    } = req.query;

    const where = {};

    if (program_id) where.program_id = program_id;
    if (status) where.status = status;
    if (location_type) where.location_type = location_type;

    if (start_date && end_date) {
      where.start_date = {
        [Op.between]: [start_date, end_date]
      };
    } else if (start_date) {
      where.start_date = {
        [Op.gte]: start_date
      };
    }

    if (search) {
      where[Op.or] = [
        { session_name_en: { [Op.iLike]: `%${search}%` } },
        { session_name_fr: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await TrainingSession.findAndCountAll({
      where,
      include: [
        {
          model: TrainingProgram,
          as: 'program',
          attributes: ['id', 'title_en', 'title_fr', 'category']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['start_date', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        sessions: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching training sessions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching training sessions',
      error: error.message
    });
  }
};

// Get a single training session by ID
exports.getSessionById = async (req, res) => {
  try {
    const session = await TrainingSession.findByPk(req.params.id, {
      include: [
        {
          model: TrainingProgram,
          as: 'program',
          attributes: ['id', 'title_en', 'title_fr', 'category', 'duration_hours']
        }
      ]
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Training session not found'
      });
    }

    res.json({
      success: true,
      data: session
    });
  } catch (error) {
    console.error('Error fetching training session:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching training session',
      error: error.message
    });
  }
};

// Update a training session
exports.updateSession = async (req, res) => {
  try {
    const session = await TrainingSession.findByPk(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Training session not found'
      });
    }

    await session.update(req.body);

    res.json({
      success: true,
      message: 'Training session updated successfully',
      data: session
    });
  } catch (error) {
    console.error('Error updating training session:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating training session',
      error: error.message
    });
  }
};

// Delete a training session
exports.deleteSession = async (req, res) => {
  try {
    const session = await TrainingSession.findByPk(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Training session not found'
      });
    }

    await session.destroy();

    res.json({
      success: true,
      message: 'Training session deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting training session:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting training session',
      error: error.message
    });
  }
};

// Assign trainer to session
exports.assignTrainer = async (req, res) => {
  try {
    const { session_id } = req.params;
    const { trainer_id, role = 'trainer' } = req.body;

    const session = await TrainingSession.findByPk(session_id);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Training session not found'
      });
    }

    await sequelize.query(
      'INSERT INTO session_trainers (session_id, trainer_id, role) VALUES (:session_id, :trainer_id, :role)',
      {
        replacements: { session_id, trainer_id, role },
        type: sequelize.QueryTypes.INSERT
      }
    );

    res.json({
      success: true,
      message: 'Trainer assigned successfully'
    });
  } catch (error) {
    console.error('Error assigning trainer:', error);
    res.status(500).json({
      success: false,
      message: 'Error assigning trainer',
      error: error.message
    });
  }
};

// Remove trainer from session
exports.removeTrainer = async (req, res) => {
  try {
    const { session_id, trainer_id } = req.params;

    await sequelize.query(
      'DELETE FROM session_trainers WHERE session_id = :session_id AND trainer_id = :trainer_id',
      {
        replacements: { session_id, trainer_id },
        type: sequelize.QueryTypes.DELETE
      }
    );

    res.json({
      success: true,
      message: 'Trainer removed successfully'
    });
  } catch (error) {
    console.error('Error removing trainer:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing trainer',
      error: error.message
    });
  }
};

// Publish session (make it public)
exports.publishSession = async (req, res) => {
  try {
    const session = await TrainingSession.findByPk(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Training session not found'
      });
    }

    await session.update({ is_public: true });

    res.json({
      success: true,
      message: 'Training session published successfully',
      data: session
    });
  } catch (error) {
    console.error('Error publishing training session:', error);
    res.status(500).json({
      success: false,
      message: 'Error publishing training session',
      error: error.message
    });
  }
};

// Get public sessions (for public website)
exports.getPublicSessions = async (req, res) => {
  try {
    const { status, location_type } = req.query;

    const where = { is_public: true };

    if (status) where.status = status;
    if (location_type) where.location_type = location_type;

    const sessions = await TrainingSession.findAll({
      where,
      include: [
        {
          model: TrainingProgram,
          as: 'program',
          where: { is_public: true, status: 'published' },
          attributes: ['slug', 'title_en', 'title_fr', 'category', 'featured_image']
        }
      ],
      order: [['start_date', 'ASC']],
      attributes: [
        'id',
        'session_name_en',
        'session_name_fr',
        'start_date',
        'end_date',
        'location_type',
        'location_city',
        'location_region',
        'max_participants',
        'current_enrollment',
        'status',
        'public_summary_en',
        'public_summary_fr'
      ]
    });

    res.json({
      success: true,
      data: sessions
    });
  } catch (error) {
    console.error('Error fetching public sessions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching public sessions',
      error: error.message
    });
  }
};
