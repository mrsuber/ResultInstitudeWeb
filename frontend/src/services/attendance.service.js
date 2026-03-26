import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003/api';

// Create axios instance with auth token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Mark attendance (bulk)
export const markAttendance = async (attendanceData) => {
  const response = await axios.post(
    `${API_URL}/attendance/mark`,
    attendanceData,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// Get session attendance
export const getSessionAttendance = async (sessionId, params = {}) => {
  const response = await axios.get(
    `${API_URL}/attendance/session/${sessionId}`,
    {
      headers: getAuthHeaders(),
      params
    }
  );
  return response.data;
};

// Get user attendance
export const getUserAttendance = async (userId, params = {}) => {
  const response = await axios.get(
    `${API_URL}/attendance/user/${userId}`,
    {
      headers: getAuthHeaders(),
      params
    }
  );
  return response.data;
};

// Get attendance record
export const getAttendanceRecord = async (attendanceId) => {
  const response = await axios.get(
    `${API_URL}/attendance/${attendanceId}`,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// Update attendance
export const updateAttendance = async (attendanceId, updateData) => {
  const response = await axios.put(
    `${API_URL}/attendance/${attendanceId}`,
    updateData,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// Delete attendance
export const deleteAttendance = async (attendanceId) => {
  const response = await axios.delete(
    `${API_URL}/attendance/${attendanceId}`,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// Get session statistics
export const getSessionStatistics = async (sessionId) => {
  const response = await axios.get(
    `${API_URL}/attendance/session/${sessionId}/statistics`,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// Get enrolled users for a session
export const getEnrolledUsers = async (sessionId) => {
  const response = await axios.get(
    `${API_URL}/attendance/session/${sessionId}/enrolled-users`,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export default {
  markAttendance,
  getSessionAttendance,
  getUserAttendance,
  getAttendanceRecord,
  updateAttendance,
  deleteAttendance,
  getSessionStatistics,
  getEnrolledUsers
};
