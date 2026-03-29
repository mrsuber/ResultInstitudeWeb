'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    await queryInterface.bulkInsert('blog_posts', [
      {
        title: 'Welcome to Result Institute Training Management System',
        slug: 'welcome-to-result-institute-training-management-system',
        excerpt: 'Discover our comprehensive training management platform designed for excellence in professional development.',
        content: `We are thrilled to introduce the Result Institute Training Management System, a cutting-edge platform designed to streamline and enhance your training operations.

## What We Offer

Our platform provides:

- **Comprehensive Training Programs**: Manage diverse training programs with ease
- **Session Management**: Schedule and track training sessions effortlessly
- **Attendance Tracking**: Real-time attendance monitoring and reporting
- **Project Management**: Built-in Kanban boards for task management
- **Analytics Dashboard**: Insights into enrollment trends and performance metrics

## Getting Started

To get started with our platform, simply log in with your credentials and explore the various modules available in your dashboard.

## Support

Our dedicated support team is always here to help you make the most of our platform. Contact us anytime for assistance.

Welcome aboard!`,
        author_id: 1,
        category: 'News',
        tags: ['announcement', 'welcome', 'platform'],
        status: 'published',
        published_at: now,
        views_count: 125,
        is_featured: true,
        meta_title: 'Welcome to Result Institute - Training Management Platform',
        meta_description: 'Discover our comprehensive training management platform designed for excellence',
        created_at: now,
        updated_at: now
      },
      {
        title: 'Best Practices for Training Program Management',
        slug: 'best-practices-for-training-program-management',
        excerpt: 'Learn effective strategies for managing successful training programs and maximizing participant engagement.',
        content: `Training program management requires careful planning, execution, and monitoring. Here are some best practices to ensure success:

## 1. Clear Objectives

Define specific, measurable objectives for each training program. This helps participants understand what they will achieve.

## 2. Engaging Content

Use a mix of lectures, hands-on exercises, and interactive discussions to keep participants engaged.

## 3. Regular Assessment

Implement continuous assessment methods to track progress and identify areas for improvement.

## 4. Feedback Loop

Encourage feedback from participants and use it to refine and improve your training programs.

## 5. Technology Integration

Leverage modern tools and platforms like our training management system to streamline operations.

## Conclusion

By following these best practices, you can create impactful training programs that deliver real value to your participants.`,
        author_id: 1,
        category: 'Training',
        tags: ['best practices', 'management', 'training tips'],
        status: 'published',
        published_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        views_count: 87,
        is_featured: false,
        meta_title: 'Best Practices for Training Program Management',
        meta_description: 'Learn effective strategies for managing successful training programs',
        created_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        updated_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'The Future of Professional Development',
        slug: 'the-future-of-professional-development',
        excerpt: 'Exploring emerging trends in professional training and how technology is reshaping the learning landscape.',
        content: `The landscape of professional development is evolving rapidly. Let's explore the key trends shaping the future:

## Digital Transformation

Online learning platforms and virtual training sessions have become mainstream, offering flexibility and accessibility.

## Personalized Learning Paths

AI-driven recommendations help create customized learning experiences tailored to individual needs.

## Microlearning

Bite-sized learning modules enable professionals to learn at their own pace without overwhelming their schedules.

## Collaborative Learning

Social learning platforms foster peer-to-peer knowledge sharing and community building.

## Data-Driven Insights

Analytics help organizations measure training effectiveness and ROI more accurately.

## Continuous Learning Culture

Organizations are shifting from periodic training events to continuous learning environments.

Stay ahead of these trends with Result Institute!`,
        author_id: 1,
        category: 'Innovation',
        tags: ['future', 'trends', 'technology', 'learning'],
        status: 'published',
        published_at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
        views_count: 203,
        is_featured: true,
        meta_title: 'The Future of Professional Development - Result Institute',
        meta_description: 'Exploring emerging trends in professional training and technology',
        created_at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
        updated_at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'How to Boost Training Engagement',
        slug: 'how-to-boost-training-engagement',
        excerpt: 'Proven techniques to increase participant engagement and retention in training programs.',
        content: `Engagement is key to successful training outcomes. Here's how to keep participants motivated:

## Interactive Content

Replace passive lectures with interactive exercises, group discussions, and hands-on activities.

## Gamification

Incorporate game elements like points, badges, and leaderboards to make learning fun.

## Real-World Applications

Connect training content to real-world scenarios that participants encounter in their work.

## Varied Delivery Methods

Mix up your delivery with videos, quizzes, case studies, and practical exercises.

## Regular Breaks

Schedule appropriate breaks to maintain focus and prevent fatigue.

## Recognition

Acknowledge achievements and progress to motivate continued participation.

Implement these strategies to transform your training programs!`,
        author_id: 1,
        category: 'Training',
        tags: ['engagement', 'motivation', 'best practices'],
        status: 'published',
        published_at: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        views_count: 156,
        is_featured: false,
        meta_title: 'How to Boost Training Engagement - Result Institute',
        meta_description: 'Proven techniques to increase participant engagement in training',
        created_at: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        updated_at: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'Leveraging Analytics for Training Success',
        slug: 'leveraging-analytics-for-training-success',
        excerpt: 'Understand how data analytics can transform your training programs and improve outcomes.',
        content: `Data analytics is revolutionizing how organizations approach training. Here's what you need to know:

## Key Metrics to Track

- Enrollment rates and trends
- Attendance and completion rates
- Assessment scores and performance
- Post-training feedback and satisfaction
- ROI and business impact

## Benefits of Analytics

**Informed Decision Making**: Make data-driven decisions about program design and resource allocation.

**Early Intervention**: Identify struggling participants early and provide targeted support.

**Continuous Improvement**: Use insights to refine and optimize training content.

**Resource Optimization**: Allocate budget and resources more effectively.

## Implementation Tips

1. Define clear KPIs aligned with organizational goals
2. Use automated reporting tools for real-time insights
3. Regularly review and act on analytics findings
4. Share insights with stakeholders

Our platform provides comprehensive analytics to help you succeed!`,
        author_id: 1,
        category: 'Technology',
        tags: ['analytics', 'data', 'metrics', 'roi'],
        status: 'draft',
        published_at: null,
        views_count: 0,
        is_featured: false,
        meta_title: 'Leveraging Analytics for Training Success',
        meta_description: 'How data analytics can transform your training programs',
        created_at: now,
        updated_at: now
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('blog_posts', null, {});
  }
};
