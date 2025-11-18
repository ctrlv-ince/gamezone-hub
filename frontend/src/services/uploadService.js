import api from './api';

export const uploadImage = async (formData) => {
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const uploadProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await api.post('/upload/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};