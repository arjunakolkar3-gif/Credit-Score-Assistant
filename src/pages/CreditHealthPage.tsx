import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Building2,
  Calendar,
  AlertCircle,
  Clock,
  Sparkles,
  Info,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useFinancialData } from '../context/FinancialDataContext';
import { formatCurrency, formatPercentage, getScoreTier, getUtilizationRating, getDTIRating } from '../utils/calculations';
import { HealthStatusBadge } from '../components/common/HealthStatusBadge';
import { ProgressBar } from '../components/common/ProgressBar';
import { CREDIT_KNOWLEDGE_BASE } from '../data/educationalTips';
import { Button } from '../components/common/Button';

interface CreditHealthPageProps {
  onNavigate: (path: string) => void;
}

export const CreditHealthPage: React.FC<CreditHealthPageProps> = ({ onNavigate }) => {
  const { profile, dti, utilization, bottlenecks } = useFinancialData();
  const [selectedFactor, setSelectedFactor] = useState<string>('utilization');

  const scoreTier = getScoreTier(profile.creditScore);

  const factors = [
    {
      id: 'payment_history',
      name: 'Payment Punctuality',
      weight: '35%',
      status: profile.paymentHistoryStatus,
      value: `${profile.onTimePaymentPercentage}% on-time`,
      description: 'Zero missed payments recorded over the past 24 months across all reporting credit institutions.',
      tip: 'Maintain automated NACH mandates on your primary salary account to safeguard punctuality.',
    },
    {
      id: 'utilization',
      name: 'Credit Utilization',
      weight: '30%',
      status: utilization <= 30 ? 'Healthy' : 'Needs Attention',
      value: `${formatPercentage(utilization)} (${formatCurrency(profile.totalCreditUsed)} / ${formatCurrency(profile.totalCreditLimit)})`,
      description: 'The aggregate percentage of revolving credit limit currently active on your billing cycles.',
      tip: 'Pay down balances 2-3 days before statement generation dates to report lower utilization to CIBIL/Experian.',
    },
    {
      id: 'credit_age',
      name: 'Credit History Vintage',
      weight: '15%',
      status: profile.oldestCreditAccountYears >= 3 ? 'Good' : 'Moderate',
      value: `${profile.oldestCreditAccountYears} Years`,
      description: 'Average age of open accounts and vintage of the oldest credit facility on bureau file.',
      tip: 'Avoid closing lifetime-free old credit cards, as closing them shortens your average account age.',
    },
    {
      id: 'credit_mix',
      name: 'Credit Portfolio Mix',
      weight: '10%',
      status: 'Healthy',
      value: `${profile.creditCards.length} Cards + ${profile.activeLoans.length} Loans`,
      description: 'Healthy distribution between unsecured revolving credit (cards) and installment debt (loans).',
      tip: 'A diversified credit track demonstrates broad repayment capability across varied borrowing structures.',
    },
    {
      id: 'inquiries',
      name: 'Hard Inquiries',
      weight: '10%',
      status: profile.recentInquiriesLast6Months <= 2 ? 'Low Impact' : 'Elevated',
      value: `${profile.recentInquiriesLast6Months} Inquiries`,
      description: 'Hard inquiries initiated by lenders when evaluating fresh credit card or loan applications.',
      tip: 'Space out fresh credit card or personal loan applications by at least 90-120 days.',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner: Comprehensive Score Breakdown */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-slate-900">Credit Health Breakdown</h2>
            <HealthStatusBadge status={scoreTier.tier} variant="emerald" size="sm" />
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Detailed inspection of your 5 core credit pillars based on Indian bureau algorithms (CIBIL, Experian, CRIF, Equifax).
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Reported Score
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black font-mono text-slate-900">
                {profile.creditScore}
              </span>
              <span className="text-xs text-slate-400">/ 900</span>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-xs text-slate-600">
            <span className="block font-semibold text-slate-800">{profile.scoreSource}</span>
            <span className="text-slate-400">{profile.scoreDate}</span>
          </div>
        </div>
      </div>

      {/* 5 Core Credit Pillars */}
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-3">
          5 Core Indian Credit Scoring Pillars
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {factors.map((factor) => (
            <div
              key={factor.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      Weight: {factor.weight}
                    </span>
                  </div>
                  <HealthStatusBadge status={factor.status} size="sm" />
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {factor.name}
                </h4>

                <div className="text-base font-mono font-bold text-slate-900 mt-2 mb-1">
                  {factor.value}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {factor.description}
                </p>
              </div>

              <div className="pt-2.5 border-t border-slate-100 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl">
                <strong className="text-slate-700 block mb-0.5">Fintech Insight:</strong>
                {factor.tip}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Credit Cards Portfolio */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Active Credit Cards</h3>
            <p className="text-xs text-slate-500">
              Aggregate limit: {formatCurrency(profile.totalCreditLimit)} · Outstanding balance: {formatCurrency(profile.totalCreditUsed)}
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
            {profile.creditCards.length} Cards
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.creditCards.map((card) => {
            const cardUtil = Math.round((card.balance / card.limit) * 100);
            return (
              <div
                key={card.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      {card.bankName}
                    </h4>
                    <span className="text-xs text-slate-500">{card.cardName}</span>
                  </div>
                  <HealthStatusBadge
                    status={`${cardUtil}% Utilized`}
                    variant={cardUtil <= 30 ? 'emerald' : 'amber'}
                    size="sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Current Balance</span>
                    <span className="font-mono font-bold text-slate-900">
                      {formatCurrency(card.balance)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Credit Limit</span>
                    <span className="font-mono font-bold text-slate-900">
                      {formatCurrency(card.limit)}
                    </span>
                  </div>
                </div>

                <ProgressBar
                  value={cardUtil}
                  max={100}
                  color={cardUtil <= 30 ? 'emerald' : 'amber'}
                  size="sm"
                />

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Statement: {card.statementDate}</span>
                  <span>Due: {card.dueDate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Loans Portfolio */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Active Installment Loans</h3>
            <p className="text-xs text-slate-500">
              Total monthly EMI commitments: {formatCurrency(profile.monthlyDebtPayments)}
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
            {profile.activeLoans.length} Loans
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.activeLoans.map((loan) => (
            <div
              key={loan.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {loan.lenderName}
                  </h4>
                  <span className="text-xs text-slate-500">{loan.loanType}</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded">
                  {formatCurrency(loan.monthlyEMI)}/mo
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Original Principal</span>
                  <span className="font-mono font-semibold text-slate-800">
                    {formatCurrency(loan.originalAmount)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Remaining Dues</span>
                  <span className="font-mono font-bold text-slate-900">
                    {formatCurrency(loan.remainingAmount)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Tenure Left</span>
                  <span className="font-mono font-semibold text-slate-800">
                    {loan.remainingMonths} / {loan.tenureMonths} mos
                  </span>
                </div>
              </div>

              <ProgressBar
                value={loan.originalAmount - loan.remainingAmount}
                max={loan.originalAmount}
                color="emerald"
                size="sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Educational Knowledge Base accordion / items */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Indian Credit Knowledge Base
          </h3>
          <p className="text-xs text-slate-500">
            Authoritative insights into CIBIL, Experian, FOIR guidelines, and consumer credit dispute rights under CICRA 2005.
          </p>
        </div>

        <div className="space-y-3">
          {CREDIT_KNOWLEDGE_BASE.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/40 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <span className="text-[11px] text-slate-400">Statutory Guidance</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{item.content}</p>
              <div className="p-2 bg-emerald-50/60 border border-emerald-100 rounded-lg text-xs text-emerald-950 font-medium">
                {item.keyRule}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
