import api from './api';

const API_URL = '/products';

export const getAllProducts = async (filters, page = 1, limit = 10) => {
  const params = new URLSearchParams();
  if (filters) {
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });
  }
  params.append('page', page);
  params.append('limit', limit);
  const response = await api.get(`${API_URL}?${params.toString()}`);
  return response.data;
};
export const getProductById = async (id) => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

export const deleteProducts = async (ids) => {
  const response = await api.delete(API_URL, { data: { ids } });
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
export const createReview = async (productId, reviewData) => {
  const response = await api.post(
    `${API_URL}/${productId}/reviews`,
    reviewData
  );
  return response.data;
};
export const updateReview = async (productId, reviewId, reviewData) => {
  const response = await api.put(
    `${API_URL}/${productId}/reviews/${reviewId}`,
    reviewData
  );
  return response.data;
};

export const deleteReview = async (productId, reviewId) => {
  const response = await api.delete(
    `${API_URL}/${productId}/reviews/${reviewId}`
  );
  return response.data;
};