import api from './api';

const API_URL = '/cart';

const getCart = async () => {
  const response = await api.get(API_URL);
  return response.data;
};

const addToCart = async (productId, quantity) => {
  console.log('Sending to backend:', { productId, quantity });
  const response = await api.post(API_URL, { productId, quantity });
  return response.data;
};

const removeFromCart = async (productId) => {
  const response = await api.delete(`${API_URL}/${productId}`);
  return response.data;
};

const updateItemQuantity = async (productId, quantity) => {
  const response = await api.put(`${API_URL}/${productId}`, { quantity });
  return response.data;
};

export { getCart, addToCart, removeFromCart, updateItemQuantity };