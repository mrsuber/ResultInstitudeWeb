const db = require('../models');
const { Op } = require('sequelize');
const User = db.User;
const TrainingProgram = db.TrainingProgram;
const TrainingSession = db.TrainingSession;
const Enrollment = db.Enrollment;

// Get overview statistics
exports.getOverviewStats = async (req, res) => {
  try {
    // Only admins can view analytics
    if (req.user.role !== 'super_admin' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can view analytics'
      });
    }

    const [
      totalUsers,
      activeUsers,
      totalPrograms,
      publishedPrograms,
      totalSessions,
      upcomingSessions,
      totalEnrollments,
      approvedEnrollments,
    ] = await Promise.all([
      User.count(),
      User.count({ where: { status: 'active' } }),
      TrainingProgram.count(),
      TrainingProgram.count({ where: { status: 'published' } }),
      TrainingSession.count(),
      TrainingSession.count({ where: { start_date: { [Op.gte]: new Date() } } }),
      Enrollment.count(),
      Enrollment.count({ where: { status: 'approved' } }),
    ]);

    res.json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          active: activeUsers,
        },
        programs: {
          total: totalPrograms,
          published: publishedPrograms,
        },
        sessions: {
          total: totalSessions,
          upcoming: upcomingSessions,
        },
        enrollments: {
          total: totalEnrollments,
          approved: approvedEnrollments,
        },
      },
    });
  } catch (error) {
    console.error('Get overview stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching overview statistics',
      error: error.message,
    });
  }
};

// Get enrollment trends (monthly data for last 6 months)
exports.getEnrollmentTrends = async (req, res) => {
  try {
    if (req.user.role !== 'super_admin' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can view analytics'
      });
    }

    // Get enrollments by month for last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const enrollments = await Enrollment.findAll({
      where: {
        created_at: {
          [Op.gte]: sixMonthsAgo,
        },
      },
      attributes: [
        [db.sequelize.fn('DATE_TRUNC', 'month', db.sequelize.col('created_at')), 'month'],
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count'],
      ],
      group: ['month'],
      order: [[db.sequelize.col('month'), 'ASC']],
    });

    res.json({
      success: true,
      data: enrollments,
    });
  } catch (error) {
    console.error('Get enrollment trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching enrollment trends',
      error: error.message,
    });
  }
};

// Get program distribution by category
exports.getProgramDistribution = async (req, res) => {
  try {
    if (req.user.role !== 'super_admin' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can view analytics'
      });
    }

    const distribution = await TrainingProgram.findAll({
      attributes: [
        'category',
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count'],
      ],
      group: ['category'],
    });

    res.json({
      success: true,
      data: distribution,
    });
  } catch (error) {
    console.error('Get program distribution error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching program distribution',
      error: error.message,
    });
  }
};

// Get enrollment status breakdown
exports.getEnrollmentStatusBreakdown = async (req, res) => {
  try {
    if (req.user.role !== 'super_admin' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can view analytics'
      });
    }

    const breakdown = await Enrollment.findAll({
      attributes: [
        'status',
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count'],
      ],
      group: ['status'],
    });

    res.json({
      success: true,
      data: breakdown,
    });
  } catch (error) {
    console.error('Get enrollment status breakdown error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching enrollment status breakdown',
      error: error.message,
    });
  }
};

// Get top programs by enrollment
exports.getTopPrograms = async (req, res) => {
  try {
    if (req.user.role !== 'super_admin' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can view analytics'
      });
    }

    const topPrograms = await db.sequelize.query(`
      SELECT
        tp.id,
        tp.title_en,
        tp.category,
        COUNT(e.id) as enrollment_count
      FROM training_programs tp
      LEFT JOIN training_sessions ts ON tp.id = ts.program_id
      LEFT JOIN enrollments e ON ts.id = e.session_id
      WHERE tp.status = 'published'
      GROUP BY tp.id, tp.title_en, tp.category
      ORDER BY enrollment_count DESC
      LIMIT 10
    `, {
      type: db.sequelize.QueryTypes.SELECT
    });

    res.json({
      success: true,
      data: topPrograms,
    });
  } catch (error) {
    console.error('Get top programs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching top programs',
      error: error.message,
    });
  }
};

// Get user growth over time (monthly)
exports.getUserGrowth = async (req, res) => {
  try {
    if (req.user.role !== 'super_admin' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can view analytics'
      });
    }

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const userGrowth = await User.findAll({
      where: {
        created_at: {
          [Op.gte]: sixMonthsAgo,
        },
      },
      attributes: [
        [db.sequelize.fn('DATE_TRUNC', 'month', db.sequelize.col('created_at')), 'month'],
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count'],
      ],
      group: ['month'],
      order: [[db.sequelize.col('month'), 'ASC']],
    });

    res.json({
      success: true,
      data: userGrowth,
    });
  } catch (error) {
    console.error('Get user growth error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user growth',
      error: error.message,
    });
  }
};

// Get completion rates
exports.getCompletionRates = async (req, res) => {
  try {
    if (req.user.role !== 'super_admin' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can view analytics'
      });
    }

    const totalEnrollments = await Enrollment.count({ where: { status: 'approved' } });
    const completedEnrollments = await Enrollment.count({
      where: {
        status: 'approved',
        certificate_issued: true,
      },
    });

    const completionRate = totalEnrollments > 0
      ? ((completedEnrollments / totalEnrollments) * 100).toFixed(2)
      : 0;

    res.json({
      success: true,
      data: {
        total: totalEnrollments,
        completed: completedEnrollments,
        rate: parseFloat(completionRate),
      },
    });
  } catch (error) {
    console.error('Get completion rates error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching completion rates',
      error: error.message,
    });
  }
};
