import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, role?: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string) => Promise<boolean>;
  logout: () => void;
  toggleWishlist: (ticketId: string) => void;
  isWishlist: (ticketId: string) => boolean;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  authMode: 'login' | 'register';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ts_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-1',
      name: 'Shariful Islam',
      email: 'user@ticketsphere.com',
      role: 'user',
      phone: '+1 415 890 2341',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      wishlist: ['TS-FL-101', 'TS-CC-303'],
      createdAt: '2026-01-15'
    };
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem('ts_token') || 'mock-jwt-token-usr-1');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    if (user) {
      localStorage.setItem('ts_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ts_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('ts_token', token);
    } else {
      localStorage.removeItem('ts_token');
    }
  }, [token]);

  const login = async (email: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'password123' })
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        setIsAuthModalOpen(false);
        return true;
      }
    } catch (err) {
      console.error('Login error:', err);
    }
    return false;
  };

  const register = async (name: string, email: string, phone: string) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone })
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        setIsAuthModalOpen(false);
        return true;
      }
    } catch (err) {
      console.error('Registration error:', err);
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const toggleWishlist = async (ticketId: string) => {
    if (!user) {
      openAuthModal('login');
      return;
    }
    const currentList = user.wishlist || [];
    const exists = currentList.includes(ticketId);
    const updated = exists
      ? currentList.filter((id) => id !== ticketId)
      : [...currentList, ticketId];

    const updatedUser = { ...user, wishlist: updated };
    setUser(updatedUser);

    try {
      await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, wishlist: updated })
      });
    } catch (e) {
      console.error('Failed to sync wishlist:', e);
    }
  };

  const isWishlist = (ticketId: string) => {
    return user ? (user.wishlist || []).includes(ticketId) : false;
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        toggleWishlist,
        isWishlist,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
