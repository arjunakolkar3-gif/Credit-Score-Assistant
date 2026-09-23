import React, { useState } from 'react';
import {
  BookOpen,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  FileText,
  Copy,
  Check,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Search,
  Scale,
  Building,
  Info,
} from 'lucide-react';
import { PublicHeader } from '../components/layout/PublicHeader';
import { PublicFooter } from '../components/layout/PublicFooter';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';

interface LearnPageProps {
  onNavigate: (path: string) => void;
}

export const LearnPage: React.FC<LearnPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [activeCategory, setActiveCategory] = useState<'all' | 'bureaus' | 'score' | 'disputes' | 'myths'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Dispute letter generator state
  const [disputeType, setDisputeType] = useState('closed_still_active');
  const [lenderName, setLenderName] = useState('HDFC Bank');
  const [loanAccountNumber, setLoanAccountNumber] = useState('LN-987654321');
  const [borrowerName, setBorrowerName] = useState('Rahul Sharma');
  const [panNumber, setPanNumber] = useState('ABCDE1234F');
  const [copied, setCopied] = useState(false);

  const getDisputeLetterText = () => {
    let reasonText = '';
    if (disputeType === 'closed_still_active') {
      reasonText = `The loan account referenced below was fully repaid and closed on [Date], and a No Objection Certificate (NOC) was issued by ${lenderName}. However, the credit report erroneously continues to reflect an active status and/or overdue balance.`;
    } else if (disputeType === 'marked_settled') {
      reasonText = `The account referenced below is incorrectly marked as 'Settled' / 'Post Write-Off Settled' instead of 'Closed'. The entire principal and contractual dues were honored as per original repayment terms with ${lenderName}.`;
    } else if (disputeType === 'incorrect_overdue') {
      reasonText = `The reported Days Past Due (DPD) or overdue amount of [₹ Amount] for month [Month, Year] is inaccurate. Bank statement records demonstrate that all EMIs were cleared on or before the due date.`;
    } else {
      reasonText = `This account does not belong to me and appears to be an erroneous cross-reporting or clerical identity mix-up under my PAN ${panNumber}.`;
    }

    return `To,
The Nodal Grievance Redressal Officer,
Credit Information Bureau (India) Limited (TransUnion CIBIL) / Experian India

Subject: Formal Dispute under Section 21 of Credit Information Companies (Regulation) Act, 2005 (CICRA)
Account Reference: ${loanAccountNumber} | Institution: ${lenderName}

Dear Sir/Madam,

I am writing to register a formal dispute regarding my credit information report. My identification details are as follows:

- Full Name: ${borrowerName}
- Permanent Account Number (PAN): ${panNumber}
- Registered Mobile: [Your Mobile Number]
- Report Control Number (ECN / Control No.): [Enter 9-digit ECN from your credit report]

DISPUTE PARTICULARS:
Credit Granting Institution: ${lenderName}
Account Number: ${loanAccountNumber}

Grounds of Dispute:
${reasonText}

STATUTORY NOTICE:
As stipulated under Section 21 of the Credit Information Companies (Regulation) Act, 2005 and RBI Master Directions on Credit Information Companies, the bureau and credit institution are mandated to verify, update, and resolve the disputed data within thirty (30) days from receipt of this notice.

Kindly furnish me with an updated credit information report reflecting the corrected particulars upon resolution.

Yours faithfully,
${borrowerName}`;
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(getDisputeLetterText());
    setCopied(true);
    showToast('Statutory CICRA dispute letter copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const guides = [
    {
      id: 'bureaus',
      category: 'bureaus',
      title: 'The 4 RBI-Licensed Credit Bureaus in India',
      description: 'Understanding TransUnion CIBIL, Experian, CRIF High Mark, and Equifax India.',
      content: `The Reserve Bank of India (RBI) licenses exactly four Credit Information Companies (CICs) in India:
1. TransUnion CIBIL (most widely used by Indian public & private sector banks for home & personal loans).
2. Experian India (popular with fintechs, digital lending apps, and private banks).
3. CRIF High Mark (specializes in microfinance, two-wheeler, and commercial credit).
4. Equifax India (used across retail loans and credit cards).

Key Difference: Each bureau uses proprietary scoring algorithms (300 to 900) with slight variations in weighting. Lenders report borrower payment data once every 15 to 30 days. It is completely normal for your score on CIBIL to differ by 10 to 30 points from your Experian score.`,
      highlight: 'Every Indian citizen is legally entitled to one free statutory credit report per calendar year from each of the 4 bureaus.',
    },
    {
      id: 'score-bands',
      category: 'score',
      title: 'Indian Credit Score Bands (300 to 900) & Bank Realities',
      description: 'What score do you actually need for an SBI, HDFC, or ICICI prime loan sanction?',
      content: `• 750 – 900 (Excellent / Prime): Top-tier tier. You qualify for the lowest repo-linked lending rates (e.g. 8.35% - 8.50% p.a. home loans) and pre-approved premium credit cards.
• 700 – 749 (Good): Solid approval profile. Qualifies for most retail loans with standard processing fees. Minor utilization corrections can quickly push you above 750.
• 650 – 699 (Fair / Marginal): Borderline tier. Banks may require higher down payments, co-applicants, or charge a risk spread (+0.75% to +1.5% higher interest rate).
• 300 – 649 (Poor / Needs Repair): High sanction rejection rate. Usually indicates write-offs, settlements, or repeated 60+ DPD delinquencies.`,
      highlight: 'Crossing the 750 threshold can save you ₹4,00,000 to ₹12,00,000 in interest on a typical 20-year home loan.',
    },
    {
      id: 'cicra-disputes',
      category: 'disputes',
      title: 'How to Resolve Credit Report Errors under CICRA 2005',
      description: 'Statutory rights, 30-day turnaround mandates, and the role of the RBI Ombudsman.',
      content: `Under Section 21 of the Credit Information Companies (Regulation) Act, 2005 (CICRA):
1. Right to Truthful Information: Any error, clerical misspelling, or delayed loan closure record must be investigated by the bureau.
2. 30-Day Mandatory Resolution: Once a dispute is lodged online via the bureau's portal, the bureau must contact the lending institution within 7 days, and the bank must respond within 30 days.
3. Penalty on Delays: Under recent RBI consumer protection directives, institutions failing to rectify verified inaccuracies within 30 days are subject to daily compensation fines to the consumer.`,
      highlight: 'Always retain your NOC (No Objection Certificate) and loan foreclosure receipt indefinitely.',
    },
    {
      id: 'myths',
      category: 'myths',
      title: 'Top 5 Indian Credit Myths Debunked',
      description: 'Fact-checking common misconceptions about checking scores and closing old cards.',
      content: `Myth 1: "Checking your own credit score drops it."
Reality: False! When you check your score on Credit Assistant or directly via a bureau, it is categorized as a Soft Inquiry. Only when a bank reviews your file for a new loan does a Hard Inquiry occur.

Myth 2: "Closing old credit cards boosts your score."
Reality: False! Closing your oldest credit card reduces your total credit limit (spiking your utilization ratio) and shortens your average account age. Keep zero-fee old cards active.

Myth 3: "A 'Settled' loan tag means my credit is clean."
Reality: False! 'Settled' means the bank took a loss and waived off interest. Bureaus treat 'Settled' or 'Written Off' as derogatory for 7 years. Always aim for a full 'Closed' status.`,
      highlight: 'Soft self-checks do not leave inquiry scars on your bureau report.',
    },
  ];

  const filteredGuides = guides.filter((g) => {
    const matchesCategory = activeCategory === 'all' || g.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      <PublicHeader currentPath="/learn" onNavigate={onNavigate} />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <BookOpen className="w-3.5 h-3.5" />
            Official Indian Credit Knowledge Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Master the Rules of Indian Credit
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Grounded in the Credit Information Companies (Regulation) Act, 2005 (CICRA) and RBI underwriting guidelines.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {[
              { id: 'all', label: 'All Guides' },
              { id: 'bureaus', label: 'The 4 Bureaus' },
              { id: 'score', label: 'Score Bands & Approvals' },
              { id: 'disputes', label: 'CICRA Dispute Rights' },
              { id: 'myths', label: 'Credit Myths' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search CIBIL, DTI, CICRA..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {guide.category}
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">{guide.title}</h3>
                <p className="text-xs text-slate-500 font-medium">{guide.description}</p>
                <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line pt-2">
                  {guide.content}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{guide.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Dispute Letter Generator Section */}
        <div id="dispute-generator" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md">
          <div className="max-w-3xl mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-800">
              <Scale className="w-3.5 h-3.5" />
              Statutory Dispute Generator (CICRA Section 21)
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Generate a Legally Compliant Bureau Dispute Notice
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Did your credit report contain an incorrect "Settled" status, an old loan still showing open, or an identity error? Use our statutory dispute generator to draft a notice for CIBIL or Experian.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Inputs */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Reason for Dispute</label>
                <select
                  value={disputeType}
                  onChange={(e) => setDisputeType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:border-emerald-500"
                >
                  <option value="closed_still_active">Fully Paid Loan still shows 'Active'</option>
                  <option value="marked_settled">Wrongly marked 'Settled' instead of 'Closed'</option>
                  <option value="incorrect_overdue">Incorrect Overdue or DPD Late Payment entry</option>
                  <option value="not_my_account">Account does not belong to me (Identity Mix-up)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bank / Lending Institution</label>
                <input
                  type="text"
                  value={lenderName}
                  onChange={(e) => setLenderName(e.target.value)}
                  placeholder="e.g. HDFC Bank, SBI, ICICI"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Disputed Loan Account / Card Number</label>
                <input
                  type="text"
                  value={loanAccountNumber}
                  onChange={(e) => setLoanAccountNumber(e.target.value)}
                  placeholder="e.g. LN-987654321"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={borrowerName}
                    onChange={(e) => setBorrowerName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">PAN Number</label>
                  <input
                    type="text"
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono uppercase focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={handleCopyLetter}
                  leftIcon={copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                >
                  {copied ? 'Dispute Draft Copied!' : 'Copy Dispute Draft'}
                </Button>
              </div>
            </div>

            {/* Live Preview Box */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-inner space-y-3 font-mono text-[11px] leading-relaxed relative">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-slate-400">
                  <span>DISPUTE_NOTICE_TEMPLATE.TXT</span>
                  <button
                    onClick={handleCopyLetter}
                    className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                </div>
                <pre className="whitespace-pre-wrap font-sans text-xs text-slate-300 overflow-x-auto max-h-[380px] pr-2">
                  {getDisputeLetterText()}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter onNavigate={onNavigate} />
    </div>
  );
};
