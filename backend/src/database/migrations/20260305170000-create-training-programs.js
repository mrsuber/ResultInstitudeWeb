'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('training_programs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title_en: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      title_fr: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      description_en: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      description_fr: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      public_description_en: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      public_description_fr: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      level: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      duration_hours: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      prerequisites_en: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      prerequisites_fr: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      objectives_en: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: true
      },
      objectives_fr: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: true
      },
      curriculum_en: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      curriculum_fr: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      featured_image: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      certificate_available: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      is_public: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      show_on_homepage: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      status: {
        type: Sequelize.STRING(20),
        defaultValue: 'draft'
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
    await queryInterface.addIndex('training_programs', ['category']);
    await queryInterface.addIndex('training_programs', ['status']);
    await queryInterface.addIndex('training_programs', ['is_public']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('training_programs');
  }
};
