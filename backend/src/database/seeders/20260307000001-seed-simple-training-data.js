'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    // Get the super admin user
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE role = 'super_admin' LIMIT 1;`
    );

    if (users.length === 0) {
      console.log('No super admin found. Skipping seed.');
      return;
    }

    const userId = users[0].id;

    // Insert Training Programs (matching exact schema)
    await queryInterface.bulkInsert('training_programs', [
      {
        title_en: 'Leadership Excellence Program',
        title_fr: 'Programme d\'Excellence en Leadership',
        slug: 'leadership-excellence-program',
        description_en: 'Comprehensive leadership development program',
        description_fr: 'Programme complet de développement du leadership',
        category: 'Leadership',
        level: 'intermediate',
        duration_hours: 40,
        capacity: 25,
        objectives_en: ['Leadership', 'Team building', 'Strategy'],
        objectives_fr: ['Leadership', 'Constitution d\'équipe', 'Stratégie'],
        is_public: true,
        show_on_homepage: true,
        status: 'published',
        created_by: userId,
        created_at: now,
        updated_at: now
      },
      {
        title_en: 'Youth Empowerment Workshop',
        title_fr: 'Atelier d\'Autonomisation des Jeunes',
        slug: 'youth-empowerment-workshop',
        description_en: 'Interactive workshop for young people',
        description_fr: 'Atelier interactif pour les jeunes',
        category: 'Youth Development',
        level: 'beginner',
        duration_hours: 20,
        capacity: 100,
        objectives_en: ['Confidence', 'Skills', 'Careers'],
        objectives_fr: ['Confiance', 'Compétences', 'Carrières'],
        is_public: true,
        show_on_homepage: true,
        status: 'published',
        created_by: userId,
        created_at: now,
        updated_at: now
      }
    ], {});

    // Get inserted program IDs
    const [programs] = await queryInterface.sequelize.query(
      `SELECT id FROM training_programs WHERE slug IN ('leadership-excellence-program', 'youth-empowerment-workshop') ORDER BY created_at;`
    );

    if (programs.length < 2) {
      console.log('Programs not inserted correctly');
      return;
    }

    // Insert Training Sessions (matching exact schema)
    await queryInterface.bulkInsert('training_sessions', [
      {
        program_id: programs[0].id,
        session_name_en: 'Spring 2026 Leadership Cohort',
        session_name_fr: 'Cohorte Leadership Printemps 2026',
        start_date: '2026-04-15',
        end_date: '2026-06-10',
        location_type: 'hybrid',
        location_city: 'Yaoundé',
        location_address: 'Result Institute Training Center',
        online_meeting_link: 'https://zoom.us/j/leadership2026',
        max_participants: 25,
        current_enrollment: 0,
        is_public: true,
        status: 'scheduled',
        public_summary_en: 'Intensive 8-week leadership development',
        public_summary_fr: 'Développement du leadership intensif de 8 semaines',
        created_at: now,
        updated_at: now
      },
      {
        program_id: programs[1].id,
        session_name_en: 'Youth Summit 2026',
        session_name_fr: 'Sommet des Jeunes 2026',
        start_date: '2026-05-20',
        end_date: '2026-05-22',
        location_type: 'physical',
        location_city: 'Yaoundé',
        location_address: 'Palais des Congrès',
        max_participants: 100,
        current_enrollment: 0,
        is_public: true,
        status: 'scheduled',
        public_summary_en: '3-day youth empowerment workshop',
        public_summary_fr: 'Atelier d\'autonomisation des jeunes de 3 jours',
        created_at: now,
        updated_at: now
      }
    ], {});

    console.log('✅ Training data seeded successfully!');
    console.log(`   - 2 training programs created`);
    console.log(`   - 2 training sessions created`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('training_sessions', null, {});
    await queryInterface.bulkDelete('training_programs', null, {});
  }
};
