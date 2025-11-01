/**
 * Storage Service
 * Centralized abstraction for sessionStorage operations
 * Uses sessionStorage for enhanced security: tokens automatically clear on browser close
 */

import { STORAGE_KEYS } from '../../utils/constants';

class StorageService {
  /**
   * Store token
   */
  setToken(token) {
    if (token) {
      sessionStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    }
  }

  /**
   * Retrieve token
   */
  getToken() {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  /**
   * Store user data
   */
  setUser(user) {
    if (user) {
      sessionStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    }
  }

  /**
   * Retrieve user data
   */
  getUser() {
    const userData = sessionStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Update stored user data (merge with existing)
   */
  updateUser(userData) {
    const existing = this.getUser() || {};
    const merged = { ...existing, ...userData };
    this.setUser(merged);
    return merged;
  }

  /**
   * Clear single key
   */
  clear(key) {
    sessionStorage.removeItem(key);
  }

  /**
   * Clear all auth-related storage
   */
  clearAll() {
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.USER_DATA);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!this.getToken();
  }

  /**
   * Get auth headers
   */
  getAuthHeaders() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

// Export singleton instance
export const storageService = new StorageService();