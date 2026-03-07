import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import theme from './styles/theme';
import './styles/professional.css';

// Public Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';

// Protected Pages
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Trainings from './pages/dashboard/Trainings';
import ProgramsList from './pages/dashboard/trainings/ProgramsList';
import ProgramForm from './pages/dashboard/trainings/ProgramForm';
import SessionsList from './pages/dashboard/trainings/SessionsList';
import SessionForm from './pages/dashboard/trainings/SessionForm';
import EnrollmentsList from './pages/dashboard/trainings/EnrollmentsList';
import Users from './pages/dashboard/Users';
import Blog from './pages/dashboard/Blog';
import Projects from './pages/dashboard/Projects';
import Analytics from './pages/dashboard/Analytics';
import Settings from './pages/dashboard/Settings';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/trainings"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Trainings />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/trainings/programs"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ProgramsList />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/trainings/sessions"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <SessionsList />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/trainings/programs/create"
              element={
                <ProtectedRoute requiredRoles={['super_admin', 'admin']}>
                  <DashboardLayout>
                    <ProgramForm />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/trainings/programs/edit/:id"
              element={
                <ProtectedRoute requiredRoles={['super_admin', 'admin']}>
                  <DashboardLayout>
                    <ProgramForm />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/trainings/sessions/create"
              element={
                <ProtectedRoute requiredRoles={['super_admin', 'admin']}>
                  <DashboardLayout>
                    <SessionForm />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/trainings/sessions/edit/:id"
              element={
                <ProtectedRoute requiredRoles={['super_admin', 'admin']}>
                  <DashboardLayout>
                    <SessionForm />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/trainings/enrollments"
              element={
                <ProtectedRoute requiredRoles={['super_admin', 'admin']}>
                  <DashboardLayout>
                    <EnrollmentsList />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute requiredRoles={['super_admin', 'admin']}>
                  <DashboardLayout>
                    <Users />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog"
              element={
                <ProtectedRoute requiredRoles={['super_admin', 'admin', 'trainer']}>
                  <DashboardLayout>
                    <Blog />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects"
              element={
                <ProtectedRoute requiredRoles={['super_admin', 'admin', 'trainer']}>
                  <DashboardLayout>
                    <Projects />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute requiredRoles={['super_admin', 'admin']}>
                  <DashboardLayout>
                    <Analytics />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Settings />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
