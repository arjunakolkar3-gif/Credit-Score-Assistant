import React, { useState } from 'react';
import {
  TrendingUp,
  Sparkles,
  SlidersHorizontal,
  ShieldCheck,
  FileCheck2,
  ArrowRight,
  CheckCircle2,
  Layers,
  Clock,
  Scale,
  PieChart,
  HelpCircle,
} from 'lucide-react';
import { Button } from '../components/common/Button';

interface FeaturesPageProps {
  onNavigate: (path: string) => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'foir' | 'ai' | 'simulator' | 'factors' | 'dispute'>('foir');

  return (
    <div className="py-12 px-6 lg:px-12 max-w-7xl mx-auto w-full space-y-16">
      {/* Title & Introduction */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
          Platform Architecture & Capabilities
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
          Every Tool You Need to Master Your Credit Health
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Credit Assistant integrates Indian banking underwriting parameters, 5-pillar bureau metrics, and generative AI reasoning into a coherent, private workspace.
        </p>
      </div>

      {/* Feature Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('foir')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'foir'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          01. FOIR & Debt Diagnostics
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'ai'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          02. AI Action Roadmap
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'simulator'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          03. What-If Simulator
        </button>
        <button
          onClick={() => setActiveTab('factors')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'factors'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          04. 5-Pillar Score Auditing
        </button>
        <button
          onClick={() => setActiveTab('dispute')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'dispute'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          05. CICRA 2005 Dispute Guide
        </button>
      </div>

      {/* Tab 1: FOIR & Debt Diagnostics */}
      {activeTab === 'foir' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200/90 rounded-3xl p-8 lg:p-12 shadow-xs">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold font-mono text-emerald-700 uppercase tracking-wider">
              Feature 01 · Underwriting Compliance
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Real-Time Fixed Obligation to Income Ratio (FOIR)
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              When applying for home loans or major retail credit in India, your CIBIL score is only half the underwriting equation. Banks strictly measure your FOIR—the percentage of monthly net salary tied up in existing EMIs.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Calibrated to SBI, HDFC, and ICICI retail lending risk caps (&le; 45% FOIR).</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Consolidates personal loans, vehicle loans, and credit card dues into one live ratio.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Shows exact loan prepayment threshold needed to qualify for lower interest rates.</span>
              </li>
            </ul>
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate('/tools')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Try Free FOIR Calculator
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <span className="text-xs font-bold text-slate-800">FOIR Underwriting Zones</span>
              <span className="text-xs text-slate-500">Net Salary: ₹60,000 / mo</span>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-800 block">0% – 35% FOIR</span>
                  <span className="text-[11px] text-slate-500">Prime Status · Lowest Interest Brackets</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Eligible
                </span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-800 block">36% – 50% FOIR</span>
                  <span className="text-[11px] text-slate-500">Standard Retail Lending · Moderate Buffer</span>
                </div>
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  Conditional
                </span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-rose-800 block">&gt; 50% FOIR</span>
                  <span className="text-[11px] text-slate-500">High Risk · High Rejection Probability</span>
                </div>
                <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                  Restricted
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: AI Action Roadmap */}
      {activeTab === 'ai' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200/90 rounded-3xl p-8 lg:p-12 shadow-xs">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold font-mono text-indigo-700 uppercase tracking-wider">
              Feature 02 · Generative Intelligence
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Gemini AI-Powered Strategic Roadmap
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Generic advice tells you to "pay on time." Our generative credit engine analyzes your specific debt composition and generates a prioritized, 5-step tactical plan explaining the exact mathematical impact of each action.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Identifies highest impact card dues to pay off first before billing statement dates.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Provides structured timelines (30 days vs 90 days) for score recovery.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Interactive question-and-answer assistant grounded in Indian banking regulations.</span>
              </li>
            </ul>
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate('/ai-advisor')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Consult AI Advisor
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 border-b border-slate-200 pb-3">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Sample Diagnostic Output</span>
            </div>
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1.5">
              <span className="text-[11px] font-bold text-slate-800 block">
                Step 1: Reduce HDFC Card Utilization from 42% to &lt;20%
              </span>
              <p className="text-xs text-slate-600">
                <strong>Why:</strong> Credit bureaus record high balance utilization on individual cards even if total limit is adequate.
              </p>
              <p className="text-xs text-slate-500">
                <strong>Action:</strong> Pay ₹18,000 on or before the 15th (statement generation date).
              </p>
            </div>
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1.5">
              <span className="text-[11px] font-bold text-slate-800 block">
                Step 2: Collect & Verify NOC for Closed Personal Loan
              </span>
              <p className="text-xs text-slate-600">
                <strong>Why:</strong> 28% of Indian bureau errors stem from lenders failing to report zero-due closure to CIBIL within 30 days.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: What-If Simulator */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200/90 rounded-3xl p-8 lg:p-12 shadow-xs">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold font-mono text-slate-800 uppercase tracking-wider">
              Feature 03 · Scenario Modeling
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Interactive What-If Credit Simulator
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Never guess what paying off a loan or closing an old credit card will do to your score. Our simulator models the mathematical impact before you execute financial decisions.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Simulate paying down credit card balances by ₹10,000 to ₹1,00,000.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Forecast the impact of receiving an official bank credit limit enhancement.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Model loan prepayments and see how your FOIR decreases immediately.</span>
              </li>
            </ul>
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate('/simulator')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Launch Simulator
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <span className="text-xs font-bold text-slate-800">What-If Delta Comparison</span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Potentially Better
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="text-[11px] text-slate-400 font-bold uppercase">Before Payoff</span>
                <div className="text-xl font-mono font-black text-slate-900">742 <span className="text-xs text-slate-400">/ 900</span></div>
                <div className="text-xs text-slate-500">Utilization: 38%</div>
                <div className="text-xs text-slate-500">FOIR: 32%</div>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                <span className="text-[11px] text-emerald-800 font-bold uppercase">After ₹30k Payoff</span>
                <div className="text-xl font-mono font-black text-emerald-900">768 <span className="text-xs text-emerald-700">+26 pts</span></div>
                <div className="text-xs text-emerald-800">Utilization: 19%</div>
                <div className="text-xs text-emerald-800">FOIR: 28%</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              *Educational forecast modeling based on CIBIL and Experian scoring formulas.
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: 5-Pillar Score Auditing */}
      {activeTab === 'factors' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200/90 rounded-3xl p-8 lg:p-12 shadow-xs">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold font-mono text-emerald-700 uppercase tracking-wider">
              Feature 04 · Complete Transparency
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              The 5 Core Indian Credit Scoring Pillars
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Don't treat your credit score like a black box. In India, CIBIL and Experian evaluate your profile across five distinct weightages:
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800">1. Payment History</span>
                <span className="font-mono font-bold text-slate-900">35% Weightage</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800">2. Credit Utilization Ratio</span>
                <span className="font-mono font-bold text-slate-900">30% Weightage</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800">3. Credit History Length / Age</span>
                <span className="font-mono font-bold text-slate-900">15% Weightage</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800">4. Credit Mix (Secured vs Unsecured)</span>
                <span className="font-mono font-bold text-slate-900">10% Weightage</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800">5. Recent Credit Inquiries</span>
                <span className="font-mono font-bold text-slate-900">10% Weightage</span>
              </div>
            </div>
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate('/credit-health')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Inspect My 5 Factors
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 space-y-4">
            <span className="text-xs font-bold text-slate-800 block border-b border-slate-200 pb-2">
              Why Credit Mix Matters
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Having only credit cards and personal loans (100% unsecured debt) signals risk to conservative Indian lenders. Having a balanced portfolio—such as a vehicle loan or home loan alongside a card—proves your ability to service long-term collateralized debt.
            </p>
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-[11px] font-bold text-slate-900 block">Pro Tip for Young Borrowers</span>
              <p className="text-xs text-slate-500">
                Never close your oldest active credit card even if rarely used; keeping it alive preserves your average account vintage (15% weightage).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: CICRA 2005 Dispute Guide */}
      {activeTab === 'dispute' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200/90 rounded-3xl p-8 lg:p-12 shadow-xs">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold font-mono text-emerald-700 uppercase tracking-wider">
              Feature 05 · Legal Consumer Rights
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Statutory CICRA Dispute Guidance
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Under the Credit Information Companies (Regulation) Act, 2005 (CICRA), every Indian citizen has the statutory right to have clerical errors, identity mix-ups, and wrongful default statuses corrected within 30 days.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Step-by-step instructions to file online disputes with CIBIL, Experian, and CRIF.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dispute tracking templates with mandated 30-day resolution countdowns.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>NOC checklist to remove spurious "Written Off" or "Settled" marks.</span>
              </li>
            </ul>
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate('/guides')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Read Bureau Dispute Guide
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 border-b border-slate-200 pb-3">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <span>Mandatory Statutory Timelines</span>
            </div>
            <div className="space-y-2.5">
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="text-xs font-bold text-slate-800">Day 01–07: Bureau Verification</span>
                <p className="text-[11px] text-slate-500">Bureau accepts online dispute and routes records to the lending institution.</p>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="text-xs font-bold text-slate-800">Day 08–25: Bank Investigation</span>
                <p className="text-[11px] text-slate-500">Bank audits closure letters, ledger balance, and NOC documentation.</p>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="text-xs font-bold text-slate-800">Day 26–30: Mandatory Resolution</span>
                <p className="text-[11px] text-slate-500">Bureau updates record and issues an updated credit information report.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0F172A] text-white text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Ready to See Your Own Numbers in Action?
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Test our tools without signing up, or explore the live dashboard with pre-loaded mock Indian borrower data.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <Button
            variant="emerald"
            size="lg"
            onClick={() => onNavigate('/tools')}
          >
            Launch Free Calculator
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent text-white border-slate-700 hover:bg-slate-800"
            onClick={() => onNavigate('/dashboard')}
          >
            Open Live Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};
