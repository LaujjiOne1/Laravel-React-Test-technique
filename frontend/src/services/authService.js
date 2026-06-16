import api from './api';

const authService = {
  login: (email, password) => {
    return api.post('/login', { email, password });
  },

  logout: () => {
    return api.post('/logout');
  },

  getUser: () => {
    return api.get('/user');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  removeToken: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;
