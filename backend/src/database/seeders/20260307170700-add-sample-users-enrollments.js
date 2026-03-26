'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash password for sample users
    const hashedPassword = await bcrypt.hash('Password@123', 12);

    // Create sample users
    await queryInterface.bulkInsert('users', [
      {
        email: 'trainer1@resultinstitute.cm',
        password_hash: hashedPassword,
        first_name: 'Marie',
        last_name: 'Nguema',
        role: 'trainer',
        phone: '+237654321001',
        status: 'active',
        email_verified: true,
        bio: 'Experienced leadership trainer with 10+ years in corporate training',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'trainer2@resultinstitute.cm',
        password_hash: hashedPassword,
        first_name: 'Paul',
        last_name: 'Kamdem',
        role: 'trainer',
        phone: '+237654321002',
        status: 'active',
        email_verified: true,
        bio: 'Youth development specialist and motivational speaker',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'participant1@gmail.com',
        password_hash: hashedPassword,
        first_name: 'Alice',
        last_name: 'Mbarga',
        role: 'participant',
        phone: '+237654321003',
        status: 'active',
        email_verified: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'participant2@gmail.com',
        password_hash: hashedPassword,
        first_name: 'Jean',
        last_name: 'Fotso',
        role: 'participant',
        phone: '+237654321004',
        status: 'active',
        email_verified: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'participant3@gmail.com',
        password_hash: hashedPassword,
        first_name: 'Sarah',
        last_name: 'Nkodo',
        role: 'participant',
        phone: '+237654321005',
        status: 'active',
        email_verified: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'participant4@gmail.com',
        password_hash: hashedPassword,
        first_name: 'David',
        last_name: 'Essomba',
        role: 'participant',
        phone: '+237654321006',
        status: 'active',
        email_verified: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'participant5@gmail.com',
        password_hash: hashedPassword,
        first_name: 'Grace',
        last_name: 'Ngo',
        role: 'participant',
        phone: '+237654321007',
        status: 'active',
        email_verified: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

    // Get session IDs
    const sessions = await queryInterface.sequelize.query(
      'SELECT id FROM training_sessions ORDER BY id LIMIT 2;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Get participant IDs
    const participants = await queryInterface.sequelize.query(
      'SELECT id FROM users WHERE role = \'participant\';',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Get admin ID for approval
    const admin = await queryInterface.sequelize.query(
      'SELECT id FROM users WHERE role = \'super_admin\' LIMIT 1;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (sessions.length > 0 && participants.length > 0 && admin.length > 0) {
      const enrollments = [];
      const statuses = ['approved', 'approved', 'approved', 'pending', 'pending'];

      // Create enrollments for first session (Leadership)
      for (let i = 0; i < Math.min(participants.length, 5); i++) {
        const enrollmentDate = new Date();
        enrollmentDate.setDate(enrollmentDate.getDate() - Math.floor(Math.random() * 14));

        const status = statuses[i % statuses.length];
        const isApproved = status === 'approved';

        enrollments.push({
          session_id: sessions[0].id,
          participant_id: participants[i].id,
          enrollment_date: enrollmentDate,
          status: status,
          payment_status: 'not_applicable',
          photo_consent: true,
          consent_date: enrollmentDate,
          attendance_percentage: isApproved ? (75 + Math.floor(Math.random() * 25)) : null,
          progress_percentage: isApproved ? (60 + Math.floor(Math.random() * 40)) : null,
          approved_by: isApproved ? admin[0].id : null,
          approved_at: isApproved ? enrollmentDate : null
        });
      }

      // Create enrollments for second session (Youth Summit)
      if (sessions.length > 1 && participants.length > 2) {
        for (let i = 2; i < Math.min(participants.length, 7); i++) {
          const enrollmentDate = new Date();
          enrollmentDate.setDate(enrollmentDate.getDate() - Math.floor(Math.random() * 7));

          const status = i < 5 ? 'approved' : 'pending';
          const isApproved = status === 'approved';

          enrollments.push({
            session_id: sessions[1].id,
            participant_id: participants[i].id,
            enrollment_date: enrollmentDate,
            status: status,
            payment_status: 'not_applicable',
            photo_consent: true,
            consent_date: enrollmentDate,
            attendance_percentage: isApproved ? (80 + Math.floor(Math.random() * 20)) : null,
            progress_percentage: isApproved ? (70 + Math.floor(Math.random() * 30)) : null,
            approved_by: isApproved ? admin[0].id : null,
            approved_at: isApproved ? enrollmentDate : null
          });
        }
      }

      if (enrollments.length > 0) {
        await queryInterface.bulkInsert('enrollments', enrollments, {});

        // Update current_enrollment count for sessions
        await queryInterface.sequelize.query(`
          UPDATE training_sessions
          SET current_enrollment = (
            SELECT COUNT(*) FROM enrollments
            WHERE enrollments.session_id = training_sessions.id
            AND enrollments.status = 'approved'
          )
        `);
      }
    }

    console.log('✅ Sample users and enrollments created successfully!');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('enrollments', null, {});
    await queryInterface.bulkDelete('users', {
      email: {
        [Sequelize.Op.in]: [
          'trainer1@resultinstitute.cm',
          'trainer2@resultinstitute.cm',
          'participant1@gmail.com',
          'participant2@gmail.com',
          'participant3@gmail.com',
          'participant4@gmail.com',
          'participant5@gmail.com'
        ]
      }
    }, {});
  }
};
