module.exports = (sequelize, DataTypes) => {
  const TrainingProgram = sequelize.define('TrainingProgram', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title_en: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  title_fr: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  description_en: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description_fr: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  public_description_en: {
    type: DataTypes.TEXT
  },
  public_description_fr: {
    type: DataTypes.TEXT
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  level: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  duration_hours: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  prerequisites_en: {
    type: DataTypes.TEXT
  },
  prerequisites_fr: {
    type: DataTypes.TEXT
  },
  objectives_en: {
    type: DataTypes.ARRAY(DataTypes.TEXT)
  },
  objectives_fr: {
    type: DataTypes.ARRAY(DataTypes.TEXT)
  },
  curriculum_en: {
    type: DataTypes.JSONB
  },
  curriculum_fr: {
    type: DataTypes.JSONB
  },
  featured_image: {
    type: DataTypes.STRING(500)
  },
  certificate_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  is_public: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  show_on_homepage: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'draft'
  },
  created_by: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'training_programs',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

  return TrainingProgram;
};
