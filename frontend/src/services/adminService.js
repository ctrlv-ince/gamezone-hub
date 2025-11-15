import api from '../utils/api';

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