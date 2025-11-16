import api from './api';

const API_URL = '/orders';

export const getSalesData = async (startDate, endDate) => {
  try {
    const response = await api.get(`${API_URL}/sales`, {
      params: {
        startDate,
        endDate,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getAllOrders = async () => {
  try {
    const response = await api.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.put(`${API_URL}/${orderId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};