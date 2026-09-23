import { AIAnalysisResult, FinancialProfile } from '../types/credit';
import { calculateDTI, calculateUtilization, formatCurrency } from '../utils/calculations';
import { DEMO_AI_ANALYSIS } from '../data/demoData';
import { apiRequest } from './api';

export const aiService = {
  async analyzeProfile(profile: FinancialProfile): Promise<AIAnalysisResult> {
    const dti = calculateDTI(profile.monthlyDebtPayments, profile.monthlyIncome);
    const utilization = calculateUtilization(profile.totalCreditUsed, profile.totalCreditLimit);

    // Call server-side Gemini API
    const response = await apiRequest<AIAnalysisResult>('/api/ai/analyze', {
      method: 'POST',
      body: JSON.stringify({
        profile: {
          monthlyIncome: profile.monthlyIncome,
          monthlyDebtPayments: profile.monthlyDebtPayments,
          totalCreditLimit: profile.totalCreditLimit,
          totalCreditUsed: profile.totalCreditUsed,
          creditScore: profile.creditScore,
          scoreSource: profile.scoreSource,
          activeLoansCount: profile.activeLoans.length,
          creditCardsCount: profile.creditCards.length,
          missedPayments: profile.missedPaymentsLast24Months,
          recentInquiries: profile.recentInquiriesLast6Months,
          dti,
          utilization,
          financialGoals: profile.financialGoals,
        },
      }),
    });

    if (response.success && response.data && this.validateAIResponse(response.data)) {
      return response.data;
    }

    // Graceful fallback tailored dynamically to user's real numbers
    return this.generateDynamicFallback(profile, dti, utilization);
  },

  async askAdvisorQuestion(
    question: string,
    profile: FinancialProfile,
    conversationHistory: { role: 'user' | 'model'; text: string }[] = []
  ): Promise<string> {
    const dti = calculateDTI(profile.monthlyDebtPayments, profile.monthlyIncome);
    const utilization = calculateUtilization(profile.totalCreditUsed, profile.totalCreditLimit);

    const response = await apiRequest<{ answer: string }>('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({
        question,
        profileContext: {
          score: profile.creditScore,
          income: profile.monthlyIncome,
          debtPayments: profile.monthlyDebtPayments,
          utilization,
          dti,
          loansCount: profile.activeLoans.length,
          cardsCount: profile.creditCards.length,
        },
        conversationHistory,
      }),
    });

    if (response.success && response.data?.answer) {
      return response.data.answer;
    }

    // Dynamic contextual fallback response
    return this.generateChatFallback(question, profile, dti, utilization);
  },

  validateAIResponse(data: unknown): data is AIAnalysisResult {
    if (!data || typeof data !== 'object') return false;
    const res = data as Partial<AIAnalysisResult>;
    return (
      typeof res.summary === 'string' &&
      res.summary.length > 0 &&
      Array.isArray(res.key_findings) &&
      res.key_findings.length > 0 &&
      Array.isArray(res.action_plan) &&
      res.action_plan.length > 0
    );
  },

  generateDynamicFallback(
    profile: FinancialProfile,
    dti: number,
    utilization: number
  ): AIAnalysisResult {
    const isUtilizationHigh = utilization > 30;
    const isDTIHigh = dti > 35;
    const hasMissedPayments = profile.missedPaymentsLast24Months > 0;

    let healthStatus: 'Excellent' | 'Good' | 'Fair' | 'Needs Attention' = 'Good';
    if (profile.creditScore >= 750 && !isUtilizationHigh && !isDTIHigh) {
      healthStatus = 'Excellent';
    } else if (hasMissedPayments || (isUtilizationHigh && isDTIHigh)) {
      healthStatus = 'Needs Attention';
    } else if (isUtilizationHigh || isDTIHigh || profile.creditScore < 700) {
      healthStatus = 'Fair';
    }

    return {
      summary: `Your reported credit health shows solid foundational stability with a score of ${profile.creditScore}. Your DTI is ${dti}%, while credit utilization stands at ${utilization}%. ${
        isUtilizationHigh
          ? 'Revolving card balances represent your most actionable lever for metric improvements.'
          : 'Maintaining punctual repayments will help strengthen your profile over time.'
      }`,
      health_status: healthStatus,
      key_findings: [
        {
          title: `Credit utilization is ${isUtilizationHigh ? 'elevated' : 'healthy'} at ${utilization}%`,
          description: isUtilizationHigh
            ? `Your outstanding revolving balance of ${formatCurrency(profile.totalCreditUsed)} on a ${formatCurrency(profile.totalCreditLimit)} limit surpasses the recommended 30% guideline.`
            : `Your revolving balance is within healthy thresholds. Keeping it under 15% offers optimal credit scoring results.`,
          severity: isUtilizationHigh ? 'high' : 'low',
        },
        {
          title: `Debt-to-Income (DTI) is ${isDTIHigh ? 'elevated' : 'manageable'} at ${dti}%`,
          description: `Fixed monthly payments of ${formatCurrency(profile.monthlyDebtPayments)} against ${formatCurrency(profile.monthlyIncome)} income ${
            isDTIHigh
              ? 'exceed bank comfort levels for unsecured borrowing.'
              : 'leave comfortable cashflow bandwidth for personal savings and goals.'
          }`,
          severity: isDTIHigh ? 'medium' : 'low',
        },
        {
          title: `Payment history is ${profile.paymentHistoryStatus.toLowerCase()}`,
          description: `${profile.onTimePaymentPercentage}% punctual repayment record across ${profile.activeLoans.length} active loans and ${profile.creditCards.length} credit cards.`,
          severity: hasMissedPayments ? 'high' : 'low',
        },
      ],
      action_plan: [
        {
          step: 1,
          title: 'Optimize revolving credit card balances',
          description: isUtilizationHigh
            ? `Target paying down ${formatCurrency(Math.max(5000, profile.totalCreditUsed - Math.round(profile.totalCreditLimit * 0.25)))} to bring utilization under 25%.`
            : 'Make mid-cycle payments before statement generation dates to ensure low reported balances to bureaus.',
          why_it_matters: 'Credit bureaus calculate utilization directly from reported statement dates, carrying ~30% weight.',
          what_to_do: 'Set up calendar alerts 3 business days before each card statement date.',
          priority: isUtilizationHigh ? 'high' : 'medium',
        },
        {
          step: 2,
          title: 'Maintain uninterrupted auto-debits for EMIs',
          description: 'Ensure salary accounts have sufficient balance 48 hours prior to NACH/e-mandate execution.',
          why_it_matters: 'Punctual repayment track record carries ~35% weight in Indian credit scoring models.',
          what_to_do: 'Keep a buffer fund equivalent to 1 month of total EMIs in your primary repayment account.',
          priority: 'high',
        },
        {
          step: 3,
          title: 'Consolidate or prepay high-interest debt',
          description: 'If viable, direct surplus bonuses or tax refunds toward reducing principal on the highest-rate unsecured loan.',
          why_it_matters: 'Lowers your overall DTI ratio, directly improving eligibility for future home or vehicle financing.',
          what_to_do: 'List your loans by interest rate and target the highest cost facility first.',
          priority: 'medium',
        },
        {
          step: 4,
          title: 'Avoid multiple simultaneous credit applications',
          description: 'Space out any new loan or credit card applications by at least 90 to 120 days.',
          why_it_matters: 'Hard inquiries logged in quick succession can depress scores and signal credit hunger.',
          what_to_do: 'Rely on bank pre-approved soft offers rather than fresh retail applications.',
          priority: 'low',
        },
        {
          step: 5,
          title: 'Conduct an annual credit report hygiene review',
          description: 'Check official bureau reports from CIBIL, Experian, or CRIF for any inaccurate entries.',
          why_it_matters: 'Clerical delays from lenders in marking closed loans can artificially affect reported health.',
          what_to_do: 'Obtain statutory free annual reports and verify all loan closure NOC statuses.',
          priority: 'low',
        },
      ],
      questions_to_consider: [
        'Are you aiming for a major home loan or property purchase within the upcoming 12 months?',
        'Can you request a credit limit enhancement without income re-verification to reduce utilization?',
        'Would allocating part of annual bonuses to loan prepayment accelerate your debt-freedom roadmap?',
      ],
      disclaimer: 'Credit Assistant provides educational insights based on information entered by the user. It does not replace official credit reports or professional financial advice.',
      timestamp: new Date().toISOString(),
    };
  },

  generateChatFallback(
    question: string,
    profile: FinancialProfile,
    dti: number,
    utilization: number
  ): string {
    const qLower = question.toLowerCase();

    if (qLower.includes('close') && qLower.includes('card')) {
      return `In the Indian credit ecosystem, closing your oldest credit card is generally not advised unless it carries exorbitant un-waivable annual charges. Closing an old card shortens your average credit history age and reduces your aggregate credit limit, which may instantly increase your credit utilization from its current ${utilization}%. Consider keeping the account active with small periodic recurring expenses.`;
    }

    if (qLower.includes('home loan') || qLower.includes('mortgage') || qLower.includes('property')) {
      return `For home loan readiness in India, underwriters typically look for a credit score of 750+ (your entered score is ${profile.creditScore}) and a FOIR/DTI under 40-50% (your current DTI is ${dti}%). To position yourself for the best interest rate discounts (often 25-50 bps lower): 1) Keep your credit utilization below 15%; 2) Avoid taking any new personal loans or auto loans for 6 months prior; 3) Maintain clean 100% on-time bank statements.`;
    }

    if (qLower.includes('cibil') || qLower.includes('score') || qLower.includes('increase') || qLower.includes('improve')) {
      return `To foster steady credit score improvement: 1) Punctuality is paramount (constitutes ~35% of scoring); 2) Lower your revolving utilization from ${utilization}% to under 15% by making mid-cycle payments before statement generation dates; 3) Keep older credit accounts open to preserve credit history depth (${profile.oldestCreditAccountYears} years currently). Remember that official bureaus update files monthly, so improvements typically reflect over 2 to 4 reporting cycles.`;
    }

    if (qLower.includes('prepay') || qLower.includes('personal loan') || qLower.includes('emi')) {
      return `Prepaying your highest-interest unsecured loans is an effective financial strategy. With your current monthly debt payments of ${formatCurrency(profile.monthlyDebtPayments)} against ${formatCurrency(profile.monthlyIncome)} income (DTI ${dti}%), clearing a loan will directly lower your fixed obligations, freeing up monthly cash flow and bolstering borrowing eligibility for future planned goals.`;
    }

    return `Based on your reported profile (Score: ${profile.creditScore}, DTI: ${dti}%, Utilization: ${utilization}%), maintaining steady, disciplined financial habits is key. Keep your revolving card balances low, preserve on-time NACH auto-debits, and review your official bureau reports once a year for accuracy. Let me know if you would like specific guidance regarding debt reduction strategies, loan planning, or utilization timing!`;
  },
};
