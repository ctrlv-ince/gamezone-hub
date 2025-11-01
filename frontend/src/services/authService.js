/**
 * Auth Service
 * Handles authentication API calls and user data management
 * Delegates storage to storageService, HTTP to apiClient
 */

import apiClient from '../api/client';
import { storageService } from './storage/storage.service';
import { API_CONFIG } from '../utils/constants';

class AuthService {
  /**
   * Register new user
   */
  async register(userData) {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      formData.append('confirmPassword', userData.confirmPassword);
      formData.append('address', userData.address || '');
      formData.append('contactNumber', userData.contactNumber || '');
      
      if (userData.avatar) {
        formData.append('avatar', userData.avatar);
      }

      const response = await apiClient.post(API_CONFIG.ENDPOINTS.REGISTER, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const { token, user } = response.data.data;
      storageService.setToken(token);
      storageService.setUser(user);

      return { token, user };
    } catch (error) {
      throw {
        message: error.customMessage || error.response?.data?.message || 'Registration failed',
        status: error.response?.status,
        details: error.response?.data
      };
    }
  }

  /**
   * Login user
   */
  async login(email, password) {
    try {
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.LOGIN, {
        email,
        password
      });

      const { token, user } = response.data.data;
      storageService.setToken(token);
      storageService.setUser(user);

      return { token, user };
    } catch (error) {
      throw {
        message: error.customMessage || error.response?.data?.message || 'Login failed',
        status: error.response?.status,
        details: error.response?.data
      };
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser() {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.GET_ME);
      const user = response.data.data;
      storageService.setUser(user);
      return user;
    } catch (error) {
      throw {
        message: error.customMessage || error.response?.data?.message || 'Failed to fetch user',
        status: error.response?.status,
        details: error.response?.data
      };
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(profileData) {
    try {
      const response = await apiClient.put(API_CONFIG.ENDPOINTS.UPDATE_PROFILE, {
        name: profileData.name,
        email: profileData.email,
        address: profileData.address || '',
        contactNumber: profileData.contactNumber || ''
      });

      const user = response.data.data.user;
      storageService.updateUser(user);
      return user;
    } catch (error) {
      throw {
        message: error.customMessage || error.response?.data?.message || 'Profile update failed',
        status: error.response?.status,
        details: error.response?.data
      };
    }
  }

  /**
   * Update user avatar
   */
  async updateAvatar(avatarFile) {
    try {
      const formData = new FormData();
      formData.append('avatar', avatarFile);

      const response = await apiClient.put(API_CONFIG.ENDPOINTS.UPDATE_AVATAR, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const user = response.data.data.user;
      storageService.updateUser(user);
      return user;
    } catch (error) {
      throw {
        message: error.customMessage || error.response?.data?.message || 'Avatar update failed',
        status: error.response?.status,
        details: error.response?.data
      };
    }
  }

  /**
   * Logout user
   */
  logout() {
    storageService.clearAll();
  }

  /**
   * Get stored user
   */
  getStoredUser() {
    return storageService.getUser();
  }

  /**
   * Check if authenticated
   */
  isAuthenticated() {
    return storageService.isAuthenticated();
  }

  /**
   * Get stored token
   */
  getToken() {
    return storageService.getToken();
  }
}

// Export singleton instance
export const authService = new AuthService();