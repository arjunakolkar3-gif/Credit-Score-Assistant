import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Mail,
  ArrowRight,
  Lock,
  FileText,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useToast } from '../../context/ToastContext';

interface PublicFooterProps {
  onNavigate: (path: string) => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to Credit Health Digest! No spam guaranteed.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Mission (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">Credit Assistant</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              India’s dedicated credit-health intelligence platform. We decode bureau reports,
              simulate credit decisions, and provide transparent roadmaps without loan telemarketing or spam calls.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Soft inquiry model — 100% impact-free score check</span>
              </div>
            </div>
          </div>

          {/* Col 2: Free Calculators */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Free Calculators</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('/calculators')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Credit Card Utilization
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/calculators')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  FOIR / DTI Underwriting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/calculators')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Loan Prepayment Savings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/calculators')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Debt Payoff Avalanche
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/simulator')}
                  className="hover:text-emerald-400 transition-colors text-left font-medium text-emerald-400"
                >
                  What-If Bureau Simulator →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Knowledge & Guides */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Knowledge Hub</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('/learn')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  CIBIL vs Experian vs CRIF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/learn')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Indian Credit Score 300-900
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/learn')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  CICRA 2005 Dispute Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/learn')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Credit Myths Debunked
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/security')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Data Security & Privacy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Stay Informed</h4>
            <p className="text-xs text-slate-400">
              Get monthly Indian credit market updates, RBI circular summaries, and score tips.
            </p>
            {subscribed ? (
              <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>You're subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@work.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </form>
            )}

            <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-500">
              <button onClick={() => onNavigate('/about')} className="hover:text-slate-300">About Us</button>
              <span>•</span>
              <button onClick={() => onNavigate('/contact')} className="hover:text-slate-300">Contact</button>
              <span>•</span>
              <button onClick={() => onNavigate('/pricing')} className="hover:text-slate-300">Free Pledge</button>
            </div>
          </div>
        </div>

        {/* Regulatory & Statutory Compliance Disclaimer */}
        <div className="py-8 text-xs text-slate-500 space-y-3 border-b border-slate-800/60 leading-relaxed">
          <p className="font-semibold text-slate-400">
            Statutory Regulatory Notice & Disclosures:
          </p>
          <p>
            Credit Assistant is an educational financial wellness and credit-health intelligence web platform operated by Credit Assistant Technologies India Pvt. Ltd. We are <strong>neither a Credit Information Company (CIC)</strong> licensed under Section 2(e) of the Credit Information Companies (Regulation) Act, 2005 (such as TransUnion CIBIL, Experian India, CRIF High Mark, or Equifax India) <strong>nor a Non-Banking Financial Company (NBFC) or direct lender</strong>.
          </p>
          <p>
            The credit scores, debt-to-income (FOIR) ratios, and simulation forecasts displayed on this platform are based on mathematical models, user-reported accounts, and self-assessment benchmarks. Checking your credit health on Credit Assistant executes soft inquiries that will never negatively impact your credit record.
          </p>
          <p>
            <strong>Grievance Redressal Officer (RBI Digital Lending Mandate):</strong> Arjun Akolkar, Head of Compliance & Data Security • Email: grievance@creditassistant.in • Office: Level 4, Bandra Kurla Complex, Mumbai, Maharashtra 400051.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Credit Assistant Technologies India Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('/security')} className="hover:text-slate-400">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('/security')} className="hover:text-slate-400">
              Terms of Service
            </button>
            <button onClick={() => onNavigate('/security')} className="hover:text-slate-400">
              Security Architecture
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
