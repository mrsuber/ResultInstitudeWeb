module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  session_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'training_sessions',
      key: 'id'
    }
  },
  participant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  enrollment_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'pending'
  },
  payment_status: {
    type: DataTypes.STRING(20),
    defaultValue: 'not_applicable'
  },
  photo_consent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  consent_date: {
    type: DataTypes.DATE
  },
  attendance_percentage: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  },
  progress_percentage: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  },
  completion_date: {
    type: DataTypes.DATE
  },
  certificate_issued: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  certificate_url: {
    type: DataTypes.STRING(500)
  },
  notes: {
    type: DataTypes.TEXT
  },
  approved_by: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  approved_at: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'enrollments',
  underscored: true,
  timestamps: false
});

  return Enrollment;
};
