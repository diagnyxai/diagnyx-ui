import React from 'react';
import { render, screen } from '@testing-library/react';
import { PasswordStrength } from '../password-strength';

// Mock UI components
jest.mock('@/components/ui/progress', () => ({
  Progress: ({ value, className, ...props }: any) => (
    <div 
      data-testid="progress" 
      data-value={value}
      className={className}
      {...props}
    >
      <div data-testid="progress-bar" style={{ width: `${value}%` }} />
    </div>
  ),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Check: (props: any) => (
    <span data-testid="check-icon" className={props.className}>
      ✓
    </span>
  ),
  X: (props: any) => (
    <span data-testid="x-icon" className={props.className}>
      ✗
    </span>
  ),
}));

describe('PasswordStrength', () => {
  describe('Rendering', () => {
    test('should not render when password is empty', () => {
      const { container } = render(<PasswordStrength password="" />);
      expect(container.firstChild).toBeNull();
    });

    test('should not render when password is undefined', () => {
      const { container } = render(<PasswordStrength password={undefined as any} />);
      expect(container.firstChild).toBeNull();
    });

    test('should render when password is provided', () => {
      render(<PasswordStrength password="test" />);
      
      expect(screen.getByText('Password strength')).toBeInTheDocument();
      expect(screen.getByText('Password requirements:')).toBeInTheDocument();
      expect(screen.getByTestId('progress')).toBeInTheDocument();
    });

    test('should render all 5 password criteria', () => {
      render(<PasswordStrength password="test" />);
      
      expect(screen.getByText('At least 12 characters')).toBeInTheDocument();
      expect(screen.getByText('One lowercase letter')).toBeInTheDocument();
      expect(screen.getByText('One uppercase letter')).toBeInTheDocument();
      expect(screen.getByText('One number')).toBeInTheDocument();
      expect(screen.getByText('One special character')).toBeInTheDocument();
    });

    test('should apply custom className', () => {
      const { container } = render(
        <PasswordStrength password="test" className="custom-class" />
      );
      
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Strength Calculation', () => {
    test('should show no strength label for empty criteria', () => {
      render(<PasswordStrength password="abc" />);
      
      const progress = screen.getByTestId('progress');
      expect(progress).toHaveAttribute('data-value', '20'); // 1/5 = 20%
      expect(screen.getByText('Weak')).toBeInTheDocument();
    });

    test('should calculate 20% strength for 1 criterion (weak)', () => {
      render(<PasswordStrength password="a" />);
      
      const progress = screen.getByTestId('progress');
      expect(progress).toHaveAttribute('data-value', '20');
      expect(screen.getByText('Weak')).toBeInTheDocument();
    });

    test('should calculate 40% strength for 2 criteria (weak)', () => {
      render(<PasswordStrength password="aA" />);
      
      const progress = screen.getByTestId('progress');
      expect(progress).toHaveAttribute('data-value', '40');
      expect(screen.getByText('Weak')).toBeInTheDocument();
    });

    test('should calculate 60% strength for 3 criteria (fair)', () => {
      render(<PasswordStrength password="aA1" />);
      
      const progress = screen.getByTestId('progress');
      expect(progress).toHaveAttribute('data-value', '60');
      expect(screen.getByText('Fair')).toBeInTheDocument();
    });

    test('should calculate 80% strength for 4 criteria (good)', () => {
      render(<PasswordStrength password="aA1!" />);
      
      const progress = screen.getByTestId('progress');
      expect(progress).toHaveAttribute('data-value', '80');
      expect(screen.getByText('Good')).toBeInTheDocument();
    });

    test('should calculate 100% strength for all 5 criteria (strong)', () => {
      render(<PasswordStrength password="MyPassword123!" />);
      
      const progress = screen.getByTestId('progress');
      expect(progress).toHaveAttribute('data-value', '100');
      expect(screen.getByText('Strong')).toBeInTheDocument();
    });
  });

  describe('Length Criterion', () => {
    test('should fail for passwords shorter than 12 characters', () => {
      render(<PasswordStrength password="Password1!" />); // 10 characters
      
      const lengthRow = screen.getByText('At least 12 characters').closest('div');
      expect(lengthRow).toContainElement(screen.getAllByTestId('x-icon')[0]);
    });

    test('should pass for passwords with exactly 12 characters', () => {
      render(<PasswordStrength password="MyPassword1!" />); // 12 characters
      
      const lengthRow = screen.getByText('At least 12 characters').closest('div');
      expect(lengthRow).toContainElement(screen.getByTestId('check-icon'));
    });

    test('should pass for passwords longer than 12 characters', () => {
      render(<PasswordStrength password="MyLongPassword123!" />); // 16 characters
      
      const lengthRow = screen.getByText('At least 12 characters').closest('div');
      expect(lengthRow).toContainElement(screen.getByTestId('check-icon'));
    });
  });

  describe('Lowercase Letter Criterion', () => {
    test('should fail for passwords without lowercase letters', () => {
      render(<PasswordStrength password="PASSWORD123!" />);
      
      const lowercaseRow = screen.getByText('One lowercase letter').closest('div');
      expect(lowercaseRow).toContainElement(screen.getAllByTestId('x-icon')[0]);
    });

    test('should pass for passwords with lowercase letters', () => {
      render(<PasswordStrength password="Password123!" />);
      
      const lowercaseRow = screen.getByText('One lowercase letter').closest('div');
      expect(lowercaseRow).toContainElement(screen.getByTestId('check-icon'));
    });

    test('should pass for passwords with multiple lowercase letters', () => {
      render(<PasswordStrength password="mypassword123!" />);
      
      const lowercaseRow = screen.getByText('One lowercase letter').closest('div');
      expect(lowercaseRow).toContainElement(screen.getByTestId('check-icon'));
    });
  });

  describe('Uppercase Letter Criterion', () => {
    test('should fail for passwords without uppercase letters', () => {
      render(<PasswordStrength password="password123!" />);
      
      const uppercaseRow = screen.getByText('One uppercase letter').closest('div');
      expect(uppercaseRow).toContainElement(screen.getAllByTestId('x-icon')[0]);
    });

    test('should pass for passwords with uppercase letters', () => {
      render(<PasswordStrength password="Password123!" />);
      
      const uppercaseRow = screen.getByText('One uppercase letter').closest('div');
      expect(uppercaseRow).toContainElement(screen.getByTestId('check-icon'));
    });

    test('should pass for passwords with multiple uppercase letters', () => {
      render(<PasswordStrength password="MYPASSWORD123!" />);
      
      const uppercaseRow = screen.getByText('One uppercase letter').closest('div');
      expect(uppercaseRow).toContainElement(screen.getByTestId('check-icon'));
    });
  });

  describe('Number Criterion', () => {
    test('should fail for passwords without numbers', () => {
      render(<PasswordStrength password="MyPassword!" />);
      
      const numberRow = screen.getByText('One number').closest('div');
      expect(numberRow).toContainElement(screen.getAllByTestId('x-icon')[0]);
    });

    test('should pass for passwords with single number', () => {
      render(<PasswordStrength password="MyPassword1!" />);
      
      const numberRow = screen.getByText('One number').closest('div');
      expect(numberRow).toContainElement(screen.getByTestId('check-icon'));
    });

    test('should pass for passwords with multiple numbers', () => {
      render(<PasswordStrength password="MyPassword123!" />);
      
      const numberRow = screen.getByText('One number').closest('div');
      expect(numberRow).toContainElement(screen.getByTestId('check-icon'));
    });

    test('should pass for passwords with numbers at different positions', () => {
      render(<PasswordStrength password="1MyPassword2!" />);
      
      const numberRow = screen.getByText('One number').closest('div');
      expect(numberRow).toContainElement(screen.getByTestId('check-icon'));
    });
  });

  describe('Special Character Criterion', () => {
    test('should fail for passwords without special characters', () => {
      render(<PasswordStrength password="MyPassword123" />);
      
      const specialRow = screen.getByText('One special character').closest('div');
      expect(specialRow).toContainElement(screen.getAllByTestId('x-icon')[0]);
    });

    test('should pass for passwords with common special characters', () => {
      const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '='];
      
      specialChars.forEach(char => {
        render(<PasswordStrength password={`MyPassword123${char}`} />);
        
        const specialRow = screen.getByText('One special character').closest('div');
        expect(specialRow).toContainElement(screen.getByTestId('check-icon'));
        
        // Clean up for next iteration
        screen.getByText('Password strength').closest('div')?.remove();
      });
    });

    test('should pass for passwords with multiple special characters', () => {
      render(<PasswordStrength password="MyPassword123!@#" />);
      
      const specialRow = screen.getByText('One special character').closest('div');
      expect(specialRow).toContainElement(screen.getByTestId('check-icon'));
    });

    test('should pass for passwords with space as special character', () => {
      render(<PasswordStrength password="My Password 123" />);
      
      const specialRow = screen.getByText('One special character').closest('div');
      expect(specialRow).toContainElement(screen.getByTestId('check-icon'));
    });
  });

  describe('Visual Indicators', () => {
    test('should show correct number of check icons for passing criteria', () => {
      render(<PasswordStrength password="MyPassword123!" />); // Passes all 5
      
      const checkIcons = screen.getAllByTestId('check-icon');
      expect(checkIcons).toHaveLength(5);
    });

    test('should show correct number of X icons for failing criteria', () => {
      render(<PasswordStrength password="weak" />); // Only passes lowercase
      
      const xIcons = screen.getAllByTestId('x-icon');
      expect(xIcons).toHaveLength(4); // 4 failing criteria
      
      const checkIcons = screen.getAllByTestId('check-icon');
      expect(checkIcons).toHaveLength(1); // 1 passing criterion
    });

    test('should show mixed icons for partially strong passwords', () => {
      render(<PasswordStrength password="StrongPass123" />); // Missing special char and length
      
      const checkIcons = screen.getAllByTestId('check-icon');
      expect(checkIcons).toHaveLength(3); // lowercase, uppercase, number
      
      const xIcons = screen.getAllByTestId('x-icon');
      expect(xIcons).toHaveLength(2); // length, special char
    });
  });

  describe('Strength Labels', () => {
    test('should show "Weak" for 1-2 criteria met', () => {
      render(<PasswordStrength password="a" />); // 1 criterion
      expect(screen.getByText('Weak')).toBeInTheDocument();
      
      // Clean up and test 2 criteria
      screen.getByText('Password strength').closest('div')?.remove();
      
      render(<PasswordStrength password="aA" />); // 2 criteria
      expect(screen.getByText('Weak')).toBeInTheDocument();
    });

    test('should show "Fair" for 3 criteria met', () => {
      render(<PasswordStrength password="aA1" />);
      expect(screen.getByText('Fair')).toBeInTheDocument();
    });

    test('should show "Good" for 4 criteria met', () => {
      render(<PasswordStrength password="aA1!" />);
      expect(screen.getByText('Good')).toBeInTheDocument();
    });

    test('should show "Strong" for all 5 criteria met', () => {
      render(<PasswordStrength password="MyStrongPassword123!" />);
      expect(screen.getByText('Strong')).toBeInTheDocument();
    });
  });

  describe('Color Styling', () => {
    test('should apply red color for weak passwords', () => {
      render(<PasswordStrength password="weak" />);
      
      const strengthLabel = screen.getByText('Weak');
      expect(strengthLabel).toHaveClass('text-red-600');
    });

    test('should apply orange color for fair passwords', () => {
      render(<PasswordStrength password="WeakA1" />);
      
      const strengthLabel = screen.getByText('Fair');
      expect(strengthLabel).toHaveClass('text-orange-600');
    });

    test('should apply yellow color for good passwords', () => {
      render(<PasswordStrength password="GoodA1!" />);
      
      const strengthLabel = screen.getByText('Good');
      expect(strengthLabel).toHaveClass('text-yellow-600');
    });

    test('should apply green color for strong passwords', () => {
      render(<PasswordStrength password="StrongPassword123!" />);
      
      const strengthLabel = screen.getByText('Strong');
      expect(strengthLabel).toHaveClass('text-green-600');
    });
  });

  describe('Criteria Text Styling', () => {
    test('should apply green text to passed criteria', () => {
      render(<PasswordStrength password="a" />);
      
      const lowercaseText = screen.getByText('One lowercase letter');
      expect(lowercaseText).toHaveClass('text-green-700');
    });

    test('should apply gray text to failed criteria', () => {
      render(<PasswordStrength password="A" />);
      
      const lowercaseText = screen.getByText('One lowercase letter');
      expect(lowercaseText).toHaveClass('text-gray-500');
    });
  });

  describe('Icon Styling', () => {
    test('should apply green color to check icons', () => {
      render(<PasswordStrength password="a" />);
      
      const checkIcon = screen.getByTestId('check-icon');
      expect(checkIcon).toHaveClass('text-green-500');
    });

    test('should apply gray color to X icons', () => {
      render(<PasswordStrength password="A" />);
      
      const xIcons = screen.getAllByTestId('x-icon');
      xIcons.forEach(icon => {
        expect(icon).toHaveClass('text-gray-400');
      });
    });
  });

  describe('Progress Bar', () => {
    test('should have correct height class', () => {
      render(<PasswordStrength password="test" />);
      
      const progress = screen.getByTestId('progress');
      expect(progress).toHaveClass('h-2');
    });

    test('should update progress value based on criteria met', () => {
      const passwords = [
        { password: 'a', expectedValue: '20' },           // 1/5 criteria
        { password: 'aA', expectedValue: '40' },          // 2/5 criteria
        { password: 'aA1', expectedValue: '60' },         // 3/5 criteria
        { password: 'aA1!', expectedValue: '80' },        // 4/5 criteria
        { password: 'MyPassword123!', expectedValue: '100' }, // 5/5 criteria
      ];

      passwords.forEach(({ password, expectedValue }) => {
        render(<PasswordStrength password={password} />);
        
        const progress = screen.getByTestId('progress');
        expect(progress).toHaveAttribute('data-value', expectedValue);
        
        // Clean up for next iteration
        progress.closest('div')?.remove();
      });
    });
  });

  describe('Real-world Password Examples', () => {
    test('should handle common weak passwords', () => {
      const weakPasswords = ['password', '123456', 'qwerty', 'admin'];
      
      weakPasswords.forEach(password => {
        render(<PasswordStrength password={password} />);
        
        expect(screen.getByText('Weak')).toBeInTheDocument();
        
        // Clean up for next iteration
        screen.getByText('Password strength').closest('div')?.remove();
      });
    });

    test('should handle strong real-world passwords', () => {
      const strongPasswords = [
        'MySecurePassword123!',
        'Tr0ub4dor&3',
        'ThisIsAVeryLongPassword123!',
        'P@ssw0rd!2023',
      ];
      
      strongPasswords.forEach(password => {
        render(<PasswordStrength password={password} />);
        
        expect(screen.getByText('Strong')).toBeInTheDocument();
        
        // Clean up for next iteration
        screen.getByText('Password strength').closest('div')?.remove();
      });
    });

    test('should handle edge case passwords', () => {
      const edgeCases = [
        { password: 'aA1!', expected: 'Good' },           // Minimum for good
        { password: 'MyPassword1!', expected: 'Strong' }, // Exactly 12 chars
        { password: '            ', expected: 'Weak' },   // Only spaces
        { password: '123456789012', expected: 'Fair' },   // Only numbers, 12 chars
      ];

      edgeCases.forEach(({ password, expected }) => {
        render(<PasswordStrength password={password} />);
        
        expect(screen.getByText(expected)).toBeInTheDocument();
        
        // Clean up for next iteration
        screen.getByText('Password strength').closest('div')?.remove();
      });
    });
  });

  describe('Component Updates', () => {
    test('should update when password prop changes', () => {
      const { rerender } = render(<PasswordStrength password="weak" />);
      expect(screen.getByText('Weak')).toBeInTheDocument();
      
      rerender(<PasswordStrength password="StrongPassword123!" />);
      expect(screen.getByText('Strong')).toBeInTheDocument();
      expect(screen.queryByText('Weak')).not.toBeInTheDocument();
    });

    test('should hide component when password becomes empty', () => {
      const { rerender, container } = render(<PasswordStrength password="test" />);
      expect(screen.getByText('Password strength')).toBeInTheDocument();
      
      rerender(<PasswordStrength password="" />);
      expect(container.firstChild).toBeNull();
    });

    test('should show component when password is provided after being empty', () => {
      const { rerender } = render(<PasswordStrength password="" />);
      expect(screen.queryByText('Password strength')).not.toBeInTheDocument();
      
      rerender(<PasswordStrength password="test" />);
      expect(screen.getByText('Password strength')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('should have proper icon sizes', () => {
      render(<PasswordStrength password="test" />);
      
      const checkIcon = screen.getByTestId('check-icon');
      expect(checkIcon).toHaveClass('h-3', 'w-3', 'flex-shrink-0');
      
      const xIcons = screen.getAllByTestId('x-icon');
      xIcons.forEach(icon => {
        expect(icon).toHaveClass('h-3', 'w-3', 'flex-shrink-0');
      });
    });

    test('should have proper text sizes', () => {
      render(<PasswordStrength password="test" />);
      
      const strengthText = screen.getByText('Password strength');
      expect(strengthText).toHaveClass('text-sm');
      
      const requirementsText = screen.getByText('Password requirements:');
      expect(requirementsText).toHaveClass('text-sm');
    });

    test('should maintain proper spacing structure', () => {
      const { container } = render(<PasswordStrength password="test" />);
      
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass('space-y-3');
    });
  });
});