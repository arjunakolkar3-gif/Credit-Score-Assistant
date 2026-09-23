import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Mail,
  Send,
  CheckCircle2,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';

interface FAQContactPageProps {
  onNavigate: (path: string) => void;
}

interface FAQItem {
  id: string;
  category: 'Scoring' | 'Disputes' | 'Loans' | 'Security';
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Scoring',
    question: 'Will calculating or simulating scenarios on this site lower my credit score?',
    answer: 'No. Absolutely not. When you calculate metrics or simulate prepayments on Credit Assistant, it is purely a self-diagnostic computational model. We do not trigger hard bureau inquiries, which means your score is never pulled or impacted.'
  },
  {
    id: 'faq-2',
    category: 'Scoring',
    question: 'Why does my score differ between CIBIL and Experian in India?',
    answer: 'Each of India\'s four licensed bureaus (CIBIL, Experian, CRIF High Mark, Equifax) uses proprietary scoring algorithms with slightly different weightages. Additionally, lending institutions upload borrower records at different times of the month, resulting in temporary variance between reports.'
  },
  {
    id: 'faq-3',
    category: 'Loans',
    question: 'What is FOIR, and why does my bank care about it more than my CIBIL score?',
    answer: 'FOIR stands for Fixed Obligation to Income Ratio. It calculates the percentage of your monthly in-hand income allocated toward existing loan EMIs and credit card obligations. Even with a 780 CIBIL score, if your FOIR exceeds 50%, banks like SBI and HDFC will decline new loan applications because you have insufficient cashflow buffer.'
  },
  {
    id: 'faq-4',
    category: 'Disputes',
    question: 'What should I do if a loan I already paid off shows as "Overdue" or "Active"?',
    answer: 'Under the Credit Information Companies (Regulation) Act, 2005 (CICRA), you have the statutory legal right to file an online dispute directly with CIBIL or Experian. Bureaus are legally mandated to coordinate with the lender and rectify verified errors within 30 days.'
  },
  {
    id: 'faq-5',
    category: 'Disputes',
    question: 'What is the difference between a "Settled" loan and a "Closed" loan?',
    answer: 'A "Closed" loan means all principal and interest were paid in full, and the bank issued a No Due Certificate. A "Settled" loan means you made a compromised partial payment and the bank wrote off the remainder as a loss. Having "Settled" on your CIBIL will cause retail banks to reject home loans for up to 7 years.'
  },
  {
    id: 'faq-6',
    category: 'Security',
    question: 'Do you sell my phone number or email to loan agents or credit card telemarketers?',
    answer: 'Never. Unlike commercial aggregator platforms that monetize your personal data through lead generation commissions, Credit Assistant never sells, rents, or shares your contact details with external third parties or telemarketers.'
  },
  {
    id: 'faq-7',
    category: 'Security',
    question: 'Do I need to enter my NetBanking passwords or credit card numbers?',
    answer: 'No. We never ask for bank credentials, NetBanking passwords, card CVVs, or OTPs. All data entered is educational and controlled entirely by you.'
  }
];

export const FAQContactPage: React.FC<FAQContactPageProps> = ({ onNavigate }) => {
  const { addToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTopic, setContactTopic] = useState('General Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = ['All', 'Scoring', 'Loans', 'Disputes', 'Security'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      addToast('Please fill in all required fields.', 'error');
      return;
    }
    if (!contactEmail.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }

    setIsSubmitted(true);
    addToast('Your inquiry has been submitted. Our team will respond within 24 hours.', 'success');
  };

  return (
    <div className="py-12 px-6 lg:px-12 max-w-7xl mx-auto w-full space-y-16">
      {/* Title & Introduction */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>Support & Clarifications</span>
          <span aria-hidden="true">·</span>
          <span>Indian Credit System</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          Frequently Asked Questions & Contact
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Find answers to common questions about Indian credit bureau scoring, debt ratios, loan underwriting, and privacy standards.
        </p>
      </div>

      {/* Main 2-Column: FAQs on Left, Contact Desk on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: FAQ Search & Accordion */}
        <div className="lg:col-span-7 space-y-6">
          {/* Controls: Search + Categories */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. CIBIL, FOIR, dispute)..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {/* Filter pills as buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat === 'All' ? 'All Questions' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-sm font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                    <span className="p-1 text-slate-400 shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
                No matching questions found. Use the contact form to reach our credit specialists.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Contact & Grievance Desk */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <span>Contact Credit Support</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Have questions regarding our simulator, FOIR formulas, or bureau guidelines? Send us a message.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-emerald-950">Inquiry Received</h4>
              <p className="text-xs text-emerald-900 leading-relaxed">
                Thank you, {contactName}! Our credit intelligence desk has received your ticket. We typically respond within 24 business hours.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsSubmitted(false);
                  setContactMessage('');
                }}
              >
                Send Another Inquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1">
                  Inquiry Category
                </label>
                <select
                  value={contactTopic}
                  onChange={(e) => setContactTopic(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer"
                >
                  <option value="General Inquiry">General Question</option>
                  <option value="FOIR & Underwriting">FOIR & Loan Underwriting</option>
                  <option value="CIBIL Dispute Assistance">CIBIL / Experian Dispute Assistance</option>
                  <option value="Bug or Feature Request">Bug or Feedback</option>
                  <option value="Privacy & Data">Privacy & Data Handling</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Describe your question or scenario..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full"
                type="submit"
                rightIcon={<Send className="w-4 h-4" />}
              >
                Submit Inquiry
              </Button>
            </form>
          )}

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Response time: &le; 24 business hours</span>
            <span>No marketing spam guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};
