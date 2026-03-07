'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get the super admin user
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE role = 'super_admin' LIMIT 1;`
    );

    if (users.length === 0) {
      console.log('No super admin found. Please create a user first.');
      return;
    }

    const userId = users[0].id;
    const now = new Date();

    // Insert Training Programs
    await queryInterface.bulkInsert('training_programs', [
      {
        title_en: 'Leadership Excellence Program',
        title_fr: 'Programme d\'Excellence en Leadership',
        slug: 'leadership-excellence-program',
        description_en: 'Comprehensive leadership development program designed to transform emerging leaders into influential change-makers.',
        description_fr: 'Programme complet de développement du leadership conçu pour transformer les leaders émergents en agents de changement influents.',
        category: 'Leadership',
        level: 'intermediate',
        duration_hours: 40,
        prerequisites_en: 'Basic management experience recommended',
        prerequisites_fr: 'Expérience de gestion de base recommandée',
        objectives_en: ['Develop strategic thinking', 'Build team leadership skills', 'Enhance decision-making capabilities'],
        objectives_fr: ['Développer la pensée stratégique', 'Renforcer les compétences en leadership d\'équipe', 'Améliorer les capacités décisionnelles'],
        capacity: 25,
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
        description_en: 'Interactive workshop series focused on building confidence, skills, and entrepreneurial mindset in young people.',
        description_fr: 'Série d\'ateliers interactifs axés sur le renforcement de la confiance, des compétences et de l\'esprit d\'entreprise chez les jeunes.',
        category: 'Youth Development',
        level: 'beginner',
        duration_hours: 20,
        prerequisites_en: 'No prerequisites required',
        prerequisites_fr: 'Aucun prérequis requis',
        objectives_en: ['Build self-confidence', 'Develop communication skills', 'Explore career opportunities'],
        objectives_fr: ['Renforcer la confiance en soi', 'Développer les compétences en communication', 'Explorer les opportunités de carrière'],
        capacity: 100,
        is_public: true,
        show_on_homepage: true,
        status: 'published',
        created_by: userId,
        created_at: now,
        updated_at: now
      },
      {
        title_en: 'Executive Coaching Certification',
        title_fr: 'Certification de Coaching Exécutif',
        slug: 'executive-coaching-certification',
        description_en: 'Professional certification program for aspiring executive coaches and leadership development professionals.',
        description_fr: 'Programme de certification professionnelle pour les coachs exécutifs aspirants et les professionnels du développement du leadership.',
        category: 'Coaching',
        level: 'advanced',
        duration_hours: 80,
        prerequisites_en: '5+ years of leadership or coaching experience',
        prerequisites_fr: '5+ années d\'expérience en leadership ou coaching',
        objectives_en: ['Master coaching techniques', 'Build professional practice', 'Obtain ICF credentials'],
        objectives_fr: ['Maîtriser les techniques de coaching', 'Construire une pratique professionnelle', 'Obtenir les accréditations ICF'],
        capacity: 15,
        is_public: true,
        show_on_homepage: false,
        status: 'published',
        created_by: userId,
        created_at: now,
        updated_at: now
      },
      {
        title_en: 'Digital Transformation for Leaders',
        title_fr: 'Transformation Numérique pour Leaders',
        slug: 'digital-transformation-leaders',
        description_en: 'Learn how to lead digital transformation initiatives and leverage technology for organizational success.',
        description_fr: 'Apprenez à diriger des initiatives de transformation numérique et à exploiter la technologie pour le succès organisationnel.',
        category: 'Digital Skills',
        level: 'intermediate',
        duration_hours: 30,
        prerequisites_en: 'Basic understanding of business operations',
        prerequisites_fr: 'Compréhension de base des opérations commerciales',
        objectives_en: ['Understand digital trends', 'Implement change management', 'Drive innovation'],
        objectives_fr: ['Comprendre les tendances numériques', 'Mettre en œuvre la gestion du changement', 'Favoriser l\'innovation'],
        capacity: 50,
        is_public: true,
        show_on_homepage: true,
        status: 'published',
        created_by: userId,
        created_at: now,
        updated_at: now
      }
    ], {});

    // Get the inserted program IDs
    const [programs] = await queryInterface.sequelize.query(
      `SELECT id, slug FROM training_programs ORDER BY created_at;`
    );

    // Insert Training Sessions
    const sessions = [];

    // Leadership Excellence Program - 2 sessions
    sessions.push({
      program_id: programs[0].id,
      session_name_en: 'Spring 2026 Leadership Cohort',
      session_name_fr: 'Cohorte Leadership Printemps 2026',
      description_en: 'Intensive 8-week leadership development cohort starting in April',
      description_fr: 'Cohorte intensive de développement du leadership de 8 semaines débutant en avril',
      start_date: new Date('2026-04-15'),
      end_date: new Date('2026-06-10'),
      registration_deadline: new Date('2026-04-01'),
      location_type: 'hybrid',
      location_city: 'Yaoundé',
      location_address: 'Result Institute Training Center, Bastos',
      online_platform: 'Zoom',
      meeting_url: 'https://zoom.us/j/leadership2026',
      max_participants: 25,
      current_enrollment: 0,
      fee_amount: 150000,
      is_public: true,
      status: 'scheduled',
      created_at: now,
      updated_at: now
    });

    sessions.push({
      program_id: programs[0].id,
      session_name_en: 'Fall 2026 Leadership Cohort',
      session_name_fr: 'Cohorte Leadership Automne 2026',
      description_en: 'Leadership development program for Q3 2026',
      description_fr: 'Programme de développement du leadership pour le T3 2026',
      start_date: new Date('2026-09-15'),
      end_date: new Date('2026-11-10'),
      registration_deadline: new Date('2026-09-01'),
      location_type: 'physical',
      location_city: 'Douala',
      location_address: 'Akwa Business District, Boulevard de la Liberté',
      online_platform: null,
      meeting_url: null,
      max_participants: 30,
      current_enrollment: 0,
      fee_amount: 150000,
      is_public: true,
      status: 'scheduled',
      created_at: now,
      updated_at: now
    });

    // Youth Empowerment Workshop - 1 session
    sessions.push({
      program_id: programs[1].id,
      session_name_en: 'Youth Summit 2026',
      session_name_fr: 'Sommet des Jeunes 2026',
      description_en: '3-day intensive youth empowerment workshop',
      description_fr: 'Atelier intensif d\'autonomisation des jeunes de 3 jours',
      start_date: new Date('2026-05-20'),
      end_date: new Date('2026-05-22'),
      registration_deadline: new Date('2026-05-10'),
      location_type: 'physical',
      location_city: 'Yaoundé',
      location_address: 'Palais des Congrès, Centre-ville',
      online_platform: null,
      meeting_url: null,
      max_participants: 100,
      current_enrollment: 0,
      fee_amount: 25000,
      is_public: true,
      status: 'scheduled',
      created_at: now,
      updated_at: now
    });

    // Executive Coaching Certification - 1 session
    sessions.push({
      program_id: programs[2].id,
      session_name_en: '2026 Coaching Certification Program',
      session_name_fr: 'Programme de Certification en Coaching 2026',
      description_en: '6-month comprehensive executive coaching certification',
      description_fr: 'Certification complète en coaching exécutif de 6 mois',
      start_date: new Date('2026-06-01'),
      end_date: new Date('2026-12-01'),
      registration_deadline: new Date('2026-05-15'),
      location_type: 'hybrid',
      location_city: 'Yaoundé',
      location_address: 'Result Institute Campus',
      online_platform: 'Zoom',
      meeting_url: 'https://zoom.us/j/coaching2026',
      max_participants: 15,
      current_enrollment: 0,
      fee_amount: 500000,
      is_public: true,
      status: 'scheduled',
      created_at: now,
      updated_at: now
    });

    // Digital Transformation - 1 session
    sessions.push({
      program_id: programs[3].id,
      session_name_en: 'Digital Leaders Bootcamp - June 2026',
      session_name_fr: 'Bootcamp Leaders Numériques - Juin 2026',
      description_en: 'Intensive 2-week digital transformation bootcamp',
      description_fr: 'Bootcamp intensif de transformation numérique de 2 semaines',
      start_date: new Date('2026-06-08'),
      end_date: new Date('2026-06-19'),
      registration_deadline: new Date('2026-05-25'),
      location_type: 'online',
      location_city: null,
      location_address: null,
      online_platform: 'Microsoft Teams',
      meeting_url: 'https://teams.microsoft.com/digital-leaders-2026',
      max_participants: 50,
      current_enrollment: 0,
      fee_amount: 100000,
      is_public: true,
      status: 'scheduled',
      created_at: now,
      updated_at: now
    });

    await queryInterface.bulkInsert('training_sessions', sessions, {});

    console.log('✅ Training data seeded successfully!');
    console.log(`   - ${programs.length} training programs created`);
    console.log(`   - ${sessions.length} training sessions created`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('training_sessions', null, {});
    await queryInterface.bulkDelete('training_programs', null, {});
  }
};
