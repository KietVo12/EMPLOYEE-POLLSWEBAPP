import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, additionalData?: object) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const login = async (email: string, password: string) => {
    try {
      // Giả lập đăng nhập
      const token = 'dummy-token';
      setUser({ email });
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Failed to login. Please check your credentials and try again.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const register = async (email: string, password: string, additionalData?: object) => {
    try {
      // Giả lập đăng ký
      const token = 'dummy-token';
      setUser({ email, ...additionalData });
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Failed to register. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
