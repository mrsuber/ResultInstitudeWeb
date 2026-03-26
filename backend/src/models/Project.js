module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('planning', 'active', 'on_hold', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'planning'
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
      allowNull: false,
      defaultValue: 'medium'
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    color: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: '#6366f1'
    }
  }, {
    tableName: 'projects',
    underscored: true,
    timestamps: true
  });

  Project.associate = (models) => {
    Project.belongsTo(models.User, {
      foreignKey: 'owner_id',
      as: 'owner'
    });
    Project.hasMany(models.Task, {
      foreignKey: 'project_id',
      as: 'tasks'
    });
  };

  return Project;
};
