/**
 * Base API Service client configured for FastAPI or full-stack endpoints
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export interface ApiResponse<T> {
  data: T | null;
  error?: string;
  success: boolean;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('credit_assistant_token');
  const headers = new Headers(options.headers || {});
  
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (!res.ok) {
      let errorMessage = `HTTP Error ${res.status}`;
      try {
        const errJson = await res.json();
        errorMessage = errJson.detail || errJson.message || errorMessage;
      } catch {
        // Non-JSON error
      }
      return { data: null, error: errorMessage, success: false };
    }

    const data = await res.json();
    return { data, success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { data: null, error: message, success: false };
  }
}
