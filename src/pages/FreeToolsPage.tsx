import React, { useState } from 'react';
import {
  Calculator,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  Download,
  Copy,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';
import { formatINR } from '../utils/formatters';

interface FreeToolsPageProps {
  onNavigate: (path: string) => void;
}

export const FreeToolsPage: React.FC<FreeToolsPageProps> = ({ onNavigate }) => {
  const { showSuccess } = useToast();

  // Inputs
  const [monthlyIncome, setMonthlyIncome] = useState<number>(65000);
  const [personalLoanEmi, setPersonalLoanEmi] = useState<number>(8500);
  const [homeLoanEmi, setHomeLoanEmi] = useState<number>(0);
  const [otherEmi, setOtherEmi] = useState<number>(4000);
  const [cardLimit, setCardLimit] = useState<number>(200000);
  const [cardBalance, setCardBalance] = useState<number>(48000);
  const [latePayments, setLatePayments] = useState<'none' | 'few' | 'multiple'>('none');

  // Calculations
  const totalEmi = personalLoanEmi + homeLoanEmi + otherEmi;
  const foir = monthlyIncome > 0 ? Math.round((totalEmi / monthlyIncome) * 100) : 0;
  const utilization = cardLimit > 0 ? Math.round((cardBalance / cardLimit) * 100) : 0;

  // Estimated Score Bracket
  let estimatedScoreMin = 750;
  let estimatedScoreMax = 790;
  let scoreStatus = 'Good / Prime';
  let scoreStatusColor = 'text-emerald-700';

  if (foir > 50 || utilization > 60 || latePayments === 'multiple') {
    estimatedScoreMin = 590;
    estimatedScoreMax = 650;
    scoreStatus = 'Needs Attention';
    scoreStatusColor = 'text-amber-700';
  } else if (foir > 40 || utilization > 35 || latePayments === 'few') {
    estimatedScoreMin = 670;
    estimatedScoreMax = 730;
    scoreStatus = 'Moderate';
    scoreStatusColor = 'text-blue-700';
  } else if (foir <= 30 && utilization <= 25 && latePayments === 'none') {
    estimatedScoreMin = 760;
    estimatedScoreMax = 820;
    scoreStatus = 'Excellent';
    scoreStatusColor = 'text-emerald-700';
  }

  // Home Loan Eligibility estimation (Standard Indian Banking: Max 50% FOIR, 20-year @ 8.5% interest, EMI factor ~ ₹868 per lakh)
  const maxAllowableEmi = Math.max(0, monthlyIncome * 0.5 - totalEmi);
  const estimatedHomeLoanLakhs = maxAllowableEmi > 0 ? (maxAllowableEmi / 868).toFixed(1) : '0';

  const handleCopySummary = () => {
    const text = `Credit Assistant — Financial Diagnostic\nMonthly Income: ${formatINR(monthlyIncome)}\nTotal EMIs: ${formatINR(totalEmi)}\nDebt-to-Income (FOIR): ${foir}%\nCredit Card Utilization: ${utilization}%\nEstimated Score Range: ${estimatedScoreMin} - ${estimatedScoreMax} (${scoreStatus})\nEstimated Home Loan Eligibility: ₹${estimatedHomeLoanLakhs} Lakhs\nCalculate yours free at Credit Assistant.`;
    navigator.clipboard?.writeText(text);
    showSuccess('Copied to clipboard!', 'Summary copied to clipboard');
  };

  return (
    <div className="py-12 px-6 lg:px-12 max-w-7xl mx-auto w-full space-y-12">
      {/* Title & Introduction */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <Calculator className="w-4 h-4 text-emerald-600" />
          <span>Interactive Self-Diagnostic Tool</span>
          <span aria-hidden="true">·</span>
          <span>100% Free & Anonymous</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          Indian Credit Health & FOIR Calculator
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Simulate your credit metrics against real Indian banking underwriting benchmarks. Calculate your Fixed Obligation to Income Ratio (FOIR), card utilization rate, and estimated loan approval bandwidth.
        </p>
      </div>

      {/* Main 2-Column Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Your Monthly Financial Parameters</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Adjust numbers to see real-time updates on your lending eligibility.
            </p>
          </div>

          {/* Income Slider / Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor="input-income" className="font-semibold text-slate-800">
                Monthly Net In-Hand Income
              </label>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                {formatINR(monthlyIncome)}
              </span>
            </div>
            <input
              id="input-income"
              type="range"
              min="20000"
              max="300000"
              step="5000"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>₹20,000</span>
              <span>₹1,50,000</span>
              <span>₹3,00,000</span>
            </div>
          </div>

          {/* EMIs Breakdown */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Active Monthly EMIs
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">
                  Personal / Auto EMI
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-xs text-slate-400 font-mono">₹</span>
                  <input
                    type="number"
                    value={personalLoanEmi || ''}
                    onChange={(e) => setPersonalLoanEmi(Math.max(0, Number(e.target.value)))}
                    placeholder="0"
                    className="w-full pl-6 pr-2 py-1.5 text-xs font-mono tabular-nums border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-500 block mb-1">
                  Home Loan EMI
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-xs text-slate-400 font-mono">₹</span>
                  <input
                    type="number"
                    value={homeLoanEmi || ''}
                    onChange={(e) => setHomeLoanEmi(Math.max(0, Number(e.target.value)))}
                    placeholder="0"
                    className="w-full pl-6 pr-2 py-1.5 text-xs font-mono tabular-nums border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-500 block mb-1">
                  Other / Consumer Loans
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-xs text-slate-400 font-mono">₹</span>
                  <input
                    type="number"
                    value={otherEmi || ''}
                    onChange={(e) => setOtherEmi(Math.max(0, Number(e.target.value)))}
                    placeholder="0"
                    className="w-full pl-6 pr-2 py-1.5 text-xs font-mono tabular-nums border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Credit Card Limits & Balances */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Credit Card Dues & Limits
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">
                  Total Aggregate Card Limit
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-xs text-slate-400 font-mono">₹</span>
                  <input
                    type="number"
                    value={cardLimit || ''}
                    onChange={(e) => setCardLimit(Math.max(1000, Number(e.target.value)))}
                    className="w-full pl-6 pr-2 py-1.5 text-xs font-mono tabular-nums border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-500 block mb-1">
                  Current Card Balance / Dues
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-xs text-slate-400 font-mono">₹</span>
                  <input
                    type="number"
                    value={cardBalance || ''}
                    onChange={(e) => setCardBalance(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-6 pr-2 py-1.5 text-xs font-mono tabular-nums border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Repayment History selector */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-semibold text-slate-800 block">
              Missed Payments (Past 24 Months)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setLatePayments('none')}
                className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  latePayments === 'none'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                0 Missed (100% On-time)
              </button>
              <button
                type="button"
                onClick={() => setLatePayments('few')}
                className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  latePayments === 'few'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                1 - 2 Delinquencies
              </button>
              <button
                type="button"
                onClick={() => setLatePayments('multiple')}
                className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  latePayments === 'multiple'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                3+ Delinquencies
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Diagnostic Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Calculated Lending Ratios</h3>
                <span className="text-[11px] text-slate-400">Benchmarked against Indian Banking Norms</span>
              </div>
              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Summary</span>
              </button>
            </div>

            {/* Metric 1: FOIR / DTI */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-700">
                  Fixed Obligation to Income Ratio (FOIR / DTI)
                </span>
                <span className="text-lg font-mono font-bold text-slate-900 tabular-nums">
                  {foir}%
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    foir <= 35
                      ? 'bg-emerald-500'
                      : foir <= 50
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, foir)}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Total EMI: {formatINR(totalEmi)} / mo</span>
                <span className="font-medium">
                  {foir <= 35 ? 'Excellent (Under 35%)' : foir <= 50 ? 'Moderate (35-50%)' : 'Stretched (>50%)'}
                </span>
              </div>
            </div>

            {/* Metric 2: Utilization */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-700">
                  Credit Card Utilization Ratio
                </span>
                <span className="text-lg font-mono font-bold text-slate-900 tabular-nums">
                  {utilization}%
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    utilization <= 30
                      ? 'bg-emerald-500'
                      : utilization <= 50
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, utilization)}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>{formatINR(cardBalance)} used of {formatINR(cardLimit)}</span>
                <span className="font-medium">
                  {utilization <= 30 ? 'Healthy (<= 30%)' : 'Elevated (Ideal <= 30%)'}
                </span>
              </div>
            </div>

            {/* 2 Big Insight Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Estimated Score Bracket */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Estimated Score Range
                </span>
                <div className="text-2xl font-black font-mono text-slate-900 tabular-nums">
                  {estimatedScoreMin} - {estimatedScoreMax}
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <span className={`font-semibold ${scoreStatusColor}`}>
                    {scoreStatus}
                  </span>
                  <span className="text-slate-400">· 300-900 Scale</span>
                </div>
              </div>

              {/* Home Loan Eligibility */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Estimated Home Loan Bandwidth
                </span>
                <div className="text-2xl font-black font-mono text-slate-900 tabular-nums">
                  ₹{estimatedHomeLoanLakhs} <span className="text-sm font-sans font-bold text-slate-600">Lakhs</span>
                </div>
                <div className="text-xs text-slate-500">
                  Based on SBI/HDFC 50% FOIR cap
                </div>
              </div>
            </div>

            {/* Tactical AI Recommendations */}
            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-2">
              <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Instant Tactical Takeaways</span>
              </div>
              <ul className="text-xs text-indigo-950 space-y-1.5 list-disc pl-4 leading-relaxed font-medium">
                {utilization > 30 && (
                  <li>
                    Pay down ₹{formatINR(Math.max(0, cardBalance - cardLimit * 0.28))} on your card to bring utilization under the 30% golden rule.
                  </li>
                )}
                {foir > 40 && (
                  <li>
                    Your FOIR is {foir}%. Indian banks prefer &le; 40%. Foreclosing smaller personal loans will expand your borrowing headroom.
                  </li>
                )}
                {utilization <= 30 && foir <= 35 && (
                  <li>
                    Your ratios are in the prime borrowing bracket. You qualify for competitive retail loan interest rates across Tier-1 banks.
                  </li>
                )}
                <li>
                  Maintain zero late entries; payment punctuality represents 35% of your reported bureau score weightage.
                </li>
              </ul>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto flex-1"
                onClick={() => onNavigate('/simulator')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Run What-If Simulator
              </Button>
              <Button
                variant="outline"
                size="md"
                className="w-full sm:w-auto"
                onClick={() => onNavigate('/onboarding')}
              >
                Save to Profile
              </Button>
            </div>
          </div>

          {/* Underwriting FAQ Note */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-500 flex items-start gap-3">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-700">What is FOIR?</strong> Fixed Obligation to Income Ratio measures the portion of your monthly income that goes toward servicing existing loan obligations and minimum card repayments. Indian banks like SBI, HDFC, and ICICI typically enforce a hard cap of 45%–50% FOIR when underwriting new loans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
