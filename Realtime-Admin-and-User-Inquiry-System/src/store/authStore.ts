import { create } from 'zustand';
import { User, UserRole } from '../types';
import { mockUsers } from '../mockData';

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'createdAt' | 'role'>) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,
  isAuthenticated: false,
  
  login: (username, password, role) => {
    const user = mockUsers.find(
      (u) => u.username === username && u.password === password && u.role === role
    );
    
    if (user) {
      set({ currentUser: user, isAuthenticated: true });
      return true;
    }
    return false;
  },
  
  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
  },
  
  register: (userData) => {
    const existingUser = mockUsers.find(
      (u) => u.username === userData.username || u.email === userData.email
    );
    
    if (existingUser) {
      return false;
    }
    
    const newUser: User = {
      id: user-${mockUsers.length + 1},
      ...userData,
      role: 'user',
      createdAt: new Date(),
    };
    
    mockUsers.push(newUser);
    set({ currentUser: newUser, isAuthenticated: true });
    return true;
  },
}));