import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState } from '../types';

interface AuthContextType {
  authState: AuthState;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const defaultAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : defaultAuthState;
  });

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(authState));
  }, [authState]);

  const login = async (username: string, password: string): Promise<boolean> => {
    // For demo purposes only - in a real app, this would call an API
    // IMPORTANT: Replace with a proper authentication system in production
    if (username === 'admin' && password === 'password') {
      setAuthState({
        isAuthenticated: true,
        user: { username },
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState(defaultAuthState);
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};