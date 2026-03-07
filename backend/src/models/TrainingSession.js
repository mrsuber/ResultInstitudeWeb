module.exports = (sequelize, DataTypes) => {
  const TrainingSession = sequelize.define('TrainingSession', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  program_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'training_programs',
      key: 'id'
    }
  },
  session_name_en: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  session_name_fr: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  schedule: {
    type: DataTypes.JSONB
  },
  location_type: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  location_address: {
    type: DataTypes.TEXT
  },
  location_city: {
    type: DataTypes.STRING(100)
  },
  location_region: {
    type: DataTypes.STRING(100)
  },
  online_meeting_link: {
    type: DataTypes.STRING(500)
  },
  max_participants: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  current_enrollment: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'upcoming'
  },
  is_public: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  public_summary_en: {
    type: DataTypes.TEXT
  },
  public_summary_fr: {
    type: DataTypes.TEXT
  },
  highlight_en: {
    type: DataTypes.TEXT
  },
  highlight_fr: {
    type: DataTypes.TEXT
  },
  created_by: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'training_sessions',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

  return TrainingSession;
};
