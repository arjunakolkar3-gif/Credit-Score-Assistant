import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/credit';
import { authService, LoginCredentials, RegisterPayload } from '../services/authService';
import { DEMO_USER } from '../data/demoData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (payload: RegisterPayload) => Promise<boolean>;
  logout: () => void;
  loadDemoUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check initial auth state
    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        // If user is saved, set them; default to demo user for easy hackathon/demo review if preferred
        if (currentUser) {
          setUser(currentUser);
        } else {
          // Default pre-populated demo user for rich preview
          setUser(DEMO_USER);
        }
      } catch {
        setUser(DEMO_USER);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { user: loggedInUser } = await authService.login(credentials);
      setUser(loggedInUser);
      return true;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { user: newUser } = await authService.register(payload);
      setUser(newUser);
      return true;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const loadDemoUser = () => {
    setUser(DEMO_USER);
    localStorage.setItem('credit_assistant_user', JSON.stringify(DEMO_USER));
    localStorage.setItem('credit_assistant_token', 'demo_active_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        loadDemoUser,
      }}
    >
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
