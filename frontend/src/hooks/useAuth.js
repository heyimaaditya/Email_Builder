import { create } from 'zustand';
import api from '../api/api';

const useAuth = create((set) => ({
  token: localStorage.getItem('token') || null,
  userId: localStorage.getItem('userId') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, userId } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      set({ token, userId, isAuthenticated: true });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      set({ token: null, userId: null, isAuthenticated: false });
      return false;
    }
  },
  register: async (email, password) => {
     try {
      const response = await api.post('/auth/register', { email, password });
      console.log('Registration successful:', response.data);
    
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    set({ token: null, userId: null, isAuthenticated: false });
  },
  checkAuth: () => {
  
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    set({ token, userId, isAuthenticated: !!token });
  }
}));

export default useAuth;