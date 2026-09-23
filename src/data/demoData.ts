import { User, FinancialProfile, CreditScoreHistoryPoint, Bottleneck, AIAnalysisResult } from '../types/credit';

export const DEMO_USER: User = {
  id: 'usr_rahul_sharma_98',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '+91 98765 43210',
  panNumber: 'ABCDE****F',
  joinedDate: 'January 2026',
};

export const DEMO_FINANCIAL_PROFILE: FinancialProfile = {
  monthlyIncome: 60000,
  monthlyEssentialExpenses: 24000,
  monthlyDebtPayments: 16800,
  creditScore: 742,
  scoreSource: 'CIBIL',
  scoreDate: 'June 2026',
  totalCreditLimit: 200000,
  totalCreditUsed: 48000,
  paymentHistoryStatus: 'Excellent',
  onTimePaymentPercentage: 100,
  missedPaymentsLast24Months: 0,
  recentInquiriesLast6Months: 1,
  oldestCreditAccountYears: 3.5,
  financialGoals: [
    'Improve credit health',
    'Reduce debt',
    'Prepare for home/car purchase'
  ],
  creditCards: [
    {
      id: 'card_hdfc_regalia',
      bankName: 'HDFC Bank',
      cardName: 'Regalia Gold Credit Card',
      limit: 120000,
      balance: 32000,
      statementDate: '15th of each month',
      dueDate: '5th of each month',
      minimumDue: 1600,
    },
    {
      id: 'card_icici_coral',
      bankName: 'ICICI Bank',
      cardName: 'Coral RuPay Credit Card',
      limit: 80000,
      balance: 16000,
      statementDate: '20th of each month',
      dueDate: '10th of each month',
      minimumDue: 800,
    },
  ],
  activeLoans: [
    {
      id: 'loan_bajaj_personal',
      lenderName: 'Bajaj Finance',
      loanType: 'Personal Loan',
      originalAmount: 150000,
      remainingAmount: 90000,
      monthlyEMI: 10500,
      tenureMonths: 18,
      remainingMonths: 9,
    },
    {
      id: 'loan_hdfc_twowheeler',
      lenderName: 'HDFC Bank',
      loanType: 'Two-Wheeler Loan',
      originalAmount: 65000,
      remainingAmount: 28000,
      monthlyEMI: 3900,
      tenureMonths: 24,
      remainingMonths: 8,
    },
  ],
};

export const DEMO_SCORE_HISTORY: CreditScoreHistoryPoint[] = [
  {
    month: 'Jan',
    date: '2026-01-15',
    score: 680,
    utilization: 42,
    dti: 36,
    note: 'Initial reported baseline score'
  },
  {
    month: 'Feb',
    date: '2026-02-15',
    score: 695,
    utilization: 38,
    dti: 34,
    note: 'Personal loan EMI paid on time'
  },
  {
    month: 'Mar',
    date: '2026-03-15',
    score: 710,
    utilization: 33,
    dti: 31,
    note: 'Partial credit card dues cleared'
  },
  {
    month: 'Apr',
    date: '2026-04-15',
    score: 724,
    utilization: 29,
    dti: 29,
    note: 'Utilization dropped below 30% milestone'
  },
  {
    month: 'May',
    date: '2026-05-15',
    score: 735,
    utilization: 26,
    dti: 28,
    note: 'Continuous 100% on-time payment track'
  },
  {
    month: 'Jun',
    date: '2026-06-15',
    score: 742,
    utilization: 24,
    dti: 28,
    note: 'Current reported snapshot'
  },
];

export const DEMO_BOTTLENECK_DATA: Bottleneck[] = [
  {
    id: 'btn_utilization',
    title: 'High Utilization Opportunity',
    description: 'Your aggregate revolving credit utilization is 24% (₹48,000 of ₹2,00,000 limit). Reducing it below 15% historically correlates with stronger credit profiles.',
    severity: 'medium',
    category: 'utilization',
    impactStatement: 'Accounts for ~30% of credit bureau scoring algorithms.',
    actionRecommendation: 'Pay down ₹18,000 on your HDFC Regalia card before the statement generation date.',
  },
  {
    id: 'btn_inquiries',
    title: 'Recent Credit Applications',
    description: '1 credit card inquiry recorded in the last 6 months. Minimal impact, but multiple subsequent hard inquiries within a short window can signal credit distress.',
    severity: 'low',
    category: 'inquiries',
    impactStatement: 'Hard inquiries typically stay on bureau files for 24 months.',
    actionRecommendation: 'Avoid applying for new unsecured personal loans or retail cards for the next 90 days.',
  },
  {
    id: 'btn_payment_history',
    title: 'Payment History Track',
    description: 'Your recorded payment history is currently on track with 100% punctuality across 2 active loan facilities and 2 credit cards.',
    severity: 'low',
    category: 'payment_history',
    impactStatement: 'Payment punctuality carries the highest weight (~35%) in Indian credit metrics.',
    actionRecommendation: 'Maintain automatic debit (NACH / e-Mandate) setups on primary salary accounts.',
  },
];

export const DEMO_AI_ANALYSIS: AIAnalysisResult = {
  summary: 'Your overall credit-health profile is steadily improving, with a 62-point reported gain since January. Credit utilization remains your biggest controllable opportunity to reach the prime 750+ tier.',
  health_status: 'Good',
  key_findings: [
    {
      title: 'Credit utilization is well managed but can be optimized',
      description: 'At 24% aggregate utilization, you are in a healthy band (<30%), but clearing ₹18,000 on HDFC Regalia will drop utilization below 15%, which Indian bureaus reward with higher scores.',
      severity: 'medium'
    },
    {
      title: 'Debt-to-Income (DTI) is manageable at 28%',
      description: 'Your monthly fixed commitments of ₹16,800 against ₹60,000 income leave 72% disposable headroom, comfortably meeting bank loan underwriting standards (threshold is 40-50%).',
      severity: 'low'
    },
    {
      title: 'Payment history is exemplary (100% on-time)',
      description: 'Zero missed payments over 24 months across 2 loan facilities and 2 credit cards confirms exceptional fiscal discipline.',
      severity: 'low'
    }
  ],
  action_plan: [
    {
      step: 1,
      title: 'Reduce revolving credit utilization below 15%',
      description: 'Pay down ₹18,000 towards your highest balance card (HDFC Regalia) before the 15th statement date so the bureau receives a lower reported balance.',
      why_it_matters: 'Credit bureaus calculate utilization from the reported statement balance, not your final payment date.',
      what_to_do: 'Set a mid-cycle auto-pay of ₹10,000 to keep the reported balance under ₹15,000.',
      priority: 'high'
    },
    {
      step: 2,
      title: 'Maintain flawless on-time payment track record',
      description: 'Keep your NACH/e-mandates active for your Bajaj Finance and HDFC Two-Wheeler EMIs.',
      why_it_matters: 'Payment history constitutes ~35% of your credit profile score in India.',
      what_to_do: 'Verify your salary account balance at least 2 business days prior to EMI debit dates.',
      priority: 'high'
    },
    {
      step: 3,
      title: 'Avoid unnecessary new credit applications',
      description: 'Refrain from applying for new store cards, personal loans, or buy-now-pay-later (BNPL) credit for 6 months.',
      why_it_matters: 'Each hard inquiry can shave a few points and signals credit-hungry behavior to underwriters.',
      what_to_do: 'If you need emergency funds, rely on pre-approved offers where soft inquiries are used.',
      priority: 'medium'
    },
    {
      step: 4,
      title: 'Review your detailed credit report periodically',
      description: 'Check for reporting discrepancies, incorrect outstanding amounts, or delayed status updates.',
      why_it_matters: 'Errors in bureau reporting happen in about 1 in 5 Indian consumer profiles.',
      what_to_do: 'Request your free annual statutory credit report directly from official Indian credit bureaus.',
      priority: 'medium'
    },
    {
      step: 5,
      title: 'Track your financial metrics monthly in Credit Assistant',
      description: 'Log any updates in loan balances, pay-offs, or limit increases to observe your DTI and utilization trajectory.',
      why_it_matters: 'Consistent tracking ensures debt reduction stays aligned with your planned home or car purchase goals.',
      what_to_do: 'Log your monthly balances every 30 days after your salary credit.',
      priority: 'low'
    }
  ],
  questions_to_consider: [
    'Are you planning a major home or vehicle loan within the next 6 to 12 months?',
    'Can you request a credit limit enhancement on your ICICI Coral card to naturally reduce utilization without spending changes?',
    'Would prepaying the remaining ₹28,000 Two-Wheeler loan free up ₹3,900/month to accelerate emergency savings?'
  ],
  disclaimer: 'Credit Assistant provides educational insights based on information entered by the user. It does not replace official credit reports or professional financial advice.',
  timestamp: new Date().toISOString()
};
