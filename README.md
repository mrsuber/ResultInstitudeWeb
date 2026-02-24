# Result Institute Training Management System

> A comprehensive web platform for managing leadership training programs, monitoring participant progress, and coordinating projects at Result Institute, Douala, Cameroon.

[![Live](https://img.shields.io/badge/Live-Online-success)](https://resultinstitude.fayshaa.com)
[![Status](https://img.shields.io/badge/Status-In%20Development-yellow)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue)]()
[![Node](https://img.shields.io/badge/Node.js-18+-green)]()
[![React](https://img.shields.io/badge/React-18+-61DAFB)]()

## Overview

The Result Institute Training Management System (MVP1) is a custom-built platform designed to streamline the management and delivery of leadership development programs. It provides real-time monitoring, participant tracking, content delivery, and project coordination capabilities.

### Key Features

- **User Management** - Role-based access control (Admin, Trainer, Participant)
- **Training Programs** - Create and manage courses, sessions, and enrollments
- **Ground Follow-Up** - Real-time dashboards for activity tracking and progress monitoring
- **Attendance Tracking** - Mark and monitor participant attendance for sessions
- **Blog & Videos** - Content publishing with embedded YouTube videos
- **Project Coordination** - Kanban-style board for task and project management
- **Analytics** - Reports and statistics on trainings, attendance, and progress

### Built For

**Client:** Result Institute
**Founded By:** Abba Abdouraman
**Location:** Douala, Cameroon
**Focus Areas:**
- Personal and Executive Development
- Leadership Training
- Youth Empowerment
- Entrepreneurship Coaching

## Technology Stack

### Frontend
- **Framework:** React.js 18+ with Vite
- **UI Library:** Material-UI (MUI) v5
- **State Management:** React Context API
- **Forms:** React Hook Form + Yup validation
- **HTTP Client:** Axios
- **Routing:** React Router v6

### Backend
- **Runtime:** Node.js 18+ LTS
- **Framework:** Express.js 4.18+
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Joi / express-validator
- **Logging:** Winston

### Database
- **Database:** PostgreSQL 14+
- **ORM:** Sequelize 6+
- **Migrations:** Sequelize CLI

### Infrastructure
- **Hosting:** VPS at 76.13.41.99
- **Web Server:** Nginx 1.24.0
- **Process Manager:** PM2
- **SSL:** Let's Encrypt
- **Domain:** resultinstitude.fayshaa.com

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ResultInstitudeWeb
   ```

2. **Install Dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

3. **Set Up Environment Variables**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Edit backend/.env with your configuration

   # Frontend
   cp frontend/.env.example frontend/.env
   # Edit frontend/.env with your configuration
   ```

4. **Set Up Database**
   ```bash
   # Create database
   createdb resultinstitute_db

   # Run migrations
   cd backend
   npx sequelize-cli db:migrate

   # Seed initial data (optional)
   npx sequelize-cli db:seed:all
   ```

5. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend (runs on port 3001)
   cd backend
   npm run dev

   # Terminal 2 - Frontend (runs on port 5173)
   cd frontend
   npm run dev
   ```

6. **Access Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001/api

## Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) folder:

- **[Infrastructure Setup](./docs/01-infrastructure-setup.md)** - Server configuration, Nginx, SSL, deployment
- **[Implementation Plan](./docs/02-implementation-plan.md)** - Project roadmap, timeline, and milestones
- **[Database Schema](./docs/03-database-schema.md)** - Complete database design and SQL definitions
- **[Technical Architecture](./docs/04-technical-architecture.md)** - System architecture and design patterns

[📚 View Full Documentation](./docs/README.md)

## Project Structure

```
ResultInstitudeWeb/
├── frontend/                 # React.js frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React Context providers
│   │   ├── services/        # API service layer
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   └── styles/          # Global styles and theme
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Node.js/Express backend API
│   ├── src/
│   │   ├── routes/          # API route definitions
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Sequelize models
│   │   ├── middleware/      # Express middleware
│   │   ├── services/        # Business logic
│   │   ├── validators/      # Input validation schemas
│   │   ├── utils/           # Utility functions
│   │   └── database/        # Migrations and seeders
│   ├── tests/               # Unit and integration tests
│   └── package.json
├── docs/                    # Project documentation
│   ├── 01-infrastructure-setup.md
│   ├── 02-implementation-plan.md
│   ├── 03-database-schema.md
│   ├── 04-technical-architecture.md
│   └── README.md
├── Report_Result_institude.pdf  # Project proposal document
└── README.md                # This file
```

## API Documentation

### Authentication Endpoints
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
POST   /api/auth/refresh     - Refresh access token
POST   /api/auth/logout      - Logout user
```

### Core Resource Endpoints
```
/api/users                   - User management
/api/trainings               - Training programs
/api/sessions                - Training sessions
/api/enrollments             - Course enrollments
/api/attendance              - Attendance tracking
/api/blog                    - Blog posts
/api/projects                - Project management
/api/tasks                   - Task management
/api/analytics               - Reports and statistics
```

[📖 View Complete API Documentation](./docs/04-technical-architecture.md#api-structure)

## Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Test coverage
npm run test:coverage
```

### Code Quality
```bash
# Linting
npm run lint

# Code formatting
npm run format
```

### Database Migrations
```bash
# Create new migration
npx sequelize-cli migration:generate --name add-new-feature

# Run migrations
npx sequelize-cli db:migrate

# Rollback migration
npx sequelize-cli db:migrate:undo
```

## Deployment

### Production Build

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   # Output: frontend/dist/
   ```

2. **Prepare Backend**
   ```bash
   cd backend
   npm run build  # If using TypeScript
   ```

3. **Deploy to VPS**
   ```bash
   # Copy frontend build
   scp -r frontend/dist/* root@76.13.41.99:/var/www/resultinstitude/frontend/

   # Copy backend files
   scp -r backend/* root@76.13.41.99:/var/www/resultinstitude/backend/
   ```

4. **Start with PM2**
   ```bash
   ssh root@76.13.41.99
   cd /var/www/resultinstitude/backend
   pm2 start ecosystem.config.js
   pm2 save
   ```

[📘 View Detailed Deployment Guide](./docs/01-infrastructure-setup.md#deployment-checklist)

## User Roles

### Admin
- Full system access and configuration
- User management
- Training program creation
- System analytics and reports

### Trainer/Mentor
- Create and manage assigned training programs
- Track participant progress
- Manage session attendance
- Post blog content

### Participant/Student
- View enrolled training programs
- Access training materials and blog posts
- Submit progress updates
- View assigned tasks

## Security

- **Authentication:** JWT-based authentication with refresh tokens
- **Authorization:** Role-based access control (RBAC)
- **Password Security:** bcrypt hashing with salt rounds
- **Data Protection:** HTTPS only, secure headers, input validation
- **API Security:** Rate limiting, CORS configuration
- **Database Security:** Parameterized queries, connection pooling

[🔒 View Security Documentation](./docs/04-technical-architecture.md#security-architecture)

## Performance

- **Frontend:** Code splitting, lazy loading, memoization
- **Backend:** Connection pooling, query optimization, compression
- **Database:** Proper indexing, efficient queries, caching
- **Target Metrics:**
  - Page load: < 2 seconds
  - API response: < 500ms
  - Support: 100-500 concurrent users

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is proprietary software developed by Camsol Technologies Ltd. for Result Institute.

**Copyright © 2026 Camsol Technologies Ltd. All rights reserved.**

## Contact & Support

### Development Team
**Company:** Camsol Technologies Ltd.
**Address:** Clerks Quarters, 00000 Buea, Cameroon
**Email:** info@camsoltechnology.com
**Phone:** +237 5325 5547
**Website:** www.camsoltechnology.com

**Technical Lead:** Mohamad Siysinyuy Banbong

### Client
**Organization:** Result Institute
**CEO & Founder:** Abba Abdouraman
**Location:** Douala, Cameroon

## Acknowledgments

- Result Institute team for their collaboration and requirements
- Open-source community for the amazing tools and libraries
- Let's Encrypt for free SSL certificates

---

**Project Status:** In Development
**Current Phase:** Planning & Documentation
**Expected Launch:** April 2026

**Live URL:** https://resultinstitude.fayshaa.com

---

Made with ❤️ by [Camsol Technologies Ltd.](https://www.camsoltechnology.com)
