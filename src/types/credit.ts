export type Severity = 'low' | 'medium' | 'high';
export type HealthStatus = 'excellent' | 'good' | 'fair' | 'needs_attention' | 'critical';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  panNumber?: string; // Masked e.g. "ABCDE****F"
  joinedDate: string;
}

export interface CreditCard {
  id: string;
  bankName: string;
  cardName: string;
  limit: number;
  balance: number;
  statementDate?: string;
  dueDate?: string;
  minimumDue?: number;
}

export interface ActiveLoan {
  id: string;
  lenderName: string;
  loanType: 'Personal Loan' | 'Home Loan' | 'Two-Wheeler Loan' | 'Auto Loan' | 'Education Loan' | 'Consumer Durable';
  originalAmount: number;
  remainingAmount: number;
  monthlyEMI: number;
  tenureMonths: number;
  remainingMonths: number;
}

export interface FinancialProfile {
  monthlyIncome: number;
  monthlyEssentialExpenses: number;
  monthlyDebtPayments: number; // Sum of all EMIs & minimum card dues
  creditScore: number;
  scoreSource: 'CIBIL' | 'Experian' | 'CRIF High Mark' | 'Equifax' | 'Self Reported';
  scoreDate: string;
  totalCreditLimit: number;
  totalCreditUsed: number;
  activeLoans: ActiveLoan[];
  creditCards: CreditCard[];
  paymentHistoryStatus: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  onTimePaymentPercentage: number;
  missedPaymentsLast24Months: number;
  recentInquiriesLast6Months: number;
  oldestCreditAccountYears: number;
  financialGoals: string[];
}

export interface CreditScoreHistoryPoint {
  month: string;
  date: string;
  score: number;
  utilization: number;
  dti: number;
  note?: string;
}

export interface Bottleneck {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  category: 'utilization' | 'inquiries' | 'payment_history' | 'credit_mix' | 'debt_burden';
  impactStatement: string;
  actionRecommendation: string;
}

export interface AIActionStep {
  step: number;
  title: string;
  description: string;
  whyItMatters: string;
  whatToDo: string;
  priority: Severity;
  targetTimeline?: string;
  estimatedImpact?: string;
}

export interface AIAnalysisResult {
  summary: string;
  health_status: 'Excellent' | 'Good' | 'Fair' | 'Needs Attention';
  key_findings: {
    title: string;
    description: string;
    severity: Severity;
  }[];
  action_plan: {
    step: number;
    title: string;
    description: string;
    why_it_matters?: string;
    what_to_do?: string;
    priority: Severity;
  }[];
  questions_to_consider: string[];
  disclaimer?: string;
  timestamp?: string;
}

export interface SimulatorScenario {
  creditCardPaymentAmount: number;
  newLoanAmount: number;
  newLoanEMI: number;
  payoffLoanId?: string;
  newCreditLimitAmount: number;
  missPayment: boolean;
}

export interface SimulationResult {
  beforeUtilization: number;
  afterUtilization: number;
  beforeDTI: number;
  afterDTI: number;
  beforeDebtPayment: number;
  afterDebtPayment: number;
  utilizationChange: number;
  dtiChange: number;
  potentialImpact: 'Potentially Better' | 'Potentially Neutral' | 'Needs Attention';
  explanation: string;
  actionTips: string[];
}
