import axios from 'axios';
import { API_BASE_URL } from './utils';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
