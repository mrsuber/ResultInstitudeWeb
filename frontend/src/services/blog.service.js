import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003/api';

// Create axios instance with auth token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get all posts
export const getAllPosts = async (params = {}) => {
  const response = await axios.get(`${API_URL}/blog/posts`, { params });
  return response.data;
};

// Get post by ID or slug
export const getPostByIdOrSlug = async (identifier) => {
  const response = await axios.get(`${API_URL}/blog/posts/${identifier}`);
  return response.data;
};

// Create post
export const createPost = async (postData) => {
  const response = await axios.post(
    `${API_URL}/blog/posts`,
    postData,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// Update post
export const updatePost = async (postId, postData) => {
  const response = await axios.put(
    `${API_URL}/blog/posts/${postId}`,
    postData,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// Delete post
export const deletePost = async (postId) => {
  const response = await axios.delete(
    `${API_URL}/blog/posts/${postId}`,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// Publish post
export const publishPost = async (postId) => {
  const response = await axios.put(
    `${API_URL}/blog/posts/${postId}/publish`,
    {},
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// Get categories
export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/blog/categories`);
  return response.data;
};

// Get featured posts
export const getFeaturedPosts = async () => {
  const response = await axios.get(`${API_URL}/blog/featured`);
  return response.data;
};

export default {
  getAllPosts,
  getPostByIdOrSlug,
  createPost,
  updatePost,
  deletePost,
  publishPost,
  getCategories,
  getFeaturedPosts
};
