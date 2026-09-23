import React, { useState } from 'react';
import { Check, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Building2, CreditCard, Target, FileCheck } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { useFinancialData } from '../context/FinancialDataContext';
import { calculateDTI, calculateUtilization, formatCurrency, formatPercentage } from '../utils/calculations';
import { FinancialProfile } from '../types/credit';

interface OnboardingPageProps {
  onNavigate: (path: string) => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onNavigate }) => {
  const { profile, updateFinancialMetrics } = useFinancialData();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState<Partial<FinancialProfile>>({
    monthlyIncome: profile.monthlyIncome || 60000,
    monthlyEssentialExpenses: profile.monthlyEssentialExpenses || 24000,
    monthlyDebtPayments: profile.monthlyDebtPayments || 16800,
    creditScore: profile.creditScore || 742,
    scoreSource: profile.scoreSource || 'CIBIL',
    totalCreditLimit: profile.totalCreditLimit || 200000,
    totalCreditUsed: profile.totalCreditUsed || 48000,
    recentInquiriesLast6Months: profile.recentInquiriesLast6Months || 1,
    oldestCreditAccountYears: profile.oldestCreditAccountYears || 3.5,
    paymentHistoryStatus: profile.paymentHistoryStatus || 'Excellent',
    financialGoals: profile.financialGoals || ['Improve credit health', 'Reduce debt'],
  });

  const [isSaving, setIsSaving] = useState(false);

  const goalOptions = [
    'Improve credit health',
    'Reduce revolving debt',
    'Prepare for home loan (low FOIR)',
    'Prepare for car loan',
    'Optimize credit card utilization',
    'Learn credit bureau mechanics',
  ];

  const toggleGoal = (goal: string) => {
    const goals = formData.financialGoals || [];
    if (goals.includes(goal)) {
      setFormData({ ...formData, financialGoals: goals.filter((g) => g !== goal) });
    } else {
      setFormData({ ...formData, financialGoals: [...goals, goal] });
    }
  };

  const calculatedDTI = calculateDTI(
    formData.monthlyDebtPayments || 0,
    formData.monthlyIncome || 1
  );

  const calculatedUtilization = calculateUtilization(
    formData.totalCreditUsed || 0,
    formData.totalCreditLimit || 1
  );

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    setIsSaving(true);
    await updateFinancialMetrics(formData, 'Onboarding profile completed');
    setIsSaving(false);
    onNavigate('/dashboard');
  };

  const stepsList = [
    { num: 1, title: 'Income & Debt' },
    { num: 2, title: 'Credit Score' },
    { num: 3, title: 'History & Depth' },
    { num: 4, title: 'Goals' },
    { num: 5, title: 'Summary' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between text-[#0F172A]">
      {/* Top Header */}
      <header className="border-b border-slate-200/80 bg-white px-6 py-4 flex items-center justify-between">
        <Logo size="md" />
        <button
          onClick={() => onNavigate('/dashboard')}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800"
        >
          Skip to Dashboard →
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-4 sm:p-6 my-4 flex flex-col justify-center">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {stepsList.map((step) => {
              const isActive = currentStep === step.num;
              const isPast = currentStep > step.num;

              return (
                <div key={step.num} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isPast
                        ? 'bg-emerald-600 text-white'
                        : isActive
                        ? 'bg-[#0F172A] text-white ring-4 ring-slate-200'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isPast ? <Check className="w-4 h-4 stroke-[3]" /> : step.num}
                  </div>
                  <span
                    className={`text-[11px] font-medium mt-1.5 hidden sm:block ${
                      isActive ? 'text-slate-900 font-bold' : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          {/* STEP 1: Basic Financial Info */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Step 1: Basic Income & Monthly Expenses
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  We use your gross income and debt commitments to calculate your Fixed Obligation to Income Ratio (FOIR/DTI).
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  label="Monthly Gross Income"
                  type="number"
                  prefixText="₹"
                  placeholder="60000"
                  value={formData.monthlyIncome || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, monthlyIncome: Number(e.target.value) })
                  }
                  helperText="Your monthly in-hand / deposited salary"
                  required
                />

                <Input
                  label="Monthly Essential Living Expenses"
                  type="number"
                  prefixText="₹"
                  placeholder="24000"
                  value={formData.monthlyEssentialExpenses || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, monthlyEssentialExpenses: Number(e.target.value) })
                  }
                  helperText="Rent, groceries, utilities, school fees (excluding loans)"
                />

                <Input
                  label="Total Monthly Debt Obligations (EMIs + Card Minimums)"
                  type="number"
                  prefixText="₹"
                  placeholder="16800"
                  value={formData.monthlyDebtPayments || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, monthlyDebtPayments: Number(e.target.value) })
                  }
                  helperText="Sum of personal loan, auto loan, and minimum credit card dues"
                  required
                />
              </div>
            </div>
          )}

          {/* STEP 2: Credit Profile */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Step 2: Reported Credit Score & Card Limits
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your latest reported score from your banking app or statutory bureau report.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Current Reported Credit Score"
                    type="number"
                    min="300"
                    max="900"
                    placeholder="742"
                    value={formData.creditScore || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, creditScore: Number(e.target.value) })
                    }
                    helperText="Official bureau score range is 300 to 900"
                    required
                  />

                  <Select
                    label="Score Source / Bureau"
                    value={formData.scoreSource || 'CIBIL'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scoreSource: e.target.value as FinancialProfile['scoreSource'],
                      })
                    }
                    options={[
                      { value: 'CIBIL', label: 'TransUnion CIBIL' },
                      { value: 'Experian', label: 'Experian India' },
                      { value: 'CRIF High Mark', label: 'CRIF High Mark' },
                      { value: 'Equifax', label: 'Equifax' },
                      { value: 'Self Reported', label: 'Estimated / Self Reported' },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Total Credit Card Limit (Aggregate)"
                    type="number"
                    prefixText="₹"
                    placeholder="200000"
                    value={formData.totalCreditLimit || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, totalCreditLimit: Number(e.target.value) })
                    }
                    helperText="Sum of credit limits across all your cards"
                    required
                  />

                  <Input
                    label="Current Revolving Credit Used"
                    type="number"
                    prefixText="₹"
                    placeholder="48000"
                    value={formData.totalCreditUsed || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, totalCreditUsed: Number(e.target.value) })
                    }
                    helperText="Active outstanding card balances"
                    required
                  />
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Calculated Utilization:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {formatPercentage(calculatedUtilization)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Debt & Credit Details */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Step 3: Repayment Discipline & Credit Depth
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Indian credit bureaus place high weight on payment track records and credit vintage.
                </p>
              </div>

              <div className="space-y-4">
                <Select
                  label="Payment History Track Record"
                  value={formData.paymentHistoryStatus || 'Excellent'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      paymentHistoryStatus: e.target.value as FinancialProfile['paymentHistoryStatus'],
                      missedPaymentsLast24Months: e.target.value === 'Excellent' ? 0 : 1,
                    })
                  }
                  options={[
                    { value: 'Excellent', label: 'Excellent (100% on-time, 0 missed payments)' },
                    { value: 'Good', label: 'Good (1 minor delay in last 2 years)' },
                    { value: 'Fair', label: 'Fair (2-3 delays in last 24 months)' },
                    { value: 'Poor', label: 'Poor (Frequent late fees / settlement)' },
                  ]}
                  helperText="Punctuality represents ~35% of total score evaluation"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Hard Inquiries (Last 6 Months)"
                    type="number"
                    min="0"
                    placeholder="1"
                    value={formData.recentInquiriesLast6Months ?? 1}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recentInquiriesLast6Months: Number(e.target.value),
                      })
                    }
                    helperText="New loan or card applications"
                  />

                  <Input
                    label="Oldest Credit Account Age (Years)"
                    type="number"
                    step="0.5"
                    min="0"
                    placeholder="3.5"
                    value={formData.oldestCreditAccountYears ?? 3.5}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        oldestCreditAccountYears: Number(e.target.value),
                      })
                    }
                    helperText="Length of oldest card or loan"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Financial Goals */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Step 4: Select Your Financial Goals
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Choose the key objectives you want our AI Advisor to optimize for.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {goalOptions.map((goal) => {
                  const isSelected = formData.financialGoals?.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between text-xs font-semibold ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span>{goal}</span>
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 ml-2 ${
                          isSelected ? 'bg-emerald-600 text-white' : 'border border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Summary & Dashboard Transition */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Step 5: Profile Summary & Diagnostics
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Here is the initial diagnostic baseline prepared for your dashboard.
                </p>
              </div>

              {/* 3 Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Reported Score
                  </span>
                  <div className="text-2xl font-black font-mono text-slate-900">
                    {formData.creditScore}
                  </div>
                  <span className="text-[11px] font-medium text-emerald-700 block">
                    {formData.scoreSource} file
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Utilization
                  </span>
                  <div className="text-2xl font-black font-mono text-slate-900">
                    {formatPercentage(calculatedUtilization)}
                  </div>
                  <span className="text-[11px] font-medium text-emerald-700 block">
                    {calculatedUtilization <= 30 ? 'Healthy range' : 'Needs attention'}
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    DTI / FOIR Ratio
                  </span>
                  <div className="text-2xl font-black font-mono text-slate-900">
                    {formatPercentage(calculatedDTI)}
                  </div>
                  <span className="text-[11px] font-medium text-emerald-700 block">
                    {calculatedDTI <= 35 ? 'Comfortable band' : 'Elevated'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-950 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  Our AI Advisor will generate a tailored 5-step action plan to help you optimize revolving card payments and maintain ideal loan eligibility.
                </span>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <Button
                variant="outline"
                size="md"
                onClick={handlePrev}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Previous Step
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <Button
                variant="primary"
                size="md"
                onClick={handleNext}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="emerald"
                size="md"
                onClick={handleFinish}
                isLoading={isSaving}
                rightIcon={<Check className="w-4 h-4 stroke-[3]" />}
              >
                Go to My Dashboard
              </Button>
            )}
          </div>
        </div>
      </main>

      {/* Safety Notice Footer */}
      <footer className="border-t border-slate-200/80 py-4 px-6 text-center text-xs text-slate-400 bg-white">
        Data entered is kept secure and used exclusively for your self-directed financial health tracking.
      </footer>
    </div>
  );
};
