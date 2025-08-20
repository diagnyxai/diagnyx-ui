import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '../auth';
import type { User, LoginCredentials, SignupCredentials } from '@/types/auth';

// Mock AWS Amplify Auth functions
const mockSignIn = jest.fn();
const mockSignUp = jest.fn();
const mockSignOut = jest.fn();
const mockFetchAuthSession = jest.fn();
const mockConfirmSignUp = jest.fn();
const mockGetCurrentUser = jest.fn();
const mockResendSignUpCode = jest.fn();

jest.mock('@aws-amplify/auth', () => ({
  signIn: mockSignIn,
  signUp: mockSignUp,
  signOut: mockSignOut,
  fetchAuthSession: mockFetchAuthSession,
  confirmSignUp: mockConfirmSignUp,
  getCurrentUser: mockGetCurrentUser,
  resendSignUpCode: mockResendSignUpCode,
}));

// Mock API client
const mockApiClient = {
  getProfile: jest.fn(),
};

jest.mock('@/lib/api-client', () => ({
  apiClient: mockApiClient,
}));

// Mock Zustand persist middleware
jest.mock('zustand/middleware', () => ({
  persist: (fn: any) => fn,
}));

describe('useAuthStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the store before each test
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  });

  describe('Initial State', () => {
    test('should have correct initial state', () => {
      const { result } = renderHook(() => useAuthStore());
      
      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  describe('setError', () => {
    test('should set error message', () => {
      const { result } = renderHook(() => useAuthStore());
      
      act(() => {
        result.current.setError('Test error');
      });
      
      expect(result.current.error).toBe('Test error');
    });

    test('should clear error when set to null', () => {
      const { result } = renderHook(() => useAuthStore());
      
      act(() => {
        result.current.setError('Test error');
      });
      expect(result.current.error).toBe('Test error');
      
      act(() => {
        result.current.setError(null);
      });
      expect(result.current.error).toBeNull();
    });
  });

  describe('login', () => {
    const mockCredentials: LoginCredentials = {
      email: 'test@example.com',
      password: 'password123',
      rememberMe: true,
    };

    const mockCognitoUser = {
      userId: 'user-123',
      username: 'test@example.com',
      signInDetails: {
        loginId: 'test@example.com',
      },
    };

    const mockSession = {
      tokens: {
        accessToken: {
          toString: () => 'mock-access-token',
        },
      },
    };

    const mockBackendUser = {
      firstName: 'John',
      lastName: 'Doe',
      role: 'USER' as const,
      organizationId: 'org-123',
      avatar: 'avatar-url',
      phoneNumber: '+1234567890',
      accountType: 'INDIVIDUAL' as const,
    };

    test('should login successfully with backend user data', async () => {
      mockSignIn.mockResolvedValue({ isSignedIn: true });
      mockGetCurrentUser.mockResolvedValue(mockCognitoUser);
      mockFetchAuthSession.mockResolvedValue(mockSession);
      mockApiClient.getProfile.mockResolvedValue(mockBackendUser);

      const { result } = renderHook(() => useAuthStore());
      
      let loginResult: boolean;
      await act(async () => {
        loginResult = await result.current.login(mockCredentials);
      });

      expect(loginResult!).toBe(true);
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toEqual({
        id: 'user-123',
        email: 'test@example.com',
        name: 'John Doe',
        role: 'USER',
        organizationId: 'org-123',
        avatar: 'avatar-url',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '+1234567890',
        accountType: 'INDIVIDUAL',
      });
      expect(result.current.token).toBe('mock-access-token');
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    test('should login successfully without backend user data', async () => {
      mockSignIn.mockResolvedValue({ isSignedIn: true });
      mockGetCurrentUser.mockResolvedValue(mockCognitoUser);
      mockFetchAuthSession.mockResolvedValue(mockSession);
      mockApiClient.getProfile.mockRejectedValue(new Error('Backend error'));

      const { result } = renderHook(() => useAuthStore());
      
      let loginResult: boolean;
      await act(async () => {
        loginResult = await result.current.login(mockCredentials);
      });

      expect(loginResult!).toBe(true);
      expect(result.current.user).toEqual({
        id: 'user-123',
        email: 'test@example.com',
        name: 'test@example.com',
        role: 'USER',
        organizationId: undefined,
        avatar: undefined,
        firstName: undefined,
        lastName: undefined,
        phoneNumber: undefined,
        accountType: undefined,
      });
    });

    test('should handle incomplete sign-in', async () => {
      mockSignIn.mockResolvedValue({ isSignedIn: false });

      const { result } = renderHook(() => useAuthStore());
      
      let loginResult: boolean;
      await act(async () => {
        loginResult = await result.current.login(mockCredentials);
      });

      expect(loginResult!).toBe(false);
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.error).toBe('Sign-in incomplete');
      expect(result.current.isLoading).toBe(false);
    });

    test('should handle UserNotConfirmedException', async () => {
      const error = new Error('User not confirmed');
      error.name = 'UserNotConfirmedException';
      mockSignIn.mockRejectedValue(error);

      const { result } = renderHook(() => useAuthStore());
      
      let loginResult: boolean;
      await act(async () => {
        loginResult = await result.current.login(mockCredentials);
      });

      expect(loginResult!).toBe(false);
      expect(result.current.error).toBe('Please confirm your email address before logging in');
    });

    test('should handle NotAuthorizedException', async () => {
      const error = new Error('Not authorized');
      error.name = 'NotAuthorizedException';
      mockSignIn.mockRejectedValue(error);

      const { result } = renderHook(() => useAuthStore());
      
      let loginResult: boolean;
      await act(async () => {
        loginResult = await result.current.login(mockCredentials);
      });

      expect(loginResult!).toBe(false);
      expect(result.current.error).toBe('Invalid email or password');
    });

    test('should handle UserNotFoundException', async () => {
      const error = new Error('User not found');
      error.name = 'UserNotFoundException';
      mockSignIn.mockRejectedValue(error);

      const { result } = renderHook(() => useAuthStore());
      
      let loginResult: boolean;
      await act(async () => {
        loginResult = await result.current.login(mockCredentials);
      });

      expect(loginResult!).toBe(false);
      expect(result.current.error).toBe('User not found');
    });

    test('should handle generic errors', async () => {
      const error = new Error('Network error');
      mockSignIn.mockRejectedValue(error);

      const { result } = renderHook(() => useAuthStore());
      
      let loginResult: boolean;
      await act(async () => {
        loginResult = await result.current.login(mockCredentials);
      });

      expect(loginResult!).toBe(false);
      expect(result.current.error).toBe('Network error');
    });

    test('should set loading state during login', async () => {
      mockSignIn.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ isSignedIn: true }), 100)));
      mockGetCurrentUser.mockResolvedValue(mockCognitoUser);
      mockFetchAuthSession.mockResolvedValue(mockSession);

      const { result } = renderHook(() => useAuthStore());
      
      const loginPromise = act(async () => {
        result.current.login(mockCredentials);
      });

      expect(result.current.isLoading).toBe(true);
      
      await loginPromise;
    });
  });

  describe('signup', () => {
    const mockCredentials: SignupCredentials = {
      email: 'test@example.com',
      password: 'password123',
      name: 'John Doe',
      accountType: 'INDIVIDUAL',
    };

    test('should signup successfully with auto-login when signup is complete', async () => {
      mockSignUp.mockResolvedValue({ isSignUpComplete: true });
      
      // Mock successful login after signup
      mockSignIn.mockResolvedValue({ isSignedIn: true });
      mockGetCurrentUser.mockResolvedValue({
        userId: 'user-123',
        username: 'test@example.com',
        signInDetails: { loginId: 'test@example.com' },
      });
      mockFetchAuthSession.mockResolvedValue({
        tokens: { accessToken: { toString: () => 'token' } },
      });
      mockApiClient.getProfile.mockResolvedValue({});

      const { result } = renderHook(() => useAuthStore());
      
      let signupResult: any;
      await act(async () => {
        signupResult = await result.current.signup(mockCredentials);
      });

      expect(signupResult.success).toBe(true);
      expect(signupResult.requiresConfirmation).toBe(false);
      expect(result.current.isAuthenticated).toBe(true);
    });

    test('should signup successfully requiring email confirmation', async () => {
      mockSignUp.mockResolvedValue({ isSignUpComplete: false });

      const { result } = renderHook(() => useAuthStore());
      
      let signupResult: any;
      await act(async () => {
        signupResult = await result.current.signup(mockCredentials);
      });

      expect(signupResult.success).toBe(true);
      expect(signupResult.requiresConfirmation).toBe(true);
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });

    test('should handle UsernameExistsException', async () => {
      const error = new Error('Username exists');
      error.name = 'UsernameExistsException';
      mockSignUp.mockRejectedValue(error);

      const { result } = renderHook(() => useAuthStore());
      
      let signupResult: any;
      await act(async () => {
        signupResult = await result.current.signup(mockCredentials);
      });

      expect(signupResult.success).toBe(false);
      expect(signupResult.error).toBe('An account with this email already exists');
      expect(result.current.error).toBe('An account with this email already exists');
    });

    test('should handle InvalidPasswordException', async () => {
      const error = new Error('Invalid password');
      error.name = 'InvalidPasswordException';
      mockSignUp.mockRejectedValue(error);

      const { result } = renderHook(() => useAuthStore());
      
      let signupResult: any;
      await act(async () => {
        signupResult = await result.current.signup(mockCredentials);
      });

      expect(signupResult.success).toBe(false);
      expect(signupResult.error).toBe('Password does not meet requirements');
    });

    test('should handle generic signup errors', async () => {
      const error = new Error('Network error');
      mockSignUp.mockRejectedValue(error);

      const { result } = renderHook(() => useAuthStore());
      
      let signupResult: any;
      await act(async () => {
        signupResult = await result.current.signup(mockCredentials);
      });

      expect(signupResult.success).toBe(false);
      expect(signupResult.error).toBe('Network error');
    });

    test('should split name correctly for given_name and family_name', async () => {
      const credentials = {
        ...mockCredentials,
        name: 'John Michael Doe',
      };

      mockSignUp.mockResolvedValue({ isSignUpComplete: false });

      const { result } = renderHook(() => useAuthStore());
      
      await act(async () => {
        await result.current.signup(credentials);
      });

      expect(mockSignUp).toHaveBeenCalledWith({
        username: 'test@example.com',
        password: 'password123',
        options: {
          userAttributes: {
            email: 'test@example.com',
            given_name: 'John',
            family_name: 'Michael Doe',
            'custom:account_type': 'INDIVIDUAL',
          },
        },
      });
    });
  });

  describe('confirmSignup', () => {
    test('should confirm signup successfully', async () => {
      mockConfirmSignUp.mockResolvedValue({});

      const { result } = renderHook(() => useAuthStore());
      
      let confirmResult: boolean;
      await act(async () => {
        confirmResult = await result.current.confirmSignup('test@example.com', '123456');
      });

      expect(confirmResult!).toBe(true);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(mockConfirmSignUp).toHaveBeenCalledWith({
        username: 'test@example.com',
        confirmationCode: '123456',
      });
    });

    test('should handle CodeMismatchException', async () => {
      const error = new Error('Code mismatch');
      error.name = 'CodeMismatchException';
      mockConfirmSignUp.mockRejectedValue(error);

      const { result } = renderHook(() => useAuthStore());
      
      let confirmResult: boolean;
      await act(async () => {
        confirmResult = await result.current.confirmSignup('test@example.com', '123456');
      });

      expect(confirmResult!).toBe(false);
      expect(result.current.error).toBe('Invalid confirmation code');
    });

    test('should handle ExpiredCodeException', async () => {
      const error = new Error('Code expired');
      error.name = 'ExpiredCodeException';
      mockConfirmSignUp.mockRejectedValue(error);

      const { result } = renderHook(() => useAuthStore());
      
      let confirmResult: boolean;
      await act(async () => {
        confirmResult = await result.current.confirmSignup('test@example.com', '123456');
      });

      expect(confirmResult!).toBe(false);
      expect(result.current.error).toBe('Confirmation code has expired');
    });

    test('should handle generic confirmation errors', async () => {
      const error = new Error('Network error');
      mockConfirmSignUp.mockRejectedValue(error);

      const { result } = renderHook(() => useAuthStore());
      
      let confirmResult: boolean;
      await act(async () => {
        confirmResult = await result.current.confirmSignup('test@example.com', '123456');
      });

      expect(confirmResult!).toBe(false);
      expect(result.current.error).toBe('Network error');
    });
  });

  describe('resendConfirmationCode', () => {
    test('should resend confirmation code successfully', async () => {
      mockResendSignUpCode.mockResolvedValue({});

      const { result } = renderHook(() => useAuthStore());
      
      let resendResult: boolean;
      await act(async () => {
        resendResult = await result.current.resendConfirmationCode('test@example.com');
      });

      expect(resendResult!).toBe(true);
      expect(result.current.isLoading).toBe(false);
      expect(mockResendSignUpCode).toHaveBeenCalledWith({
        username: 'test@example.com',
      });
    });

    test('should handle resend error', async () => {
      const error = new Error('Resend failed');
      mockResendSignUpCode.mockRejectedValue(error);

      const { result } = renderHook(() => useAuthStore());
      
      let resendResult: boolean;
      await act(async () => {
        resendResult = await result.current.resendConfirmationCode('test@example.com');
      });

      expect(resendResult!).toBe(false);
      expect(result.current.error).toBe('Resend failed');
    });

    test('should handle resend error without message', async () => {
      mockResendSignUpCode.mockRejectedValue({});

      const { result } = renderHook(() => useAuthStore());
      
      let resendResult: boolean;
      await act(async () => {
        resendResult = await result.current.resendConfirmationCode('test@example.com');
      });

      expect(resendResult!).toBe(false);
      expect(result.current.error).toBe('Failed to resend confirmation code');
    });
  });

  describe('logout', () => {
    test('should logout successfully', async () => {
      // Set initial authenticated state
      useAuthStore.setState({
        user: { id: '123', email: 'test@example.com' } as User,
        token: 'token',
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      mockSignOut.mockResolvedValue({});

      const { result } = renderHook(() => useAuthStore());
      
      await act(async () => {
        await result.current.logout();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(mockSignOut).toHaveBeenCalled();
    });

    test('should clear state even if logout fails', async () => {
      // Set initial authenticated state
      useAuthStore.setState({
        user: { id: '123', email: 'test@example.com' } as User,
        token: 'token',
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      mockSignOut.mockRejectedValue(new Error('Logout failed'));

      const { result } = renderHook(() => useAuthStore());
      
      await act(async () => {
        await result.current.logout();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  describe('checkAuth', () => {
    const mockCognitoUser = {
      userId: 'user-123',
      username: 'test@example.com',
      signInDetails: { loginId: 'test@example.com' },
    };

    const mockSession = {
      tokens: {
        accessToken: {
          toString: () => 'mock-access-token',
        },
      },
    };

    test('should restore auth state when valid session exists', async () => {
      mockGetCurrentUser.mockResolvedValue(mockCognitoUser);
      mockFetchAuthSession.mockResolvedValue(mockSession);
      mockApiClient.getProfile.mockResolvedValue({
        firstName: 'John',
        lastName: 'Doe',
        role: 'USER',
      });

      const { result } = renderHook(() => useAuthStore());
      
      await act(async () => {
        await result.current.checkAuth();
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toEqual({
        id: 'user-123',
        email: 'test@example.com',
        name: 'John Doe',
        role: 'USER',
        organizationId: undefined,
        avatar: undefined,
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: undefined,
        accountType: undefined,
      });
      expect(result.current.token).toBe('mock-access-token');
    });

    test('should clear auth state when no valid session', async () => {
      mockGetCurrentUser.mockResolvedValue(null);
      mockFetchAuthSession.mockResolvedValue({ tokens: null });

      const { result } = renderHook(() => useAuthStore());
      
      await act(async () => {
        await result.current.checkAuth();
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
    });

    test('should clear auth state on error', async () => {
      mockGetCurrentUser.mockRejectedValue(new Error('Auth check failed'));

      const { result } = renderHook(() => useAuthStore());
      
      await act(async () => {
        await result.current.checkAuth();
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
    });
  });

  describe('refreshUser', () => {
    test('should refresh user when authenticated', async () => {
      // Set authenticated state
      useAuthStore.setState({
        user: { id: '123', email: 'test@example.com' } as User,
        token: 'token',
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      mockGetCurrentUser.mockResolvedValue({
        userId: 'user-123',
        username: 'test@example.com',
        signInDetails: { loginId: 'test@example.com' },
      });
      mockFetchAuthSession.mockResolvedValue({
        tokens: { accessToken: { toString: () => 'new-token' } },
      });
      mockApiClient.getProfile.mockResolvedValue({
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'ADMIN',
      });

      const { result } = renderHook(() => useAuthStore());
      
      await act(async () => {
        await result.current.refreshUser();
      });

      expect(result.current.user?.name).toBe('Jane Smith');
      expect(result.current.user?.role).toBe('ADMIN');
    });

    test('should not refresh when not authenticated', async () => {
      const { result } = renderHook(() => useAuthStore());
      
      await act(async () => {
        await result.current.refreshUser();
      });

      expect(mockGetCurrentUser).not.toHaveBeenCalled();
    });
  });

  describe('Loading States', () => {
    test('should set loading during login', async () => {
      let resolveLogin: any;
      mockSignIn.mockReturnValue(new Promise(resolve => {
        resolveLogin = resolve;
      }));

      const { result } = renderHook(() => useAuthStore());
      
      act(() => {
        result.current.login({
          email: 'test@example.com',
          password: 'password',
        });
      });

      expect(result.current.isLoading).toBe(true);

      await act(async () => {
        resolveLogin({ isSignedIn: false });
      });

      expect(result.current.isLoading).toBe(false);
    });

    test('should set loading during signup', async () => {
      let resolveSignup: any;
      mockSignUp.mockReturnValue(new Promise(resolve => {
        resolveSignup = resolve;
      }));

      const { result } = renderHook(() => useAuthStore());
      
      act(() => {
        result.current.signup({
          email: 'test@example.com',
          password: 'password',
          name: 'Test User',
        });
      });

      expect(result.current.isLoading).toBe(true);

      await act(async () => {
        resolveSignup({ isSignUpComplete: false });
      });

      expect(result.current.isLoading).toBe(false);
    });

    test('should set loading during logout', async () => {
      let resolveLogout: any;
      mockSignOut.mockReturnValue(new Promise(resolve => {
        resolveLogout = resolve;
      }));

      const { result } = renderHook(() => useAuthStore());
      
      act(() => {
        result.current.logout();
      });

      expect(result.current.isLoading).toBe(true);

      await act(async () => {
        resolveLogout();
      });

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('Error Handling', () => {
    test('should clear error on successful operations', async () => {
      // Set initial error state
      useAuthStore.setState({ error: 'Previous error' });

      mockSignIn.mockResolvedValue({ isSignedIn: true });
      mockGetCurrentUser.mockResolvedValue({
        userId: 'user-123',
        username: 'test@example.com',
        signInDetails: { loginId: 'test@example.com' },
      });
      mockFetchAuthSession.mockResolvedValue({
        tokens: { accessToken: { toString: () => 'token' } },
      });
      mockApiClient.getProfile.mockResolvedValue({});

      const { result } = renderHook(() => useAuthStore());
      
      await act(async () => {
        await result.current.login({
          email: 'test@example.com',
          password: 'password',
        });
      });

      expect(result.current.error).toBeNull();
    });

    test('should preserve error details in auth exceptions', async () => {
      const error = new Error('Custom error message');
      error.name = 'CustomException';
      mockSignIn.mockRejectedValue(error);

      const { result } = renderHook(() => useAuthStore());
      
      await act(async () => {
        await result.current.login({
          email: 'test@example.com',
          password: 'password',
        });
      });

      expect(result.current.error).toBe('Custom error message');
    });
  });

  describe('User Profile Integration', () => {
    test('should handle missing backend profile gracefully', async () => {
      const mockCognitoUser = {
        userId: 'user-123',
        username: 'testuser',
        signInDetails: { loginId: 'test@example.com' },
      };

      mockSignIn.mockResolvedValue({ isSignedIn: true });
      mockGetCurrentUser.mockResolvedValue(mockCognitoUser);
      mockFetchAuthSession.mockResolvedValue({
        tokens: { accessToken: { toString: () => 'token' } },
      });
      mockApiClient.getProfile.mockRejectedValue(new Error('Profile not found'));

      const { result } = renderHook(() => useAuthStore());
      
      await act(async () => {
        await result.current.login({
          email: 'test@example.com',
          password: 'password',
        });
      });

      expect(result.current.user).toEqual({
        id: 'user-123',
        email: 'test@example.com',
        name: 'testuser',
        role: 'USER',
        organizationId: undefined,
        avatar: undefined,
        firstName: undefined,
        lastName: undefined,
        phoneNumber: undefined,
        accountType: undefined,
      });
    });

    test('should use fallback name when no backend profile', async () => {
      const mockCognitoUser = {
        userId: 'user-123',
        username: undefined,
        signInDetails: { loginId: 'test@example.com' },
      };

      mockSignIn.mockResolvedValue({ isSignedIn: true });
      mockGetCurrentUser.mockResolvedValue(mockCognitoUser);
      mockFetchAuthSession.mockResolvedValue({
        tokens: { accessToken: { toString: () => 'token' } },
      });
      mockApiClient.getProfile.mockRejectedValue(new Error('Profile not found'));

      const { result } = renderHook(() => useAuthStore());
      
      await act(async () => {
        await result.current.login({
          email: 'test@example.com',
          password: 'password',
        });
      });

      expect(result.current.user?.name).toBe('User');
    });
  });
});