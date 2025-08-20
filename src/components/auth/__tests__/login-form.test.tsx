import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { LoginForm } from '../login-form';
import { useAuthStore } from '@/store/auth';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock auth store
jest.mock('@/store/auth', () => ({
  useAuthStore: jest.fn(),
}));

// Mock UI components
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, disabled, className, type, onClick, ...props }: any) => (
    <button 
      disabled={disabled} 
      className={className} 
      type={type} 
      onClick={onClick}
      data-testid="button"
      {...props}
    >
      {children}
    </button>
  ),
}));

jest.mock('@/components/ui/input', () => ({
  Input: React.forwardRef(({ className, type, placeholder, ...props }: any, ref) => (
    <input
      ref={ref}
      className={className}
      type={type}
      placeholder={placeholder}
      data-testid={`input-${props.id || type || 'default'}`}
      {...props}
    />
  )),
}));

jest.mock('@/components/ui/label', () => ({
  Label: ({ children, htmlFor, className, ...props }: any) => (
    <label htmlFor={htmlFor} className={className} {...props}>
      {children}
    </label>
  ),
}));

jest.mock('@/components/ui/checkbox', () => ({
  Checkbox: ({ checked, onCheckedChange, ...props }: any) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      data-testid="checkbox"
      {...props}
    />
  ),
}));

jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className }: any) => (
    <div className={className} data-testid="card">
      {children}
    </div>
  ),
  CardContent: ({ children, className }: any) => (
    <div className={className} data-testid="card-content">
      {children}
    </div>
  ),
  CardDescription: ({ children, className }: any) => (
    <div className={className} data-testid="card-description">
      {children}
    </div>
  ),
  CardHeader: ({ children, className }: any) => (
    <div className={className} data-testid="card-header">
      {children}
    </div>
  ),
  CardTitle: ({ children, className }: any) => (
    <h1 className={className} data-testid="card-title">
      {children}
    </h1>
  ),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Eye: () => <span data-testid="eye-icon">👁</span>,
  EyeOff: () => <span data-testid="eye-off-icon">👁‍🗨</span>,
  Loader2: () => <span data-testid="loader-icon">⏳</span>,
}));

// Mock window.location
const mockLocation = {
  search: '',
  replace: jest.fn(),
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('LoginForm', () => {
  const mockPush = jest.fn();
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocation.search = '';
    
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useAuthStore as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
    });
  });

  describe('Rendering', () => {
    test('should render login form with all fields', () => {
      render(<LoginForm />);

      expect(screen.getByText('Welcome back')).toBeInTheDocument();
      expect(screen.getByText('Sign in to your Diagnyx account')).toBeInTheDocument();
      
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
      
      expect(screen.getByTestId('button')).toBeInTheDocument();
      expect(screen.getByText('Sign in')).toBeInTheDocument();
    });

    test('should render password visibility toggle', () => {
      render(<LoginForm />);

      const toggleButtons = screen.getAllByRole('button', { name: '' });
      expect(toggleButtons).toHaveLength(2); // 1 password toggle + 1 submit button
    });

    test('should render forgot password link', () => {
      render(<LoginForm />);

      const forgotPasswordLink = screen.getByText('Forgot password?');
      expect(forgotPasswordLink.closest('a')).toHaveAttribute('href', '/forgot-password');
    });

    test('should render sign up link', () => {
      render(<LoginForm />);

      const signUpLink = screen.getByText('Sign up');
      expect(signUpLink.closest('a')).toHaveAttribute('href', '/signup');
    });

    test('should render remember me checkbox', () => {
      render(<LoginForm />);

      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });
  });

  describe('Form Validation', () => {
    test('should show validation errors for empty fields', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);

      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });

    test('should validate email format', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);

      const emailInput = screen.getByTestId('input-email');
      await user.type(emailInput, 'invalid-email');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });

    test('should require password field', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);

      const emailInput = screen.getByTestId('input-email');
      await user.type(emailInput, 'john@example.com');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });

    test('should accept valid email and password', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue(true);
      
      render(<LoginForm />);

      const emailInput = screen.getByTestId('input-email');
      const passwordInput = screen.getByTestId('input-password');

      await user.type(emailInput, 'john@example.com');
      await user.type(passwordInput, 'password123');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: 'john@example.com',
          password: 'password123',
          rememberMe: false,
        });
      });
    });
  });

  describe('Password Visibility', () => {
    test('should toggle password visibility', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);

      const passwordInput = screen.getByTestId('input-password') as HTMLInputElement;
      expect(passwordInput.type).toBe('password');

      const toggleButtons = screen.getAllByRole('button', { name: '' });
      const passwordToggle = toggleButtons[0]; // First toggle button
      
      await user.click(passwordToggle);
      expect(passwordInput.type).toBe('text');

      await user.click(passwordToggle);
      expect(passwordInput.type).toBe('password');
    });

    test('should show correct icons for password visibility', () => {
      render(<LoginForm />);

      // Initially should show Eye icon (password hidden)
      expect(screen.getByTestId('eye-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('eye-off-icon')).not.toBeInTheDocument();
    });

    test('should show eye-off icon when password is visible', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);

      const toggleButtons = screen.getAllByRole('button', { name: '' });
      const passwordToggle = toggleButtons[0];
      
      await user.click(passwordToggle);
      
      expect(screen.getByTestId('eye-off-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('eye-icon')).not.toBeInTheDocument();
    });
  });

  describe('Remember Me Functionality', () => {
    test('should default remember me to false', () => {
      render(<LoginForm />);

      const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    test('should toggle remember me checkbox', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);

      const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);

      await user.click(checkbox);
      expect(checkbox.checked).toBe(true);

      await user.click(checkbox);
      expect(checkbox.checked).toBe(false);
    });

    test('should include remember me in form submission', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue(true);
      
      render(<LoginForm />);

      const emailInput = screen.getByTestId('input-email');
      const passwordInput = screen.getByTestId('input-password');
      const checkbox = screen.getByTestId('checkbox');

      await user.type(emailInput, 'john@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(checkbox);
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: 'john@example.com',
          password: 'password123',
          rememberMe: true,
        });
      });
    });
  });

  describe('Form Submission', () => {
    test('should submit form with valid credentials', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue(true);
      
      render(<LoginForm />);

      await user.type(screen.getByTestId('input-email'), 'john@example.com');
      await user.type(screen.getByTestId('input-password'), 'password123');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: 'john@example.com',
          password: 'password123',
          rememberMe: false,
        });
      });
    });

    test('should redirect to dashboard on successful login', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue(true);
      
      render(<LoginForm />);

      await user.type(screen.getByTestId('input-email'), 'john@example.com');
      await user.type(screen.getByTestId('input-password'), 'password123');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      });
    });

    test('should redirect to specified redirect URL on successful login', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue(true);
      mockLocation.search = '?redirect=/analytics';
      
      render(<LoginForm />);

      await user.type(screen.getByTestId('input-email'), 'john@example.com');
      await user.type(screen.getByTestId('input-password'), 'password123');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/analytics');
      });
    });

    test('should handle login failure', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue(false);
      
      render(<LoginForm />);

      await user.type(screen.getByTestId('input-email'), 'john@example.com');
      await user.type(screen.getByTestId('input-password'), 'wrongpassword');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Login failed. Please check your credentials.')).toBeInTheDocument();
      });
    });

    test('should handle login exception', async () => {
      const user = userEvent.setup();
      mockLogin.mockRejectedValue(new Error('Network error'));
      
      render(<LoginForm />);

      await user.type(screen.getByTestId('input-email'), 'john@example.com');
      await user.type(screen.getByTestId('input-password'), 'password123');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument();
      });
    });

    test('should handle generic error without message', async () => {
      const user = userEvent.setup();
      mockLogin.mockRejectedValue({});
      
      render(<LoginForm />);

      await user.type(screen.getByTestId('input-email'), 'john@example.com');
      await user.type(screen.getByTestId('input-password'), 'password123');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('An error occurred. Please try again.')).toBeInTheDocument();
      });
    });

    test('should clear error message when resubmitting', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValueOnce(false)
               .mockResolvedValueOnce(true);
      
      render(<LoginForm />);

      await user.type(screen.getByTestId('input-email'), 'john@example.com');
      await user.type(screen.getByTestId('input-password'), 'password123');
      
      const submitButton = screen.getByTestId('button');
      
      // First submission (failure)
      await user.click(submitButton);
      await waitFor(() => {
        expect(screen.getByText('Login failed. Please check your credentials.')).toBeInTheDocument();
      });

      // Second submission (success)
      await user.click(submitButton);
      await waitFor(() => {
        expect(screen.queryByText('Login failed. Please check your credentials.')).not.toBeInTheDocument();
      });
    });
  });

  describe('Loading State', () => {
    test('should show loading state during login', () => {
      (useAuthStore as jest.Mock).mockReturnValue({
        login: mockLogin,
        isLoading: true,
      });

      render(<LoginForm />);

      const submitButton = screen.getByTestId('button');
      expect(submitButton).toBeDisabled();
      expect(screen.getByText('Signing in...')).toBeInTheDocument();
      expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
    });

    test('should not show loading state when not loading', () => {
      render(<LoginForm />);

      const submitButton = screen.getByTestId('button');
      expect(submitButton).not.toBeDisabled();
      expect(screen.getByText('Sign in')).toBeInTheDocument();
      expect(screen.queryByTestId('loader-icon')).not.toBeInTheDocument();
    });
  });

  describe('Form Field Styling', () => {
    test('should show red border on email validation error', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);

      const emailInput = screen.getByTestId('input-email');
      await user.type(emailInput, 'invalid-email');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(emailInput).toHaveClass('border-red-500');
      });
    });

    test('should show red border on password validation error', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);

      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        const passwordInput = screen.getByTestId('input-password');
        expect(passwordInput).toHaveClass('border-red-500');
      });
    });

    test('should remove red border when field becomes valid', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);

      // Trigger validation error
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });

      // Fix the email field
      const emailInput = screen.getByTestId('input-email');
      await user.type(emailInput, 'john@example.com');

      // Trigger validation again
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
      });
    });
  });

  describe('URL Parsing', () => {
    test('should handle redirect parameter correctly', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue(true);
      
      // Mock URLSearchParams
      const mockURLSearchParams = {
        get: jest.fn().mockReturnValue('/custom-redirect'),
      };
      global.URLSearchParams = jest.fn().mockImplementation(() => mockURLSearchParams);
      
      render(<LoginForm />);

      await user.type(screen.getByTestId('input-email'), 'john@example.com');
      await user.type(screen.getByTestId('input-password'), 'password123');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/custom-redirect');
      });
    });

    test('should handle encoded redirect URLs', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue(true);
      
      const mockURLSearchParams = {
        get: jest.fn().mockReturnValue('/dashboard?tab=analytics'),
      };
      global.URLSearchParams = jest.fn().mockImplementation(() => mockURLSearchParams);
      
      render(<LoginForm />);

      await user.type(screen.getByTestId('input-email'), 'john@example.com');
      await user.type(screen.getByTestId('input-password'), 'password123');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard?tab=analytics');
      });
    });
  });

  describe('Accessibility', () => {
    test('should have proper labels for form inputs', () => {
      render(<LoginForm />);

      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
    });

    test('should have proper placeholders', () => {
      render(<LoginForm />);

      expect(screen.getByPlaceholderText('john@example.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    });

    test('should have submit button with proper type', () => {
      render(<LoginForm />);

      const submitButton = screen.getByTestId('button');
      expect(submitButton).toHaveAttribute('type', 'submit');
    });

    test('should have proper cursor pointer for remember me label', () => {
      render(<LoginForm />);

      const rememberMeLabel = screen.getByText('Remember me');
      expect(rememberMeLabel).toHaveClass('cursor-pointer');
    });
  });

  describe('Error Recovery', () => {
    test('should allow error recovery after failed login attempt', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValueOnce(false).mockResolvedValueOnce(true);
      
      render(<LoginForm />);

      await user.type(screen.getByTestId('input-email'), 'john@example.com');
      await user.type(screen.getByTestId('input-password'), 'wrongpassword');
      
      const submitButton = screen.getByTestId('button');
      
      // First attempt - fail
      await user.click(submitButton);
      await waitFor(() => {
        expect(screen.getByText('Login failed. Please check your credentials.')).toBeInTheDocument();
      });

      // Clear password and try again
      const passwordInput = screen.getByTestId('input-password');
      await user.clear(passwordInput);
      await user.type(passwordInput, 'correctpassword');
      
      // Second attempt - succeed
      await user.click(submitButton);
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
        expect(screen.queryByText('Login failed. Please check your credentials.')).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Interactions', () => {
    test('should allow typing in email field', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);

      const emailInput = screen.getByTestId('input-email') as HTMLInputElement;
      await user.type(emailInput, 'test@example.com');

      expect(emailInput.value).toBe('test@example.com');
    });

    test('should allow typing in password field', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);

      const passwordInput = screen.getByTestId('input-password') as HTMLInputElement;
      await user.type(passwordInput, 'mypassword');

      expect(passwordInput.value).toBe('mypassword');
    });

    test('should submit form on enter key press', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue(true);
      
      render(<LoginForm />);

      await user.type(screen.getByTestId('input-email'), 'john@example.com');
      await user.type(screen.getByTestId('input-password'), 'password123');
      
      const passwordInput = screen.getByTestId('input-password');
      await user.type(passwordInput, '{enter}');

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: 'john@example.com',
          password: 'password123',
          rememberMe: false,
        });
      });
    });
  });
});