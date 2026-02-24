# Database Schema Documentation

**Database:** PostgreSQL 14+
**Database Name:** resultinstitute_db
**ORM:** Sequelize / Prisma
**Encoding:** UTF-8

## Database Connection

### Connection String Format
```
postgresql://username:password@localhost:5432/resultinstitute_db
```

### Connection Pool Configuration
```javascript
{
  max: 20,              // Maximum number of connections
  min: 5,               // Minimum number of connections
  idle: 10000,          // Maximum time (ms) a connection can be idle
  acquire: 30000,       // Maximum time (ms) to acquire a connection
  evict: 1000          // Time interval to run eviction
}
```

## Schema Overview

### Entity Relationship Diagram (ERD) Summary
```
Users (1) ----< (M) Enrollments (M) >---- (1) Trainings
  |                                            |
  | (1)                                        | (1)
  |                                            |
  v (M)                                        v (M)
Attendance                                  Sessions
  |
  | (M)
  |
  v (1)
Sessions

Users (1) ----< (M) BlogPosts
Users (1) ----< (M) Projects (1) ----< (M) Tasks
Users (M) ----< (1) Tasks (assigned)
Users (1) ----< (M) ActivityLogs
```

## Table Definitions

### 1. users

Stores all system users including admins, trainers, and participants.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'trainer', 'participant')),
    phone VARCHAR(20),
    avatar_url VARCHAR(500),
    bio TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    last_login_at TIMESTAMP WITH TIME ZONE,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
```

**Sample Data:**
```sql
INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES
('abba@resultinstitute.cm', '$2b$12$...', 'Abba', 'Abdouraman', 'admin'),
('trainer1@resultinstitute.cm', '$2b$12$...', 'John', 'Doe', 'trainer'),
('participant1@example.com', '$2b$12$...', 'Jane', 'Smith', 'participant');
```

---

### 2. trainings

Training programs/courses offered by Result Institute.

```sql
CREATE TABLE trainings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    slug VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    level VARCHAR(20) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    duration_hours INTEGER,
    max_participants INTEGER,
    start_date DATE,
    end_date DATE,
    location VARCHAR(255),
    image_url VARCHAR(500),
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_trainings_status ON trainings(status);
CREATE INDEX idx_trainings_category ON trainings(category);
CREATE INDEX idx_trainings_slug ON trainings(slug);
CREATE INDEX idx_trainings_created_by ON trainings(created_by);
```

**Sample Categories:**
- Personal Development
- Executive Development
- Leadership Training
- Youth Empowerment
- Entrepreneurship Coaching

---

### 3. sessions

Individual training sessions/events within a training program.

```sql
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    training_id INTEGER NOT NULL REFERENCES trainings(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    session_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255),
    duration_minutes INTEGER DEFAULT 120,
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'ongoing', 'completed', 'cancelled')),
    max_attendees INTEGER,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sessions_training_id ON sessions(training_id);
CREATE INDEX idx_sessions_date ON sessions(session_date);
CREATE INDEX idx_sessions_status ON sessions(status);
```

---

### 4. enrollments

Tracks which participants are enrolled in which training programs.

```sql
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    training_id INTEGER NOT NULL REFERENCES trainings(id) ON DELETE CASCADE,
    enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped', 'suspended')),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    completion_date DATE,
    certificate_issued BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, training_id)
);

CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_enrollments_training_id ON enrollments(training_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);
```

---

### 5. attendance

Tracks attendance for each session.

```sql
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    session_id INTEGER NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent', 'excused', 'late')),
    checked_in_at TIMESTAMP WITH TIME ZONE,
    checked_out_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    marked_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(session_id, user_id)
);

CREATE INDEX idx_attendance_session_id ON attendance(session_id);
CREATE INDEX idx_attendance_user_id ON attendance(user_id);
CREATE INDEX idx_attendance_status ON attendance(status);
```

---

### 6. blog_posts

Blog content with embedded YouTube videos.

```sql
CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt VARCHAR(500),
    author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(100),
    tags VARCHAR(255)[],
    youtube_video_id VARCHAR(50),
    youtube_video_url VARCHAR(500),
    featured_image_url VARCHAR(500),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    views INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_author_id ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
```

---

### 7. projects

Collaborative projects and initiatives.

```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'on_hold', 'completed', 'cancelled')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10, 2),
    location VARCHAR(255),
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_priority ON projects(priority);
CREATE INDEX idx_projects_created_by ON projects(created_by);
```

---

### 8. tasks

Individual tasks within projects.

```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    assigned_to INTEGER REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'review', 'done')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    due_date DATE,
    completed_at TIMESTAMP WITH TIME ZONE,
    order_index INTEGER DEFAULT 0,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
```

---

### 9. activity_logs

System activity and audit trail.

```sql
CREATE TABLE activity_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id INTEGER,
    description TEXT,
    metadata JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_action ON activity_logs(action);
CREATE INDEX idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);
```

**Common Actions:**
- user_login, user_logout
- training_created, training_updated, training_deleted
- enrollment_created, enrollment_updated
- attendance_marked
- blog_post_published
- task_assigned, task_completed

---

### 10. refresh_tokens

JWT refresh token management.

```sql
CREATE TABLE refresh_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_revoked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
CREATE INDEX idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);
```

---

## Views

### v_training_summary

Summary view of trainings with enrollment statistics.

```sql
CREATE VIEW v_training_summary AS
SELECT
    t.id,
    t.title,
    t.category,
    t.status,
    t.start_date,
    t.end_date,
    t.max_participants,
    COUNT(DISTINCT e.id) as total_enrollments,
    COUNT(DISTINCT CASE WHEN e.status = 'completed' THEN e.id END) as completed_enrollments,
    COUNT(DISTINCT s.id) as total_sessions,
    COUNT(DISTINCT CASE WHEN s.status = 'completed' THEN s.id END) as completed_sessions,
    CONCAT(u.first_name, ' ', u.last_name) as created_by_name
FROM trainings t
LEFT JOIN enrollments e ON t.id = e.training_id
LEFT JOIN sessions s ON t.id = s.training_id
LEFT JOIN users u ON t.created_by = u.id
GROUP BY t.id, u.first_name, u.last_name;
```

### v_participant_progress

View of participant progress across all trainings.

```sql
CREATE VIEW v_participant_progress AS
SELECT
    u.id as user_id,
    CONCAT(u.first_name, ' ', u.last_name) as participant_name,
    u.email,
    t.id as training_id,
    t.title as training_title,
    e.enrollment_date,
    e.status as enrollment_status,
    e.progress,
    COUNT(DISTINCT s.id) as total_sessions,
    COUNT(DISTINCT a.id) as attended_sessions,
    CASE
        WHEN COUNT(DISTINCT s.id) > 0
        THEN ROUND((COUNT(DISTINCT a.id)::numeric / COUNT(DISTINCT s.id)::numeric) * 100, 2)
        ELSE 0
    END as attendance_rate
FROM users u
INNER JOIN enrollments e ON u.id = e.user_id
INNER JOIN trainings t ON e.training_id = t.id
LEFT JOIN sessions s ON t.id = s.training_id
LEFT JOIN attendance a ON s.id = a.session_id AND u.id = a.user_id AND a.status = 'present'
WHERE u.role = 'participant'
GROUP BY u.id, u.first_name, u.last_name, u.email, t.id, t.title, e.enrollment_date, e.status, e.progress;
```

---

## Triggers

### Updated Timestamp Trigger

Automatically update `updated_at` column on row update.

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at column
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trainings_updated_at BEFORE UPDATE ON trainings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON enrollments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_attendance_updated_at BEFORE UPDATE ON attendance
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## Database Initialization Script

Create a file: `database/init.sql`

```sql
-- Create database
CREATE DATABASE resultinstitute_db WITH ENCODING 'UTF8';

-- Connect to database
\c resultinstitute_db;

-- Create extension for UUID if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create extension for fuzzy search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create all tables (copy from above)
-- ... (include all CREATE TABLE statements)

-- Create views
-- ... (include all CREATE VIEW statements)

-- Create triggers
-- ... (include all CREATE TRIGGER statements)

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE resultinstitute_db TO resultinstitute_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO resultinstitute_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO resultinstitute_user;
```

---

## Database User Creation

```sql
-- Create database user
CREATE USER resultinstitute_user WITH PASSWORD 'secure_password_here';

-- Grant permissions
GRANT CONNECT ON DATABASE resultinstitute_db TO resultinstitute_user;
GRANT USAGE ON SCHEMA public TO resultinstitute_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO resultinstitute_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO resultinstitute_user;

-- For future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL PRIVILEGES ON TABLES TO resultinstitute_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL PRIVILEGES ON SEQUENCES TO resultinstitute_user;
```

---

## Backup & Restore

### Backup Database
```bash
# Full backup
pg_dump -U postgres resultinstitute_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Compressed backup
pg_dump -U postgres resultinstitute_db | gzip > backup_$(date +%Y%m%d_%H%M%S).sql.gz

# Schema only
pg_dump -U postgres -s resultinstitute_db > schema_backup.sql

# Data only
pg_dump -U postgres -a resultinstitute_db > data_backup.sql
```

### Restore Database
```bash
# Restore from backup
psql -U postgres resultinstitute_db < backup_20260224_120000.sql

# Restore from compressed backup
gunzip -c backup_20260224_120000.sql.gz | psql -U postgres resultinstitute_db
```

### Automated Backup Script
```bash
#!/bin/bash
# /usr/local/bin/backup-resultinstitute-db.sh

BACKUP_DIR="/var/backups/postgresql/resultinstitute"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DB_NAME="resultinstitute_db"
RETENTION_DAYS=30

# Create backup directory
mkdir -p $BACKUP_DIR

# Perform backup
pg_dump -U postgres $DB_NAME | gzip > $BACKUP_DIR/backup_$TIMESTAMP.sql.gz

# Remove old backups
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +$RETENTION_DAYS -delete

echo "Backup completed: backup_$TIMESTAMP.sql.gz"
```

### Cron Job for Daily Backup
```bash
# Add to crontab
0 2 * * * /usr/local/bin/backup-resultinstitute-db.sh >> /var/log/db-backup.log 2>&1
```

---

## Performance Optimization

### Indexing Strategy
- Index all foreign keys
- Index frequently queried columns (status, dates, email)
- Use partial indexes for filtered queries
- Use composite indexes for multi-column queries

### Query Optimization Tips
- Use EXPLAIN ANALYZE to identify slow queries
- Avoid SELECT * in production
- Use pagination for large datasets
- Cache frequently accessed data
- Use database connection pooling

### Maintenance Queries
```sql
-- Analyze tables
ANALYZE users;
ANALYZE trainings;
ANALYZE enrollments;

-- Vacuum tables
VACUUM ANALYZE;

-- Reindex
REINDEX TABLE users;

-- Check table size
SELECT
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

**Document Version:** 1.0
**Last Updated:** February 24, 2026
**Database Version:** PostgreSQL 14+
