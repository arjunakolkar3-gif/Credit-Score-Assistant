import React from 'react';
import { SlidersHorizontal, Info, ShieldCheck, ArrowRight } from 'lucide-react';
import { useFinancialData } from '../context/FinancialDataContext';
import { SimulatorCard } from '../components/simulator/SimulatorCard';
import { formatCurrency } from '../utils/calculations';

export const SimulatorPage: React.FC = () => {
  const { profile } = useFinancialData();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-slate-900">What-If Credit Simulator</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Simulate financial decisions and understand how debt adjustments affect DTI and utilization before taking action.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/80">
          <span className="font-semibold text-slate-700 block">Baseline Profile:</span>
          <span>Income: {formatCurrency(profile.monthlyIncome)} · Limit: {formatCurrency(profile.totalCreditLimit)}</span>
        </div>
      </div>

      {/* Main Interactive Simulator Card */}
      <SimulatorCard profile={profile} />

      {/* Educational Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-slate-200/90 rounded-2xl space-y-2">
          <h4 className="text-sm font-bold text-slate-900">How Bureaus Receive Data</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Indian banks batch-upload member data to CIBIL, Experian, and CRIF once every 30 to 45 days. Changes simulated today typically reflect in your actual credit bureau report by the subsequent monthly reporting cycle.
          </p>
        </div>

        <div className="p-5 bg-white border border-slate-200/90 rounded-2xl space-y-2">
          <h4 className="text-sm font-bold text-slate-900">Statement Date vs Due Date</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Card issuers report the statement balance to credit bureaus, not your payment due date balance. If you pay your balance just 2 days before the statement cuts, you report low utilization.
          </p>
        </div>

        <div className="p-5 bg-white border border-slate-200/90 rounded-2xl space-y-2">
          <h4 className="text-sm font-bold text-slate-900">Limit Enhancements</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Accepting pre-approved credit card limit increases improves your total credit ceiling without incurring a hard inquiry. This automatically lowers your utilization ratio.
          </p>
        </div>
      </div>
    </div>
  );
};
