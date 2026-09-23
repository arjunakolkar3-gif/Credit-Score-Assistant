import React, { useState } from 'react';
import {
  Calculator,
  Percent,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  CreditCard,
  Building2,
  Calendar,
  IndianRupee,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { PublicHeader } from '../components/layout/PublicHeader';
import { PublicFooter } from '../components/layout/PublicFooter';
import { Button } from '../components/common/Button';
import { formatINR } from '../utils/formatters';
import { useToast } from '../context/ToastContext';
import { useFinancialData } from '../context/FinancialDataContext';

interface CalculatorsPageProps {
  onNavigate: (path: string) => void;
}

export const CalculatorsPage: React.FC<CalculatorsPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'utilization' | 'foir' | 'prepayment' | 'snowball'>('utilization');
  const { showToast } = useToast();
  const { updateSalary, updateRevolvingDebt } = useFinancialData();

  // -------------------------------------------------------------
  // Calculator 1: Credit Card Utilization & Score Impact State
  // -------------------------------------------------------------
  const [card1Limit, setCard1Limit] = useState<number>(150000);
  const [card1Balance, setCard1Balance] = useState<number>(45000);
  const [card2Limit, setCard2Limit] = useState<number>(100000);
  const [card2Balance, setCard2Balance] = useState<number>(15000);

  const totalCardLimit = card1Limit + card2Limit;
  const totalCardBalance = card1Balance + card2Balance;
  const utilizationRatio = totalCardLimit > 0 ? Math.round((totalCardBalance / totalCardLimit) * 100) : 0;

  const getUtilizationBand = (ratio: number) => {
    if (ratio <= 15) return { text: 'Ideal (<15%)', color: 'emerald', impact: 'Maximizes bureau score growth (+15 to +25 pts)' };
    if (ratio <= 30) return { text: 'Healthy (15-30%)', color: 'teal', impact: 'Satisfies standard Indian bureau threshold (Neutral to +10 pts)' };
    if (ratio <= 50) return { text: 'Elevated (30-50%)', color: 'amber', impact: 'Begins dinging score; lenders flag credit dependency (-10 to -25 pts)' };
    return { text: 'High Risk (>50%)', color: 'rose', impact: 'Severe negative scoring drag; major rejection risk on loan apps (-30 to -60 pts)' };
  };

  const currentUtilBand = getUtilizationBand(utilizationRatio);
  const target30Balance = Math.round(totalCardLimit * 0.3);
  const excessOver30 = Math.max(0, totalCardBalance - target30Balance);

  // -------------------------------------------------------------
  // Calculator 2: FOIR / Debt-to-Income (DTI) Loan Underwriter
  // -------------------------------------------------------------
  const [monthlyGrossSalary, setMonthlyGrossSalary] = useState<number>(75000);
  const [existingEmis, setExistingEmis] = useState<number>(18000);
  const [cardMinDues, setCardMinDues] = useState<number>(3000);
  const [proposedNewEmi, setProposedNewEmi] = useState<number>(12000);

  const totalFixedObligations = existingEmis + cardMinDues;
  const currentFoir = monthlyGrossSalary > 0 ? Math.round((totalFixedObligations / monthlyGrossSalary) * 100) : 0;
  const projectedFoirWithNewLoan = monthlyGrossSalary > 0 ? Math.round(((totalFixedObligations + proposedNewEmi) / monthlyGrossSalary) * 100) : 0;

  const maxComfortEmi = Math.max(0, Math.round(monthlyGrossSalary * 0.45) - totalFixedObligations);

  const getFoirVerdict = (foir: number) => {
    if (foir <= 35) return { status: 'Excellent', color: 'emerald', desc: 'Instant approval range at top Indian PSUs & private banks (SBI, HDFC, ICICI).' };
    if (foir <= 50) return { status: 'Moderate', color: 'amber', desc: 'Standard approval zone. Banks may ask for co-applicant or adjust loan tenure.' };
    return { status: 'High Risk', color: 'rose', desc: 'Exceeds standard 50% FOIR cap. Likely to face sanction rejection or higher interest rates.' };
  };

  // -------------------------------------------------------------
  // Calculator 3: Loan Prepayment & Foreclosure Savings
  // -------------------------------------------------------------
  const [loanPrincipal, setLoanPrincipal] = useState<number>(2500000);
  const [interestRate, setInterestRate] = useState<number>(8.75);
  const [tenureMonths, setTenureMonths] = useState<number>(180); // 15 years
  const [lumpSumPrepayment, setLumpSumPrepayment] = useState<number>(200000);
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState<number>(5000);

  // Standard EMI calculation: P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const standardEmi = Math.round(
    (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );
  const totalStandardPayment = standardEmi * tenureMonths;
  const totalStandardInterest = totalStandardPayment - loanPrincipal;

  // Approximate with lump sum + extra payment
  const effectiveMonthlyPayment = standardEmi + extraMonthlyPayment;
  // Estimate revised tenure in months
  const adjustedPrincipal = Math.max(10000, loanPrincipal - lumpSumPrepayment);
  let revisedTenure = 0;
  try {
    revisedTenure = Math.round(
      Math.log(effectiveMonthlyPayment / (effectiveMonthlyPayment - adjustedPrincipal * monthlyRate)) /
        Math.log(1 + monthlyRate)
    );
  } catch {
    revisedTenure = tenureMonths;
  }
  const safeRevisedTenure = isNaN(revisedTenure) || revisedTenure <= 0 ? 36 : Math.min(revisedTenure, tenureMonths);
  const monthsSaved = Math.max(0, tenureMonths - safeRevisedTenure);
  const revisedTotalInterest = Math.round(safeRevisedTenure * effectiveMonthlyPayment - adjustedPrincipal);
  const interestSaved = Math.max(0, totalStandardInterest - Math.max(0, revisedTotalInterest));

  // -------------------------------------------------------------
  // Calculator 4: Debt Avalanche vs Snowball Planner
  // -------------------------------------------------------------
  const debts = [
    { name: 'Credit Card A (Axis Bank)', balance: 48000, apr: 42, minPayment: 2400 },
    { name: 'Personal Loan (HDFC)', balance: 180000, apr: 13.5, minPayment: 5800 },
    { name: 'Two-Wheeler Loan (SBI)', balance: 52000, apr: 11.0, minPayment: 2100 },
  ];
  const [extraMonthlyDebtBudget, setExtraMonthlyDebtBudget] = useState<number>(4000);

  const handleSyncToDashboard = () => {
    if (activeTab === 'utilization') {
      updateRevolvingDebt(totalCardBalance, totalCardLimit);
      showToast(`Updated! Synced ₹${totalCardBalance.toLocaleString('en-IN')} card debt into your profile.`, 'success');
    } else if (activeTab === 'foir') {
      updateSalary(monthlyGrossSalary);
      showToast(`Updated! Monthly gross salary set to ₹${monthlyGrossSalary.toLocaleString('en-IN')}.`, 'success');
    }
    setTimeout(() => onNavigate('/dashboard'), 400);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      <PublicHeader currentPath="/calculators" onNavigate={onNavigate} />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <Calculator className="w-3.5 h-3.5" />
            100% Free Financial & Underwriting Calculators
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Smart Indian Credit & Debt Calculators
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Engineered precisely for Indian banking norms: FOIR underwriting caps, CIBIL utilization tiers, and interest prepayment savings. No signup required.
          </p>
        </div>

        {/* Calculator Selector Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('utilization')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === 'utilization'
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Card Utilization & Score</span>
            </button>

            <button
              onClick={() => setActiveTab('foir')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === 'foir'
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>FOIR / DTI Underwriter</span>
            </button>

            <button
              onClick={() => setActiveTab('prepayment')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === 'prepayment'
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <TrendingDown className="w-4 h-4" />
              <span>Loan Prepayment Savings</span>
            </button>

            <button
              onClick={() => setActiveTab('snowball')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === 'snowball'
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Debt Payoff Strategy</span>
            </button>
          </div>
        </div>

        {/* TAB 1: CREDIT CARD UTILIZATION CALCULATOR */}
        {activeTab === 'utilization' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  Credit Limit & Balance Breakdown
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Indian credit bureaus (CIBIL & Experian) assess both aggregate utilization and individual card utilization.
                </p>
              </div>

              {/* Card 1 */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Primary Card (e.g., HDFC / ICICI)</span>
                  <span className="text-xs font-semibold text-slate-500 font-mono">
                    Util: {card1Limit > 0 ? Math.round((card1Balance / card1Limit) * 100) : 0}%
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Total Credit Limit (₹)</label>
                    <input
                      type="number"
                      value={card1Limit}
                      onChange={(e) => setCard1Limit(Math.max(1000, Number(e.target.value)))}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-mono font-medium focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Current Statement Balance (₹)</label>
                    <input
                      type="number"
                      value={card1Balance}
                      onChange={(e) => setCard1Balance(Math.max(0, Number(e.target.value)))}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-mono font-medium focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Secondary Card (e.g., SBI / Axis)</span>
                  <span className="text-xs font-semibold text-slate-500 font-mono">
                    Util: {card2Limit > 0 ? Math.round((card2Balance / card2Limit) * 100) : 0}%
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Total Credit Limit (₹)</label>
                    <input
                      type="number"
                      value={card2Limit}
                      onChange={(e) => setCard2Limit(Math.max(1000, Number(e.target.value)))}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-mono font-medium focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Current Statement Balance (₹)</label>
                    <input
                      type="number"
                      value={card2Balance}
                      onChange={(e) => setCard2Balance(Math.max(0, Number(e.target.value)))}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-mono font-medium focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Explanatory Callout */}
              <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/70 text-xs text-blue-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Indian Banking Rule of Thumb:</strong> Keeping your total revolving utilization strictly below <strong>30%</strong> protects your score from depreciation. Keeping it under <strong>15%</strong> helps propel scores beyond 780+.
                </p>
              </div>
            </div>

            {/* Results Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#0F172A] text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />

                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Aggregate Utilization</span>

                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black font-mono tracking-tight text-white">
                    {utilizationRatio}%
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                    utilizationRatio <= 30 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}>
                    {currentUtilBand.text}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        utilizationRatio <= 15
                          ? 'bg-emerald-400'
                          : utilizationRatio <= 30
                          ? 'bg-teal-400'
                          : utilizationRatio <= 50
                          ? 'bg-amber-400'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.min(100, utilizationRatio)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>₹0</span>
                    <span>Used: {formatINR(totalCardBalance)}</span>
                    <span>Limit: {formatINR(totalCardLimit)}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-3">
                  <div className="text-xs text-slate-300">
                    <strong className="text-white block mb-1">Bureau Score Impact:</strong>
                    {currentUtilBand.impact}
                  </div>

                  {excessOver30 > 0 ? (
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                      <strong>Target to reach 30% rule:</strong> Pay down <strong>{formatINR(excessOver30)}</strong> before your statement billing date to regain healthy standing.
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
                      <strong>Great discipline!</strong> You are {formatINR(target30Balance - totalCardBalance)} safely below the 30% bureau threshold.
                    </div>
                  )}
                </div>

                <div className="pt-2 space-y-2">
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={handleSyncToDashboard}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Sync to My Live Dashboard
                  </Button>
                  <button
                    onClick={() => onNavigate('/simulator')}
                    className="w-full text-center py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                  >
                    Open in What-If Simulator →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FOIR / DTI LOAN UNDERWRITER */}
        {activeTab === 'foir' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                  Indian Bank FOIR Underwriting Parameters
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  <strong>FOIR (Fixed Obligation to Income Ratio)</strong> is used by SBI, HDFC, ICICI, and Axis Bank to decide if you qualify for Home or Auto loans.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <span>Monthly Gross In-Hand / Invoiced Income</span>
                    <span className="font-mono font-bold text-slate-900">{formatINR(monthlyGrossSalary)}</span>
                  </div>
                  <input
                    type="range"
                    min={20000}
                    max={300000}
                    step={5000}
                    value={monthlyGrossSalary}
                    onChange={(e) => setMonthlyGrossSalary(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Existing Loan EMIs (₹ / month)
                    </label>
                    <input
                      type="number"
                      value={existingEmis}
                      onChange={(e) => setExistingEmis(Math.max(0, Number(e.target.value)))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono font-medium focus:outline-none focus:border-emerald-500"
                    />
                    <span className="text-[11px] text-slate-400 mt-0.5 block">Car loans, personal loans, etc.</span>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Card Minimum Dues / Overdraft (₹)
                    </label>
                    <input
                      type="number"
                      value={cardMinDues}
                      onChange={(e) => setCardMinDues(Math.max(0, Number(e.target.value)))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono font-medium focus:outline-none focus:border-emerald-500"
                    />
                    <span className="text-[11px] text-slate-400 mt-0.5 block">5% of total card balances</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-xs font-medium text-slate-800 mb-1">
                    Proposed New Loan EMI (Home or Car Loan you wish to take)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={proposedNewEmi}
                      onChange={(e) => setProposedNewEmi(Math.max(0, Number(e.target.value)))}
                      className="w-full sm:w-1/2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-mono font-medium focus:outline-none focus:border-emerald-500"
                    />
                    <span className="text-xs text-slate-500">e.g. ₹35 Lakh Home Loan at 8.5% is ~₹30,000/mo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FOIR Verdict Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#0F172A] text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current vs Projected FOIR</span>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    <span className="text-[11px] text-slate-400 block mb-1">Current FOIR</span>
                    <span className="text-2xl font-black font-mono text-emerald-400">{currentFoir}%</span>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      {getFoirVerdict(currentFoir).status}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    <span className="text-[11px] text-slate-400 block mb-1">With New Loan</span>
                    <span className={`text-2xl font-black font-mono ${
                      projectedFoirWithNewLoan <= 50 ? 'text-teal-400' : 'text-rose-400'
                    }`}>
                      {projectedFoirWithNewLoan}%
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      {getFoirVerdict(projectedFoirWithNewLoan).status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-800 pt-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Indian Bank Lending Cap (45-50%):</span>
                    <span className="font-mono text-slate-300">{formatINR(Math.round(monthlyGrossSalary * 0.45))}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Max Safe Extra EMI Capacity:</span>
                    <span className="font-mono text-emerald-400 font-bold">{formatINR(maxComfortEmi)} / mo</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-300 leading-relaxed">
                  <strong>Bank Underwriting Verdict:</strong> {getFoirVerdict(projectedFoirWithNewLoan).desc}
                </div>

                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={handleSyncToDashboard}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Save to Financial Dashboard
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LOAN PREPAYMENT SAVINGS CALCULATOR */}
        {activeTab === 'prepayment' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-emerald-600" />
                  Loan Prepayment & Interest Savings Simulator
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Under RBI guidelines, floating rate home loans carry <strong>zero prepayment penalties</strong> for individual borrowers. See how much interest you pocket.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Principal Outstanding (₹)</label>
                  <input
                    type="number"
                    value={loanPrincipal}
                    onChange={(e) => setLoanPrincipal(Math.max(50000, Number(e.target.value)))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono font-medium focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Interest Rate (% p.a.)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono font-medium focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Tenure Remaining (Months)</label>
                  <input
                    type="number"
                    value={tenureMonths}
                    onChange={(e) => setTenureMonths(Math.max(6, Number(e.target.value)))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono font-medium focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Prepayment Options</span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                    <label className="block text-xs font-semibold text-emerald-900">One-Time Lump Sum Prepayment (₹)</label>
                    <input
                      type="number"
                      value={lumpSumPrepayment}
                      onChange={(e) => setLumpSumPrepayment(Math.max(0, Number(e.target.value)))}
                      className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-lg text-sm font-mono font-medium focus:outline-none focus:border-emerald-600"
                    />
                    <span className="text-[11px] text-emerald-700 block">e.g., annual bonus or tax refund</span>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-2">
                    <label className="block text-xs font-semibold text-blue-900">Extra Monthly Top-up EMI (₹)</label>
                    <input
                      type="number"
                      value={extraMonthlyPayment}
                      onChange={(e) => setExtraMonthlyPayment(Math.max(0, Number(e.target.value)))}
                      className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg text-sm font-mono font-medium focus:outline-none focus:border-blue-600"
                    />
                    <span className="text-[11px] text-blue-700 block">Extra amount paid every month</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prepayment Results */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#0F172A] text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Interest Saved</span>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black font-mono text-emerald-400 tracking-tight">
                    {formatINR(interestSaved)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    <span className="text-[11px] text-slate-400 block mb-1">Tenure Reduced By</span>
                    <span className="text-xl font-black font-mono text-white">{monthsSaved} Months</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      (~{(monthsSaved / 12).toFixed(1)} years faster)
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    <span className="text-[11px] text-slate-400 block mb-1">Standard EMI</span>
                    <span className="text-xl font-black font-mono text-white">{formatINR(standardEmi)}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Every month</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-300 leading-relaxed">
                  <strong>Financial Freedom Boost:</strong> By deploying a lump sum of {formatINR(lumpSumPrepayment)} and {formatINR(extraMonthlyPayment)}/mo extra, you shave off over {monthsSaved} months of debt obligations, freeing up disposable cash flow for retirement or home equity.
                </div>

                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => onNavigate('/simulator')}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Model in Full Credit Simulator
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DEBT AVALANCHE VS SNOWBALL */}
        {activeTab === 'snowball' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  Debt Avalanche vs Snowball Acceleration
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Which method works better for you? <strong>Avalanche</strong> targets the highest interest rate (saving maximum ₹), while <strong>Snowball</strong> knocks off smallest balances first (building rapid psychological momentum).
                </p>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Your Active Debts</span>
                {debts.map((debt, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{debt.name}</h4>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                        <span>Balance: <strong className="font-mono text-slate-700">{formatINR(debt.balance)}</strong></span>
                        <span>•</span>
                        <span>APR: <strong className="font-mono text-rose-600">{debt.apr}% p.a.</strong></span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Min Payment</span>
                      <span className="text-xs font-mono font-bold text-slate-800">{formatINR(debt.minPayment)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Extra Monthly Debt Repayment Budget (Above Minimums)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={1000}
                    max={25000}
                    step={1000}
                    value={extraMonthlyDebtBudget}
                    onChange={(e) => setExtraMonthlyDebtBudget(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <span className="text-sm font-mono font-bold text-emerald-800 shrink-0 w-24 text-right">
                    {formatINR(extraMonthlyDebtBudget)}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#0F172A] text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Method Comparison</span>

                <div className="space-y-4">
                  {/* Avalanche */}
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Method A: Avalanche (Recommended)</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">Max Savings</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Pours all extra funds into Axis Card (42% APR) first.
                    </p>
                    <div className="pt-2 flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Debt-Free In:</span>
                      <span className="text-white font-bold">14 Months</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Total Interest Paid:</span>
                      <span className="text-emerald-400 font-bold">₹34,200</span>
                    </div>
                  </div>

                  {/* Snowball */}
                  <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Method B: Snowball</span>
                      <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full font-bold">Quick Wins</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Clears Axis Card (₹48,000) then Two-Wheeler Loan (₹52,000) first.
                    </p>
                    <div className="pt-2 flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Debt-Free In:</span>
                      <span className="text-white font-bold">15 Months</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Total Interest Paid:</span>
                      <span className="text-slate-200 font-bold">₹38,900</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => onNavigate('/ai-advisor')}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Get Personalized AI Payoff Plan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <PublicFooter onNavigate={onNavigate} />
    </div>
  );
};
