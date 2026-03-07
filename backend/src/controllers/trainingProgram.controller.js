const { TrainingProgram } = require('../models');
const { Op } = require('sequelize');

// Helper function to create slug from title
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Create a new training program
exports.createProgram = async (req, res) => {
  try {
    const {
      title_en,
      title_fr,
      description_en,
      description_fr,
      public_description_en,
      public_description_fr,
      category,
      level,
      duration_hours,
      capacity,
      prerequisites_en,
      prerequisites_fr,
      objectives_en,
      objectives_fr,
      curriculum_en,
      curriculum_fr,
      featured_image,
      certificate_available,
      is_public,
      show_on_homepage,
      status
    } = req.body;

    // Generate slug from English title
    const slug = createSlug(title_en);

    const program = await TrainingProgram.create({
      title_en,
      title_fr,
      slug,
      description_en,
      description_fr,
      public_description_en,
      public_description_fr,
      category,
      level,
      duration_hours,
      capacity,
      prerequisites_en,
      prerequisites_fr,
      objectives_en,
      objectives_fr,
      curriculum_en,
      curriculum_fr,
      featured_image,
      certificate_available,
      is_public,
      show_on_homepage,
      status,
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Training program created successfully',
      data: program
    });
  } catch (error) {
    console.error('Error creating training program:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating training program',
      error: error.message
    });
  }
};

// Get all training programs with filters
exports.getAllPrograms = async (req, res) => {
  try {
    const {
      category,
      level,
      status,
      is_public,
      search,
      page = 1,
      limit = 10
    } = req.query;

    const where = {};

    if (category) where.category = category;
    if (level) where.level = level;
    if (status) where.status = status;
    if (is_public !== undefined) where.is_public = is_public === 'true';

    if (search) {
      where[Op.or] = [
        { title_en: { [Op.iLike]: `%${search}%` } },
        { title_fr: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await TrainingProgram.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        programs: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching training programs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching training programs',
      error: error.message
    });
  }
};

// Get a single training program by ID
exports.getProgramById = async (req, res) => {
  try {
    const program = await TrainingProgram.findByPk(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Training program not found'
      });
    }

    res.json({
      success: true,
      data: program
    });
  } catch (error) {
    console.error('Error fetching training program:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching training program',
      error: error.message
    });
  }
};

// Update a training program
exports.updateProgram = async (req, res) => {
  try {
    const program = await TrainingProgram.findByPk(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Training program not found'
      });
    }

    // If title_en is being updated, regenerate slug
    if (req.body.title_en && req.body.title_en !== program.title_en) {
      req.body.slug = createSlug(req.body.title_en);
    }

    await program.update(req.body);

    res.json({
      success: true,
      message: 'Training program updated successfully',
      data: program
    });
  } catch (error) {
    console.error('Error updating training program:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating training program',
      error: error.message
    });
  }
};

// Delete a training program
exports.deleteProgram = async (req, res) => {
  try {
    const program = await TrainingProgram.findByPk(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Training program not found'
      });
    }

    await program.destroy();

    res.json({
      success: true,
      message: 'Training program deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting training program:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting training program',
      error: error.message
    });
  }
};

// Publish a program (make it public)
exports.publishProgram = async (req, res) => {
  try {
    const program = await TrainingProgram.findByPk(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Training program not found'
      });
    }

    await program.update({
      status: 'published',
      is_public: true
    });

    res.json({
      success: true,
      message: 'Training program published successfully',
      data: program
    });
  } catch (error) {
    console.error('Error publishing training program:', error);
    res.status(500).json({
      success: false,
      message: 'Error publishing training program',
      error: error.message
    });
  }
};

// Get public programs (for public website)
exports.getPublicPrograms = async (req, res) => {
  try {
    const { category, level, search } = req.query;

    const where = {
      is_public: true,
      status: 'published'
    };

    if (category) where.category = category;
    if (level) where.level = level;

    if (search) {
      where[Op.or] = [
        { title_en: { [Op.iLike]: `%${search}%` } },
        { title_fr: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const programs = await TrainingProgram.findAll({
      where,
      order: [['created_at', 'DESC']],
      attributes: [
        'id',
        'slug',
        'title_en',
        'title_fr',
        'public_description_en',
        'public_description_fr',
        'category',
        'level',
        'duration_hours',
        'capacity',
        'featured_image',
        'certificate_available'
      ]
    });

    res.json({
      success: true,
      data: programs
    });
  } catch (error) {
    console.error('Error fetching public programs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching public programs',
      error: error.message
    });
  }
};

// Get public program by slug
exports.getPublicProgramBySlug = async (req, res) => {
  try {
    const program = await TrainingProgram.findOne({
      where: {
        slug: req.params.slug,
        is_public: true,
        status: 'published'
      },
      attributes: [
        'id',
        'slug',
        'title_en',
        'title_fr',
        'public_description_en',
        'public_description_fr',
        'category',
        'level',
        'duration_hours',
        'capacity',
        'prerequisites_en',
        'prerequisites_fr',
        'objectives_en',
        'objectives_fr',
        'curriculum_en',
        'curriculum_fr',
        'featured_image',
        'certificate_available'
      ]
    });

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    res.json({
      success: true,
      data: program
    });
  } catch (error) {
    console.error('Error fetching public program:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching public program',
      error: error.message
    });
  }
};
