import axios from 'axios';

const API_URL = '/api/v1/cart';

export const getCart = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addItemToCart = async (item) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

export const removeItemFromCart = async (productId) => {
  const response = await axios.delete(`${API_URL}/${productId}`);
  return response.data;
};