import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import { PublicHeader } from '../components/layout/PublicHeader';
import { PublicFooter } from '../components/layout/PublicFooter';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('credit_question');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please fill in your name, email, and message.', 'error');
      return;
    }

    const generatedTicket = 'TKT-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(generatedTicket);
    setSubmitted(true);
    showToast(`Inquiry received! Ticket #${generatedTicket} created.`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      <PublicHeader currentPath="/contact" onNavigate={onNavigate} />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <Mail className="w-3.5 h-3.5" />
            Support & Redressal Desk
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Get in Touch with Our Credit Experts
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Have a question about your score simulation, CICRA disputes, or data privacy? We typically respond in under 24 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Information & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white">Direct Communication Channels</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Support & Inquiries</span>
                    <strong className="text-white font-mono text-sm">support@creditassistant.in</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Toll-Free Helpline</span>
                    <strong className="text-white font-mono text-sm">1800-209-4488</strong>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Mon - Sat (9:30 AM – 6:30 PM IST)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Primary Office</span>
                    <span className="text-slate-200 text-xs leading-relaxed block">
                      Level 4, Platina Tower, G Block, Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Bengaluru Tech Hub</span>
                    <span className="text-slate-200 text-xs leading-relaxed block">
                      Indiranagar 100ft Road, Bengaluru, Karnataka 560038
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero loan spam pledge: We will never use this info for marketing.</span>
              </div>
            </div>
          </div>

          {/* Interactive Form or Ticket Confirmation */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {ticketId}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 pt-2">Inquiry Successfully Logged</h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <strong>{name}</strong>. Our credit advisory desk has logged your request. A confirmation email has been dispatched to <strong>{email}</strong>.
                  </p>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => onNavigate('/dashboard')}
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-5"
              >
                <h3 className="text-xl font-bold text-slate-900">Send an Inquiry</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="credit_question">Credit Score & Bureau Question</option>
                      <option value="calculator_bug">Calculator or Simulator Feedback</option>
                      <option value="cicra_dispute">CICRA Statutory Dispute Guidance</option>
                      <option value="grievance">Formal Grievance Redressal</option>
                      <option value="partnership">Institutional / API Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message / Question <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your question or concern in detail..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    rightIcon={<Send className="w-4 h-4" />}
                  >
                    Submit Secure Inquiry
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <PublicFooter onNavigate={onNavigate} />
    </div>
  );
};
