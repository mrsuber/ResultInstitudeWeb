'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('Admin@2026', 12);

    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@resultinstitute.cm',
        password_hash: hashedPassword,
        first_name: 'Super',
        last_name: 'Admin',
        role: 'super_admin',
        phone: '+237532555547',
        status: 'active',
        email_verified: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'abba@resultinstitute.cm',
        password_hash: hashedPassword,
        first_name: 'Abba',
        last_name: 'Abdouraman',
        role: 'super_admin',
        phone: null,
        status: 'active',
        email_verified: true,
        bio: 'CEO & Founder of Result Institute',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: {
        [Sequelize.Op.in]: ['admin@resultinstitute.cm', 'abba@resultinstitute.cm']
      }
    }, {});
  }
};
