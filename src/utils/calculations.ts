/**
 * Financial Calculation Utilities for Indian Credit-Health Platform
 */

/**
 * Calculates Debt-to-Income (DTI) ratio
 * DTI = (monthly debt payments / monthly gross income) * 100
 */
export function calculateDTI(monthlyDebtPayments: number, monthlyGrossIncome: number): number {
  if (!monthlyGrossIncome || monthlyGrossIncome <= 0) return 0;
  const ratio = (monthlyDebtPayments / monthlyGrossIncome) * 100;
  return Math.round(ratio * 10) / 10;
}

/**
 * Calculates Credit Utilization ratio
 * Utilization = (total revolving credit used / total revolving credit limit) * 100
 */
export function calculateUtilization(totalCreditUsed: number, totalCreditLimit: number): number {
  if (!totalCreditLimit || totalCreditLimit <= 0) return 0;
  const ratio = (totalCreditUsed / totalCreditLimit) * 100;
  return Math.round(ratio * 10) / 10;
}

/**
 * Calculates absolute and percentage change between two values
 */
export function calculateChange(current: number, previous: number): {
  delta: number;
  percentage: number;
  isPositive: boolean;
} {
  const delta = Math.round((current - previous) * 10) / 10;
  const percentage = previous !== 0 ? Math.round(((current - previous) / Math.abs(previous)) * 1000) / 10 : 0;
  return {
    delta,
    percentage,
    isPositive: delta >= 0,
  };
}

/**
 * Formats a number to Indian Rupee (INR) currency format
 * e.g. 150000 -> ₹1,50,000
 */
export function formatCurrency(amount: number, includeDecimals = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: includeDecimals ? 2 : 0,
    minimumFractionDigits: includeDecimals ? 2 : 0,
  });
  return formatter.format(amount);
}

/**
 * Formats a value as a percentage
 */
export function formatPercentage(value: number, includeSymbol = true): string {
  if (isNaN(value) || value === null || value === undefined) {
    return includeSymbol ? '0%' : '0';
  }
  const formatted = (Math.round(value * 10) / 10).toFixed(1).replace(/\.0$/, '');
  return includeSymbol ? `${formatted}%` : formatted;
}

/**
 * Determines credit score tier & rating
 */
export function getScoreTier(score: number): {
  tier: 'Excellent' | 'Good' | 'Fair' | 'Needs Attention';
  color: string;
  badgeBg: string;
  badgeText: string;
  description: string;
} {
  if (score >= 750) {
    return {
      tier: 'Excellent',
      color: '#10B981', // Emerald
      badgeBg: 'bg-emerald-50 border-emerald-200',
      badgeText: 'text-emerald-700',
      description: 'Prime borrowing tier. Eligible for optimal lending rates.',
    };
  }
  if (score >= 700) {
    return {
      tier: 'Good',
      color: '#10B981', // Emerald
      badgeBg: 'bg-emerald-50 border-emerald-200',
      badgeText: 'text-emerald-700',
      description: 'Solid credit health. Favorable loan approval terms.',
    };
  }
  if (score >= 650) {
    return {
      tier: 'Fair',
      color: '#F59E0B', // Amber
      badgeBg: 'bg-amber-50 border-amber-200',
      badgeText: 'text-amber-700',
      description: 'Moderate credit profile. May face slightly higher borrowing rates.',
    };
  }
  return {
    tier: 'Needs Attention',
    color: '#EF4444', // Red
    badgeBg: 'bg-rose-50 border-rose-200',
    badgeText: 'text-rose-700',
    description: 'Elevated credit risk profile. Focused debt reduction advised.',
  };
}

/**
 * Determines DTI health status
 */
export function getDTIRating(dti: number): {
  status: 'Ideal' | 'Healthy' | 'Moderate' | 'High Concern';
  color: string;
  badgeBg: string;
  badgeText: string;
  description: string;
} {
  if (dti <= 20) {
    return {
      status: 'Ideal',
      color: '#10B981',
      badgeBg: 'bg-emerald-50 border-emerald-200',
      badgeText: 'text-emerald-700',
      description: 'Very comfortable debt servicing capacity.',
    };
  }
  if (dti <= 35) {
    return {
      status: 'Healthy',
      color: '#10B981',
      badgeBg: 'bg-emerald-50 border-emerald-200',
      badgeText: 'text-emerald-700',
      description: 'Manageable debt load within recommended banking standards.',
    };
  }
  if (dti <= 45) {
    return {
      status: 'Moderate',
      color: '#F59E0B',
      badgeBg: 'bg-amber-50 border-amber-200',
      badgeText: 'text-amber-700',
      description: 'Debt obligations consume a significant portion of cashflow.',
    };
  }
  return {
    status: 'High Concern',
    color: '#EF4444',
    badgeBg: 'bg-rose-50 border-rose-200',
    badgeText: 'text-rose-700',
    description: 'Debt service exceeds healthy limits. Risk of repayment stress.',
  };
}

/**
 * Determines Credit Utilization rating
 */
export function getUtilizationRating(utilization: number): {
  status: 'Optimal' | 'Healthy' | 'Elevated' | 'Critical';
  color: string;
  badgeBg: string;
  badgeText: string;
  description: string;
} {
  if (utilization <= 15) {
    return {
      status: 'Optimal',
      color: '#10B981',
      badgeBg: 'bg-emerald-50 border-emerald-200',
      badgeText: 'text-emerald-700',
      description: 'Low utilization positively reinforces credit profile.',
    };
  }
  if (utilization <= 30) {
    return {
      status: 'Healthy',
      color: '#10B981',
      badgeBg: 'bg-emerald-50 border-emerald-200',
      badgeText: 'text-emerald-700',
      description: 'Within standard 30% financial threshold recommendation.',
    };
  }
  if (utilization <= 50) {
    return {
      status: 'Elevated',
      color: '#F59E0B',
      badgeBg: 'bg-amber-50 border-amber-200',
      badgeText: 'text-amber-700',
      description: 'Above optimal benchmark. Paying down revolving dues recommended.',
    };
  }
  return {
    status: 'Critical',
    color: '#EF4444',
    badgeBg: 'bg-rose-50 border-rose-200',
    badgeText: 'text-rose-700',
    description: 'High credit utilization poses substantial downward drag.',
  };
}
