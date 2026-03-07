'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('training_sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      program_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'training_programs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      session_name_en: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      session_name_fr: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      schedule: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      location_type: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      location_address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      location_city: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      location_region: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      online_meeting_link: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      max_participants: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      current_enrollment: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      status: {
        type: Sequelize.STRING(20),
        defaultValue: 'upcoming'
      },
      is_public: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      public_summary_en: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      public_summary_fr: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      highlight_en: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      highlight_fr: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add indexes
    await queryInterface.addIndex('training_sessions', ['program_id']);
    await queryInterface.addIndex('training_sessions', ['status']);
    await queryInterface.addIndex('training_sessions', ['start_date', 'end_date']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('training_sessions');
  }
};
