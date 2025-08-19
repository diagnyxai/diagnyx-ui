import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { signIn, signUp, signOut, fetchAuthSession, confirmSignUp, getCurrentUser, resendSignUpCode } from '@aws-amplify/auth';
import { apiClient } from '@/lib/api-client';
import type { User, AuthState, LoginCredentials, SignupCredentials } from '@/types/auth';

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  signup: (credentials: SignupCredentials) => Promise<{ success: boolean; requiresConfirmation?: boolean; error?: string }>;
  confirmSignup: (email: string, confirmationCode: string) => Promise<boolean>;
  resendConfirmationCode: (email: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  refreshUser: () => Promise<void>;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setError: (error: string | null) => {
        set({ error });
      },

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const result = await signIn({
            username: credentials.email,
            password: credentials.password,
          });

          if (result.isSignedIn) {
            // Get user data from Cognito
            const cognitoUser = await getCurrentUser();
            const session = await fetchAuthSession();
            
            // Get additional user details from our backend
            let backendUser;
            try {
              backendUser = await apiClient.getProfile();
            } catch (error) {
              console.warn('Failed to fetch user profile from backend:', error);
            }

            const user: User = {
              id: cognitoUser.userId,
              email: cognitoUser.signInDetails?.loginId || credentials.email,
              name: backendUser?.firstName && backendUser?.lastName 
                ? `${backendUser.firstName} ${backendUser.lastName}` 
                : cognitoUser.username || 'User',
              role: backendUser?.role || 'USER',
              organizationId: backendUser?.organizationId,
              avatar: backendUser?.avatar,
              firstName: backendUser?.firstName,
              lastName: backendUser?.lastName,
              phoneNumber: backendUser?.phoneNumber,
              accountType: backendUser?.accountType,
            };

            const accessToken = session.tokens?.accessToken?.toString();

            set({
              user,
              token: accessToken || null,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            return true;
          } else {
            set({ isLoading: false, error: 'Sign-in incomplete' });
            return false;
          }
        } catch (error: any) {
          console.error('Login error:', error);
          let errorMessage = 'Login failed';
          
          if (error.name === 'UserNotConfirmedException') {
            errorMessage = 'Please confirm your email address before logging in';
          } else if (error.name === 'NotAuthorizedException') {
            errorMessage = 'Invalid email or password';
          } else if (error.name === 'UserNotFoundException') {
            errorMessage = 'User not found';
          } else if (error.message) {
            errorMessage = error.message;
          }

          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          return false;
        }
      },

      signup: async (credentials: SignupCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const result = await signUp({
            username: credentials.email,
            password: credentials.password,
            options: {
              userAttributes: {
                email: credentials.email,
                given_name: credentials.name.split(' ')[0] || credentials.name,
                family_name: credentials.name.split(' ').slice(1).join(' ') || '',
                'custom:account_type': 'INDIVIDUAL',
              },
            },
          });

          if (result.isSignUpComplete) {
            // Auto-login after successful signup
            const loginSuccess = await get().login({
              email: credentials.email,
              password: credentials.password,
              rememberMe: false,
            });

            set({ isLoading: false });
            return { 
              success: loginSuccess, 
              requiresConfirmation: false 
            };
          } else {
            set({ isLoading: false });
            return { 
              success: true, 
              requiresConfirmation: true 
            };
          }
        } catch (error: any) {
          console.error('Signup error:', error);
          let errorMessage = 'Signup failed';
          
          if (error.name === 'UsernameExistsException') {
            errorMessage = 'An account with this email already exists';
          } else if (error.name === 'InvalidPasswordException') {
            errorMessage = 'Password does not meet requirements';
          } else if (error.message) {
            errorMessage = error.message;
          }

          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          return { 
            success: false, 
            error: errorMessage 
          };
        }
      },

      confirmSignup: async (email: string, confirmationCode: string) => {
        set({ isLoading: true, error: null });
        
        try {
          await confirmSignUp({
            username: email,
            confirmationCode,
          });

          set({ 
            isLoading: false, 
            error: null 
          });
          return true;
        } catch (error: any) {
          console.error('Confirmation error:', error);
          let errorMessage = 'Email confirmation failed';
          
          if (error.name === 'CodeMismatchException') {
            errorMessage = 'Invalid confirmation code';
          } else if (error.name === 'ExpiredCodeException') {
            errorMessage = 'Confirmation code has expired';
          } else if (error.message) {
            errorMessage = error.message;
          }

          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          return false;
        }
      },

      resendConfirmationCode: async (email: string) => {
        set({ isLoading: true, error: null });
        
        try {
          await resendSignUpCode({ username: email });
          set({ isLoading: false });
          return true;
        } catch (error: any) {
          console.error('Resend confirmation error:', error);
          set({ 
            isLoading: false, 
            error: error.message || 'Failed to resend confirmation code' 
          });
          return false;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        
        try {
          await signOut();
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          console.error('Logout error:', error);
          // Even if logout fails, clear local state
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      checkAuth: async () => {
        try {
          const cognitoUser = await getCurrentUser();
          const session = await fetchAuthSession();
          
          if (cognitoUser && session.tokens?.accessToken) {
            // Get user profile from backend
            let backendUser;
            try {
              backendUser = await apiClient.getProfile();
            } catch (error) {
              console.warn('Failed to fetch user profile from backend:', error);
            }

            const user: User = {
              id: cognitoUser.userId,
              email: cognitoUser.signInDetails?.loginId || '',
              name: backendUser?.firstName && backendUser?.lastName 
                ? `${backendUser.firstName} ${backendUser.lastName}` 
                : cognitoUser.username || 'User',
              role: backendUser?.role || 'USER',
              organizationId: backendUser?.organizationId,
              avatar: backendUser?.avatar,
              firstName: backendUser?.firstName,
              lastName: backendUser?.lastName,
              phoneNumber: backendUser?.phoneNumber,
              accountType: backendUser?.accountType,
            };

            const accessToken = session.tokens.accessToken.toString();

            set({
              user,
              token: accessToken,
              isAuthenticated: true,
              error: null,
            });
          } else {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              error: null,
            });
          }
        } catch (error) {
          console.error('Check auth error:', error);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });
        }
      },

      refreshUser: async () => {
        const { isAuthenticated } = get();
        if (isAuthenticated) {
          await get().checkAuth();
        }
      },
    }),
    {
      name: 'diagnyx-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        // Don't persist token, error, or isLoading
      }),
    }
  )
);