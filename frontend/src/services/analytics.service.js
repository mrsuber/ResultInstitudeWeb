import api from './api';

const analyticsService = {
  // Get overview statistics
  getOverviewStats: async () => {
    try {
      const response = await api.get('/analytics/overview');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get enrollment trends
  getEnrollmentTrends: async () => {
    try {
      const response = await api.get('/analytics/enrollment-trends');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get program distribution
  getProgramDistribution: async () => {
    try {
      const response = await api.get('/analytics/program-distribution');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get enrollment status breakdown
  getEnrollmentStatusBreakdown: async () => {
    try {
      const response = await api.get('/analytics/enrollment-status');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get top programs
  getTopPrograms: async () => {
    try {
      const response = await api.get('/analytics/top-programs');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get user growth
  getUserGrowth: async () => {
    try {
      const response = await api.get('/analytics/user-growth');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get completion rates
  getCompletionRates: async () => {
    try {
      const response = await api.get('/analytics/completion-rates');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default analyticsService;
