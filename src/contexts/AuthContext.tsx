import React, { createContext, useContext, useState, useEffect } from 'react';
import { userStorage } from '@/services/api';

interface User {
  _id: string;
  fullName: string;
  email: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = userStorage.getUser();
    const token = userStorage.getToken();
    
    if (storedUser && token) {
      setUser(storedUser);
      setIsAuthenticated(true);
      setIsAdmin(storedUser.isAdmin || false);
    }
  }, []);

  const login = (userData: any) => {
    const user = {
      _id: userData._id,
      fullName: userData.fullName,
      email: userData.email,
      isAdmin: userData.isAdmin || false,
    };
    setUser(user);
    setIsAuthenticated(true);
    setIsAdmin(userData.isAdmin || false);
    userStorage.setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    userStorage.clearUser();
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
