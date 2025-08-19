'use client';

import { useMemo } from 'react';
import { Check, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

interface PasswordCriteria {
  label: string;
  test: (password: string) => boolean;
}

const criteria: PasswordCriteria[] = [
  {
    label: 'At least 12 characters',
    test: (password: string) => password.length >= 12,
  },
  {
    label: 'One lowercase letter',
    test: (password: string) => /[a-z]/.test(password),
  },
  {
    label: 'One uppercase letter',
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    label: 'One number',
    test: (password: string) => /[0-9]/.test(password),
  },
  {
    label: 'One special character',
    test: (password: string) => /[^A-Za-z0-9]/.test(password),
  },
];

export function PasswordStrength({ password, className = '' }: PasswordStrengthProps) {
  const analysis = useMemo(() => {
    const results = criteria.map(criterion => ({
      ...criterion,
      passed: criterion.test(password),
    }));

    const passedCount = results.filter(r => r.passed).length;
    const strength = (passedCount / criteria.length) * 100;

    let strengthLabel = '';
    let strengthColor = '';

    if (passedCount === 0) {
      strengthLabel = '';
      strengthColor = 'bg-gray-200';
    } else if (passedCount <= 2) {
      strengthLabel = 'Weak';
      strengthColor = 'bg-red-500';
    } else if (passedCount <= 3) {
      strengthLabel = 'Fair';
      strengthColor = 'bg-orange-500';
    } else if (passedCount <= 4) {
      strengthLabel = 'Good';
      strengthColor = 'bg-yellow-500';
    } else {
      strengthLabel = 'Strong';
      strengthColor = 'bg-green-500';
    }

    return {
      results,
      strength,
      strengthLabel,
      strengthColor,
      passedCount,
    };
  }, [password]);

  if (!password) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Strength bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Password strength</span>
          {analysis.strengthLabel && (
            <span className={`text-sm font-medium ${
              analysis.passedCount <= 2 ? 'text-red-600' :
              analysis.passedCount <= 3 ? 'text-orange-600' :
              analysis.passedCount <= 4 ? 'text-yellow-600' :
              'text-green-600'
            }`}>
              {analysis.strengthLabel}
            </span>
          )}
        </div>
        <Progress 
          value={analysis.strength} 
          className="h-2"
        />
      </div>

      {/* Requirements checklist */}
      <div className="space-y-2">
        <span className="text-sm text-gray-600">Password requirements:</span>
        <div className="space-y-1">
          {analysis.results.map((result, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              {result.passed ? (
                <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
              ) : (
                <X className="h-3 w-3 text-gray-400 flex-shrink-0" />
              )}
              <span className={`${
                result.passed ? 'text-green-700' : 'text-gray-500'
              }`}>
                {result.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}