import api from './api';

// Training Programs API
export const trainingProgramService = {
  // Get all programs
  getAllPrograms: async (params = {}) => {
    try {
      const response = await api.get('/trainings/programs', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get program by ID
  getProgramById: async (id) => {
    try {
      const response = await api.get(`/trainings/programs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create program
  createProgram: async (programData) => {
    try {
      const response = await api.post('/trainings/programs', programData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update program
  updateProgram: async (id, programData) => {
    try {
      const response = await api.put(`/trainings/programs/${id}`, programData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete program
  deleteProgram: async (id) => {
    try {
      const response = await api.delete(`/trainings/programs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Publish program
  publishProgram: async (id) => {
    try {
      const response = await api.post(`/trainings/programs/${id}/publish`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// Training Sessions API
export const trainingSessionService = {
  // Get all sessions
  getAllSessions: async (params = {}) => {
    try {
      const response = await api.get('/trainings/sessions', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get session by ID
  getSessionById: async (id) => {
    try {
      const response = await api.get(`/trainings/sessions/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create session
  createSession: async (sessionData) => {
    try {
      const response = await api.post('/trainings/sessions', sessionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update session
  updateSession: async (id, sessionData) => {
    try {
      const response = await api.put(`/trainings/sessions/${id}`, sessionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete session
  deleteSession: async (id) => {
    try {
      const response = await api.delete(`/trainings/sessions/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Assign trainer
  assignTrainer: async (sessionId, trainerId, role = 'trainer') => {
    try {
      const response = await api.post(`/trainings/sessions/${sessionId}/trainers`, {
        trainer_id: trainerId,
        role
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Remove trainer
  removeTrainer: async (sessionId, trainerId) => {
    try {
      const response = await api.delete(`/trainings/sessions/${sessionId}/trainers/${trainerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Publish session
  publishSession: async (id) => {
    try {
      const response = await api.post(`/trainings/sessions/${id}/publish`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// Enrollments API
export const enrollmentService = {
  // Get all enrollments
  getAllEnrollments: async (params = {}) => {
    try {
      const response = await api.get('/trainings/enrollments', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get enrollment by ID
  getEnrollmentById: async (id) => {
    try {
      const response = await api.get(`/trainings/enrollments/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get my enrollments
  getMyEnrollments: async () => {
    try {
      const response = await api.get('/trainings/my-enrollments');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create enrollment
  createEnrollment: async (sessionId, photoConsent = false) => {
    try {
      const response = await api.post('/trainings/enrollments', {
        session_id: sessionId,
        photo_consent: photoConsent
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Approve enrollment
  approveEnrollment: async (id) => {
    try {
      const response = await api.put(`/trainings/enrollments/${id}/approve`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Reject enrollment
  rejectEnrollment: async (id) => {
    try {
      const response = await api.put(`/trainings/enrollments/${id}/reject`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update photo consent
  updatePhotoConsent: async (id, consent) => {
    try {
      const response = await api.put(`/trainings/enrollments/${id}/consent`, {
        photo_consent: consent
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Withdraw enrollment
  withdrawEnrollment: async (id) => {
    try {
      const response = await api.delete(`/trainings/enrollments/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Issue certificate
  issueCertificate: async (id, certificateUrl) => {
    try {
      const response = await api.post(`/trainings/enrollments/${id}/certificate`, {
        certificate_url: certificateUrl
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default {
  programs: trainingProgramService,
  sessions: trainingSessionService,
  enrollments: enrollmentService,
};
