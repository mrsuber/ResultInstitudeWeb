const db = require('../models');
const User = db.User;
const { Op } = require('sequelize');

// Get all users with pagination and search
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', role = '', status = '' } = req.query;
    const offset = (page - 1) * limit;

    // Build where clause for filters
    const where = {};

    if (search) {
      where[Op.or] = [
        { first_name: { [Op.iLike]: `%${search}%` } },
        { last_name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (role) {
      where.role = role;
    }

    if (status) {
      where.status = status;
    }

    const { count, rows: users } = await User.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']],
      attributes: { exclude: ['password_hash'] }
    });

    res.json({
      success: true,
      data: users,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// Get single user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: { exclude: ['password_hash'] }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  try {
    const { email, password, first_name, last_name, role, phone, bio, status } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Validate role permissions
    if (req.user.role !== 'super_admin' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can create users'
      });
    }

    // Prevent creating super_admin unless creator is super_admin
    if (role === 'super_admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({
        success: false,
        message: 'Only super admins can create super admin users'
      });
    }

    const user = await User.create({
      email,
      password_hash: password,
      first_name,
      last_name,
      role: role || 'participant',
      phone,
      bio,
      status: status || 'active'
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, first_name, last_name, role, phone, bio, status, avatar_url } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Permission checks
    const isSelfUpdate = req.user.id === parseInt(id);
    const isAdmin = req.user.role === 'super_admin' || req.user.role === 'admin';

    // Users can only update their own profile unless they're admin
    if (!isSelfUpdate && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own profile'
      });
    }

    // Only admins can change role and status
    if (!isAdmin && (role || status)) {
      return res.status(403).json({
        success: false,
        message: 'Only admins can change user role or status'
      });
    }

    // Prevent changing to super_admin unless updater is super_admin
    if (role === 'super_admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({
        success: false,
        message: 'Only super admins can assign super admin role'
      });
    }

    // Update fields
    const updateData = {
      first_name: first_name || user.first_name,
      last_name: last_name || user.last_name,
      phone: phone !== undefined ? phone : user.phone,
      bio: bio !== undefined ? bio : user.bio,
      avatar_url: avatar_url !== undefined ? avatar_url : user.avatar_url
    };

    // Admin-only fields
    if (isAdmin) {
      if (email) updateData.email = email;
      if (role) updateData.role = role;
      if (status) updateData.status = status;
    }

    await user.update(updateData);

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};

// Update user password
exports.updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { current_password, new_password } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Users can only change their own password
    if (req.user.id !== parseInt(id)) {
      return res.status(403).json({
        success: false,
        message: 'You can only change your own password'
      });
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(current_password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password (will be hashed by the model hook)
    await user.update({ password_hash: new_password });

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating password',
      error: error.message
    });
  }
};

// Delete user (soft delete by changing status)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Only admins can delete users
    if (req.user.role !== 'super_admin' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can delete users'
      });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent deleting self
    if (req.user.id === parseInt(id)) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }

    // Prevent deleting super_admin unless deleter is super_admin
    if (user.role === 'super_admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({
        success: false,
        message: 'Only super admins can delete super admin users'
      });
    }

    // Soft delete by setting status to inactive
    await user.update({ status: 'inactive' });

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};

// Get user statistics
exports.getUserStats = async (req, res) => {
  try {
    // Only admins can view statistics
    if (req.user.role !== 'super_admin' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can view user statistics'
      });
    }

    const totalUsers = await User.count();
    const activeUsers = await User.count({ where: { status: 'active' } });
    const inactiveUsers = await User.count({ where: { status: 'inactive' } });
    const suspendedUsers = await User.count({ where: { status: 'suspended' } });

    const usersByRole = await User.findAll({
      attributes: [
        'role',
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
      ],
      group: ['role']
    });

    res.json({
      success: true,
      data: {
        total: totalUsers,
        active: activeUsers,
        inactive: inactiveUsers,
        suspended: suspendedUsers,
        byRole: usersByRole
      }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user statistics',
      error: error.message
    });
  }
};
