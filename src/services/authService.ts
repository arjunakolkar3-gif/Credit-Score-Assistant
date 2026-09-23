import { User } from '../types/credit';
import { DEMO_USER } from '../data/demoData';
import { apiRequest } from './api';

export interface LoginCredentials {
  email: string;
  password?: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password?: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    // Attempt FastAPI endpoint POST /auth/login
    const result = await apiRequest<{ user: User; access_token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (result.success && result.data) {
      localStorage.setItem('credit_assistant_token', result.data.access_token);
      localStorage.setItem('credit_assistant_user', JSON.stringify(result.data.user));
      return { user: result.data.user, token: result.data.access_token };
    }

    // Client-side fallback for standalone dev / demo mode
    const demoToken = 'mock_jwt_token_demo_mode_secure';
    const fallbackUser: User = {
      ...DEMO_USER,
      email: credentials.email || DEMO_USER.email,
    };
    
    localStorage.setItem('credit_assistant_token', demoToken);
    localStorage.setItem('credit_assistant_user', JSON.stringify(fallbackUser));
    return { user: fallbackUser, token: demoToken };
  },

  async register(payload: RegisterPayload): Promise<{ user: User; token: string }> {
    // Attempt FastAPI endpoint POST /auth/register
    const result = await apiRequest<{ user: User; access_token: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (result.success && result.data) {
      localStorage.setItem('credit_assistant_token', result.data.access_token);
      localStorage.setItem('credit_assistant_user', JSON.stringify(result.data.user));
      return { user: result.data.user, token: result.data.access_token };
    }

    // Client-side fallback
    const mockToken = 'mock_jwt_token_new_user_' + Date.now();
    const newUser: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name: payload.name,
      email: payload.email,
      joinedDate: 'September 2026',
    };

    localStorage.setItem('credit_assistant_token', mockToken);
    localStorage.setItem('credit_assistant_user', JSON.stringify(newUser));
    return { user: newUser, token: mockToken };
  },

  async getCurrentUser(): Promise<User | null> {
    const cached = localStorage.getItem('credit_assistant_user');
    if (!cached) return null;

    // Optional sync with FastAPI GET /users/me
    const result = await apiRequest<User>('/api/users/me', { method: 'GET' });
    if (result.success && result.data) {
      localStorage.setItem('credit_assistant_user', JSON.stringify(result.data));
      return result.data;
    }

    try {
      return JSON.parse(cached);
    } catch {
      return DEMO_USER;
    }
  },

  logout(): void {
    localStorage.removeItem('credit_assistant_token');
    localStorage.removeItem('credit_assistant_user');
  },
};
