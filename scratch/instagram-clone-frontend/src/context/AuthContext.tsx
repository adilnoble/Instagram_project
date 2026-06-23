import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Profile } from '../types';
import { mockDb } from '../utils/mockDb';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, username: string) => Promise<void>;
  logout: () => void;
  registerUser: (username: string, email: string, phone: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      mockDb.init(); // Make sure DB has initial records
      const savedUserId = localStorage.getItem('ig_current_user_id');
      if (savedUserId) {
        const users = mockDb.getUsers();
        const foundUser = users.find(u => u.id === savedUserId);
        if (foundUser) {
          setUser(foundUser);
          const foundProfile = mockDb.getProfile(foundUser.id);
          if (foundProfile) {
            setProfile(foundProfile);
          }
        }
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (email: string, username: string) => {
    setIsLoading(true);
    try {
      mockDb.init();
      const users = mockDb.getUsers();
      // Search for matching user in mock DB, or dynamically create one
      let foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === username.toLowerCase());
      
      if (!foundUser) {
        // Auto-create a user on login for seamless demo experience
        const defaultUsername = username || email.split('@')[0] || 'guest_user';
        const newUser: User = {
          id: String(users.length + 1),
          username: defaultUsername,
          email: email || 'guest@example.com',
          created_at: new Date().toISOString(),
          role: 'User',
          status: 'active'
        };
        foundUser = mockDb.saveUser(newUser);
      }

      setUser(foundUser);
      const foundProfile = mockDb.getProfile(foundUser.id);
      if (foundProfile) {
        setProfile(foundProfile);
      }
      localStorage.setItem('ig_current_user_id', foundUser.id);
      localStorage.setItem('ig_auth_token', `demo_token_${foundUser.id}`);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('ig_current_user_id');
    localStorage.removeItem('ig_auth_token');
  };

  const registerUser = async (username: string, email: string, phone: string) => {
    setIsLoading(true);
    try {
      mockDb.init();
      const newUser: User = {
        id: String(mockDb.getUsers().length + 1),
        username,
        email,
        phone,
        created_at: new Date().toISOString(),
        role: 'User',
        status: 'active'
      };
      const saved = mockDb.saveUser(newUser);
      setUser(saved);
      const foundProfile = mockDb.getProfile(saved.id);
      if (foundProfile) {
        setProfile(foundProfile);
      }
      localStorage.setItem('ig_current_user_id', saved.id);
      localStorage.setItem('ig_auth_token', `demo_token_${saved.id}`);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      const p = mockDb.getProfile(user.id);
      if (p) setProfile(p);
    }
  };

  const value = {
    user,
    profile,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    registerUser,
    refreshProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
