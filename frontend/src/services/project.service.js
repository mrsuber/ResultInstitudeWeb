import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003/api';

// Create axios instance with auth token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Projects
export const getAllProjects = async (params = {}) => {
  const response = await axios.get(
    `${API_URL}/projects`,
    {
      headers: getAuthHeaders(),
      params
    }
  );
  return response.data;
};

export const getProjectById = async (projectId) => {
  const response = await axios.get(
    `${API_URL}/projects/${projectId}`,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await axios.post(
    `${API_URL}/projects`,
    projectData,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const updateProject = async (projectId, projectData) => {
  const response = await axios.put(
    `${API_URL}/projects/${projectId}`,
    projectData,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await axios.delete(
    `${API_URL}/projects/${projectId}`,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// Tasks
export const getProjectTasks = async (projectId, params = {}) => {
  const response = await axios.get(
    `${API_URL}/projects/${projectId}/tasks`,
    {
      headers: getAuthHeaders(),
      params
    }
  );
  return response.data;
};

export const createTask = async (projectId, taskData) => {
  const response = await axios.post(
    `${API_URL}/projects/${projectId}/tasks`,
    taskData,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const updateTask = async (projectId, taskId, taskData) => {
  const response = await axios.put(
    `${API_URL}/projects/${projectId}/tasks/${taskId}`,
    taskData,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const updateTaskStatus = async (projectId, taskId, statusData) => {
  const response = await axios.put(
    `${API_URL}/projects/${projectId}/tasks/${taskId}/status`,
    statusData,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const deleteTask = async (projectId, taskId) => {
  const response = await axios.delete(
    `${API_URL}/projects/${projectId}/tasks/${taskId}`,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export default {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask
};
