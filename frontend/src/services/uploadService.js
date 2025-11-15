import api from '../utils/api';

const API_URL = '/upload';

export const uploadImage = async (formData) => {
  const response = await api.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};