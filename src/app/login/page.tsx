'use client';

import { LoginForm } from '@/components/auth/login-form';
import { useRedirectIfAuthenticated } from '@/hooks/use-auth';

export default function LoginPage() {
  useRedirectIfAuthenticated('/dashboard');

  return <LoginForm />;
}

export const metadata = {
  title: 'Login - Diagnyx',
  description: 'Sign in to your Diagnyx account',
};