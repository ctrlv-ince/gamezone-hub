import api from './api';

const getMe = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};

export default { getMe };