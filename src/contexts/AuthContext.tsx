import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Program, UserRole } from '@/types';
import { AVAILABLE_BADGES } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: UserRole, program: Program) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addPoints: (points: number) => void;
  accessResource: (resourceId: string) => void;
  addCollaboration: () => void;
  claimDailyBonus: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'udst_health_user';
const DAILY_BONUS_KEY = 'udst_daily_bonus_claimed';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Update streak if logging in on a new day
      const lastLogin = new Date(parsedUser.lastLogin);
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        parsedUser.streak += 1;
      } else if (daysDiff > 1) {
        parsedUser.streak = 1;
      }
      
      parsedUser.lastLogin = today.toISOString();
      
      // Check for new badges
      checkAndAwardBadges(parsedUser);
      
      setUser(parsedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedUser));
    }
    setIsLoading(false);
  }, []);

  const checkAndAwardBadges = (currentUser: User) => {
    const earnedBadgeIds = currentUser.badges.map(b => b.id);
    
    // Streak Master badge
    if (currentUser.streak >= 7 && !earnedBadgeIds.includes('streak-master')) {
      const badge = AVAILABLE_BADGES.find(b => b.id === 'streak-master');
      if (badge) {
        currentUser.badges.push({ ...badge, earnedAt: new Date().toISOString() });
      }
    }
    
    // Resource Explorer badge
    if (currentUser.resourcesAccessed.length >= 10 && !earnedBadgeIds.includes('resource-explorer')) {
      const badge = AVAILABLE_BADGES.find(b => b.id === 'resource-explorer');
      if (badge) {
        currentUser.badges.push({ ...badge, earnedAt: new Date().toISOString() });
      }
    }
    
    // Collaborator badge
    if (currentUser.collaborations >= 3 && !earnedBadgeIds.includes('collaborator')) {
      const badge = AVAILABLE_BADGES.find(b => b.id === 'collaborator');
      if (badge) {
        currentUser.badges.push({ ...badge, earnedAt: new Date().toISOString() });
      }
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in production, validate against backend
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email === email) {
        parsedUser.lastLogin = new Date().toISOString();
        setUser(parsedUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedUser));
        setIsLoading(false);
        return true;
      }
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: UserRole,
    program: Program
  ): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      role,
      program,
      streak: 1,
      points: 50, // Welcome bonus
      badges: [],
      resourcesAccessed: [],
      collaborations: 0,
      lastLogin: new Date().toISOString(),
    };
    
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DAILY_BONUS_KEY);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    }
  };

  const addPoints = (points: number) => {
    if (user) {
      const updatedUser = { ...user, points: user.points + points };
      checkAndAwardBadges(updatedUser);
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    }
  };

  const accessResource = (resourceId: string) => {
    if (user && !user.resourcesAccessed.includes(resourceId)) {
      const updatedUser = {
        ...user,
        resourcesAccessed: [...user.resourcesAccessed, resourceId],
        points: user.points + 5,
      };
      checkAndAwardBadges(updatedUser);
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    }
  };

  const addCollaboration = () => {
    if (user) {
      const updatedUser = {
        ...user,
        collaborations: user.collaborations + 1,
        points: user.points + 15,
      };
      checkAndAwardBadges(updatedUser);
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    }
  };

  const claimDailyBonus = (): boolean => {
    const today = new Date().toDateString();
    const lastClaimed = localStorage.getItem(DAILY_BONUS_KEY);
    
    if (lastClaimed === today) {
      return false;
    }
    
    addPoints(10);
    localStorage.setItem(DAILY_BONUS_KEY, today);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
        addPoints,
        accessResource,
        addCollaboration,
        claimDailyBonus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
