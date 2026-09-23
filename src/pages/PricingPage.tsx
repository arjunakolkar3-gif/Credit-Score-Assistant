import React from 'react';
import {
  Check,
  X,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  PhoneOff,
  Lock,
  HeartHandshake,
  HelpCircle,
} from 'lucide-react';
import { PublicHeader } from '../components/layout/PublicHeader';
import { PublicFooter } from '../components/layout/PublicFooter';
import { Button } from '../components/common/Button';

interface PricingPageProps {
  onNavigate: (path: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const comparisonItems = [
    {
      feature: 'Comprehensive Credit Health Tracking',
      creditAssistant: '100% Free Forever',
      bureaus: '₹550 per one-time report (or ₹1,200/yr)',
      aggregators: 'Free (with conditions)',
    },
    {
      feature: 'Zero Spam / Telemarketing Guarantee',
      creditAssistant: 'Guaranteed: 0 calls, 0 DSA spam',
      bureaus: 'Occasional promotional emails',
      aggregators: 'Dozens of spam calls & WhatsApp messages',
    },
    {
      feature: 'What-If Bureau Simulator',
      creditAssistant: 'Included Unlimited',
      bureaus: 'Locked behind paid tier',
      aggregators: 'Not available or superficial',
    },
    {
      feature: 'AI-Powered Action Roadmap',
      creditAssistant: 'Powered by Gemini AI',
      bureaus: 'Generic static PDF text',
      aggregators: 'Replaced by loan advertisements',
    },
    {
      feature: 'FOIR / DTI Underwriting Calculator',
      creditAssistant: 'Included (SBI/HDFC/ICICI models)',
      bureaus: 'Not provided',
      aggregators: 'Biased towards selling personal loans',
    },
    {
      feature: 'CICRA Statutory Dispute Drafter',
      creditAssistant: 'Included Free',
      bureaus: 'Manual bureau portal only',
      aggregators: 'None',
    },
    {
      feature: 'Data Privacy & Deletion on Demand',
      creditAssistant: 'Instant Self-Service Purge',
      bureaus: 'Statutory archive only',
      aggregators: 'Distributed to banking partner networks',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      <PublicHeader currentPath="/pricing" onNavigate={onNavigate} />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <HeartHandshake className="w-3.5 h-3.5" />
            Our Borrower-First Transparency Pledge
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            100% Free for Borrowers. Zero Spam Calls.
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            We believe every Indian borrower deserves uncompromised access to credit health intelligence without having their phone number sold to loan telemarketers.
          </p>
        </div>

        {/* Core Pricing Card */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Borrower Plan</span>
                <h3 className="text-2xl font-bold text-white mt-1">Full Credit Health Suite</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-black font-mono text-white">₹0</span>
                <span className="text-xs text-slate-400 font-medium">/ lifetime</span>
              </div>
            </div>

            <div className="py-6 space-y-3.5">
              {[
                'Full credit health dashboard & 5 scoring pillars',
                'Unlimited What-If Bureau Simulation runs',
                'FOIR & Debt-to-Income bank approval underwriter',
                'AI Credit Advisor action steps & progress tracker',
                'Credit card utilization optimizer across all cards',
                'CICRA 2005 statutory dispute letter generator',
                'Strict Zero-Telemarketing & Zero-Spam guarantee',
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => onNavigate('/onboarding')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Get Started Free — No Credit Card Needed
              </Button>
            </div>
          </div>
        </div>

        {/* Why Are Other Free Portals Dangerous? */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <PhoneOff className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Why are loan portals "free"?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Traditional aggregator websites offer free reports by selling your contact info to dozens of DSA agents and loan recovery telemarketers, triggering relentless cold calls.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">How Credit Assistant is different</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never sell user phone numbers or personal data. We are an unbiased diagnostic analytics tool built solely to empower the borrower.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">How we sustain operations</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We offer anonymized macro research and B2B portfolio health intelligence tools to institutional risk analysts, keeping retail borrower access 100% free.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-16">
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Platform Comparison
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Feature / Standard</th>
                  <th className="py-3 px-4 bg-emerald-50/50 text-emerald-900 font-bold">Credit Assistant</th>
                  <th className="py-3 px-4">Official Bureaus (CIBIL/Experian)</th>
                  <th className="py-3 px-4">Aggregator Loan Apps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{item.feature}</td>
                    <td className="py-3.5 px-4 bg-emerald-50/30 font-bold text-emerald-700">
                      {item.creditAssistant}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{item.bureaus}</td>
                    <td className="py-3.5 px-4 text-slate-500">{item.aggregators}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ section */}
        <div className="max-w-3xl mx-auto space-y-6">
          <h3 className="text-xl font-bold text-slate-900 text-center">Frequently Asked Questions</h3>

          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-1">Are there really no hidden costs?</h4>
              <p className="text-xs text-slate-600">
                Yes, absolutely. We do not ask for credit card numbers, debit cards, or UPI mandate approvals. All personal features, simulators, and AI roadmaps are completely free.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-1">Will checking my score on Credit Assistant lower it?</h4>
              <p className="text-xs text-slate-600">
                No! Checking your credit health on Credit Assistant triggers soft consumer queries and self-assessment models. It does not count as a hard inquiry by a lender and will never reduce your score.
              </p>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter onNavigate={onNavigate} />
    </div>
  );
};
