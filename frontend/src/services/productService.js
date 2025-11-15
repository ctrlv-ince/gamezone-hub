import api from '../utils/api';

const API_URL = '/products';

export const getAllProducts = async () => {
  const response = await api.get(API_URL);
  return response.data;
};
export const getProductById = async (id) => {
  const response = await api.get(`${API__URL}/${id}`);
  return response.data;
};