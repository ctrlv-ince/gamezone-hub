import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

const login = (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

export default {
  register,
  login,
};