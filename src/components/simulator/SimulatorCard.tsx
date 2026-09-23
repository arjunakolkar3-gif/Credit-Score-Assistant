import React, { useState } from 'react';
import { SlidersHorizontal, ArrowRight, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { FinancialProfile, SimulatorScenario, SimulationResult } from '../../types/credit';
import { simulatorService } from '../../services/simulatorService';
import { formatCurrency, formatPercentage } from '../../utils/calculations';
import { Button } from '../common/Button';

interface SimulatorCardProps {
  profile: FinancialProfile;
}

export const SimulatorCard: React.FC<SimulatorCardProps> = ({ profile }) => {
  const [scenario, setScenario] = useState<SimulatorScenario>({
    creditCardPaymentAmount: Math.min(20000, profile.totalCreditUsed),
    newLoanAmount: 0,
    newLoanEMI: 0,
    newCreditLimitAmount: 0,
    payoffLoanId: '',
    missPayment: false,
  });

  const [activeTab, setActiveTab] = useState<'card_payment' | 'limit_increase' | 'loan_payoff' | 'new_loan'>('card_payment');

  const simulation: SimulationResult = simulatorService.calculateLocalSimulation(profile, scenario);

  const impactColors = {
    'Potentially Better': 'bg-emerald-50 text-emerald-800 border-emerald-200',
    'Potentially Neutral': 'bg-slate-100 text-slate-800 border-slate-200',
    'Needs Attention': 'bg-rose-50 text-rose-800 border-rose-200',
  }[simulation.potentialImpact];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-bold text-slate-900">What If? Simulator</h3>
        </div>
        <p className="text-xs text-slate-500">
          Explore how financial changes could affect your credit-health metrics
        </p>
      </div>

      {/* Scenario Type Selector */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveTab('card_payment')}
          className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'card_payment'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Pay Down Card
        </button>
        <button
          onClick={() => setActiveTab('limit_increase')}
          className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'limit_increase'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Limit Enhancement
        </button>
        <button
          onClick={() => setActiveTab('loan_payoff')}
          className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'loan_payoff'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Foreclose Loan
        </button>
        <button
          onClick={() => setActiveTab('new_loan')}
          className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'new_loan'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Take New Loan
        </button>
      </div>

      {/* Controls based on active tab */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-4">
        {activeTab === 'card_payment' && (
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Card Pay-Down Amount</span>
              <span className="font-mono tabular-nums text-slate-900 font-bold">
                {formatCurrency(scenario.creditCardPaymentAmount)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={profile.totalCreditUsed}
              step="1000"
              value={scenario.creditCardPaymentAmount}
              onChange={(e) =>
                setScenario((prev) => ({
                  ...prev,
                  creditCardPaymentAmount: Number(e.target.value),
                }))
              }
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>₹0</span>
              <span>Full Balance: {formatCurrency(profile.totalCreditUsed)}</span>
            </div>
          </div>
        )}

        {activeTab === 'limit_increase' && (
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Requested Limit Enhancement</span>
              <span className="font-mono tabular-nums text-slate-900 font-bold">
                +{formatCurrency(scenario.newCreditLimitAmount)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="200000"
              step="10000"
              value={scenario.newCreditLimitAmount}
              onChange={(e) =>
                setScenario((prev) => ({
                  ...prev,
                  newCreditLimitAmount: Number(e.target.value),
                }))
              }
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>₹0</span>
              <span>+₹2,00,000</span>
            </div>
          </div>
        )}

        {activeTab === 'loan_payoff' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Loan to Pay Off Fully
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setScenario((prev) => ({ ...prev, payoffLoanId: '' }))}
                className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                  scenario.payoffLoanId === ''
                    ? 'bg-white border-slate-800 font-semibold text-slate-900 shadow-xs'
                    : 'bg-white/60 border-slate-200 text-slate-600'
                }`}
              >
                No Loan Prepayment
              </button>
              {profile.activeLoans.map((loan) => (
                <button
                  key={loan.id}
                  type="button"
                  onClick={() =>
                    setScenario((prev) => ({ ...prev, payoffLoanId: loan.id }))
                  }
                  className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors cursor-pointer flex items-center justify-between ${
                    scenario.payoffLoanId === loan.id
                      ? 'bg-white border-slate-800 font-semibold text-slate-900 shadow-xs'
                      : 'bg-white/60 border-slate-200 text-slate-600'
                  }`}
                >
                  <div>
                    <span>{loan.lenderName} ({loan.loanType})</span>
                    <span className="text-[11px] text-slate-400 block">
                      Balance: {formatCurrency(loan.remainingAmount)}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-emerald-700">
                    Saves {formatCurrency(loan.monthlyEMI)}/mo
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'new_loan' && (
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>New Monthly EMI Added</span>
                <span className="font-mono tabular-nums text-slate-900 font-bold">
                  {formatCurrency(scenario.newLoanEMI)}/mo
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25000"
                step="1000"
                value={scenario.newLoanEMI}
                onChange={(e) =>
                  setScenario((prev) => ({ ...prev, newLoanEMI: Number(e.target.value) }))
                }
                className="w-full accent-slate-800 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Missed payment simulator toggle */}
        <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
          <span className="text-slate-600 font-medium">Simulate 1 Missed Payment on Record:</span>
          <button
            type="button"
            onClick={() =>
              setScenario((prev) => ({ ...prev, missPayment: !prev.missPayment }))
            }
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
              scenario.missPayment
                ? 'bg-rose-600 border-rose-600 text-white'
                : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {scenario.missPayment ? 'Delinquency Active' : 'Off (Clean Record)'}
          </button>
        </div>
      </div>

      {/* Before vs After Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* BEFORE CARD */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Current Profile (Before)
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-slate-500">Utilization:</span>
            <span className="text-lg font-bold font-mono text-slate-900">
              {formatPercentage(simulation.beforeUtilization)}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-slate-500">DTI Ratio:</span>
            <span className="text-lg font-bold font-mono text-slate-900">
              {formatPercentage(simulation.beforeDTI)}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-slate-500">Debt Commitments:</span>
            <span className="text-sm font-semibold font-mono text-slate-700">
              {formatCurrency(simulation.beforeDebtPayment)}/mo
            </span>
          </div>
        </div>

        {/* AFTER CARD */}
        <div className="p-4 rounded-xl border border-emerald-200/90 bg-emerald-50/30 space-y-2 relative">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
            Simulated Outcome (After)
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-slate-600">Utilization:</span>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold font-mono text-slate-900">
                {formatPercentage(simulation.afterUtilization)}
              </span>
              {simulation.utilizationChange !== 0 && (
                <span
                  className={`text-xs font-semibold font-mono ${
                    simulation.utilizationChange < 0 ? 'text-emerald-700' : 'text-rose-700'
                  }`}
                >
                  {simulation.utilizationChange > 0 ? `+${simulation.utilizationChange}%` : `${simulation.utilizationChange}%`}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-slate-600">DTI Ratio:</span>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold font-mono text-slate-900">
                {formatPercentage(simulation.afterDTI)}
              </span>
              {simulation.dtiChange !== 0 && (
                <span
                  className={`text-xs font-semibold font-mono ${
                    simulation.dtiChange < 0 ? 'text-emerald-700' : 'text-rose-700'
                  }`}
                >
                  {simulation.dtiChange > 0 ? `+${simulation.dtiChange}%` : `${simulation.dtiChange}%`}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-slate-600">Debt Commitments:</span>
            <span className="text-sm font-bold font-mono text-slate-900">
              {formatCurrency(simulation.afterDebtPayment)}/mo
            </span>
          </div>
        </div>
      </div>

      {/* Potential Impact Callout */}
      <div className="p-4 rounded-xl border bg-slate-50 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Projected Impact Evaluation
          </span>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded border ${impactColors}`}>
            {simulation.potentialImpact}
          </span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          {simulation.explanation}
        </p>

        {simulation.actionTips.length > 0 && (
          <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside pt-1">
            {simulation.actionTips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Financial Safety Disclaimer */}
      <p className="text-[11px] text-slate-400 italic">
        Important: Simulations are educational estimates based on mathematical debt formulas. Credit Assistant does not calculate or guarantee official CIBIL or credit bureau scores.
      </p>
    </div>
  );
};
