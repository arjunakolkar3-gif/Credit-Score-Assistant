import React, { useState } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Sparkles,
  SlidersHorizontal,
  ArrowRight,
  Lock,
  Eye,
  CheckCircle2,
  FileText,
  BarChart3,
  ChevronRight,
  Calculator,
  BookOpen,
  Scale,
  PhoneOff,
  Percent,
  Building2,
  Star,
  Quote,
  HelpCircle,
  Search,
} from 'lucide-react';
import { PublicHeader } from '../components/layout/PublicHeader';
import { PublicFooter } from '../components/layout/PublicFooter';
import { Button } from '../components/common/Button';
import { formatINR } from '../utils/formatters';
import { useFinancialData } from '../context/FinancialDataContext';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { updateSalary, updateRevolvingDebt } = useFinancialData();

  // Interactive Live Hero Mini-Calculator
  const [testSalary, setTestSalary] = useState<number>(65000);
  const [testCardSpend, setTestCardSpend] = useState<number>(22000);
  const [testCardLimit, setTestCardLimit] = useState<number>(100000);
  const [testExistingEmi, setTestExistingEmi] = useState<number>(14000);

  const testUtil = testCardLimit > 0 ? Math.round((testCardSpend / testCardLimit) * 100) : 0;
  const testDti = testSalary > 0 ? Math.round(((testExistingEmi + testCardSpend * 0.05) / testSalary) * 100) : 0;

  const handleLaunchWithHeroData = () => {
    updateSalary(testSalary);
    updateRevolvingDebt(testCardSpend, testCardLimit);
    onNavigate('/dashboard');
  };

  // FAQ state
  const [faqCategory, setFaqCategory] = useState<'all' | 'score' | 'security' | 'calculators'>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      category: 'score',
      question: 'Will checking my credit score on Credit Assistant lower it?',
      answer:
        'No! Checking your credit health on Credit Assistant uses self-reported metrics and consumer-initiated soft inquiries. It never impacts your official bureau score on CIBIL, Experian, CRIF, or Equifax.',
    },
    {
      category: 'score',
      question: 'How is Credit Assistant different from checking on TransUnion CIBIL directly?',
      answer:
        'Official bureau portals typically charge ₹550 per report or ₹1,200 annually, providing dense 20-page static PDFs. Credit Assistant provides ongoing diagnostic intelligence, live what-if simulation, FOIR underwriting calculations, and personalized Gemini AI roadmaps completely free.',
    },
    {
      category: 'security',
      question: 'Will I get spammed with loan calls after using Credit Assistant?',
      answer:
        'Never! Aggregator portals give "free" scores by selling your contact info to dozens of third-party direct selling agents (DSAs). We guarantee zero spam, zero loan telemarketing, and 100% data confidentiality under our Borrower Privacy Pledge.',
    },
    {
      category: 'calculators',
      question: 'What is FOIR and why do Indian banks like SBI and HDFC look at it?',
      answer:
        'FOIR stands for Fixed Obligation to Income Ratio. Indian banks use FOIR to assess what percentage of your gross monthly salary is already committed to existing EMIs and credit card dues. Most banks cap FOIR at 40% to 50% for home loan approvals.',
    },
    {
      category: 'security',
      question: 'Do you require netbanking credentials or UPI PINs?',
      answer:
        'Never. We will never ask for your netbanking username, password, ATM PIN, or UPI MPIN. Our platform operates strictly on read-only self-service information and mathematical models.',
    },
  ];

  const filteredFaqs = faqs.filter((f) => faqCategory === 'all' || f.category === faqCategory);

  // Testimonials
  const testimonials = [
    {
      quote:
        'Credit Assistant showed me that my Axis card 68% utilization was secretly killing my CIBIL score. I followed the AI action plan, kept it below 20%, and jumped from 710 to 765 in 4 months.',
      author: 'Vikram Joshi',
      role: 'Software Architect, Pune',
      scoreChange: '710 → 765 (+55 pts)',
      verified: 'Verified Borrower',
    },
    {
      quote:
        'Before applying for my SBI Home Loan, I used the FOIR Underwriting calculator. It helped me prepay a small personal loan first to pass SBI’s 45% FOIR limit, securing me an 8.40% interest rate!',
      author: 'Pooja Iyer',
      role: 'Senior Product Manager, Bengaluru',
      scoreChange: 'SBI Home Loan Sanctioned',
      verified: 'Verified Borrower',
    },
    {
      quote:
        'Best part? Zero telemarketing calls! Every other free credit score website in India sells your number to 20 loan brokers. Credit Assistant is completely clean and respectful of privacy.',
      author: 'Aman Singhania',
      role: 'Chartered Accountant, Mumbai',
      scoreChange: '735 → 780 (+45 pts)',
      verified: 'Verified Borrower',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      {/* Top Header */}
      <PublicHeader currentPath="/" onNavigate={onNavigate} />

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200/80 rounded-full text-xs font-semibold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Tailored for the Indian Financial Ecosystem (CIBIL • Experian • CRIF)
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15] text-balance">
              Understand Your Credit. Build Your Borrowing Power.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Credit Assistant transforms your credit and loan data into clear diagnostic insights, what-if simulations, and personalized action steps — without telemarketing spam or loan sales.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('/onboarding')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Check My Credit Health Free
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('/calculators')}
                leftIcon={<Calculator className="w-4 h-4 text-emerald-600" />}
              >
                Explore Free Calculators
              </Button>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Soft inquiry (0 impact on score)
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Strict Zero-Spam Guarantee
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                RBI Data Localization
              </span>
            </div>
          </div>

          {/* Right Column: Live Interactive Instant Credit Health Check Widget */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
              {/* Widget Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-none">Instant Credit Diagnostic</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Test your numbers live without signing up</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Interactive Test
                </span>
              </div>

              {/* Sliders / Inputs */}
              <div className="space-y-3.5">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <span>Monthly Gross In-Hand Salary</span>
                    <span className="font-mono font-bold text-slate-900">{formatINR(testSalary)}</span>
                  </div>
                  <input
                    type="range"
                    min={25000}
                    max={200000}
                    step={5000}
                    value={testSalary}
                    onChange={(e) => setTestSalary(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-slate-700 mb-1">
                      <span>Card Spend</span>
                      <span className="font-mono font-bold text-slate-900">{formatINR(testCardSpend)}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={testCardLimit}
                      step={2000}
                      value={testCardSpend}
                      onChange={(e) => setTestCardSpend(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-slate-700 mb-1">
                      <span>Card Limit</span>
                      <span className="font-mono font-bold text-slate-900">{formatINR(testCardLimit)}</span>
                    </div>
                    <input
                      type="range"
                      min={50000}
                      max={300000}
                      step={10000}
                      value={testCardLimit}
                      onChange={(e) => setTestCardLimit(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-medium text-slate-700 mb-1">
                    <span>Existing Monthly EMIs (Car, Personal, etc.)</span>
                    <span className="font-mono font-bold text-slate-900">{formatINR(testExistingEmi)}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={80000}
                    step={2000}
                    value={testExistingEmi}
                    onChange={(e) => setTestExistingEmi(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Instant Metrics Card */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* Utilization */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Card Utilization
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-2xl font-black font-mono text-slate-900">{testUtil}%</span>
                    <span className={`text-[10px] font-bold uppercase ${testUtil <= 30 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {testUtil <= 30 ? 'Healthy' : 'High Risk'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {testUtil <= 30 ? 'Meets Indian 30% rule' : 'Hurts bureau score'}
                  </span>
                </div>

                {/* DTI / FOIR */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Bank FOIR / DTI
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-2xl font-black font-mono text-slate-900">{testDti}%</span>
                    <span className={`text-[10px] font-bold uppercase ${testDti <= 45 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {testDti <= 45 ? 'Prime' : 'Capped'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {testDti <= 45 ? 'Instant loan approval zone' : 'Approaching bank cap'}
                  </span>
                </div>
              </div>

              {/* CTA to launch dashboard with this data */}
              <div className="pt-1">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={handleLaunchWithHeroData}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Save & Open Full Live Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars of Credit Health */}
      <section id="features" className="py-20 bg-white border-y border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Complete Feature Suite
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Smarter Financial Health, Built for Indian Borrowers
            </h2>
            <p className="text-sm text-slate-500">
              Demystify bureau scoring, simulate repayments, and navigate bank underwriting with clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div
              onClick={() => onNavigate('/credit-health')}
              className="p-6 rounded-2xl border border-slate-200/90 bg-[#F8FAFC] space-y-3 hover:border-emerald-300 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-900 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                <Eye className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                1. 5 Bureau Pillars
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inspect Payment History (35%), Utilization (30%), Age (15%), Mix (10%), and Inquiries (10%) with actionable severity ratings.
              </p>
              <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <span>Inspect Factors</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => onNavigate('/simulator')}
              className="p-6 rounded-2xl border border-slate-200/90 bg-[#F8FAFC] space-y-3 hover:border-emerald-300 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-900 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                <SlidersHorizontal className="w-5 h-5 text-slate-800" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                2. What-If Simulator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Test scenarios before acting: forecast the score delta of paying off ₹50,000 on a card, closing an old loan, or taking a new card.
              </p>
              <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <span>Run Simulator</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 3 */}
            <div
              onClick={() => onNavigate('/ai-advisor')}
              className="p-6 rounded-2xl border border-slate-200/90 bg-[#F8FAFC] space-y-3 hover:border-emerald-300 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-900 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                <Sparkles className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                3. Gemini AI Advisor
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Structured 5-step prioritized action roadmap tailored to Indian banking rules with interactive credit Q&A consultation.
              </p>
              <div className="pt-2 text-xs font-semibold text-indigo-700 flex items-center gap-1">
                <span>Consult Advisor</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 4 */}
            <div
              onClick={() => onNavigate('/calculators')}
              className="p-6 rounded-2xl border border-slate-200/90 bg-[#F8FAFC] space-y-3 hover:border-emerald-300 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-900 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                <Calculator className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                4. Free Calculators Hub
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                FOIR loan underwriting caps, card utilization impact, loan prepayment interest savings, and debt avalanche planners.
              </p>
              <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <span>Try Calculators</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison: Why Credit Assistant vs Aggregators */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
            Uncompromising Transparency
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Why Indian Borrowers Choose Us
          </h2>
          <p className="text-sm text-slate-500">
            We built Credit Assistant to be the anti-aggregator: private, analytical, and respectful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <PhoneOff className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Zero Telemarketing Guarantee</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When you check your score on typical aggregator websites, your phone rings immediately with spam calls from DSA loan brokers. We never sell or share user numbers. Period.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">CICRA 2005 Dispute Rights</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Wrongly marked "Settled" or an old loan still showing active? Use our built-in statutory dispute letter generator to initiate Section 21 correction notices with CIBIL and Experian.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Indian Bank Underwriting Logic</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calibrated directly against SBI, HDFC, and ICICI retail loan guidelines — modeling Fixed Obligation to Income Ratios (FOIR) and revolving balances accurately.
            </p>
          </div>
        </div>
      </section>

      {/* Verified User Testimonials */}
      <section className="py-20 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Real Borrowers • Real Results
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Trusted by Smart Borrowers Across India
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-7 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-white">{t.author}</h4>
                    <p className="text-[11px] text-slate-400">{t.role}</p>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-500/30">
                    {t.scoreChange}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section with Category Tabs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Everything you need to know about checking and repairing credit in India.
          </p>
        </div>

        {/* Categories */}
        <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'score', label: 'Credit Scores' },
            { id: 'security', label: 'Privacy & Security' },
            { id: 'calculators', label: 'Calculators & FOIR' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFaqCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                faqCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-slate-900 cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-90 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0F172A] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Take Control of Your Financial Standing?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Join thousands of smart borrowers tracking their credit health, optimizing card usage, and preparing for future home loans.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/onboarding')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start Free Onboarding
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-slate-700 hover:bg-slate-800"
              onClick={() => onNavigate('/dashboard')}
            >
              Explore Live Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Public Footer */}
      <PublicFooter onNavigate={onNavigate} />
    </div>
  );
};
