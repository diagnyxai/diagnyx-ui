import { fetchAuthSession } from '@aws-amplify/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:8443/api/v1';

interface ApiRequestConfig extends RequestInit {
  requiresAuth?: boolean;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async getAuthHeaders(): Promise<Record<string, string>> {
    try {
      const session = await fetchAuthSession();
      const token = session.tokens?.accessToken?.toString();
      
      if (!token) {
        throw new Error('No access token available');
      }

      return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    } catch (error) {
      console.error('Error getting auth headers:', error);
      throw new Error('Failed to get authentication token');
    }
  }

  private async request<T>(
    endpoint: string,
    config: ApiRequestConfig = {}
  ): Promise<T> {
    const { requiresAuth = true, ...requestConfig } = config;
    
    const url = `${this.baseURL}${endpoint}`;
    
    let headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((requestConfig.headers as Record<string, string>) || {}),
    };

    // Add authorization header if required
    if (requiresAuth) {
      try {
        const authHeaders = await this.getAuthHeaders();
        headers = { ...headers, ...authHeaders };
      } catch (error) {
        console.error('Failed to get auth headers:', error);
        throw error;
      }
    }

    const response = await fetch(url, {
      ...requestConfig,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage: string;
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.error || `HTTP ${response.status}`;
      } catch {
        errorMessage = errorText || `HTTP ${response.status}`;
      }

      throw new Error(`API Error ${response.status}: ${errorMessage}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    
    return response.text() as unknown as T;
  }

  // Auth endpoints (public)
  async signup(credentials: {
    name: string;
    email: string;
    password: string;
    accountType?: string;
  }) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        firstName: credentials.name.split(' ')[0] || credentials.name,
        lastName: credentials.name.split(' ').slice(1).join(' ') || '',
        email: credentials.email,
        password: credentials.password,
        accountType: credentials.accountType || 'INDIVIDUAL',
      }),
      requiresAuth: false,
    });
  }

  async login(credentials: { email: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      requiresAuth: false,
    });
  }

  async confirmSignup(email: string, confirmationCode: string) {
    return this.request('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({
        email,
        confirmationCode,
      }),
      requiresAuth: false,
    });
  }

  async resendConfirmation(email: string) {
    return this.request('/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
      requiresAuth: false,
    });
  }

  async forgotPassword(email: string) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
      requiresAuth: false,
    });
  }

  async resetPassword(email: string, confirmationCode: string, newPassword: string) {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({
        email,
        confirmationCode,
        newPassword,
      }),
      requiresAuth: false,
    });
  }

  // Protected endpoints
  async getProfile() {
    return this.request('/auth/profile', {
      method: 'GET',
    });
  }

  async updateProfile(data: Partial<{
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }>) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // User management
  async getUsers(params?: { page?: number; size?: number; search?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page !== undefined) searchParams.set('page', params.page.toString());
    if (params?.size !== undefined) searchParams.set('size', params.size.toString());
    if (params?.search) searchParams.set('search', params.search);

    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return this.request(`/users${query}`, {
      method: 'GET',
    });
  }

  // Organizations
  async getOrganizations() {
    return this.request('/organizations', {
      method: 'GET',
    });
  }

  async createOrganization(data: {
    name: string;
    description?: string;
    website?: string;
  }) {
    return this.request('/organizations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Teams
  async getTeams() {
    return this.request('/teams', {
      method: 'GET',
    });
  }

  async createTeam(data: {
    name: string;
    description?: string;
  }) {
    return this.request('/teams', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;