# Training Management System - Technical Specification

**Project**: Result Institute Training Management Platform
**Version**: 1.0
**Date**: March 5, 2026
**Language Support**: English & French (Bilingual)

---

## 📋 Overview

A comprehensive training management system with public showcase capabilities, enabling Result Institute to:
- Manage training programs, sessions, and enrollments
- Track attendance and participant progress
- Share training impact with the public through photo galleries and testimonials
- Build an alumni network
- Support bilingual content (English/French)
- Enable social media sharing

---

## 🗄️ Database Schema

### 1. Training Programs Table
```sql
CREATE TABLE training_programs (
    id SERIAL PRIMARY KEY,
    title_en VARCHAR(255) NOT NULL,
    title_fr VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description_en TEXT NOT NULL,
    description_fr TEXT NOT NULL,
    public_description_en TEXT,
    public_description_fr TEXT,
    category VARCHAR(100) NOT NULL, -- 'leadership', 'youth', 'executive', 'custom'
    level VARCHAR(50) NOT NULL, -- 'beginner', 'intermediate', 'advanced'
    duration_hours INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    prerequisites_en TEXT,
    prerequisites_fr TEXT,
    objectives_en TEXT[],
    objectives_fr TEXT[],
    curriculum_en JSONB, -- [{module: 'name', topics: [...], hours: 4}]
    curriculum_fr JSONB,
    featured_image VARCHAR(500),
    certificate_available BOOLEAN DEFAULT true,
    is_public BOOLEAN DEFAULT false,
    show_on_homepage BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'published', 'archived'
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_training_programs_category ON training_programs(category);
CREATE INDEX idx_training_programs_status ON training_programs(status);
CREATE INDEX idx_training_programs_is_public ON training_programs(is_public);
```

### 2. Training Sessions Table
```sql
CREATE TABLE training_sessions (
    id SERIAL PRIMARY KEY,
    program_id INTEGER REFERENCES training_programs(id) ON DELETE CASCADE,
    session_name_en VARCHAR(255) NOT NULL,
    session_name_fr VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    schedule JSONB, -- [{day: 'Monday', start_time: '09:00', end_time: '17:00'}]
    location_type VARCHAR(20) NOT NULL, -- 'physical', 'online', 'hybrid'
    location_address TEXT,
    location_city VARCHAR(100),
    location_region VARCHAR(100),
    online_meeting_link VARCHAR(500),
    max_participants INTEGER NOT NULL,
    current_enrollment INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'upcoming', -- 'upcoming', 'ongoing', 'completed', 'cancelled'
    is_public BOOLEAN DEFAULT false,
    public_summary_en TEXT,
    public_summary_fr TEXT,
    highlight_en TEXT,
    highlight_fr TEXT,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_training_sessions_program ON training_sessions(program_id);
CREATE INDEX idx_training_sessions_status ON training_sessions(status);
CREATE INDEX idx_training_sessions_dates ON training_sessions(start_date, end_date);
```

### 3. Session Trainers Table (Many-to-Many)
```sql
CREATE TABLE session_trainers (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES training_sessions(id) ON DELETE CASCADE,
    trainer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'trainer', -- 'lead_trainer', 'co_trainer', 'facilitator'
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(session_id, trainer_id)
);

CREATE INDEX idx_session_trainers_session ON session_trainers(session_id);
CREATE INDEX idx_session_trainers_trainer ON session_trainers(trainer_id);
```

### 4. Enrollments Table
```sql
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES training_sessions(id) ON DELETE CASCADE,
    participant_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'completed', 'dropped'
    payment_status VARCHAR(20) DEFAULT 'not_applicable', -- 'not_applicable', 'pending', 'paid'
    photo_consent BOOLEAN DEFAULT false,
    consent_date TIMESTAMP WITH TIME ZONE,
    attendance_percentage DECIMAL(5,2) DEFAULT 0,
    progress_percentage DECIMAL(5,2) DEFAULT 0,
    completion_date TIMESTAMP WITH TIME ZONE,
    certificate_issued BOOLEAN DEFAULT false,
    certificate_url VARCHAR(500),
    notes TEXT,
    approved_by INTEGER REFERENCES users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(session_id, participant_id)
);

CREATE INDEX idx_enrollments_session ON enrollments(session_id);
CREATE INDEX idx_enrollments_participant ON enrollments(participant_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);
```

### 5. Attendance Records Table
```sql
CREATE TABLE attendance_records (
    id SERIAL PRIMARY KEY,
    enrollment_id INTEGER REFERENCES enrollments(id) ON DELETE CASCADE,
    session_id INTEGER REFERENCES training_sessions(id) ON DELETE CASCADE,
    attendance_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL, -- 'present', 'absent', 'late', 'excused'
    time_in TIME,
    time_out TIME,
    notes TEXT,
    marked_by INTEGER REFERENCES users(id),
    marked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(enrollment_id, attendance_date)
);

CREATE INDEX idx_attendance_enrollment ON attendance_records(enrollment_id);
CREATE INDEX idx_attendance_date ON attendance_records(attendance_date);
```

### 6. Training Media Table
```sql
CREATE TABLE training_media (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES training_sessions(id) ON DELETE CASCADE,
    media_type VARCHAR(20) NOT NULL, -- 'photo', 'video', 'document'
    file_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    caption_en TEXT,
    caption_fr TEXT,
    file_size INTEGER, -- in bytes
    mime_type VARCHAR(100),
    is_public BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    tags VARCHAR(100)[], -- ['group_photo', 'activity', 'certificate_ceremony']
    display_order INTEGER DEFAULT 0,
    uploaded_by INTEGER REFERENCES users(id),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_training_media_session ON training_media(session_id);
CREATE INDEX idx_training_media_public ON training_media(is_public);
CREATE INDEX idx_training_media_type ON training_media(media_type);
```

### 7. Testimonials Table
```sql
CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES training_sessions(id) ON DELETE CASCADE,
    participant_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    testimonial_text_en TEXT NOT NULL,
    testimonial_text_fr TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    is_approved BOOLEAN DEFAULT false,
    is_public BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    approved_by INTEGER REFERENCES users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_testimonials_session ON testimonials(session_id);
CREATE INDEX idx_testimonials_participant ON testimonials(participant_id);
CREATE INDEX idx_testimonials_public ON testimonials(is_public);
```

### 8. Alumni Network Table
```sql
CREATE TABLE alumni (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    bio_en TEXT,
    bio_fr TEXT,
    current_position VARCHAR(255),
    organization VARCHAR(255),
    linkedin_url VARCHAR(500),
    achievements_en TEXT[],
    achievements_fr TEXT[],
    is_public BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    featured_order INTEGER,
    joined_alumni_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_alumni_user ON alumni(user_id);
CREATE INDEX idx_alumni_public ON alumni(is_public);
```

### 9. Training Materials Table
```sql
CREATE TABLE training_materials (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES training_sessions(id) ON DELETE CASCADE,
    title_en VARCHAR(255) NOT NULL,
    title_fr VARCHAR(255),
    description_en TEXT,
    description_fr TEXT,
    file_url VARCHAR(500) NOT NULL,
    file_type VARCHAR(50), -- 'pdf', 'pptx', 'video', 'link'
    file_size INTEGER,
    access_level VARCHAR(20) DEFAULT 'enrolled', -- 'public', 'enrolled', 'completed'
    uploaded_by INTEGER REFERENCES users(id),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_training_materials_session ON training_materials(session_id);
```

---

## 🔌 API Endpoints

### Training Programs

**Admin/Trainer Routes:**
```
POST   /api/trainings/programs              - Create program
GET    /api/trainings/programs              - List all programs (with filters)
GET    /api/trainings/programs/:id          - Get program details
PUT    /api/trainings/programs/:id          - Update program
DELETE /api/trainings/programs/:id          - Delete program
POST   /api/trainings/programs/:id/publish  - Publish program (make public)
```

**Public Routes:**
```
GET    /api/trainings/public/programs       - List public programs
GET    /api/trainings/public/programs/:slug - Get public program details
```

### Training Sessions

**Admin/Trainer Routes:**
```
POST   /api/trainings/sessions                    - Create session
GET    /api/trainings/sessions                    - List sessions (with filters)
GET    /api/trainings/sessions/:id                - Get session details
PUT    /api/trainings/sessions/:id                - Update session
DELETE /api/trainings/sessions/:id                - Delete session
POST   /api/trainings/sessions/:id/trainers       - Assign trainer
DELETE /api/trainings/sessions/:id/trainers/:tid  - Remove trainer
POST   /api/trainings/sessions/:id/publish        - Make session public
```

**Public Routes:**
```
GET    /api/trainings/public/sessions           - List public sessions
GET    /api/trainings/public/sessions/:id       - Get public session details
GET    /api/trainings/public/sessions/calendar  - Get calendar view
```

### Enrollments

**Admin Routes:**
```
GET    /api/trainings/enrollments              - List all enrollments
GET    /api/trainings/enrollments/:id          - Get enrollment details
PUT    /api/trainings/enrollments/:id/approve  - Approve enrollment
PUT    /api/trainings/enrollments/:id/reject   - Reject enrollment
POST   /api/trainings/enrollments/:id/certificate - Issue certificate
```

**Participant Routes:**
```
POST   /api/trainings/enrollments              - Enroll in session
GET    /api/trainings/my-enrollments           - Get my enrollments
PUT    /api/trainings/enrollments/:id/consent  - Update photo consent
DELETE /api/trainings/enrollments/:id          - Withdraw enrollment
```

### Attendance

**Trainer Routes:**
```
POST   /api/trainings/attendance               - Mark attendance
GET    /api/trainings/sessions/:id/attendance  - Get session attendance
PUT    /api/trainings/attendance/:id           - Update attendance record
```

### Media & Gallery

**Admin Routes:**
```
POST   /api/trainings/media/upload             - Upload photo/video
GET    /api/trainings/sessions/:id/media       - Get session media
PUT    /api/trainings/media/:id                - Update media (caption, visibility)
DELETE /api/trainings/media/:id                - Delete media
POST   /api/trainings/media/:id/publish        - Make media public
```

**Public Routes:**
```
GET    /api/trainings/public/sessions/:id/gallery - Get public gallery
GET    /api/trainings/public/media/featured       - Get featured media
```

### Testimonials

**Participant Routes:**
```
POST   /api/trainings/testimonials             - Submit testimonial
GET    /api/trainings/my-testimonials          - Get my testimonials
PUT    /api/trainings/testimonials/:id         - Update testimonial
```

**Admin Routes:**
```
GET    /api/trainings/testimonials             - List all testimonials
PUT    /api/trainings/testimonials/:id/approve - Approve testimonial
PUT    /api/trainings/testimonials/:id/feature - Feature testimonial
DELETE /api/trainings/testimonials/:id         - Delete testimonial
```

**Public Routes:**
```
GET    /api/trainings/public/testimonials      - Get public testimonials
GET    /api/trainings/public/testimonials/featured - Get featured testimonials
```

### Alumni Network

**Admin Routes:**
```
POST   /api/alumni                             - Add user to alumni
GET    /api/alumni                             - List all alumni
PUT    /api/alumni/:id                         - Update alumni profile
DELETE /api/alumni/:id                         - Remove from alumni
POST   /api/alumni/:id/feature                 - Feature alumni
```

**User Routes:**
```
GET    /api/alumni/my-profile                  - Get my alumni profile
PUT    /api/alumni/my-profile                  - Update my alumni profile
```

**Public Routes:**
```
GET    /api/public/alumni                      - List public alumni
GET    /api/public/alumni/featured             - Get featured alumni
```

### Social Sharing

```
GET    /api/trainings/public/share/:sessionId  - Get social share metadata
POST   /api/trainings/share/track              - Track social share (analytics)
```

---

## 🎨 Admin Dashboard Pages

### 1. Trainings Overview (`/dashboard/trainings`)
- Stats cards: Total Programs, Active Sessions, Total Enrollments, Completion Rate
- Quick actions: Create Program, Create Session
- Recent trainings table
- Upcoming sessions calendar widget

### 2. Programs Management (`/dashboard/trainings/programs`)
- Data table with filters (category, status, public/private)
- Columns: Title, Category, Sessions, Enrollments, Status, Public, Actions
- Create/Edit program button
- Bulk actions (publish, archive)

### 3. Create/Edit Program (`/dashboard/trainings/programs/create` or `/edit/:id`)
- Bilingual form (EN/FR tabs)
- Fields: Title, Description, Public Description, Category, Level, Duration, Capacity
- Prerequisites, Objectives (multi-input)
- Curriculum builder (add modules with topics)
- Featured image upload
- Certificate toggle
- Public visibility settings
- Save as draft or publish

### 4. Sessions Management (`/dashboard/trainings/sessions`)
- Calendar view + Table view toggle
- Filters: Status, Date range, Program, Trainer
- Columns: Session Name, Program, Dates, Location, Enrollment, Status, Actions
- Create session button

### 5. Create/Edit Session (`/dashboard/trainings/sessions/create` or `/edit/:id`)
- Select program dropdown
- Session name (EN/FR)
- Date range picker
- Schedule builder (days/times)
- Location type selector (physical/online/hybrid)
- Address fields / meeting link
- Max participants
- Trainer assignment (multi-select users with trainer role)
- Public visibility toggle
- Public summary (EN/FR)

### 6. Session Details (`/dashboard/trainings/sessions/:id`)
- Tabs: Overview, Enrollments, Attendance, Media, Materials
- **Overview Tab**: Session info, edit button, stats
- **Enrollments Tab**:
  - Pending approvals section
  - Enrolled participants table
  - Actions: Approve, Reject, Issue Certificate
- **Attendance Tab**:
  - Date selector
  - Participant list with status checkboxes
  - Mark all present/absent
  - Save attendance
- **Media Tab**:
  - Upload photos/videos
  - Gallery view
  - Public/private toggle per media
  - Add captions (EN/FR)
  - Featured toggle
- **Materials Tab**:
  - Upload files/links
  - Access level selector
  - List of materials

### 7. Enrollments Management (`/dashboard/trainings/enrollments`)
- Data table with filters
- Columns: Participant, Session, Date, Status, Photo Consent, Actions
- Bulk approve/reject

### 8. Testimonials Management (`/dashboard/trainings/testimonials`)
- Pending testimonials section
- All testimonials table
- Preview, approve, reject, feature actions
- Filter by session

### 9. Alumni Network (`/dashboard/alumni`)
- Alumni list with search
- Add user to alumni button
- Edit bio, achievements
- Feature toggle
- Order featured alumni

---

## 🌐 Public Website Pages

### 1. Public Trainings Page (`/trainings`)

**Hero Section:**
- Title: "Our Training Programs" / "Nos Programmes de Formation"
- Stats: X Programs Delivered, Y Participants Trained, Z Cities Reached

**Tabs:**
- Upcoming Trainings
- Ongoing Trainings
- Completed Trainings
- All Programs

**Upcoming Trainings:**
- Grid of upcoming sessions
- Card: Program title, dates, location, "Apply Now" button

**Ongoing Trainings:**
- Sessions currently in progress
- "Follow our journey" message
- Teaser content (no full gallery yet)

**Completed Trainings:**
- Grid of completed sessions with photos
- Click to see full showcase

**All Programs:**
- List of all published programs
- Filter by category
- Card: Title, description, duration, "View Details"

### 2. Training Showcase Page (`/trainings/:slug`)

**For Completed Sessions:**
- Training title, dates, location
- Highlights section (text)
- Photo gallery (masonry grid)
- Video section (if available)
- Testimonials carousel
- Participants count (with consent)
- "Interested in this program?" CTA

**Social Sharing:**
- Share buttons (Facebook, Twitter, LinkedIn, WhatsApp)
- Custom OG tags with featured image

### 3. Program Details Page (`/programs/:slug`)
- Full program description
- Objectives
- Curriculum/modules
- Prerequisites
- Duration & capacity
- Upcoming sessions for this program
- "Apply for next session" button

### 4. Alumni Network Page (`/alumni`)
- Hero: "Meet Our Alumni" / "Rencontrez Nos Anciens"
- Featured alumni grid
- Success stories
- Filter by cohort/program
- Alumni card: Photo, name, position, organization, bio snippet

### 5. Apply/Enroll Page (`/trainings/:id/apply`)
- Training details summary
- Enrollment form:
  - Personal info (if not logged in, create account)
  - Motivation letter
  - Photo consent checkbox with explanation
  - Submit application
- "Application submitted, pending approval" confirmation

---

## 🌍 Bilingual Support Implementation

### Backend:
- All text fields duplicated: `field_en` and `field_fr`
- API returns both languages in response
- Frontend selects language based on user preference

### Frontend:
- Language switcher in navbar (EN/FR toggle)
- Store language preference in localStorage
- React i18n library (react-i18next) for UI strings
- Display content based on selected language

### Translation Files:
```
/frontend/src/locales/en.json
/frontend/src/locales/fr.json
```

---

## 📱 Social Media Integration

### Share Functionality:
```javascript
// Share buttons for completed trainings
const shareUrl = `https://resultinstitude.fayshaa.com/trainings/${slug}`;
const shareText = `Check out this amazing training: ${title}`;

// Social platforms
- Facebook: fb-share-button SDK
- Twitter: Tweet button with custom text
- LinkedIn: Share button
- WhatsApp: wa.me API for mobile
```

### Open Graph Meta Tags:
```html
<meta property="og:title" content={training.title} />
<meta property="og:description" content={training.public_description} />
<meta property="og:image" content={training.featured_media} />
<meta property="og:url" content={shareUrl} />
<meta property="og:type" content="article" />
```

---

## 📊 Analytics & Reporting

### Admin Dashboard Metrics:
- Total programs created
- Active sessions
- Total enrollments (approved/pending/completed)
- Completion rate
- Average attendance rate
- Most popular programs
- Geographic reach (cities/regions)
- Public engagement (page views, shares)

### Reports:
- Enrollment report (by session, by program, by date range)
- Attendance report
- Completion certificate report
- Testimonials summary
- Public visibility report (which trainings are public)

---

## 🎯 Implementation Phases

### **Phase 1: Core Training Management (Week 1-2)**
✅ Database setup
- Create all tables and migrations
- Seed sample data

✅ Backend API
- Programs CRUD
- Sessions CRUD
- Enrollments CRUD
- Trainer assignment

✅ Admin Dashboard
- Trainings overview
- Programs management
- Sessions management
- Enrollments management

### **Phase 2: Attendance & Materials (Week 3)**
✅ Attendance system
- Mark attendance UI
- Attendance reports

✅ Training materials
- Upload materials
- Access control

### **Phase 3: Media & Public Showcase (Week 4-5)**
✅ Media management
- Photo/video upload
- Gallery management
- Public/private toggle

✅ Public website pages
- Public trainings page
- Training showcase page
- Program details page

✅ Testimonials
- Submit testimonials
- Admin approval
- Display on showcase

### **Phase 4: Advanced Features (Week 6)**
✅ Bilingual support
- Translation infrastructure
- Language switcher
- Content in EN/FR

✅ Social sharing
- Share buttons
- OG meta tags
- Track shares

✅ Alumni network
- Alumni profiles
- Featured alumni
- Public alumni page

### **Phase 5: Certificates & Notifications (Week 7)**
✅ Certificate generation
- Auto-generate PDFs
- Download functionality

✅ Email notifications
- Enrollment confirmation
- Session reminders
- Certificate issued

---

## 🔐 Security & Permissions

### Role-Based Access:

**Super Admin:**
- Full access to everything

**Admin:**
- Create/edit/delete programs
- Create/edit/delete sessions
- Approve enrollments
- Upload media, manage gallery
- Approve testimonials
- Manage alumni

**Trainer:**
- View assigned sessions
- Mark attendance
- Upload session materials
- View enrolled participants

**Participant:**
- View available trainings
- Enroll in sessions
- View my enrollments
- Access materials (if enrolled)
- Submit testimonials

**Public (Not logged in):**
- View public trainings
- View program details
- View completed training showcases
- View alumni network
- Cannot enroll (must create account)

---

## 📦 File Storage

### Options:
1. **Local VPS Storage** (for MVP)
   - Store in `/var/www/resultinstitude/uploads/trainings/`
   - Serve via Nginx

2. **Cloud Storage** (Future)
   - AWS S3 or DigitalOcean Spaces
   - Better performance and scaling

### Upload Limits:
- Photos: Max 5MB per file
- Videos: Max 50MB per file
- Documents: Max 10MB per file

---

## 🚀 Success Criteria

✅ Admins can create and manage training programs
✅ Sessions can be scheduled and assigned to trainers
✅ Participants can enroll and be approved
✅ Attendance can be tracked per session
✅ Photos can be uploaded and made public selectively
✅ Public website shows completed trainings with galleries
✅ Testimonials can be submitted and displayed
✅ Alumni network showcases successful participants
✅ Social sharing works on all platforms
✅ All content available in English and French
✅ System is responsive and works on mobile

---

**End of Specification**

Ready to begin implementation! 🎉
