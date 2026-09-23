import React, { useState } from 'react';
import {
  CreditCard,
  TrendingUp,
  Sparkles,
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Plus,
} from 'lucide-react';
import { useFinancialData } from '../context/FinancialDataContext';
import { useAuth } from '../context/AuthContext';
import { CreditScoreCard } from '../components/dashboard/CreditScoreCard';
import { UtilizationChart } from '../components/dashboard/UtilizationChart';
import { DTICard } from '../components/dashboard/DTICard';
import { MetricCard } from '../components/dashboard/MetricCard';
import { CreditScoreChart } from '../components/dashboard/CreditScoreChart';
import { BottleneckCard } from '../components/dashboard/BottleneckCard';
import { AIAdvisorCard } from '../components/advisor/AIAdvisorCard';
import { aiService } from '../services/aiService';
import { AIAnalysisResult } from '../types/credit';
import { DEMO_AI_ANALYSIS } from '../data/demoData';
import { Button } from '../components/common/Button';

interface DashboardPageProps {
  onNavigate: (path: string) => void;
  onOpenQuickUpdate?: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { profile, history, bottlenecks, dti, utilization } = useFinancialData();

  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(DEMO_AI_ANALYSIS);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleRunAIAnalysis = async () => {
    setIsAiLoading(true);
    try {
      const result = await aiService.analyzeProfile(profile);
      setAiAnalysis(result);
    } catch {
      setAiAnalysis(DEMO_AI_ANALYSIS);
    } finally {
      setIsAiLoading(false);
    }
  };

  const firstName = user?.name ? user.name.split(' ')[0] : 'Rahul';

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Hello, {firstName}!
            </h2>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded">
              Profile Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Here is your credit health diagnostic report for {profile.scoreDate || 'June 2026'}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('/simulator')}
            leftIcon={<SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />}
          >
            Run What-If Test
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate('/ai-advisor')}
            leftIcon={<Sparkles className="w-3.5 h-3.5 text-indigo-400" />}
          >
            Ask AI Advisor
          </Button>
        </div>
      </div>

      {/* Row 1: 4 Core Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Credit Score */}
        <CreditScoreCard
          score={profile.creditScore}
          scoreSource={profile.scoreSource}
          scoreDate={profile.scoreDate}
          pointsChange={18}
          onViewDetails={() => onNavigate('/credit-health')}
        />

        {/* Metric 2: Utilization Donut */}
        <UtilizationChart
          usedAmount={profile.totalCreditUsed}
          totalLimit={profile.totalCreditLimit}
        />

        {/* Metric 3: Debt-to-Income / FOIR */}
        <DTICard
          monthlyDebt={profile.monthlyDebtPayments}
          monthlyIncome={profile.monthlyIncome}
          maxHealthyThreshold={35}
        />

        {/* Metric 4: Payment History Card */}
        <MetricCard
          title="Payment Punctuality"
          value={`${profile.onTimePaymentPercentage}%`}
          statusText={profile.paymentHistoryStatus}
          statusVariant="emerald"
          subtitle={`${profile.missedPaymentsLast24Months} missed payments (24 mos)`}
          deltaText="100% on time"
          deltaPositive={true}
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          onClick={() => onNavigate('/credit-health')}
        />
      </div>

      {/* Row 2: Credit Score Progress Chart */}
      <div>
        <CreditScoreChart
          data={history}
          startMonth="January"
          totalChange={62}
        />
      </div>

      {/* Row 3: Bottleneck Detection ("What's Holding You Back?") */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              What's Holding You Back?
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Identified friction points and opportunities ranked by bureau impact
            </p>
          </div>
          <button
            onClick={() => onNavigate('/credit-health')}
            className="text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:underline"
          >
            View All Factors →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bottlenecks.map((bottleneck) => (
            <BottleneckCard
              key={bottleneck.id}
              bottleneck={bottleneck}
              onActionClick={() => onNavigate('/ai-advisor')}
            />
          ))}
        </div>
      </div>

      {/* Row 4: AI Advisor Action Roadmap Card */}
      <div>
        <AIAdvisorCard
          analysis={aiAnalysis}
          isLoading={isAiLoading}
          onAnalyze={handleRunAIAnalysis}
          compact={true}
          onViewFullAdvisor={() => onNavigate('/ai-advisor')}
        />
      </div>

      {/* Row 5: What-If Simulator Quick Preview Banner */}
      <div className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
            <h4 className="text-base font-bold text-slate-900">
              Explore Financial Scenarios with What-If Simulator
            </h4>
          </div>
          <p className="text-xs text-slate-500 max-w-xl">
            Simulate paying down credit card balances, increasing your total limit, or foreclosing loans to observe the exact impact on your DTI and utilization before executing with banks.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => onNavigate('/simulator')}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="shrink-0"
        >
          Launch Simulator
        </Button>
      </div>
    </div>
  );
};
