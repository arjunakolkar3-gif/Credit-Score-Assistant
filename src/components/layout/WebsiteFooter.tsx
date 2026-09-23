import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { ArrowRight, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface WebsiteFooterProps {
  onNavigate: (path: string) => void;
}

export const WebsiteFooter: React.FC<WebsiteFooterProps> = ({ onNavigate }) => {
  const { showSuccess, showError } = useToast();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showError('Invalid email', 'Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    showSuccess('Subscribed!', 'You will receive our monthly Indian Credit Guide.');
    setEmail('');
  };

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-12 px-6 lg:px-12 text-sm text-slate-600">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('/')}
              className="cursor-pointer inline-block"
            >
              <Logo size="md" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Credit Assistant empowers Indian borrowers with transparent credit intelligence, debt-to-income diagnostics, and AI-driven repayment roadmaps. Zero hard pulls. Zero spam.
            </p>

            {/* Newsletter input */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-800 block mb-2">
                Monthly Indian Credit Digest
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-2 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Thank you! You are subscribed to our credit updates.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Features & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Product & Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/features')}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  Platform Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/tools')}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  Free Credit & FOIR Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/dashboard')}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  Overview Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/simulator')}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  What-If Credit Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/ai-advisor')}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  AI Bureau Advisor
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Knowledge Base */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Knowledge Base
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/guides')}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  CIBIL vs Experian Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/guides')}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  Settled vs Closed Loan Danger
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/guides')}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  FOIR Bank Underwriting Rules
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/guides')}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  CICRA 2005 Dispute Rights
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/guides')}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  30% Utilization Optimization
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Trust & Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  About Credit Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/pricing')}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  Free Forever & Pro Plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  Security & Data Privacy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/faq')}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/faq')}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  Help & Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Statutory Disclaimer Bar */}
        <div className="pt-8 border-t border-slate-100 space-y-4 text-xs text-slate-500">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-slate-800 block">
                Statutory Financial Transparency & Bureau Disclaimer
              </span>
              <p className="leading-relaxed text-[11px] text-slate-500">
                Credit Assistant provides self-diagnostic educational tools and AI-driven advisory based on inputs provided by the user. Credit Assistant is not a Credit Information Company (CIC) under the Credit Information Companies (Regulation) Act, 2005. It does not replace official statutory credit reports issued by TransUnion CIBIL, Experian India, CRIF High Mark, or Equifax. We do not conduct hard bureau inquiries, and using our simulator has 0 impact on your reported bureau score.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-[11px] text-slate-400">
            <p>© 2026 Credit Assistant. All rights reserved. Crafted for the Indian Financial Ecosystem.</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('/about')}
                className="hover:text-slate-600 transition-colors"
              >
                Privacy Policy
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => onNavigate('/about')}
                className="hover:text-slate-600 transition-colors"
              >
                Terms of Service
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => onNavigate('/faq')}
                className="hover:text-slate-600 transition-colors"
              >
                Grievance Redressal
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
