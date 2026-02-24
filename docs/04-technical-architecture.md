# Technical Architecture Documentation

**Project:** Result Institute Training Management System MVP1
**Architecture Pattern:** Three-Tier Architecture (Presentation, Business Logic, Data)
**Deployment Model:** Monolithic with microservice preparation

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  Browser   │  │   Mobile   │  │   Tablet   │            │
│  │  (Chrome,  │  │  (Safari,  │  │   (iPad,   │            │
│  │  Firefox)  │  │  Chrome)   │  │  Android)  │            │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘            │
└────────┼─────────────────┼─────────────────┼────────────────┘
         │                 │                 │
         │          HTTPS (TLS 1.3)          │
         └─────────────────┬─────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                     Nginx Reverse Proxy                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  SSL Termination | Load Balancing | Static Files      │ │
│  │  Caching | Compression | Rate Limiting                │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────┬────────────────────────────────┬─────────────────┘
           │                                │
    Static Files                        API Proxy
    (React Build)                      (Port 3001)
           │                                │
┌──────────▼────────────┐      ┌───────────▼──────────────────┐
│  Presentation Layer   │      │   Application Layer          │
│  ┌─────────────────┐  │      │  ┌────────────────────────┐  │
│  │   React.js      │  │      │  │   Express.js Server   │  │
│  │   Components    │  │      │  │   ┌────────────────┐  │  │
│  │   ┌──────────┐  │  │      │  │   │  Auth          │  │  │
│  │   │ Pages    │  │  │      │  │   │  Middleware    │  │  │
│  │   │ Layout   │  │  │      │  │   └────────────────┘  │  │
│  │   │ Forms    │  │  │      │  │   ┌────────────────┐  │  │
│  │   │ Tables   │  │  │      │  │   │  API Routes    │  │  │
│  │   └──────────┘  │  │      │  │   │  Controllers   │  │  │
│  │   ┌──────────┐  │  │      │  │   │  Services      │  │  │
│  │   │ State    │  │  │      │  │   └────────────────┘  │  │
│  │   │ Manage   │  │  │      │  │   ┌────────────────┐  │  │
│  │   │ Context  │  │  │      │  │   │  Validation    │  │  │
│  │   └──────────┘  │  │      │  │   └────────────────┘  │  │
│  └─────────────────┘  │      │  └────────┬───────────────┘  │
└───────────────────────┘      └───────────┼──────────────────┘
                                           │
                              ┌────────────▼──────────────┐
                              │     Data Access Layer     │
                              │  ┌──────────────────────┐ │
                              │  │  Sequelize ORM       │ │
                              │  │  Models | Migrations │ │
                              │  └──────────┬───────────┘ │
                              └─────────────┼─────────────┘
                                            │
                              ┌─────────────▼─────────────┐
                              │   PostgreSQL Database     │
                              │  ┌──────────────────────┐ │
                              │  │  Tables | Views      │ │
                              │  │  Indexes | Triggers  │ │
                              │  └──────────────────────┘ │
                              └───────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  External Services                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  YouTube API │  │  SendGrid    │  │  Let's       │      │
│  │  (Videos)    │  │  (Email)     │  │  Encrypt     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Technology Stack
- **Framework:** React 18.2+
- **Build Tool:** Vite 5+
- **Language:** JavaScript (ES6+) / TypeScript (recommended)
- **State Management:** React Context API + useReducer
- **Routing:** React Router v6
- **UI Library:** Material-UI (MUI) v5
- **Forms:** React Hook Form + Yup
- **HTTP Client:** Axios
- **Charts:** Recharts or Chart.js
- **Date Handling:** date-fns
- **Drag & Drop:** react-beautiful-dnd (for Kanban)

### Folder Structure

```
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       ├── images/
│       └── icons/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── routes.jsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Loader.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── dashboard/
│   │   │   ├── DashboardCard.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   └── ActivityFeed.jsx
│   │   ├── trainings/
│   │   │   ├── TrainingCard.jsx
│   │   │   ├── TrainingForm.jsx
│   │   │   ├── SessionList.jsx
│   │   │   └── EnrollmentForm.jsx
│   │   ├── blog/
│   │   │   ├── BlogCard.jsx
│   │   │   ├── BlogEditor.jsx
│   │   │   └── YouTubeEmbed.jsx
│   │   └── projects/
│   │       ├── KanbanBoard.jsx
│   │       ├── TaskCard.jsx
│   │       └── ProjectForm.jsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   └── GroundFollowUp.jsx
│   │   ├── trainings/
│   │   │   ├── TrainingsList.jsx
│   │   │   ├── TrainingDetail.jsx
│   │   │   ├── CreateTraining.jsx
│   │   │   └── MyEnrollments.jsx
│   │   ├── blog/
│   │   │   ├── BlogList.jsx
│   │   │   ├── BlogPost.jsx
│   │   │   └── CreatePost.jsx
│   │   ├── projects/
│   │   │   ├── ProjectsList.jsx
│   │   │   └── ProjectBoard.jsx
│   │   ├── users/
│   │   │   ├── UsersList.jsx
│   │   │   ├── UserProfile.jsx
│   │   │   └── Settings.jsx
│   │   └── NotFound.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── NotificationContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useApi.js
│   │   ├── useDebounce.js
│   │   └── useLocalStorage.js
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.service.js
│   │   ├── training.service.js
│   │   ├── blog.service.js
│   │   ├── project.service.js
│   │   └── user.service.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   └── formatters.js
│   ├── styles/
│   │   ├── theme.js
│   │   ├── global.css
│   │   └── variables.css
│   └── config/
│       └── config.js
├── .env.example
├── .env
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

### State Management Architecture

```javascript
// AuthContext.jsx - Example
import { createContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    case 'UPDATE_PROFILE':
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: true
  });

  // Check for stored token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and load user
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### API Service Layer

```javascript
// api.js - Axios configuration
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://resultinstitude.fayshaa.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

## Backend Architecture

### Technology Stack
- **Runtime:** Node.js 18+ LTS
- **Framework:** Express.js 4.18+
- **Language:** JavaScript (ES6+) / TypeScript (recommended)
- **ORM:** Sequelize 6+
- **Authentication:** jsonwebtoken, bcrypt
- **Validation:** Joi or express-validator
- **Logging:** Winston
- **Process Manager:** PM2
- **Testing:** Jest, Supertest

### Folder Structure

```
backend/
├── src/
│   ├── app.js                 # Express app setup
│   ├── server.js              # Server entry point
│   ├── config/
│   │   ├── database.js        # Database configuration
│   │   ├── jwt.js             # JWT configuration
│   │   └── email.js           # Email configuration
│   ├── middleware/
│   │   ├── auth.middleware.js      # Authentication
│   │   ├── authorize.middleware.js # Authorization
│   │   ├── validate.middleware.js  # Validation
│   │   ├── error.middleware.js     # Error handling
│   │   └── logger.middleware.js    # Request logging
│   ├── routes/
│   │   ├── index.js           # Route aggregator
│   │   ├── auth.routes.js     # /api/auth/*
│   │   ├── user.routes.js     # /api/users/*
│   │   ├── training.routes.js # /api/trainings/*
│   │   ├── session.routes.js  # /api/sessions/*
│   │   ├── enrollment.routes.js
│   │   ├── attendance.routes.js
│   │   ├── blog.routes.js     # /api/blog/*
│   │   ├── project.routes.js  # /api/projects/*
│   │   └── task.routes.js     # /api/tasks/*
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── training.controller.js
│   │   ├── session.controller.js
│   │   ├── enrollment.controller.js
│   │   ├── attendance.controller.js
│   │   ├── blog.controller.js
│   │   ├── project.controller.js
│   │   └── task.controller.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── email.service.js
│   │   ├── youtube.service.js
│   │   └── logger.service.js
│   ├── models/
│   │   ├── index.js
│   │   ├── User.js
│   │   ├── Training.js
│   │   ├── Session.js
│   │   ├── Enrollment.js
│   │   ├── Attendance.js
│   │   ├── BlogPost.js
│   │   ├── Project.js
│   │   ├── Task.js
│   │   ├── ActivityLog.js
│   │   └── RefreshToken.js
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── user.validator.js
│   │   ├── training.validator.js
│   │   └── blog.validator.js
│   ├── utils/
│   │   ├── helpers.js
│   │   ├── constants.js
│   │   └── errors.js
│   └── database/
│       ├── migrations/
│       │   ├── 001-create-users.js
│       │   ├── 002-create-trainings.js
│       │   └── ...
│       └── seeders/
│           ├── 001-seed-admin-user.js
│           └── 002-seed-sample-trainings.js
├── tests/
│   ├── unit/
│   │   ├── services/
│   │   └── utils/
│   └── integration/
│       ├── auth.test.js
│       ├── trainings.test.js
│       └── blog.test.js
├── .env.example
├── .env
├── .gitignore
├── package.json
├── ecosystem.config.js        # PM2 config
└── README.md
```

### API Structure

#### RESTful API Endpoints

```
Authentication & Users
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - Login user
POST   /api/auth/refresh         - Refresh access token
POST   /api/auth/logout          - Logout user
GET    /api/users                - Get all users (admin only)
GET    /api/users/:id            - Get user by ID
PUT    /api/users/:id            - Update user
DELETE /api/users/:id            - Delete user (admin only)
GET    /api/users/profile        - Get current user profile

Trainings
GET    /api/trainings            - Get all trainings
GET    /api/trainings/:id        - Get training by ID
POST   /api/trainings            - Create training (admin/trainer)
PUT    /api/trainings/:id        - Update training
DELETE /api/trainings/:id        - Delete training
GET    /api/trainings/:id/sessions - Get training sessions
GET    /api/trainings/:id/enrollments - Get enrollments

Sessions
GET    /api/sessions             - Get all sessions
GET    /api/sessions/:id         - Get session by ID
POST   /api/sessions             - Create session
PUT    /api/sessions/:id         - Update session
DELETE /api/sessions/:id         - Delete session
GET    /api/sessions/:id/attendance - Get session attendance

Enrollments
GET    /api/enrollments          - Get all enrollments
GET    /api/enrollments/:id      - Get enrollment by ID
POST   /api/enrollments          - Enroll participant
PUT    /api/enrollments/:id      - Update enrollment
DELETE /api/enrollments/:id      - Unenroll participant
GET    /api/enrollments/user/:userId - Get user's enrollments

Attendance
GET    /api/attendance           - Get all attendance records
POST   /api/attendance           - Mark attendance
PUT    /api/attendance/:id       - Update attendance
GET    /api/attendance/session/:sessionId - Get session attendance
GET    /api/attendance/user/:userId - Get user's attendance

Blog
GET    /api/blog                 - Get all blog posts
GET    /api/blog/:slug           - Get blog post by slug
POST   /api/blog                 - Create blog post (admin/trainer)
PUT    /api/blog/:id             - Update blog post
DELETE /api/blog/:id             - Delete blog post
GET    /api/blog/category/:cat   - Get posts by category

Projects & Tasks
GET    /api/projects             - Get all projects
GET    /api/projects/:id         - Get project by ID
POST   /api/projects             - Create project
PUT    /api/projects/:id         - Update project
DELETE /api/projects/:id         - Delete project
GET    /api/projects/:id/tasks   - Get project tasks
POST   /api/tasks                - Create task
PUT    /api/tasks/:id            - Update task
DELETE /api/tasks/:id            - Delete task

Analytics & Reports
GET    /api/analytics/overview   - System overview stats
GET    /api/analytics/trainings  - Training statistics
GET    /api/analytics/attendance - Attendance reports
GET    /api/analytics/users      - User statistics
```

### Middleware Stack

```javascript
// app.js - Middleware configuration
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://resultinstitude.fayshaa.com',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Logging
app.use(morgan('combined'));

// Routes
app.use('/api', routes);

// Error handling
app.use(errorMiddleware);

export default app;
```

### Authentication Flow

```javascript
// auth.middleware.js
import jwt from 'jsonwebtoken';
import { User } from '../models';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ['password_hash'] }
    });

    if (!user || user.status !== 'active') {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// authorize.middleware.js
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
};
```

## Database Layer

### Sequelize Model Example

```javascript
// models/Training.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Training = sequelize.define('Training', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  category: {
    type: DataTypes.STRING(100)
  },
  slug: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'archived'),
    defaultValue: 'draft'
  },
  level: {
    type: DataTypes.ENUM('beginner', 'intermediate', 'advanced')
  },
  duration_hours: {
    type: DataTypes.INTEGER
  },
  max_participants: {
    type: DataTypes.INTEGER
  },
  start_date: {
    type: DataTypes.DATEONLY
  },
  end_date: {
    type: DataTypes.DATEONLY
  },
  location: {
    type: DataTypes.STRING(255)
  },
  image_url: {
    type: DataTypes.STRING(500)
  },
  created_by: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'trainings',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Associations
Training.associate = (models) => {
  Training.belongsTo(models.User, {
    foreignKey: 'created_by',
    as: 'creator'
  });
  Training.hasMany(models.Session, {
    foreignKey: 'training_id',
    as: 'sessions'
  });
  Training.hasMany(models.Enrollment, {
    foreignKey: 'training_id',
    as: 'enrollments'
  });
};

export default Training;
```

## Deployment Architecture

### PM2 Process Management

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'resultinstitute-api',
    script: './src/server.js',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    max_memory_restart: '500M',
    watch: false,
    ignore_watch: ['node_modules', 'logs', 'uploads']
  }]
};
```

### Environment Variables

```bash
# .env.example
NODE_ENV=production
PORT=3001
HOST=0.0.0.0

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/resultinstitute_db
DB_POOL_MAX=20
DB_POOL_MIN=5

# JWT
JWT_SECRET=your-256-bit-secret-here
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d

# Frontend URL
FRONTEND_URL=https://resultinstitude.fayshaa.com

# Email (SendGrid)
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=noreply@resultinstitute.cm

# YouTube API
YOUTUBE_API_KEY=your-youtube-api-key

# Logging
LOG_LEVEL=info
```

## Security Architecture

### Security Layers

1. **Network Security**
   - HTTPS only (TLS 1.3)
   - Firewall rules
   - Rate limiting

2. **Application Security**
   - JWT authentication
   - Role-based access control
   - Input validation
   - XSS protection
   - CSRF protection
   - SQL injection prevention

3. **Data Security**
   - Password hashing (bcrypt)
   - Encrypted database connections
   - Secure session management
   - Audit logging

### Security Best Practices

```javascript
// Password hashing
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// JWT token generation
import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '24h' }
  );
};

export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' }
  );
};
```

## Performance Optimization

### Frontend Optimization
- Code splitting (React.lazy)
- Image lazy loading
- Virtual scrolling for long lists
- Debouncing search inputs
- Memoization (React.memo, useMemo)
- Service Worker for caching (future)

### Backend Optimization
- Database query optimization
- Connection pooling
- Response caching
- Compression (gzip)
- Pagination for large datasets
- Efficient eager loading

### Database Optimization
- Proper indexing
- Query optimization
- Connection pooling
- Regular VACUUM and ANALYZE

## Monitoring & Logging

### Application Logging

```javascript
// logger.service.js
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger;
```

## Testing Strategy

### Unit Tests
```javascript
// tests/unit/services/auth.service.test.js
import { hashPassword, comparePassword } from '../../../src/services/auth.service';

describe('Auth Service', () => {
  describe('hashPassword', () => {
    it('should hash password correctly', async () => {
      const password = 'Test123!';
      const hash = await hashPassword(password);
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(50);
    });
  });

  describe('comparePassword', () => {
    it('should return true for correct password', async () => {
      const password = 'Test123!';
      const hash = await hashPassword(password);
      const result = await comparePassword(password, hash);
      expect(result).toBe(true);
    });
  });
});
```

### Integration Tests
```javascript
// tests/integration/auth.test.js
import request from 'supertest';
import app from '../../src/app';

describe('Auth API', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Test123!',
          first_name: 'Test',
          last_name: 'User',
          role: 'participant'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
    });
  });
});
```

---

**Document Version:** 1.0
**Last Updated:** February 24, 2026
**Architecture Type:** Three-Tier Monolithic
