const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Define Training Management associations if models exist
if (db.TrainingProgram && db.TrainingSession) {
  db.TrainingProgram.hasMany(db.TrainingSession, {
    foreignKey: 'program_id',
    as: 'sessions'
  });

  db.TrainingSession.belongsTo(db.TrainingProgram, {
    foreignKey: 'program_id',
    as: 'program'
  });
}

if (db.TrainingSession && db.Enrollment) {
  db.TrainingSession.hasMany(db.Enrollment, {
    foreignKey: 'session_id',
    as: 'enrollments'
  });

  db.Enrollment.belongsTo(db.TrainingSession, {
    foreignKey: 'session_id',
    as: 'session'
  });
}

if (db.User && db.Enrollment) {
  db.User.hasMany(db.Enrollment, {
    foreignKey: 'participant_id',
    as: 'enrollments'
  });

  db.Enrollment.belongsTo(db.User, {
    foreignKey: 'participant_id',
    as: 'participant'
  });
}

if (db.User && db.TrainingProgram) {
  db.User.hasMany(db.TrainingProgram, {
    foreignKey: 'created_by',
    as: 'created_programs'
  });

  db.TrainingProgram.belongsTo(db.User, {
    foreignKey: 'created_by',
    as: 'creator'
  });
}

if (db.User && db.TrainingSession) {
  db.User.hasMany(db.TrainingSession, {
    foreignKey: 'created_by',
    as: 'created_sessions'
  });

  db.TrainingSession.belongsTo(db.User, {
    foreignKey: 'created_by',
    as: 'creator'
  });
}

if (db.User && db.Enrollment) {
  db.User.hasMany(db.Enrollment, {
    foreignKey: 'approved_by',
    as: 'approved_enrollments'
  });

  db.Enrollment.belongsTo(db.User, {
    foreignKey: 'approved_by',
    as: 'approver'
  });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
