'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('enrollments', {
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
      participant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      enrollment_date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      status: {
        type: Sequelize.STRING(20),
        defaultValue: 'pending'
      },
      payment_status: {
        type: Sequelize.STRING(20),
        defaultValue: 'not_applicable'
      },
      photo_consent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      consent_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      attendance_percentage: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 0
      },
      progress_percentage: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 0
      },
      completion_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      certificate_issued: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      certificate_url: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      approved_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      approved_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    // Add unique constraint
    await queryInterface.addConstraint('enrollments', {
      fields: ['session_id', 'participant_id'],
      type: 'unique',
      name: 'unique_session_participant'
    });

    // Add indexes
    await queryInterface.addIndex('enrollments', ['session_id']);
    await queryInterface.addIndex('enrollments', ['participant_id']);
    await queryInterface.addIndex('enrollments', ['status']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('enrollments');
  }
};
