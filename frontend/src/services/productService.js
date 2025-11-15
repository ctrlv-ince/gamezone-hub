import axios from 'axios';

const API_URL = '/api/v1/products';

export const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};