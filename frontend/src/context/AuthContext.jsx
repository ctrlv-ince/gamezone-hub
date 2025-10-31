import { createContext, useState, useCallback, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage and fetch fresh user data
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = authService.getToken();
      const storedUser = authService.getUser();

      if (storedToken && storedUser) {
        setToken(storedToken);
        
        // Fetch fresh user data from API to ensure avatar is up-to-date
        try {
          const response = await authService.getCurrentUser(storedToken);
          if (response.success && response.user) {
            setUser(response.user);
            // Update localStorage with fresh data
            localStorage.setItem('user', JSON.stringify(response.user));
          } else {
            setUser(storedUser);
          }
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
  const register = useCallback(async (name, email, password, confirmPassword, address, contactNumber, avatarFile = null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.register(name, email, password, confirmPassword, address, contactNumber, avatarFile);

      if (response.success) {
        setToken(response.token);
        setUser(response.user);
        return { success: true, message: 'Registration successful' };
      }

      setError(response.message);
      return response;
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
      const response = await authService.login(email, password);

      if (response.success) {
        setToken(response.token);
        setUser(response.user);
        return { success: true, message: 'Login successful' };
      }

      setError(response.message);
      return response;
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

  const value = {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    clearError,
    isLoggedIn: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};