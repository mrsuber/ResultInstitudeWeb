'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('session_trainers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      session_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'training_sessions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      trainer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      role: {
        type: Sequelize.STRING(50),
        defaultValue: 'trainer'
      },
      assigned_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add unique constraint
    await queryInterface.addConstraint('session_trainers', {
      fields: ['session_id', 'trainer_id'],
      type: 'unique',
      name: 'unique_session_trainer'
    });

    // Add indexes
    await queryInterface.addIndex('session_trainers', ['session_id']);
    await queryInterface.addIndex('session_trainers', ['trainer_id']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('session_trainers');
  }
};
