
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      const decoded = jwtDecode(token);
      setUser(decoded.user);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
      localStorage.removeItem('token');
    }
  };

  const register = async formData => {
    const res = await axios.post('/api/auth/register', formData);
    setAuthToken(res.data.token);
    const decoded = jwtDecode(res.data.token);
    setUser(decoded.user);
    setIsAuthenticated(true);
  };

  const login = async formData => {
    const res = await axios.post('/api/auth/login', formData);
    setAuthToken(res.data.token);
    const decoded = jwtDecode(res.data.token);
    setUser(decoded.user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;