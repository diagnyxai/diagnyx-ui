import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import jwt from 'jsonwebtoken';
import type { User, AuthState, LoginCredentials, SignupCredentials } from '@/types/auth';

// Mock user data
const MOCK_USER: User = {
  id: '1',
  email: 'demo@diagnyx.ai',
  name: 'Demo User',
  role: 'admin',
  organizationId: 'org-1',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
};

const MOCK_CREDENTIALS = {
  email: 'demo@diagnyx.ai',
  password: 'password123'
};

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  signup: (credentials: SignupCredentials) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (
          credentials.email === MOCK_CREDENTIALS.email &&
          credentials.password === MOCK_CREDENTIALS.password
        ) {
          // Generate mock JWT token
          const token = jwt.sign(
            { 
              userId: MOCK_USER.id,
              email: MOCK_USER.email,
              role: MOCK_USER.role
            },
            'mock-secret',
            { expiresIn: '24h' }
          );

          set({
            user: MOCK_USER,
            token,
            isAuthenticated: true,
            isLoading: false
          });
          
          return true;
        } else {
          set({ isLoading: false });
          return false;
        }
      },

      signup: async (credentials: SignupCredentials) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, create a new user with the provided details
        const newUser: User = {
          id: Math.random().toString(36),
          email: credentials.email,
          name: credentials.name,
          role: 'user',
          organizationId: 'org-1',
        };

        const token = jwt.sign(
          { 
            userId: newUser.id,
            email: newUser.email,
            role: newUser.role
          },
          'mock-secret',
          { expiresIn: '24h' }
        );

        set({
          user: newUser,
          token,
          isAuthenticated: true,
          isLoading: false
        });
        
        return true;
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false
        });
      },

      checkAuth: () => {
        const { token } = get();
        if (token) {
          try {
            const decoded = jwt.verify(token, 'mock-secret') as any;
            if (decoded.exp * 1000 > Date.now()) {
              set({ isAuthenticated: true });
            } else {
              // Token expired
              set({
                user: null,
                token: null,
                isAuthenticated: false
              });
            }
          } catch (error) {
            // Invalid token
            set({
              user: null,
              token: null,
              isAuthenticated: false
            });
          }
        }
      }
    }),
    {
      name: 'diagnyx-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);