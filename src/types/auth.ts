export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER' | 'SUPER_ADMIN' | 'ORG_ADMIN' | 'TEAM_LEADER';
  organizationId?: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  accountType?: 'INDIVIDUAL' | 'TEAM' | 'ENTERPRISE';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupCredentials {
  email: string;
  password: string;
  name: string;
  accountType?: string;
}