import api from './api';

const getMe = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};

const updateProfile = async (profileData) => {
  const res = await api.put('/auth/me/update', profileData);
  return res.data;
};

const login = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

const register = async (userData) => {
  const res = await api.post('/auth/register', userData);
  return res.data;
};

export default { getMe, updateProfile, login, register };
