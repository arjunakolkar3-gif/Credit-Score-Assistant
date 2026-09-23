import { FinancialProfile } from '../types/credit';
import { DEMO_FINANCIAL_PROFILE } from '../data/demoData';
import { apiRequest } from './api';

const PROFILE_STORAGE_KEY = 'credit_assistant_financial_profile';

export const profileService = {
  async getProfile(): Promise<FinancialProfile> {
    const result = await apiRequest<FinancialProfile>('/api/financial-profile', { method: 'GET' });
    if (result.success && result.data) {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(result.data));
      return result.data;
    }

    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return DEMO_FINANCIAL_PROFILE;
  },

  async updateProfile(profile: Partial<FinancialProfile>): Promise<FinancialProfile> {
    const current = await this.getProfile();
    const updated: FinancialProfile = {
      ...current,
      ...profile,
    };

    const result = await apiRequest<FinancialProfile>('/api/financial-profile', {
      method: 'PUT',
      body: JSON.stringify(updated),
    });

    if (result.success && result.data) {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(result.data));
      return result.data;
    }

    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  resetToDemo(): FinancialProfile {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(DEMO_FINANCIAL_PROFILE));
    return DEMO_FINANCIAL_PROFILE;
  },
};
