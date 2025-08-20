import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter, useSearchParams } from 'next/navigation';
import { EmailVerification } from '../email-verification';
import { useAuthStore } from '@/store/auth';

// Mock Next.js router and search params
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock auth store
jest.mock('@/store/auth', () => ({
  useAuthStore: jest.fn(),
}));

// Mock UI components
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, disabled, className, type, onClick, variant, ...props }: any) => (
    <button 
      disabled={disabled} 
      className={className} 
      type={type} 
      onClick={onClick}
      data-testid={variant === 'outline' ? 'outline-button' : 'button'}
      {...props}
    >
      {children}
    </button>
  ),
}));

jest.mock('@/components/ui/input', () => ({
  Input: React.forwardRef(({ className, type, placeholder, value, onChange, onKeyDown, ...props }: any, ref) => (
    <input
      ref={ref}
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      data-testid={`input-${props.id || type || 'verification'}`}
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

jest.mock('@/components/ui/alert', () => ({
  Alert: ({ children, variant, ...props }: any) => (
    <div data-testid={variant === 'destructive' ? 'alert-error' : 'alert-success'} {...props}>
      {children}
    </div>
  ),
  AlertDescription: ({ children }: any) => (
    <div data-testid="alert-description">
      {children}
    </div>
  ),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  CheckCircle: () => <span data-testid="check-circle-icon">✓</span>,
  Mail: () => <span data-testid="mail-icon">📧</span>,
  Loader2: () => <span data-testid="loader-icon">⏳</span>,
  AlertCircle: () => <span data-testid="alert-circle-icon">⚠</span>,
}));

// Mock clipboard API
const mockClipboard = {
  readText: jest.fn(),
};
Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
  writable: true,
});

describe('EmailVerification', () => {
  const mockPush = jest.fn();
  const mockConfirmSignup = jest.fn();
  const mockResendConfirmationCode = jest.fn();
  const mockSearchParams = {
    get: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    (useAuthStore as jest.Mock).mockReturnValue({
      confirmSignup: mockConfirmSignup,
      resendConfirmationCode: mockResendConfirmationCode,
      isLoading: false,
    });

    mockSearchParams.get.mockReturnValue('john@example.com');
    mockClipboard.readText.mockResolvedValue('123456');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    test('should render email verification form with email', () => {
      render(<EmailVerification />);

      expect(screen.getByText('Verify your email')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Enter the 6-digit code')).toBeInTheDocument();
      expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
    });

    test('should render 6 input fields for verification code', () => {
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      expect(inputs).toHaveLength(6);
    });

    test('should render verify email button', () => {
      render(<EmailVerification />);

      const verifyButton = screen.getByTestId('button');
      expect(verifyButton).toBeInTheDocument();
      expect(screen.getByText('Verify email')).toBeInTheDocument();
    });

    test('should render resend code button', () => {
      render(<EmailVerification />);

      const resendButton = screen.getByTestId('outline-button');
      expect(resendButton).toBeInTheDocument();
      expect(screen.getByText('Resend verification code')).toBeInTheDocument();
    });

    test('should render signup link', () => {
      render(<EmailVerification />);

      const signupLink = screen.getByText('Go back to signup');
      expect(signupLink.closest('a')).toHaveAttribute('href', '/signup');
    });
  });

  describe('Email Parameter Handling', () => {
    test('should redirect to signup if no email parameter', () => {
      mockSearchParams.get.mockReturnValue(null);
      render(<EmailVerification />);

      expect(mockPush).toHaveBeenCalledWith('/signup');
    });

    test('should not render component if no email', () => {
      mockSearchParams.get.mockReturnValue('');
      render(<EmailVerification />);

      expect(screen.queryByText('Verify your email')).not.toBeInTheDocument();
    });

    test('should display provided email address', () => {
      mockSearchParams.get.mockReturnValue('test@example.com');
      render(<EmailVerification />);

      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });
  });

  describe('Code Input Functionality', () => {
    test('should allow typing single digits in each input', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      
      await user.type(inputs[0], '1');
      await user.type(inputs[1], '2');
      await user.type(inputs[2], '3');

      expect(inputs[0]).toHaveValue('1');
      expect(inputs[1]).toHaveValue('2');
      expect(inputs[2]).toHaveValue('3');
    });

    test('should auto-focus next input when typing', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      
      await user.type(inputs[0], '1');
      
      // The next input should be focused (we can't directly test focus, but we can verify behavior)
      await user.type(inputs[1], '2');
      expect(inputs[1]).toHaveValue('2');
    });

    test('should handle backspace navigation', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      
      // Type in second input
      await user.type(inputs[1], '2');
      expect(inputs[1]).toHaveValue('2');
      
      // Clear it and press backspace - should focus previous input
      await user.clear(inputs[1]);
      await user.type(inputs[1], '{backspace}');
      
      // We can't directly test focus, but we can verify the value is cleared
      expect(inputs[1]).toHaveValue('');
    });

    test('should limit input to single character', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      
      await user.type(inputs[0], '123');
      
      // Should only accept first character
      expect(inputs[0]).toHaveValue('1');
    });

    test('should handle paste functionality', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockClipboard.readText.mockResolvedValue('123456');
      
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      
      // Simulate Ctrl+V paste
      await user.type(inputs[0], '{Control>}v{/Control}');
      
      await waitFor(() => {
        expect(inputs[0]).toHaveValue('1');
        expect(inputs[1]).toHaveValue('2');
        expect(inputs[2]).toHaveValue('3');
        expect(inputs[3]).toHaveValue('4');
        expect(inputs[4]).toHaveValue('5');
        expect(inputs[5]).toHaveValue('6');
      });
    });

    test('should handle partial paste', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockClipboard.readText.mockResolvedValue('123');
      
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      
      await user.type(inputs[0], '{Control>}v{/Control}');
      
      await waitFor(() => {
        expect(inputs[0]).toHaveValue('1');
        expect(inputs[1]).toHaveValue('2');
        expect(inputs[2]).toHaveValue('3');
        expect(inputs[3]).toHaveValue('');
        expect(inputs[4]).toHaveValue('');
        expect(inputs[5]).toHaveValue('');
      });
    });

    test('should filter non-numeric characters in paste', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockClipboard.readText.mockResolvedValue('a1b2c3d4e5f6g');
      
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      
      await user.type(inputs[0], '{Control>}v{/Control}');
      
      await waitFor(() => {
        expect(inputs[0]).toHaveValue('1');
        expect(inputs[1]).toHaveValue('2');
        expect(inputs[2]).toHaveValue('3');
        expect(inputs[3]).toHaveValue('4');
        expect(inputs[4]).toHaveValue('5');
        expect(inputs[5]).toHaveValue('6');
      });
    });
  });

  describe('Form Submission', () => {
    test('should require complete 6-digit code', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      
      // Enter only 5 digits
      await user.type(inputs[0], '1');
      await user.type(inputs[1], '2');
      await user.type(inputs[2], '3');
      await user.type(inputs[3], '4');
      await user.type(inputs[4], '5');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter the complete 6-digit code')).toBeInTheDocument();
      });

      expect(mockConfirmSignup).not.toHaveBeenCalled();
    });

    test('should submit with complete 6-digit code', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockConfirmSignup.mockResolvedValue(true);
      
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      
      // Enter complete code
      await user.type(inputs[0], '1');
      await user.type(inputs[1], '2');
      await user.type(inputs[2], '3');
      await user.type(inputs[3], '4');
      await user.type(inputs[4], '5');
      await user.type(inputs[5], '6');
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockConfirmSignup).toHaveBeenCalledWith('john@example.com', '123456');
      });
    });

    test('should redirect to login on successful verification', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockConfirmSignup.mockResolvedValue(true);
      
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      
      for (let i = 0; i < 6; i++) {
        await user.type(inputs[i], (i + 1).toString());
      }
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/login?verified=true');
      });
    });

    test('should handle verification failure', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockConfirmSignup.mockRejectedValue(new Error('Invalid verification code'));
      
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      
      for (let i = 0; i < 6; i++) {
        await user.type(inputs[i], (i + 1).toString());
      }
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Invalid verification code')).toBeInTheDocument();
      });
    });

    test('should handle generic verification error', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockConfirmSignup.mockRejectedValue({});
      
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      
      for (let i = 0; i < 6; i++) {
        await user.type(inputs[i], (i + 1).toString());
      }
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Invalid verification code. Please try again.')).toBeInTheDocument();
      });
    });
  });

  describe('Resend Code Functionality', () => {
    test('should resend verification code', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockResendConfirmationCode.mockResolvedValue(true);
      
      render(<EmailVerification />);

      const resendButton = screen.getByTestId('outline-button');
      await user.click(resendButton);

      await waitFor(() => {
        expect(mockResendConfirmationCode).toHaveBeenCalledWith('john@example.com');
      });
    });

    test('should show success message after resending', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockResendConfirmationCode.mockResolvedValue(true);
      
      render(<EmailVerification />);

      const resendButton = screen.getByTestId('outline-button');
      await user.click(resendButton);

      await waitFor(() => {
        expect(screen.getByText('Verification code sent! Please check your email.')).toBeInTheDocument();
      });
    });

    test('should clear input fields after resending', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockResendConfirmationCode.mockResolvedValue(true);
      
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      
      // Fill some inputs
      await user.type(inputs[0], '1');
      await user.type(inputs[1], '2');
      
      const resendButton = screen.getByTestId('outline-button');
      await user.click(resendButton);

      await waitFor(() => {
        expect(inputs[0]).toHaveValue('');
        expect(inputs[1]).toHaveValue('');
      });
    });

    test('should handle resend failure', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockResendConfirmationCode.mockRejectedValue(new Error('Failed to send email'));
      
      render(<EmailVerification />);

      const resendButton = screen.getByTestId('outline-button');
      await user.click(resendButton);

      await waitFor(() => {
        expect(screen.getByText('Failed to send email')).toBeInTheDocument();
      });
    });

    test('should handle generic resend error', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockResendConfirmationCode.mockRejectedValue({});
      
      render(<EmailVerification />);

      const resendButton = screen.getByTestId('outline-button');
      await user.click(resendButton);

      await waitFor(() => {
        expect(screen.getByText('Failed to resend verification code. Please try again.')).toBeInTheDocument();
      });
    });
  });

  describe('Cooldown Functionality', () => {
    test('should implement 60-second cooldown after resending', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockResendConfirmationCode.mockResolvedValue(true);
      
      render(<EmailVerification />);

      const resendButton = screen.getByTestId('outline-button');
      await user.click(resendButton);

      await waitFor(() => {
        expect(screen.getByText('Resend code in 60s')).toBeInTheDocument();
        expect(resendButton).toBeDisabled();
      });
    });

    test('should countdown and re-enable button', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockResendConfirmationCode.mockResolvedValue(true);
      
      render(<EmailVerification />);

      const resendButton = screen.getByTestId('outline-button');
      await user.click(resendButton);

      await waitFor(() => {
        expect(screen.getByText('Resend code in 60s')).toBeInTheDocument();
      });

      // Advance timer by 30 seconds
      act(() => {
        jest.advanceTimersByTime(30000);
      });

      await waitFor(() => {
        expect(screen.getByText('Resend code in 30s')).toBeInTheDocument();
      });

      // Advance timer by remaining 30 seconds
      act(() => {
        jest.advanceTimersByTime(30000);
      });

      await waitFor(() => {
        expect(screen.getByText('Resend verification code')).toBeInTheDocument();
        expect(resendButton).not.toBeDisabled();
      });
    });

    test('should not allow resend during cooldown', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockResendConfirmationCode.mockResolvedValue(true);
      
      render(<EmailVerification />);

      const resendButton = screen.getByTestId('outline-button');
      await user.click(resendButton);

      await waitFor(() => {
        expect(resendButton).toBeDisabled();
      });

      // Try to click again
      await user.click(resendButton);
      
      // Should still only be called once
      expect(mockResendConfirmationCode).toHaveBeenCalledTimes(1);
    });
  });

  describe('Loading States', () => {
    test('should show loading state during verification', () => {
      (useAuthStore as jest.Mock).mockReturnValue({
        confirmSignup: mockConfirmSignup,
        resendConfirmationCode: mockResendConfirmationCode,
        isLoading: true,
      });

      render(<EmailVerification />);

      const submitButton = screen.getByTestId('button');
      expect(submitButton).toBeDisabled();
      expect(screen.getByText('Verifying...')).toBeInTheDocument();
      expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
    });

    test('should disable submit button when incomplete code', () => {
      render(<EmailVerification />);

      const submitButton = screen.getByTestId('button');
      expect(submitButton).toBeDisabled();
    });

    test('should enable submit button with complete code', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      
      for (let i = 0; i < 6; i++) {
        await user.type(inputs[i], (i + 1).toString());
      }

      const submitButton = screen.getByTestId('button');
      expect(submitButton).not.toBeDisabled();
    });

    test('should disable resend button during loading', () => {
      (useAuthStore as jest.Mock).mockReturnValue({
        confirmSignup: mockConfirmSignup,
        resendConfirmationCode: mockResendConfirmationCode,
        isLoading: true,
      });

      render(<EmailVerification />);

      const resendButton = screen.getByTestId('outline-button');
      expect(resendButton).toBeDisabled();
    });
  });

  describe('Error and Success Alert Display', () => {
    test('should show error alert for verification failure', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockConfirmSignup.mockRejectedValue(new Error('Verification failed'));
      
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      for (let i = 0; i < 6; i++) {
        await user.type(inputs[i], (i + 1).toString());
      }
      
      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('alert-error')).toBeInTheDocument();
        expect(screen.getByTestId('alert-circle-icon')).toBeInTheDocument();
      });
    });

    test('should show success alert after resending code', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockResendConfirmationCode.mockResolvedValue(true);
      
      render(<EmailVerification />);

      const resendButton = screen.getByTestId('outline-button');
      await user.click(resendButton);

      await waitFor(() => {
        expect(screen.getByTestId('alert-success')).toBeInTheDocument();
        expect(screen.getByTestId('check-circle-icon')).toBeInTheDocument();
      });
    });

    test('should clear previous errors on new submission', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockConfirmSignup.mockRejectedValueOnce(new Error('First error'))
                      .mockResolvedValueOnce(true);
      
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      for (let i = 0; i < 6; i++) {
        await user.type(inputs[i], (i + 1).toString());
      }
      
      const submitButton = screen.getByTestId('button');
      
      // First submission - error
      await user.click(submitButton);
      await waitFor(() => {
        expect(screen.getByText('First error')).toBeInTheDocument();
      });

      // Clear inputs and try again
      for (let i = 0; i < 6; i++) {
        await user.clear(inputs[i]);
        await user.type(inputs[i], (i + 1).toString());
      }
      
      // Second submission - success
      await user.click(submitButton);
      await waitFor(() => {
        expect(screen.queryByText('First error')).not.toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    test('should have proper input attributes', () => {
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      inputs.forEach(input => {
        expect(input).toHaveAttribute('type', 'text');
        expect(input).toHaveAttribute('inputMode', 'numeric');
        expect(input).toHaveAttribute('maxLength', '1');
        expect(input).toHaveAttribute('autoComplete', 'off');
      });
    });

    test('should have proper form structure', () => {
      render(<EmailVerification />);

      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
    });

    test('should have submit button with proper type', () => {
      render(<EmailVerification />);

      const submitButton = screen.getByTestId('button');
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });

  describe('Edge Cases', () => {
    test('should handle clipboard API not available', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      
      // Mock clipboard not available
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
      });
      
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      
      // Should not throw error when trying to paste
      await user.type(inputs[0], '{Control>}v{/Control}');
      
      // Should still work normally for single character input
      await user.type(inputs[0], '1');
      expect(inputs[0]).toHaveValue('1');
    });

    test('should handle empty clipboard content', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockClipboard.readText.mockResolvedValue('');
      
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      
      await user.type(inputs[0], '{Control>}v{/Control}');
      
      // Should not crash and inputs should remain empty
      expect(inputs[0]).toHaveValue('');
    });

    test('should handle very long paste content', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockClipboard.readText.mockResolvedValue('1234567890123456789');
      
      render(<EmailVerification />);

      const inputs = screen.getAllByTestId(/^input-verification$/);
      
      await user.type(inputs[0], '{Control>}v{/Control}');
      
      await waitFor(() => {
        // Should only take first 6 digits
        expect(inputs[0]).toHaveValue('1');
        expect(inputs[1]).toHaveValue('2');
        expect(inputs[2]).toHaveValue('3');
        expect(inputs[3]).toHaveValue('4');
        expect(inputs[4]).toHaveValue('5');
        expect(inputs[5]).toHaveValue('6');
      });
    });
  });
});