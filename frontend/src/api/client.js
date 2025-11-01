/**
 * API Client
 * Axios instance with global interceptors
 */

import axios from 'axios';
import { API_CONFIG, STORAGE_KEYS, ERROR_MESSAGES } from '../utils/constants';
import { storageService } from '../services/storage/storage.service';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - attach token to all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = storageService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle different error types
    if (!error.response) {
      // Network error
      error.customMessage = ERROR_MESSAGES.NETWORK_ERROR;
    } else {
      // HTTP error response
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear storage and redirect to login
          storageService.clearAll();
          window.location.href = '/login';
          error.customMessage = ERROR_MESSAGES.UNAUTHORIZED;
          break;
        case 403:
          error.customMessage = ERROR_MESSAGES.FORBIDDEN;
          break;
        case 404:
          error.customMessage = ERROR_MESSAGES.NOT_FOUND;
          break;
        case 409:
          // Conflict
          error.customMessage = error.response.data?.message || ERROR_MESSAGES.OPERATION_FAILED;
          break;
        case 500:
          error.customMessage = ERROR_MESSAGES.SERVER_ERROR;
          break;
        default:
          error.customMessage = error.response.data?.message || ERROR_MESSAGES.OPERATION_FAILED;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;