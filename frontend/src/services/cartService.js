import api from '../utils/api';

const API_URL = '/cart';

const getCart = async () => {
  const response = await api.get(API_URL);
  return response.data;
};

const addToCart = async (item) => {
  const response = await api.post(API_URL, item);
  return response.data;
};

const removeFromCart = async (productId) => {
  const response = await api.delete(`${API_URL}/${productId}`);
  return response.data;
};

export { getCart, addToCart, removeFromCart };