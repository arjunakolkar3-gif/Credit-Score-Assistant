import { FinancialProfile, SimulatorScenario, SimulationResult } from '../types/credit';
import { calculateDTI, calculateUtilization, formatCurrency, formatPercentage } from '../utils/calculations';
import { apiRequest } from './api';

export const simulatorService = {
  async runSimulation(
    profile: FinancialProfile,
    scenario: SimulatorScenario
  ): Promise<SimulationResult> {
    // Attempt FastAPI POST /simulator
    const response = await apiRequest<SimulationResult>('/api/simulator', {
      method: 'POST',
      body: JSON.stringify({ profile, scenario }),
    });

    if (response.success && response.data) {
      return response.data;
    }

    return this.calculateLocalSimulation(profile, scenario);
  },

  calculateLocalSimulation(
    profile: FinancialProfile,
    scenario: SimulatorScenario
  ): SimulationResult {
    // Current Baseline
    const beforeUtilization = calculateUtilization(profile.totalCreditUsed, profile.totalCreditLimit);
    const beforeDTI = calculateDTI(profile.monthlyDebtPayments, profile.monthlyIncome);
    const beforeDebtPayment = profile.monthlyDebtPayments;

    // After Calculations
    // 1. Credit Card balance reduction
    const cardPayAmount = Math.min(scenario.creditCardPaymentAmount || 0, profile.totalCreditUsed);
    const afterCreditUsed = Math.max(0, profile.totalCreditUsed - cardPayAmount);
    
    // 2. New Credit Limit enhancement
    const afterCreditLimit = profile.totalCreditLimit + (scenario.newCreditLimitAmount || 0);

    // After Utilization
    const afterUtilization = calculateUtilization(afterCreditUsed, afterCreditLimit);

    // 3. Loan adjustments
    let monthlyEmiReduction = 0;
    if (scenario.payoffLoanId) {
      const loanToPayoff = profile.activeLoans.find((l) => l.id === scenario.payoffLoanId);
      if (loanToPayoff) {
        monthlyEmiReduction = loanToPayoff.monthlyEMI;
      }
    }

    const newLoanEMI = scenario.newLoanEMI || 0;
    const afterDebtPayment = Math.max(0, beforeDebtPayment - monthlyEmiReduction + newLoanEMI);
    const afterDTI = calculateDTI(afterDebtPayment, profile.monthlyIncome);

    const utilizationChange = Math.round((afterUtilization - beforeUtilization) * 10) / 10;
    const dtiChange = Math.round((afterDTI - beforeDTI) * 10) / 10;

    // Determine Potential Impact
    let potentialImpact: 'Potentially Better' | 'Potentially Neutral' | 'Needs Attention' = 'Potentially Neutral';
    const actionTips: string[] = [];

    if (scenario.missPayment) {
      potentialImpact = 'Needs Attention';
      actionTips.push('A reported 30+ day delinquency can significantly depress credit ratings across all Indian bureaus.');
      actionTips.push('Payment history represents ~35% of scoring weight; timely payments are crucial.');
    } else if (utilizationChange < -3 || dtiChange < -2) {
      potentialImpact = 'Potentially Better';
      if (utilizationChange < 0) {
        actionTips.push(`Decreasing revolving credit utilization from ${beforeUtilization}% to ${afterUtilization}% is a strong positive indicator for credit bureaus.`);
      }
      if (dtiChange < 0) {
        actionTips.push(`Lowering your DTI from ${beforeDTI}% to ${afterDTI}% improves loan underwriting FOIR thresholds.`);
      }
    } else if (utilizationChange > 5 || dtiChange > 5) {
      potentialImpact = 'Needs Attention';
      actionTips.push('Increased credit utilization or higher monthly debt obligations elevate financial risk indicators.');
    } else {
      potentialImpact = 'Potentially Neutral';
      actionTips.push('The simulated adjustment creates a modest impact on aggregate debt ratios.');
    }

    let explanation = '';
    if (scenario.missPayment) {
      explanation = 'Simulating a missed payment introduces substantial negative impact. Credit bureaus track payment punctuality meticulously, and delinquencies can remain visible on credit reports for up to 36 months.';
    } else if (potentialImpact === 'Potentially Better') {
      explanation = `Lower utilization and reduced debt burden may improve your credit profile over consecutive billing cycles. Credit bureaus typically refresh reports every 30 to 45 days.`;
    } else if (potentialImpact === 'Needs Attention') {
      explanation = `Increasing your monthly debt load or revolving credit usage reduces your disposable cashflow buffer, potentially elevating perceived risk during credit assessments.`;
    } else {
      explanation = `The simulated changes maintain your financial metrics within the existing band. Long-term score gains rely on continuous on-time repayments and maintaining low utilization over time.`;
    }

    explanation += ' Actual credit-score changes depend on your complete credit history, active credit mix, and the specific bureau\'s proprietary scoring methodology.';

    return {
      beforeUtilization,
      afterUtilization,
      beforeDTI,
      afterDTI,
      beforeDebtPayment,
      afterDebtPayment,
      utilizationChange,
      dtiChange,
      potentialImpact,
      explanation,
      actionTips,
    };
  },
};
