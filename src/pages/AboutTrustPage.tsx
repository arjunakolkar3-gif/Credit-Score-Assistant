import React from 'react';
import {
  ShieldCheck,
  Lock,
  Scale,
  Building2,
  FileCheck2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../components/common/Button';

interface AboutTrustPageProps {
  onNavigate: (path: string) => void;
}

export const AboutTrustPage: React.FC<AboutTrustPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 px-6 lg:px-12 max-w-7xl mx-auto w-full space-y-16">
      {/* Title & Introduction */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
          Mission & Institutional Trust
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
          Bringing Absolute Clarity to Indian Credit Health
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          The Indian retail credit system is notoriously opaque. Commercial loan apps harvest borrower contacts and spam them with high-interest personal loans. We built Credit Assistant to do the exact opposite: provide private, unbiased, actionable credit intelligence.
        </p>
      </div>

      {/* The Indian Reality Box */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            The Mathematical Reality
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            Why a 750+ CIBIL Score Saves Lakhs in India
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Indian banks now dynamically link home loan and auto loan interest rates to your credit score bracket. The difference is substantial:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              750 – 900 CIBIL Score
            </span>
            <div className="text-2xl font-black font-mono text-emerald-950">
              8.40% <span className="text-xs font-normal text-emerald-700">p.a.</span>
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Tier-1 concession rate. On a ₹50L 20-yr home loan, total interest payable is approximately ₹53.4 Lakhs.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              650 – 749 CIBIL Score
            </span>
            <div className="text-2xl font-black font-mono text-amber-950">
              9.25% <span className="text-xs font-normal text-amber-700">p.a.</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Standard non-prime tier. On the same loan, total interest payable rises to approximately ₹60.3 Lakhs (+₹6.9L).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-2">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
              Under 650 or Settled
            </span>
            <div className="text-2xl font-black font-mono text-rose-950">
              Rejected / NBFC 11.5%+
            </div>
            <p className="text-xs text-rose-900 leading-relaxed">
              Public sector banks typically reject uncollateralized applications; NBFC rates exceed 11.5% (+₹18.2L in interest).
            </p>
          </div>
        </div>
      </div>

      {/* Statutory & Legal Framework */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 space-y-4 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <Scale className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Adherence to the CICRA 2005 Framework
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The Credit Information Companies (Regulation) Act, 2005 governs the collection, processing, and dissemination of credit data in India. We design all diagnostic workflows in strict alignment with consumer rights outlined by the Reserve Bank of India (RBI):
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Right to dispute clerical errors and have them investigated within 30 days.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Clear separation between "Settled" accounts and legitimate "Closed" loans.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Mandatory delivery of No Objection Certificates (NOC) upon debt repayment.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 space-y-4 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <Lock className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Privacy & Architecture Standards
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Most credit-tracking platforms operate as disguised loan brokers. When you register, they sell your contact information to credit card telemarketers. Our architecture guarantees:
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Zero third-party telemetry or ad-tracking scripts.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>No continuous background bureau inquiries that damage your CIBIL score.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Full data export and permanent profile deletion on demand.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Statutory Disclaimer Box */}
      <div className="p-6 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 space-y-2">
        <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
          Official Disclaimer & Bureau Notice
        </h4>
        <p className="leading-relaxed">
          Credit Assistant is an independent educational fintech software application. We are not a credit bureau and do not issue official credit ratings. The four licensed credit information companies in India are TransUnion CIBIL, Experian, CRIF High Mark, and Equifax. To obtain your statutory free annual credit report under RBI guidelines, you may visit the respective bureau websites.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Button
          variant="primary"
          size="lg"
          onClick={() => onNavigate('/tools')}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Check Your Financial Health Free
        </Button>
      </div>
    </div>
  );
};
