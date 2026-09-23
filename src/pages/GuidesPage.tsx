import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Clock,
  ChevronRight,
  CheckCircle2,
  X,
  FileText,
} from 'lucide-react';
import { Button } from '../components/common/Button';

interface GuidesPageProps {
  onNavigate: (path: string) => void;
}

interface Article {
  id: string;
  category: 'Scoring' | 'Loans' | 'Cards' | 'Disputes';
  title: string;
  readTime: string;
  summary: string;
  keyTakeaway: string;
  fullContent: string[];
  checklist: string[];
}

const ARTICLES: Article[] = [
  {
    id: 'cibil-vs-experian',
    category: 'Scoring',
    title: 'CIBIL vs Experian vs CRIF: Why Your Scores Differ Across Indian Bureaus',
    readTime: '5 min read',
    summary: 'Why your credit score is 765 on Experian but 722 on CIBIL, and which score Indian retail banks look at when approving home loans.',
    keyTakeaway: 'SBI, HDFC, and ICICI almost universally prioritize TransUnion CIBIL for retail lending, whereas fintechs and NBFCs frequently rely on Experian or CRIF High Mark.',
    fullContent: [
      'India has four Reserve Bank of India (RBI)-licensed credit information companies: TransUnion CIBIL, Experian India, CRIF High Mark, and Equifax. While all four operate on a 300 to 900 numerical scale, their proprietary scoring algorithms assign different weightages to individual variables.',
      'Different reporting schedules: Lenders upload borrower repayment data to bureaus in batch files once every 30 to 45 days. One bank may sync data with CIBIL on the 5th of each month, but report to Experian on the 20th. As a result, recent card payoffs or new loan disbursements appear on one bureau weeks before the other.',
      'Member financial institutions: Some regional NBFCs and co-operative banks only report data to one or two bureaus rather than all four. A micro-finance loan might be listed on CRIF High Mark but absent from CIBIL.',
      'Which score matters most? For major retail home loans, auto loans, and premium credit cards, major public and private sector banks in India (SBI, HDFC Bank, ICICI Bank, Axis Bank) prioritize TransUnion CIBIL. For instant personal loan apps, buy-now-pay-later (BNPL), and fintech cards, Experian and CRIF are widely used due to real-time API integrations.'
    ],
    checklist: [
      'Download your statutory free credit report once every 12 months from all four RBI-licensed bureaus.',
      'Check for discrepancies in loan balances across bureaus; mismatched records require cross-bureau disputes.',
      'Focus primarily on CIBIL score optimization if planning a home loan application within 12 months.'
    ]
  },
  {
    id: 'settled-vs-closed',
    category: 'Loans',
    title: 'The Dangerous Trap of "Loan Settlement" vs "Closed / Paid in Full"',
    readTime: '6 min read',
    summary: 'When collection agents offer an "easy one-time settlement", they often fail to mention that your CIBIL will show "Settled", crippling your loan approvals for 7 years.',
    keyTakeaway: 'A "Settled" status means the bank wrote off a portion of your principal or interest. It damages your credit standing as severely as an active default.',
    fullContent: [
      'When borrowers encounter temporary financial hardship, bank recovery departments often offer a "One-Time Settlement" (OTS). Under OTS, the bank agrees to accept a lump sum lower than the total outstanding balance to close the account.',
      'While this halts recovery calls and legal notices, the bank reports the account status to CIBIL not as "Closed", but as "Settled" or "Post-Write-Off Settled". The difference between the original due amount and settled amount is written off as a credit loss.',
      'When you apply for a home loan, education loan, or premium credit card later, bank underwriting algorithms automatically reject applicants with "Settled" flags on their bureau report, regardless of how high their current income is.',
      'How to rectify a "Settled" account: Contact the original lending bank and request to pay the remaining written-off balance (the difference between the original outstanding and the settled amount) plus accrued charges. Upon receiving full payment, the bank will issue a revised "No Due Certificate" (NOC) and update your CIBIL status to "Closed".'
    ],
    checklist: [
      'Never accept an informal verbal settlement from collection agents without a signed bank sanction letter.',
      'Always request "Closure" rather than "Settlement" if you have the funds.',
      'If you have already settled a past loan, obtain a payoff statement from the lender to convert it to "Closed".'
    ]
  },
  {
    id: 'foir-underwriting',
    category: 'Loans',
    title: 'How Indian Banks Calculate FOIR (Fixed Obligation to Income Ratio) for Home Loans',
    readTime: '4 min read',
    summary: 'Why having an 800 CIBIL score is not enough if your monthly loan EMIs consume more than 45%–50% of your take-home salary.',
    keyTakeaway: 'Banks use FOIR to calculate the maximum home loan you can afford. Keeping existing EMIs below 30% of take-home pay unlocks the highest loan amounts.',
    fullContent: [
      'FOIR (Fixed Obligation to Income Ratio), also referred to as Debt-to-Income (DTI), is the primary underwriting metric Indian banks use to determine your maximum borrowing eligibility.',
      'How FOIR is calculated: FOIR = (Total Monthly EMIs + 5% of Total Credit Card Limits) / Net Monthly In-Hand Income. For instance, if you take home ₹80,000 per month and pay ₹24,000 in car and personal loan EMIs, your FOIR is 30%.',
      'The 50% Banking Threshold: Under Reserve Bank of India prudent lending norms, Indian retail banks cap FOIR at 40%–50% for middle-income applicants. If your existing EMIs already sit at 40%, the bank can only sanction a new loan whose EMI does not exceed 10% of your salary.',
      'How to optimize FOIR before applying: Foreclose small consumer durable loans, 0% EMI electronic purchases, and personal loans 60 days before applying for a home loan. Even an EMI of ₹3,000 reduces your sanctioned home loan eligibility by over ₹3.5 Lakhs.'
    ],
    checklist: [
      'Calculate your current FOIR using our free calculator before submitting a home loan application.',
      'Avoid opening new personal loans or EMI schemes within 6 months of a property purchase.',
      'Consider adding a co-applicant (spouse or parent with documented income) to boost the household FOIR threshold.'
    ]
  },
  {
    id: 'cicra-dispute-process',
    category: 'Disputes',
    title: 'How to File an Online Bureau Dispute under the CICRA 2005 Act',
    readTime: '7 min read',
    summary: 'A step-by-step guide to exercising your statutory consumer right to have clerical errors, wrongful defaults, or identity mix-ups corrected in 30 days.',
    keyTakeaway: 'Under Section 21 of CICRA 2005, credit bureaus and lending institutions face financial penalties if they do not resolve verified consumer disputes within 30 days.',
    fullContent: [
      'The Credit Information Companies (Regulation) Act, 2005 (CICRA) grants Indian consumers the statutory legal right to challenge inaccurate, incomplete, or outdated data on their credit reports.',
      'Common report errors in India: 1) A paid-off credit card still listed as "Active" or "Overdue", 2) PAN card number typographical errors attributing someone else\'s default to your profile, 3) Delayed reporting of loan closure by NBFCs.',
      'Step 1: Download your official report and note down the 9-digit or 10-digit Control Number (ECN / CIR Number). You cannot file a dispute without this number.',
      'Step 2: Log into the official bureau dispute portal (cibil.com/dispute-status or experian.in/consumer/disputes). Select the specific account entry and dispute category (Account Details, Balance Outstanding, Ownership).',
      'Step 3: Upload supporting evidence—specifically your loan closure letter, bank statement proving deduction, or No Objection Certificate (NOC).',
      'Step 4: Statutory 30-day resolution timeline. The bureau routes the query to the lender. If the lender confirms the discrepancy or fails to verify the debt within 30 days, the bureau is legally required to remove the adverse remark.'
    ],
    checklist: [
      'Always retain your Control Number from the credit report.',
      'File the dispute directly through the bureau\'s official portal; never pay unauthorized third-party "credit repair" agencies.',
      'If not resolved in 30 days, file an escalation with the RBI Integrated Ombudsman.'
    ]
  },
  {
    id: 'utilization-statement-trick',
    category: 'Cards',
    title: 'The 30% Utilization Rule: Statement Generation Date vs Due Date',
    readTime: '5 min read',
    summary: 'Why paying your credit card bill in full on the due date might still cause a drop in your CIBIL score due to mid-cycle balance reporting.',
    keyTakeaway: 'Credit bureaus record the balance generated on your monthly statement date, NOT the balance after you pay on the subsequent due date.',
    fullContent: [
      'Credit card utilization ratio accounts for 30% of your total credit score. The universal guideline is to maintain utilization below 30% of your aggregate credit limit.',
      'The common pitfall: Many diligent borrowers spend ₹90,000 on a card with a ₹1,00,000 limit (90% utilization), and then pay the entire ₹90,000 on the payment due date. They are shocked to see their CIBIL score drop by 25 points.',
      'Why did the score drop? Indian banks report your balance to CIBIL on the Statement Generation Date (billing date), not on the due date (which is usually 18-20 days later). The bureau was informed that you utilized 90% of your credit line, signaling high credit risk.',
      'The Smart Workaround: Pay off 70% of your credit card balance 2 to 3 days BEFORE the statement generation date. When the bill is generated, the recorded statement balance will reflect only 10%–20% utilization, giving you a top-tier credit rating.'
    ],
    checklist: [
      'Check your credit card mobile app to find your Statement Generation Date (different from Payment Due Date).',
      'Make a mid-month pre-payment if you have made large purchases during the billing cycle.',
      'Request periodic credit limit increases from your bank; a higher total limit automatically lowers your utilization ratio.'
    ]
  },
  {
    id: 'noc-importance',
    category: 'Disputes',
    title: 'No Objection Certificate (NOC): The Critical Document After Loan Foreclosure',
    readTime: '4 min read',
    summary: 'Why closing a loan without getting an official NOC letter can haunt your credit report and prevent future property registrations.',
    keyTakeaway: 'A bank statement showing the final EMI deduction is NOT legal proof of loan closure. An official signed NOC and Closure Letter is mandatory.',
    fullContent: [
      'When you finish paying all EMIs on an auto loan, personal loan, or home loan, the lender does not automatically release their charge or guarantee that their backend records match.',
      'A No Objection Certificate (NOC), also called a "No Due Certificate", is the official legal document issued by the bank confirming that the borrower has cleared all dues, interest, and penalties, and that the bank has zero claim on the borrower or collateral.',
      'For vehicle loans: Without an NOC from the financing bank, the Regional Transport Office (RTO) will not remove the "Hypothecation" stamp from your Vehicle Registration Certificate (RC), preventing you from ever selling the car.',
      'For home loans: The bank is legally obligated to return your original title deeds along with a Deed of Reconveyance and NOC within 30 days of closure (per latest RBI directives, failure to return deeds within 30 days attracts ₹5,000/day compensation to the borrower).'
    ],
    checklist: [
      'Always demand an official NOC letter within 21 days of paying your final EMI.',
      'Verify that the account number, PAN number, and vehicle/property details on the NOC are 100% accurate.',
      'Scan and store digital and physical copies of every NOC permanently in your financial records.'
    ]
  }
];

export const GuidesPage: React.FC<GuidesPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const categories = ['All', 'Scoring', 'Loans', 'Cards', 'Disputes'];

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.keyTakeaway.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 px-6 lg:px-12 max-w-7xl mx-auto w-full space-y-12">
      {/* Title & Introduction */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>Educational Knowledge Base</span>
          <span aria-hidden="true">·</span>
          <span>Indian Banking Guidance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          Master Your Credit: Essential Guides & Regulatory Insights
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Demystifying Indian credit bureau scoring, debt-to-income underwriting thresholds, NOC procedures, and statutory dispute protocols under CICRA 2005.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        {/* Category Segmented Control */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat === 'All' ? 'All Guides' : cat}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, CIBIL, FOIR..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => setActiveArticle(article)}
            className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{article.category}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                {article.title}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {article.summary}
              </p>
            </div>

            <div className="pt-5 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-emerald-700">
              <span>Read Full Guide</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No articles matched your search</h3>
          <p className="text-xs text-slate-500">Try adjusting your search terms or selecting another category.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* Article Detail Modal / Reader */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-bold text-emerald-800 uppercase tracking-wider">{activeArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.readTime}</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Close Guide"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                {activeArticle.title}
              </h2>

              {/* Key Takeaway Box */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 block">
                  Core Principle
                </span>
                <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                  {activeArticle.keyTakeaway}
                </p>
              </div>

              {/* Main Body Paragraphs */}
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                {activeArticle.fullContent.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Actionable Checklist */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Practical Action Checklist
                </h4>
                <div className="space-y-2 text-xs text-slate-700">
                  {activeArticle.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 sm:px-8 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500">
                Educational reference for Indian retail borrowers.
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveArticle(null)}
                  className="w-full sm:w-auto"
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setActiveArticle(null);
                    onNavigate('/tools');
                  }}
                  className="w-full sm:w-auto"
                >
                  Apply in Calculator
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Help Banner */}
      <div className="p-8 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold">Have a specific question about your bureau report?</h3>
          <p className="text-xs text-slate-400">
            Our AI Credit Advisor is programmed with Indian banking underwriting laws and CICRA rules.
          </p>
        </div>
        <Button
          variant="emerald"
          size="md"
          onClick={() => onNavigate('/ai-advisor')}
          className="whitespace-nowrap shrink-0"
        >
          Ask AI Advisor
        </Button>
      </div>
    </div>
  );
};
