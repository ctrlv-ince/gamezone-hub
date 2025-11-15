import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/orders';

export const getSalesData = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_URL}/sales`, {
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