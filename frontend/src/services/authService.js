import api from './api';

const getMe = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};

const updateProfile = async (profileData) => {
  const res = await api.put('/api/v1/auth/me/update', profileData);
  return res.data;
};

const login = async (credentials) => {
  const res = await api.post('/api/v1/auth/login', credentials);
  return res.data;
};

export default { getMe, updateProfile, login };
