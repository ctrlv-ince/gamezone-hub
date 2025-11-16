import api from './api';

const API_URL = '/products';

export const getAllProducts = async () => {
  const response = await api.get(API_URL);
  return response.data;
};
export const getProductById = async (id) => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post(API_URL, productData);
  return response.data;
};
export const updateProduct = async (id, productData) => {
  const response = await api.put(`${API_URL}/${id}`, productData);
  return response.data;
};