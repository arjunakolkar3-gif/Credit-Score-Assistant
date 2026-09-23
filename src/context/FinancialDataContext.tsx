import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { FinancialProfile, CreditScoreHistoryPoint, Bottleneck } from '../types/credit';
import { DEMO_FINANCIAL_PROFILE, DEMO_SCORE_HISTORY } from '../data/demoData';
import { profileService } from '../services/profileService';
import { creditHealthService } from '../services/creditHealthService';
import { calculateDTI, calculateUtilization, formatCurrency, formatPercentage } from '../utils/calculations';
import { useToast } from './ToastContext';

interface MetricDelta {
  metric: string;
  oldValue: number;
  newValue: number;
  delta: number;
  improved: boolean;
}

interface FinancialDataContextType {
  profile: FinancialProfile;
  history: CreditScoreHistoryPoint[];
  bottlenecks: Bottleneck[];
  isLoading: boolean;
  dti: number;
  utilization: number;
  totalDebtObligation: number;
  availableCredit: number;
  lastUpdateDelta: MetricDelta[] | null;
  updateFinancialMetrics: (updates: Partial<FinancialProfile>, updateNote?: string) => Promise<boolean>;
  updateSalary: (salary: number) => Promise<boolean>;
  updateRevolvingDebt: (used: number, limit?: number) => Promise<boolean>;
  resetToDemoData: () => void;
  refreshData: () => Promise<void>;
}

const FinancialDataContext = createContext<FinancialDataContextType | undefined>(undefined);

export const FinancialDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<FinancialProfile>(DEMO_FINANCIAL_PROFILE);
  const [history, setHistory] = useState<CreditScoreHistoryPoint[]>(DEMO_SCORE_HISTORY);
  const [bottlenecks, setBottlenecks] = useState<Bottleneck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdateDelta, setLastUpdateDelta] = useState<MetricDelta[] | null>(null);

  const { showSuccess, showInfo } = useToast();

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const userProfile = await profileService.getProfile();
      const scoreHistory = await creditHealthService.getScoreHistory();
      const activeBottlenecks = await creditHealthService.getBottlenecks(userProfile);

      setProfile(userProfile);
      setHistory(scoreHistory);
      setBottlenecks(activeBottlenecks);
    } catch {
      setProfile(DEMO_FINANCIAL_PROFILE);
      setHistory(DEMO_SCORE_HISTORY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Derived current metrics
  const dti = calculateDTI(profile.monthlyDebtPayments, profile.monthlyIncome);
  const utilization = calculateUtilization(profile.totalCreditUsed, profile.totalCreditLimit);
  const totalDebtObligation = profile.monthlyDebtPayments;
  const availableCredit = Math.max(0, profile.totalCreditLimit - profile.totalCreditUsed);

  // Real-time financial update pipeline
  const updateFinancialMetrics = async (
    updates: Partial<FinancialProfile>,
    updateNote = 'Manual profile update'
  ): Promise<boolean> => {
    try {
      // 1. Validate
      if (updates.monthlyIncome !== undefined && updates.monthlyIncome <= 0) {
        throw new Error('Monthly income must be greater than zero');
      }

      const prevDTI = calculateDTI(profile.monthlyDebtPayments, profile.monthlyIncome);
      const prevUtil = calculateUtilization(profile.totalCreditUsed, profile.totalCreditLimit);

      // 2. Compute updated profile
      const newProfile: FinancialProfile = {
        ...profile,
        ...updates,
      };

      // 3. Recalculate new ratios
      const newDTI = calculateDTI(newProfile.monthlyDebtPayments, newProfile.monthlyIncome);
      const newUtil = calculateUtilization(newProfile.totalCreditUsed, newProfile.totalCreditLimit);

      // 4. Compare old vs new
      const deltas: MetricDelta[] = [];
      if (prevDTI !== newDTI) {
        deltas.push({
          metric: 'DTI',
          oldValue: prevDTI,
          newValue: newDTI,
          delta: Math.round((newDTI - prevDTI) * 10) / 10,
          improved: newDTI < prevDTI,
        });
      }
      if (prevUtil !== newUtil) {
        deltas.push({
          metric: 'Utilization',
          oldValue: prevUtil,
          newValue: newUtil,
          delta: Math.round((newUtil - prevUtil) * 10) / 10,
          improved: newUtil < prevUtil,
        });
      }

      setLastUpdateDelta(deltas);

      // 5. Save updated profile
      const savedProfile = await profileService.updateProfile(newProfile);
      setProfile(savedProfile);

      // 6. Record historical snapshot
      const updatedHistory = await creditHealthService.addHistorySnapshot({
        score: profile.creditScore,
        profile: savedProfile,
        note: updateNote,
      });
      setHistory(updatedHistory);

      // 7. Refresh bottlenecks
      const updatedBottlenecks = await creditHealthService.getBottlenecks(savedProfile);
      setBottlenecks(updatedBottlenecks);

      // 8. User feedback toast
      if (deltas.length > 0) {
        const primaryDelta = deltas[0];
        const changeWord = primaryDelta.improved ? 'decreased' : 'increased';
        showSuccess(
          'Financial profile updated',
          `Your ${primaryDelta.metric} ${changeWord} from ${formatPercentage(primaryDelta.oldValue)} to ${formatPercentage(primaryDelta.newValue)}. Your tracked financial metrics improved.`
        );
      } else {
        showInfo('Financial profile updated', 'Your financial records have been refreshed successfully.');
      }

      return true;
    } catch {
      return false;
    }
  };

  const updateSalary = async (salary: number): Promise<boolean> => {
    return updateFinancialMetrics({ monthlyIncome: salary }, 'Updated monthly income');
  };

  const updateRevolvingDebt = async (used: number, limit?: number): Promise<boolean> => {
    const updates: Partial<FinancialProfile> = { totalCreditUsed: used };
    if (limit !== undefined && limit > 0) {
      updates.totalCreditLimit = limit;
    }
    return updateFinancialMetrics(updates, 'Updated revolving credit utilization');
  };

  const resetToDemoData = () => {
    const demo = profileService.resetToDemo();
    setProfile(demo);
    setHistory(DEMO_SCORE_HISTORY);
    creditHealthService.getBottlenecks(demo).then(setBottlenecks);
    setLastUpdateDelta(null);
    showInfo('Demo data restored', 'Loaded Rahul Sharma\'s sample credit records.');
  };

  return (
    <FinancialDataContext.Provider
      value={{
        profile,
        history,
        bottlenecks,
        isLoading,
        dti,
        utilization,
        totalDebtObligation,
        availableCredit,
        lastUpdateDelta,
        updateFinancialMetrics,
        updateSalary,
        updateRevolvingDebt,
        resetToDemoData,
        refreshData: loadData,
      }}
    >
      {children}
    </FinancialDataContext.Provider>
  );
};

export const useFinancialData = () => {
  const context = useContext(FinancialDataContext);
  if (!context) {
    throw new Error('useFinancialData must be used within a FinancialDataProvider');
  }
  return context;
};
