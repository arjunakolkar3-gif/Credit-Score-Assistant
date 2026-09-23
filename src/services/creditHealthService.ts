import { CreditScoreHistoryPoint, Bottleneck, FinancialProfile } from '../types/credit';
import { DEMO_SCORE_HISTORY, DEMO_BOTTLENECK_DATA } from '../data/demoData';
import { calculateDTI, calculateUtilization } from '../utils/calculations';
import { apiRequest } from './api';

const HISTORY_STORAGE_KEY = 'credit_assistant_score_history';

export const creditHealthService = {
  async getScoreHistory(): Promise<CreditScoreHistoryPoint[]> {
    const result = await apiRequest<CreditScoreHistoryPoint[]>('/api/credit-history', { method: 'GET' });
    if (result.success && result.data && Array.isArray(result.data)) {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(result.data));
      return result.data;
    }

    const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return DEMO_SCORE_HISTORY;
  },

  async addHistorySnapshot(snapshot: {
    score: number;
    profile: FinancialProfile;
    note?: string;
  }): Promise<CreditScoreHistoryPoint[]> {
    const history = await this.getScoreHistory();
    const utilization = calculateUtilization(snapshot.profile.totalCreditUsed, snapshot.profile.totalCreditLimit);
    const dti = calculateDTI(snapshot.profile.monthlyDebtPayments, snapshot.profile.monthlyIncome);

    const now = new Date();
    const monthName = now.toLocaleString('default', { month: 'short' });
    
    const newPoint: CreditScoreHistoryPoint = {
      month: monthName,
      date: now.toISOString().split('T')[0],
      score: snapshot.score,
      utilization,
      dti,
      note: snapshot.note || 'User profile updated',
    };

    const updatedHistory = [...history, newPoint];

    // Try posting to backend
    await apiRequest<CreditScoreHistoryPoint>('/api/credit-history', {
      method: 'POST',
      body: JSON.stringify(newPoint),
    });

    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
    return updatedHistory;
  },

  async getBottlenecks(profile: FinancialProfile): Promise<Bottleneck[]> {
    const bottlenecks: Bottleneck[] = [];
    const utilization = calculateUtilization(profile.totalCreditUsed, profile.totalCreditLimit);
    const dti = calculateDTI(profile.monthlyDebtPayments, profile.monthlyIncome);

    // 1. Utilization Bottleneck
    if (utilization > 30) {
      bottlenecks.push({
        id: 'btn_utilization_high',
        title: 'Elevated Credit Utilization',
        description: `Your revolving credit utilization is currently at ${utilization}%, exceeding the recommended 30% ceiling. This strongly depresses bureau score calculations.`,
        severity: utilization > 50 ? 'high' : 'medium',
        category: 'utilization',
        impactStatement: 'Accounts for ~30% of Indian credit bureau algorithms.',
        actionRecommendation: `Pay down ₹${Math.max(0, profile.totalCreditUsed - Math.round(profile.totalCreditLimit * 0.25)).toLocaleString('en-IN')} to bring utilization into the healthy sub-25% zone.`,
      });
    } else if (utilization > 15) {
      bottlenecks.push({
        id: 'btn_utilization_moderate',
        title: 'Utilization Optimization Opportunity',
        description: `Your aggregate credit utilization is ${utilization}%. While within acceptable banking bounds (<30%), bringing it under 15% maximizes point accrual.`,
        severity: 'low',
        category: 'utilization',
        impactStatement: 'Top-tier credit holders typically maintain single-digit or <15% utilization.',
        actionRecommendation: 'Pay a portion of card dues prior to monthly statement generation dates.',
      });
    }

    // 2. DTI Bottleneck
    if (dti > 40) {
      bottlenecks.push({
        id: 'btn_dti_high',
        title: 'High Debt-to-Income (DTI) Ratio',
        description: `Your fixed monthly debt servicing consumes ${dti}% of gross income. Indian banks generally cap FOIR (Fixed Obligation to Income Ratio) at 40-50% for fresh loans.`,
        severity: dti > 50 ? 'high' : 'medium',
        category: 'debt_burden',
        impactStatement: 'Key underwriting criterion for home and auto loan approval.',
        actionRecommendation: 'Prioritize prepaying high-interest personal loans to free up monthly cash flow.',
      });
    }

    // 3. Recent inquiries
    if (profile.recentInquiriesLast6Months > 2) {
      bottlenecks.push({
        id: 'btn_inquiries_frequent',
        title: 'Multiple Recent Credit Applications',
        description: `${profile.recentInquiriesLast6Months} credit inquiries recorded within 6 months. In quick succession, hard inquiries suggest heightened credit dependency.`,
        severity: profile.recentInquiriesLast6Months > 4 ? 'high' : 'medium',
        category: 'inquiries',
        impactStatement: 'Each hard inquiry can temporarily shave 5-10 points off your file.',
        actionRecommendation: 'Pause any fresh credit applications for at least 3 to 6 months.',
      });
    } else {
      bottlenecks.push({
        id: 'btn_inquiries_optimal',
        title: 'Credit Inquiries Under Control',
        description: `${profile.recentInquiriesLast6Months} credit inquiry in the last 6 months. You have maintained disciplined credit seeking behavior.`,
        severity: 'low',
        category: 'inquiries',
        impactStatement: 'Signals stable financial standing to underwriting algorithms.',
        actionRecommendation: 'Continue reserving credit applications only for planned, essential goals.',
      });
    }

    // 4. Payment punctuality
    if (profile.missedPaymentsLast24Months > 0) {
      bottlenecks.push({
        id: 'btn_missed_payments',
        title: 'Past Missed Payment Record',
        description: `${profile.missedPaymentsLast24Months} missed or delayed payment recorded in the last 24 months. Payment history represents the single largest factor in credit evaluation.`,
        severity: 'high',
        category: 'payment_history',
        impactStatement: 'Missed payments remain prominent on bureau files for up to 36 months.',
        actionRecommendation: 'Set up standing instructions / e-Mandates on your bank account immediately.',
      });
    } else {
      bottlenecks.push({
        id: 'btn_payment_clean',
        title: 'Impeccable Payment Record',
        description: '100% on-time payment track record across all credit cards and loan accounts.',
        severity: 'low',
        category: 'payment_history',
        impactStatement: 'Accounts for ~35% of your total credit assessment score in India.',
        actionRecommendation: 'Maintain automated NACH auto-debits for upcoming EMI cycles.',
      });
    }

    return bottlenecks.length > 0 ? bottlenecks : DEMO_BOTTLENECK_DATA;
  },
};
