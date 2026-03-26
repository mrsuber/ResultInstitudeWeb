module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('present', 'absent', 'late', 'excused'),
      allowNull: false,
      defaultValue: 'absent'
    },
    check_in_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    check_out_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    marked_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'attendances',
    underscored: true,
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['session_id', 'user_id', 'date'],
        name: 'unique_session_user_date'
      }
    ]
  });

  Attendance.associate = (models) => {
    Attendance.belongsTo(models.TrainingSession, {
      foreignKey: 'session_id',
      as: 'session'
    });
    Attendance.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    Attendance.belongsTo(models.User, {
      foreignKey: 'marked_by',
      as: 'marker'
    });
  };

  return Attendance;
};
