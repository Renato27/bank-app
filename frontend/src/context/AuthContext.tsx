// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  authToken: string | null;
  expiresAt: number | null;
  login: (token: string, expiresIn: number) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiresAt = localStorage.getItem('expiresAt');
    const now = Date.now();
    
    if (token && expiresAt) {
      if (now > parseInt(expiresAt)) {
        logout();
      } else {
        setAuthToken(token);
        setExpiresAt(parseInt(expiresAt));
      }
    } else {
      logout();
    }
  
    setLoading(false);
  }, []);

  const login = (token: string, expiresIn: number) => {
    const expiresAt = Date.now() + expiresIn * 1000;
    localStorage.setItem('expiresAt', expiresAt.toString());
    localStorage.setItem('token', token);
    setAuthToken(token);
    setExpiresAt(expiresAt);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    setAuthToken(null);
    setExpiresAt(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, expiresAt, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
