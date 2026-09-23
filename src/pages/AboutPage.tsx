import React from 'react';
import {
  Users,
  Target,
  Sparkles,
  Award,
  ShieldCheck,
  Building,
  Mail,
  MapPin,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';
import { PublicHeader } from '../components/layout/PublicHeader';
import { PublicFooter } from '../components/layout/PublicFooter';
import { Button } from '../components/common/Button';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      <PublicHeader currentPath="/about" onNavigate={onNavigate} />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <Target className="w-3.5 h-3.5" />
            Our Mission & Leadership
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Democratizing Credit Health for India's 100 Million Borrowers
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            We are building the credit platform we always wished existed in India: mathematically precise, genuinely helpful, and completely free of spam.
          </p>
        </div>

        {/* Narrative / Mission Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm mb-16 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Why We Built Credit Assistant</h2>
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed max-w-4xl">
            <p>
              In India, taking a credit card or applying for a home loan has traditionally been an opaque, stressful ordeal. Borrowers find themselves navigating dense 20-page CIBIL reports, mysterious acronyms like FOIR and DPD, and unsolicited phone calls from aggressive loan recovery agents.
            </p>
            <p>
              Most free credit check websites monetize by turning their users into marketing leads for NBFCs and direct selling agents (DSAs). Once you check your score on typical aggregators, your phone rings 15 times before sunset.
            </p>
            <p className="font-semibold text-slate-900">
              Credit Assistant was built to break this predatory cycle.
            </p>
            <p>
              We treat credit health as a vital financial fitness metric — just like blood pressure or resting heart rate. By providing clear diagnostic metrics, real-time what-if forecasting, and AI-driven step-by-step guidance, we empower borrowers to enter bank negotiations with confidence and pride.
            </p>
          </div>
        </div>

        {/* Our 3 Core Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Zero Telemarketing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never sell or rent your contact details. You will never receive a promotional loan call as a result of using Credit Assistant.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Actionable, Not Cosmetic</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instead of just showing an arbitrary number, we show you the mathematical exactitude of your debt ratios and how to improve them.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Borrower Sovereignty</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You own your data. You can download all your simulation records or purge your entire profile with a single click at any time.
            </p>
          </div>
        </div>

        {/* Statutory Grievance Redressal Card (RBI Mandate) */}
        <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Statutory Grievance Redressal Mechanism</h3>
              <p className="text-xs text-slate-400">As mandated under RBI Digital Lending Guidelines & CICRA 2005</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            In compliance with Reserve Bank of India regulatory directives, Credit Assistant maintains a dedicated, independent Grievance Redressal Officer to handle consumer data queries, dispute notices, and privacy complaints within 30 statutory business days.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-[11px] text-slate-400 block mb-1">Grievance Officer</span>
              <span className="text-sm font-bold text-white">Arjun Akolkar</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">Head of Regulatory Compliance</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-[11px] text-slate-400 block mb-1">Official Grievance Email</span>
              <span className="text-xs font-mono font-bold text-white block">grievance@creditassistant.in</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">SLA: Acknowledged in 24 hours</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-[11px] text-slate-400 block mb-1">Registered Office</span>
              <span className="text-xs text-white leading-snug block">
                Level 4, Platina Tower, Bandra Kurla Complex (BKC), Mumbai, MH 400051
              </span>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter onNavigate={onNavigate} />
    </div>
  );
};
