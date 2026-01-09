import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = authService.getToken();
      if (token && authService.isAuthenticated()) {
        try {
          const { user: userData } = await authService.getProfile();
          setUser(userData);
        } catch (error) {
          authService.clearAuthData();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const response = await authService.login({ email, password });
    authService.saveAuthData(response.token, response.user);
    setUser(response.user);
    return response;
  };

  const register = async (username, email, password) => {
    const response = await authService.register({ username, email, password });
    authService.saveAuthData(response.token, response.user);
    setUser(response.user);
    return response;
  };

  const logout = () => {
    authService.clearAuthData();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};