'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import type { User } from '@/types/auth';

export function useAuth() {
  const store = useAuthStore();
  
  return {
    user: store.user,
    token: store.token,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,
    login: store.login,
    signup: store.signup,
    logout: store.logout,
    confirmSignup: store.confirmSignup,
    resendConfirmationCode: store.resendConfirmationCode,
    checkAuth: store.checkAuth,
    refreshUser: store.refreshUser,
    setError: store.setError,
  };
}

export function useRequireAuth(redirectTo: string = '/login') {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();
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
    if (!isChecking && !isLoading && !isAuthenticated) {
      const currentPath = window.location.pathname;
      const redirectUrl = `${redirectTo}?redirect=${encodeURIComponent(currentPath)}`;
      router.push(redirectUrl);
    }
  }, [isAuthenticated, isLoading, isChecking, router, redirectTo]);

  return {
    isAuthenticated,
    isLoading: isLoading || isChecking,
  };
}

export function useRedirectIfAuthenticated(redirectTo: string = '/dashboard') {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return {
    isAuthenticated,
    isLoading,
  };
}

export function useAuthRedirect() {
  const router = useRouter();

  const getRedirectUrl = (defaultPath: string = '/dashboard') => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('redirect') || defaultPath;
  };

  const redirectAfterAuth = (defaultPath?: string) => {
    const redirectUrl = getRedirectUrl(defaultPath);
    router.push(redirectUrl);
  };

  return {
    getRedirectUrl,
    redirectAfterAuth,
  };
}

interface UsePermissionsOptions {
  requiredRole?: User['role'];
  requiredRoles?: User['role'][];
  organizationId?: string;
}

export function usePermissions({
  requiredRole,
  requiredRoles,
  organizationId,
}: UsePermissionsOptions = {}) {
  const { user, isAuthenticated } = useAuth();

  const hasRole = (role: User['role']) => {
    if (!user) return false;
    return user.role === role;
  };

  const hasAnyRole = (roles: User['role'][]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const isInOrganization = (orgId: string) => {
    if (!user) return false;
    return user.organizationId === orgId;
  };

  const canAccess = () => {
    if (!isAuthenticated || !user) return false;

    // Check role requirements
    if (requiredRole && !hasRole(requiredRole)) return false;
    if (requiredRoles && !hasAnyRole(requiredRoles)) return false;

    // Check organization requirements
    if (organizationId && !isInOrganization(organizationId)) return false;

    return true;
  };

  const isAdmin = () => {
    return hasAnyRole(['ADMIN', 'SUPER_ADMIN', 'ORG_ADMIN']);
  };

  const isSuperAdmin = () => {
    return hasRole('SUPER_ADMIN');
  };

  const canManageOrganization = () => {
    return hasAnyRole(['SUPER_ADMIN', 'ORG_ADMIN']);
  };

  const canManageTeam = () => {
    return hasAnyRole(['SUPER_ADMIN', 'ORG_ADMIN', 'TEAM_LEADER']);
  };

  return {
    user,
    isAuthenticated,
    hasRole,
    hasAnyRole,
    isInOrganization,
    canAccess,
    isAdmin,
    isSuperAdmin,
    canManageOrganization,
    canManageTeam,
  };
}