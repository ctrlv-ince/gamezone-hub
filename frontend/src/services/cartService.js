import axios from 'axios';

const API_URL = '/api/v1/cart';

const getCart = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const addToCart = async (item, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, item, config);
  return response.data;
};

const removeFromCart = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${productId}`, config);
  return response.data;
};

export { getCart, addToCart, removeFromCart };