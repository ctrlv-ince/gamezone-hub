import { createContext, useState, useCallback, useEffect } from 'react';
import { authService } from '../services/authService';
import { storageService } from '../services/storage/storage.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage and fetch fresh user data
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = storageService.getToken();
      const storedUser = storageService.getUser();

      if (storedToken && storedUser) {
        setToken(storedToken);
        
        // Fetch fresh user data from API to ensure avatar is up-to-date
        try {
          const freshUser = await authService.getCurrentUser();
          setUser(freshUser);
        } catch (err) {
          console.error('Error fetching user:', err);
          // Fallback to stored user if API fails
          setUser(storedUser);
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  // Register user
  const register = useCallback(async (name, email, password, confirmPassword, address, contactNumber, avatar = null) => {
    setLoading(true);
    setError(null);

    try {
      const userData = {
        name,
        email,
        password,
        confirmPassword,
        address,
        contactNumber,
        avatar
      };

      const result = await authService.register(userData);
      setToken(result.token);
      setUser(result.user);
      return { success: true, message: 'Registration successful' };
    } catch (err) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Login user
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.login(email, password);
      setToken(result.token);
      setUser(result.user);
      return { success: true, message: 'Login successful' };
    } catch (err) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout user
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setToken(null);
    setError(null);
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Update user in context
  const updateAuthUser = useCallback((updatedUser) => {
    setUser(updatedUser);
  }, []);

  const value = {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    clearError,
    updateAuthUser,
    isLoggedIn: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};