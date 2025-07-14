import { create } from 'zustand';
import axios from '../lib/axiosInstance';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: true,

  login: async (credentials) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      const { token, ...userData } = response.data;
      localStorage.setItem('token', token);
      set({ user: userData, token, loading: false });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message };
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post('/auth/register', userData);
      const { token, ...registeredUser } = response.data;
      localStorage.setItem('token', token);
      set({ user: registeredUser, token, loading: false });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, loading: false });
  },

  checkAuth: async () => {
    set({ loading: true });
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        set({ user: response.data, token, loading: false });
      } catch {
        localStorage.removeItem('token');
        set({ user: null, token: null, loading: false });
      }
    } else {
      set({ user: null, token: null, loading: false });
    }
  }
}));

export default useAuthStore;
