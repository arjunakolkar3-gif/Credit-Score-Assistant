import React from 'react';
import {
  ShieldCheck,
  Lock,
  Server,
  EyeOff,
  Trash2,
  FileCheck2,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
  Database,
  Key,
} from 'lucide-react';
import { PublicHeader } from '../components/layout/PublicHeader';
import { PublicFooter } from '../components/layout/PublicFooter';
import { Button } from '../components/common/Button';

interface SecurityPageProps {
  onNavigate: (path: string) => void;
}

export const SecurityPage: React.FC<SecurityPageProps> = ({ onNavigate }) => {
  const securityPillars = [
    {
      icon: <Lock className="w-6 h-6 text-emerald-600" />,
      title: '256-Bit AES & TLS Encryption',
      description:
        'All data transmitted to and from Credit Assistant is encrypted in transit using TLS 1.3 cryptographic protocols and stored at rest with military-grade AES-256 encryption.',
    },
    {
      icon: <EyeOff className="w-6 h-6 text-emerald-600" />,
      title: 'Zero Bank Credentials or MPINs',
      description:
        'We never ask for your netbanking passwords, debit card PINs, or UPI MPINs. Our platform relies exclusively on read-only self-reported accounts and soft bureau inquiry queries.',
    },
    {
      icon: <Server className="w-6 h-6 text-emerald-600" />,
      title: 'Indian Data Localization (RBI Standards)',
      description:
        'In strict compliance with Reserve Bank of India (RBI) data localization mandates, all application data and server infrastructure reside physically in Indian cloud zones (Mumbai & Hyderabad).',
    },
    {
      icon: <Trash2 className="w-6 h-6 text-emerald-600" />,
      title: 'Right to Erasure & Immediate Deletion',
      description:
        'You have complete sovereignty over your data. With one click in your account settings, all your financial profile entries and historical logs are permanently purged from our servers.',
    },
    {
      icon: <FileCheck2 className="w-6 h-6 text-emerald-600" />,
      title: 'Soft Inquiry Architecture (0 Score Impact)',
      description:
        'Checking your credit health on Credit Assistant will never affect your credit score. We utilize consumer-initiated soft inquiries that do not generate hard footprints on CIBIL or Experian.',
    },
    {
      icon: <Key className="w-6 h-6 text-emerald-600" />,
      title: 'Masked PAN & Identity Safeguards',
      description:
        'Sensitive identity parameters such as PAN and account identifiers are strictly masked (e.g. ABCDE****F) in the UI and stored with hashed salts.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      <PublicHeader currentPath="/security" onNavigate={onNavigate} />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            Bank-Grade Security Architecture
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Your Financial Privacy is Our Primary Directive
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Built from the ground up for Indian banking compliance, data sovereignty, and zero-compromise consumer privacy.
          </p>
        </div>

        {/* 6 Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {securityPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 hover:border-emerald-300 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                {pillar.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900">{pillar.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* RBI Compliance & Disclosures Card */}
        <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl mb-16 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">RBI & CICRA Compliance Commitment</h3>
              <p className="text-xs text-slate-400">Statutory alignment with Indian financial laws</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed">
            <div className="space-y-2">
              <strong className="text-emerald-400 block text-sm">Credit Information Companies Act, 2005 (CICRA)</strong>
              <p>
                We adhere to strict data confidentiality rules as prescribed under Chapter V of CICRA 2005. User credit records are treated with the highest tier of confidentiality and are never shared, traded, or brokered with third-party lead aggregators.
              </p>
            </div>
            <div className="space-y-2">
              <strong className="text-emerald-400 block text-sm">RBI Digital Lending Guidelines (2022)</strong>
              <p>
                In alignment with Reserve Bank of India directives on digital financial services, Credit Assistant does not access biometric records, device contact lists, phone storage, or private media files.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              Questions regarding security or audit reports? Contact our Data Protection Office.
            </span>
            <button
              onClick={() => onNavigate('/contact')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              Contact Security Team
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Experience Safe Credit Intelligence</h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Check your score, test debt paydown simulations, and build your credit profile with total peace of mind.
          </p>
          <div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/onboarding')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Launch Safe Free Check
            </Button>
          </div>
        </div>
      </main>

      <PublicFooter onNavigate={onNavigate} />
    </div>
  );
};
