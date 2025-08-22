'use client';

import { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import amplifyConfig from '@/lib/amplify-config';
import { useAuthStore } from '@/store/auth';

interface AmplifyProviderProps {
  children: React.ReactNode;
}

export function AmplifyProvider({ children }: AmplifyProviderProps) {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    // Initialize Amplify configuration
    Amplify.configure(amplifyConfig, { ssr: true });
    
    // Check authentication state on app load
    checkAuth();
  }, [checkAuth]);

  return <>{children}</>;
}