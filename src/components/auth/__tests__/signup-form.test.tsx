import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { SignupForm } from '../signup-form';
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
  Label: ({ children, htmlFor, ...props }: any) => (
    <label htmlFor={htmlFor} {...props}>
      {children}
    </label>
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

jest.mock('@/components/ui/select', () => ({
  Select: ({ children, value, onValueChange }: any) => (
    <div data-testid="select-container">
      <input
        data-testid="select-input"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        readOnly
      />
      {children}
    </div>
  ),
  SelectContent: ({ children }: any) => <div data-testid="select-content">{children}</div>,
  SelectItem: ({ children, value, ...props }: any) => (
    <div data-testid={`select-item-${value}`} data-value={value} {...props}>
      {children}
    </div>
  ),
  SelectTrigger: ({ children }: any) => <div data-testid="select-trigger">{children}</div>,
  SelectValue: ({ placeholder }: any) => <span data-testid="select-value">{placeholder}</span>,
}));

// Mock PasswordStrength component
jest.mock('../password-strength', () => ({
  PasswordStrength: ({ password }: any) => (
    <div data-testid="password-strength" data-password={password}>
      Password Strength Indicator
    </div>
  ),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Eye: () => <span data-testid="eye-icon">👁</span>,
  EyeOff: () => <span data-testid="eye-off-icon">👁‍🗨</span>,
  Loader2: () => <span data-testid="loader-icon">⏳</span>,
}));

describe('SignupForm', () => {
  const mockPush = jest.fn();
  const mockSignup = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useAuthStore as jest.Mock).mockReturnValue({
      signup: mockSignup,
      isLoading: false,
    });
  });

  describe('Rendering', () => {
    test('should render signup form with all fields', () => {
      render(<SignupForm />);

      expect(screen.getByText('Create your account')).toBeInTheDocument();
      expect(screen.getByText('Sign up to get started with Diagnyx')).toBeInTheDocument();
      
      expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Account Type')).toBeInTheDocument();
      
      expect(screen.getByTestId('button')).toBeInTheDocument();
      expect(screen.getByText('Create account')).toBeInTheDocument();
    });

    test('should render password visibility toggles', () => {
      render(<SignupForm />);

      const passwordToggles = screen.getAllByRole('button', { name: '' });
      expect(passwordToggles).toHaveLength(3); // 2 password toggles + 1 submit button
    });

    test('should render sign in link', () => {
      render(<SignupForm />);

      const signInLink = screen.getByText('Sign in');
      expect(signInLink.closest('a')).toHaveAttribute('href', '/login');
    });

    test('should render PasswordStrength component', () => {
      render(<SignupForm />);

      expect(screen.getByTestId('password-strength')).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    test('should show validation errors for empty fields', async () => {
      const user = userEvent.setup();
      render(<SignupForm />);

      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
        expect(screen.getByText('Password must be at least 12 characters')).toBeInTheDocument();
      });
    });

    test('should validate name length', async () => {
      const user = userEvent.setup();
      render(<SignupForm />);

      const nameInput = screen.getByTestId('input-name');
      await user.type(nameInput, 'J');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
      });
    });

    test('should validate email format', async () => {
      const user = userEvent.setup();
      render(<SignupForm />);

      const emailInput = screen.getByTestId('input-email');
      await user.type(emailInput, 'invalid-email');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });

    test('should validate password requirements', async () => {
      const user = userEvent.setup();
      render(<SignupForm />);

      const passwordInput = screen.getByTestId('input-password');
      await user.type(passwordInput, 'weak');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Password must be at least 12 characters')).toBeInTheDocument();
      });
    });

    test('should validate password complexity', async () => {
      const user = userEvent.setup();
      render(<SignupForm />);

      const passwordInput = screen.getByTestId('input-password');
      await user.type(passwordInput, '123456789012'); // Only numbers, no complexity
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Password must contain at least one lowercase letter')).toBeInTheDocument();
      });
    });

    test('should validate password confirmation match', async () => {
      const user = userEvent.setup();
      render(<SignupForm />);

      const nameInput = screen.getByTestId('input-name');
      const emailInput = screen.getByTestId('input-email');
      const passwordInput = screen.getByTestId('input-password');
      const confirmPasswordInput = screen.getByTestId('input-confirmPassword');

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(passwordInput, 'StrongPassword123!');
      await user.type(confirmPasswordInput, 'DifferentPassword123!');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
      });
    });

    test('should accept valid form data', async () => {
      const user = userEvent.setup();
      mockSignup.mockResolvedValue({ success: true, requiresConfirmation: true });
      
      render(<SignupForm />);

      const nameInput = screen.getByTestId('input-name');
      const emailInput = screen.getByTestId('input-email');
      const passwordInput = screen.getByTestId('input-password');
      const confirmPasswordInput = screen.getByTestId('input-confirmPassword');

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(passwordInput, 'StrongPassword123!');
      await user.type(confirmPasswordInput, 'StrongPassword123!');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSignup).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'StrongPassword123!',
          accountType: 'INDIVIDUAL',
        });
      });
    });
  });

  describe('Password Visibility', () => {
    test('should toggle password visibility', async () => {
      const user = userEvent.setup();
      render(<SignupForm />);

      const passwordInput = screen.getByTestId('input-password') as HTMLInputElement;
      expect(passwordInput.type).toBe('password');

      const toggleButtons = screen.getAllByRole('button', { name: '' });
      const passwordToggle = toggleButtons[0]; // First toggle button
      
      await user.click(passwordToggle);
      expect(passwordInput.type).toBe('text');

      await user.click(passwordToggle);
      expect(passwordInput.type).toBe('password');
    });

    test('should toggle confirm password visibility', async () => {
      const user = userEvent.setup();
      render(<SignupForm />);

      const confirmPasswordInput = screen.getByTestId('input-confirmPassword') as HTMLInputElement;
      expect(confirmPasswordInput.type).toBe('password');

      const toggleButtons = screen.getAllByRole('button', { name: '' });
      const confirmPasswordToggle = toggleButtons[1]; // Second toggle button
      
      await user.click(confirmPasswordToggle);
      expect(confirmPasswordInput.type).toBe('text');

      await user.click(confirmPasswordToggle);
      expect(confirmPasswordInput.type).toBe('password');
    });

    test('should show correct icons for password visibility', () => {
      render(<SignupForm />);

      // Initially should show Eye icons (passwords hidden)
      expect(screen.getAllByTestId('eye-icon')).toHaveLength(2);
      expect(screen.queryAllByTestId('eye-off-icon')).toHaveLength(0);
    });
  });

  describe('Account Type Selection', () => {
    test('should default to INDIVIDUAL account type', () => {
      render(<SignupForm />);

      const selectInput = screen.getByTestId('select-input') as HTMLInputElement;
      expect(selectInput.value).toBe('INDIVIDUAL');
    });

    test('should update account type selection', async () => {
      const user = userEvent.setup();
      render(<SignupForm />);

      const selectInput = screen.getByTestId('select-input') as HTMLInputElement;
      
      await act(async () => {
        fireEvent.change(selectInput, { target: { value: 'TEAM' } });
      });

      expect(selectInput.value).toBe('TEAM');
    });
  });

  describe('Form Submission', () => {
    test('should submit form with valid data and handle email verification flow', async () => {
      const user = userEvent.setup();
      mockSignup.mockResolvedValue({ success: true, requiresConfirmation: true });
      
      render(<SignupForm />);

      await user.type(screen.getByTestId('input-name'), 'John Doe');
      await user.type(screen.getByTestId('input-email'), 'john@example.com');
      await user.type(screen.getByTestId('input-password'), 'StrongPassword123!');
      await user.type(screen.getByTestId('input-confirmPassword'), 'StrongPassword123!');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSignup).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'StrongPassword123!',
          accountType: 'INDIVIDUAL',
        });
        expect(mockPush).toHaveBeenCalledWith('/verify-email?email=john%40example.com');
      });
    });

    test('should handle auto-login successful flow', async () => {
      const user = userEvent.setup();
      mockSignup.mockResolvedValue({ success: true, requiresConfirmation: false });
      
      render(<SignupForm />);

      await user.type(screen.getByTestId('input-name'), 'John Doe');
      await user.type(screen.getByTestId('input-email'), 'john@example.com');
      await user.type(screen.getByTestId('input-password'), 'StrongPassword123!');
      await user.type(screen.getByTestId('input-confirmPassword'), 'StrongPassword123!');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      });
    });

    test('should handle signup failure', async () => {
      const user = userEvent.setup();
      mockSignup.mockResolvedValue({ success: false, error: 'Email already exists' });
      
      render(<SignupForm />);

      await user.type(screen.getByTestId('input-name'), 'John Doe');
      await user.type(screen.getByTestId('input-email'), 'john@example.com');
      await user.type(screen.getByTestId('input-password'), 'StrongPassword123!');
      await user.type(screen.getByTestId('input-confirmPassword'), 'StrongPassword123!');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email already exists')).toBeInTheDocument();
      });
    });

    test('should handle signup exception', async () => {
      const user = userEvent.setup();
      mockSignup.mockRejectedValue(new Error('Network error'));
      
      render(<SignupForm />);

      await user.type(screen.getByTestId('input-name'), 'John Doe');
      await user.type(screen.getByTestId('input-email'), 'john@example.com');
      await user.type(screen.getByTestId('input-password'), 'StrongPassword123!');
      await user.type(screen.getByTestId('input-confirmPassword'), 'StrongPassword123!');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument();
      });
    });

    test('should clear error message when resubmitting', async () => {
      const user = userEvent.setup();
      mockSignup.mockResolvedValueOnce({ success: false, error: 'First error' })
               .mockResolvedValueOnce({ success: true, requiresConfirmation: true });
      
      render(<SignupForm />);

      await user.type(screen.getByTestId('input-name'), 'John Doe');
      await user.type(screen.getByTestId('input-email'), 'john@example.com');
      await user.type(screen.getByTestId('input-password'), 'StrongPassword123!');
      await user.type(screen.getByTestId('input-confirmPassword'), 'StrongPassword123!');
      
      const submitButton = screen.getByTestId('button');
      
      // First submission
      await user.click(submitButton);
      await waitFor(() => {
        expect(screen.getByText('First error')).toBeInTheDocument();
      });

      // Second submission
      await user.click(submitButton);
      await waitFor(() => {
        expect(screen.queryByText('First error')).not.toBeInTheDocument();
      });
    });
  });

  describe('Loading State', () => {
    test('should show loading state during signup', () => {
      (useAuthStore as jest.Mock).mockReturnValue({
        signup: mockSignup,
        isLoading: true,
      });

      render(<SignupForm />);

      const submitButton = screen.getByTestId('button');
      expect(submitButton).toBeDisabled();
      expect(screen.getByText('Creating account...')).toBeInTheDocument();
      expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
    });

    test('should not show loading state when not loading', () => {
      render(<SignupForm />);

      const submitButton = screen.getByTestId('button');
      expect(submitButton).not.toBeDisabled();
      expect(screen.getByText('Create account')).toBeInTheDocument();
      expect(screen.queryByTestId('loader-icon')).not.toBeInTheDocument();
    });
  });

  describe('Password Strength Integration', () => {
    test('should pass password to PasswordStrength component', async () => {
      const user = userEvent.setup();
      render(<SignupForm />);

      const passwordInput = screen.getByTestId('input-password');
      await user.type(passwordInput, 'TestPassword123!');

      const passwordStrength = screen.getByTestId('password-strength');
      expect(passwordStrength).toHaveAttribute('data-password', 'TestPassword123!');
    });

    test('should show password strength when password is entered', async () => {
      const user = userEvent.setup();
      render(<SignupForm />);

      const passwordInput = screen.getByTestId('input-password');
      await user.type(passwordInput, 'weak');

      expect(screen.getByTestId('password-strength')).toBeInTheDocument();
    });
  });

  describe('Error Display', () => {
    test('should show field validation errors with red styling', async () => {
      const user = userEvent.setup();
      render(<SignupForm />);

      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        const nameInput = screen.getByTestId('input-name');
        const emailInput = screen.getByTestId('input-email');
        const passwordInput = screen.getByTestId('input-password');
        
        expect(nameInput).toHaveClass('border-red-500');
        expect(emailInput).toHaveClass('border-red-500');
        expect(passwordInput).toHaveClass('border-red-500');
      });
    });

    test('should remove field errors when field becomes valid', async () => {
      const user = userEvent.setup();
      render(<SignupForm />);

      // Trigger validation errors
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
      });

      // Fix the name field
      const nameInput = screen.getByTestId('input-name');
      await user.type(nameInput, 'John Doe');

      // Trigger validation again
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText('Name must be at least 2 characters')).not.toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    test('should have proper labels for form inputs', () => {
      render(<SignupForm />);

      expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Account Type')).toBeInTheDocument();
    });

    test('should have proper placeholders', () => {
      render(<SignupForm />);

      expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('john@example.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Confirm your password')).toBeInTheDocument();
    });

    test('should have submit button with proper type', () => {
      render(<SignupForm />);

      const submitButton = screen.getByTestId('button');
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });
});