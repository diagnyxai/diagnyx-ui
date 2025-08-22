'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, usePermissions } from '@/hooks/use-auth';
import type { User } from '@/types/auth';
import { Loader2 } from 'lucide-react';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: User['role'];
  requiredRoles?: User['role'][];
  organizationId?: string;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export function RouteGuard({
  children,
  requireAuth = true,
  requiredRole,
  requiredRoles,
  organizationId,
  redirectTo = '/login',
  fallback,
}: RouteGuardProps) {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();
  const { canAccess } = usePermissions({
    requiredRole,
    requiredRoles,
    organizationId,
  });
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setIsChecking(false);
    };

    initAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isChecking && !isLoading) {
      if (requireAuth && !isAuthenticated) {
        const currentPath = window.location.pathname;
        const redirectUrl = `${redirectTo}?redirect=${encodeURIComponent(currentPath)}`;
        router.push(redirectUrl);
        return;
      }

      if (isAuthenticated && (requiredRole || requiredRoles || organizationId)) {
        if (!canAccess()) {
          router.push('/unauthorized');
          return;
        }
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    isChecking,
    requireAuth,
    canAccess,
    router,
    redirectTo,
    requiredRole,
    requiredRoles,
    organizationId,
  ]);

  // Show loading state
  if (isLoading || isChecking) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if auth requirements aren't met
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (isAuthenticated && (requiredRole || requiredRoles || organizationId)) {
    if (!canAccess()) {
      return null;
    }
  }

  return <>{children}</>;
}

// Convenience components for common use cases
export function ProtectedRoute({ children, ...props }: Omit<RouteGuardProps, 'requireAuth'>) {
  return (
    <RouteGuard requireAuth={true} {...props}>
      {children}
    </RouteGuard>
  );
}

export function AdminRoute({ children, ...props }: Omit<RouteGuardProps, 'requiredRoles'>) {
  return (
    <RouteGuard
      requiredRoles={['ADMIN', 'SUPER_ADMIN', 'ORG_ADMIN']}
      {...props}
    >
      {children}
    </RouteGuard>
  );
}

export function SuperAdminRoute({ children, ...props }: Omit<RouteGuardProps, 'requiredRole'>) {
  return (
    <RouteGuard requiredRole="SUPER_ADMIN" {...props}>
      {children}
    </RouteGuard>
  );
}