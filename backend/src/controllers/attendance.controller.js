const db = require('../models');
const { Op } = require('sequelize');
const Attendance = db.Attendance;
const TrainingSession = db.TrainingSession;
const User = db.User;
const Enrollment = db.Enrollment;

// Mark attendance for multiple users
exports.markAttendance = async (req, res) => {
  try {
    const { session_id, date, attendances } = req.body;

    // Verify session exists
    const session = await TrainingSession.findByPk(session_id);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Training session not found'
      });
    }

    // Only trainers and admins can mark attendance
    if (req.user.role !== 'super_admin' && req.user.role !== 'admin' && req.user.role !== 'trainer') {
      return res.status(403).json({
        success: false,
        message: 'Only trainers and admins can mark attendance'
      });
    }

    const results = [];

    // Process each attendance record
    for (const record of attendances) {
      const { user_id, status, check_in_time, check_out_time, notes } = record;

      // Check if attendance already exists
      const [attendance, created] = await Attendance.findOrCreate({
        where: {
          session_id,
          user_id,
          date
        },
        defaults: {
          status,
          check_in_time,
          check_out_time,
          notes,
          marked_by: req.user.id
        }
      });

      if (!created) {
        // Update existing attendance
        await attendance.update({
          status,
          check_in_time,
          check_out_time,
          notes,
          marked_by: req.user.id
        });
      }

      results.push(attendance);
    }

    res.json({
      success: true,
      message: 'Attendance marked successfully',
      data: results
    });
  } catch (error) {
    console.error('Mark attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking attendance',
      error: error.message
    });
  }
};

// Get attendance for a specific session
exports.getSessionAttendance = async (req, res) => {
  try {
    const { session_id } = req.params;
    const { date } = req.query;

    const where = { session_id };
    if (date) {
      where.date = date;
    }

    const attendance = await Attendance.findAll({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'first_name', 'last_name', 'email', 'avatar_url']
        },
        {
          model: User,
          as: 'marker',
          attributes: ['id', 'first_name', 'last_name']
        }
      ],
      order: [['date', 'DESC'], ['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: attendance
    });
  } catch (error) {
    console.error('Get session attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching attendance',
      error: error.message
    });
  }
};

// Get attendance for a specific user
exports.getUserAttendance = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { session_id, start_date, end_date } = req.query;

    const where = { user_id };

    if (session_id) {
      where.session_id = session_id;
    }

    if (start_date && end_date) {
      where.date = {
        [Op.between]: [start_date, end_date]
      };
    }

    const attendance = await Attendance.findAll({
      where,
      include: [
        {
          model: TrainingSession,
          as: 'session',
          attributes: ['id', 'title_en', 'title_fr', 'start_date', 'end_date']
        },
        {
          model: User,
          as: 'marker',
          attributes: ['id', 'first_name', 'last_name']
        }
      ],
      order: [['date', 'DESC']]
    });

    // Calculate attendance statistics
    const total = attendance.length;
    const present = attendance.filter(a => a.status === 'present').length;
    const late = attendance.filter(a => a.status === 'late').length;
    const absent = attendance.filter(a => a.status === 'absent').length;
    const excused = attendance.filter(a => a.status === 'excused').length;
    const attendanceRate = total > 0 ? ((present + late) / total * 100).toFixed(2) : 0;

    res.json({
      success: true,
      data: {
        records: attendance,
        statistics: {
          total,
          present,
          late,
          absent,
          excused,
          attendanceRate: parseFloat(attendanceRate)
        }
      }
    });
  } catch (error) {
    console.error('Get user attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user attendance',
      error: error.message
    });
  }
};

// Get attendance statistics for a session
exports.getSessionStatistics = async (req, res) => {
  try {
    const { session_id } = req.params;

    const attendance = await Attendance.findAll({
      where: { session_id },
      attributes: [
        'status',
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
      ],
      group: ['status']
    });

    const totalRecords = await Attendance.count({ where: { session_id } });

    const statistics = {
      total: totalRecords,
      present: 0,
      late: 0,
      absent: 0,
      excused: 0
    };

    attendance.forEach(record => {
      statistics[record.status] = parseInt(record.dataValues.count);
    });

    const attendanceRate = totalRecords > 0
      ? (((statistics.present + statistics.late) / totalRecords) * 100).toFixed(2)
      : 0;

    res.json({
      success: true,
      data: {
        ...statistics,
        attendanceRate: parseFloat(attendanceRate)
      }
    });
  } catch (error) {
    console.error('Get session statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching session statistics',
      error: error.message
    });
  }
};

// Update single attendance record
exports.updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, check_in_time, check_out_time, notes } = req.body;

    const attendance = await Attendance.findByPk(id);
    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    // Only trainers and admins can update attendance
    if (req.user.role !== 'super_admin' && req.user.role !== 'admin' && req.user.role !== 'trainer') {
      return res.status(403).json({
        success: false,
        message: 'Only trainers and admins can update attendance'
      });
    }

    await attendance.update({
      status,
      check_in_time,
      check_out_time,
      notes,
      marked_by: req.user.id
    });

    res.json({
      success: true,
      message: 'Attendance updated successfully',
      data: attendance
    });
  } catch (error) {
    console.error('Update attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating attendance',
      error: error.message
    });
  }
};

// Delete attendance record
exports.deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    // Only admins can delete attendance
    if (req.user.role !== 'super_admin' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can delete attendance records'
      });
    }

    const attendance = await Attendance.findByPk(id);
    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    await attendance.destroy();

    res.json({
      success: true,
      message: 'Attendance record deleted successfully'
    });
  } catch (error) {
    console.error('Delete attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting attendance',
      error: error.message
    });
  }
};

// Get enrolled users for attendance marking
exports.getEnrolledUsers = async (req, res) => {
  try {
    const { session_id } = req.params;
    const { date } = req.query;

    // Get all approved enrollments for this session
    const enrollments = await Enrollment.findAll({
      where: {
        session_id,
        status: 'approved'
      },
      include: [
        {
          model: User,
          as: 'participant',
          attributes: ['id', 'first_name', 'last_name', 'email', 'avatar_url']
        }
      ]
    });

    const users = enrollments.map(e => e.participant);

    // If date is provided, include existing attendance records
    if (date) {
      const attendanceRecords = await Attendance.findAll({
        where: {
          session_id,
          date
        }
      });

      const attendanceMap = {};
      attendanceRecords.forEach(record => {
        attendanceMap[record.user_id] = record;
      });

      const usersWithAttendance = users.map(user => ({
        ...user.toJSON(),
        attendance: attendanceMap[user.id] || null
      }));

      return res.json({
        success: true,
        data: usersWithAttendance
      });
    }

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Get enrolled users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching enrolled users',
      error: error.message
    });
  }
};
