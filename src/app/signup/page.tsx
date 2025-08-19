'use client';

import { SignupForm } from '@/components/auth/signup-form';
import { useRedirectIfAuthenticated } from '@/hooks/use-auth';

export default function SignupPage() {
  useRedirectIfAuthenticated('/dashboard');

  return <SignupForm />;
}

export const metadata = {
  title: 'Sign Up - Diagnyx',
  description: 'Create your Diagnyx account',
};