import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  RefreshCw,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useFinancialData } from '../context/FinancialDataContext';
import { aiService } from '../services/aiService';
import { AIAnalysisResult } from '../types/credit';
import { DEMO_AI_ANALYSIS } from '../data/demoData';
import { ActionPlan } from '../components/advisor/ActionPlan';
import { HealthStatusBadge } from '../components/common/HealthStatusBadge';
import { Button } from '../components/common/Button';
import { formatCurrency, formatPercentage } from '../utils/calculations';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export const AIAdvisorPage: React.FC = () => {
  const { profile, dti, utilization } = useFinancialData();

  const [analysis, setAnalysis] = useState<AIAnalysisResult>(DEMO_AI_ANALYSIS);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Chat Q&A State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_welcome',
      role: 'model',
      text: `Hello Rahul! I am your AI Credit Advisor. I have analyzed your reported credit score (${profile.creditScore}), debt commitments (${formatCurrency(profile.monthlyDebtPayments)}/mo, DTI ${dti}%), and revolving credit utilization (${utilization}%). How can I assist with your credit-building roadmap today?`,
      timestamp: 'Just now',
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const suggestedQuestions = [
    'Should I close my oldest credit card?',
    'How can I prepare for a home loan in 6 months?',
    'What is the best way to get utilization below 15%?',
    'Does prepaying my personal loan hurt my credit mix?',
  ];

  const handleRefreshAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const result = await aiService.analyzeProfile(profile);
      setAnalysis(result);
    } catch {
      setAnalysis(DEMO_AI_ANALYSIS);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendMessage = async (questionText?: string) => {
    const q = questionText || inputQuestion.trim();
    if (!q || isChatLoading) return;

    const userMsg: Message = {
      id: 'usr_' + Date.now(),
      role: 'user',
      text: q,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsChatLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, text: m.text }));
      const answer = await aiService.askAdvisorQuestion(q, profile, history);

      const botMsg: Message = {
        id: 'bot_' + Date.now(),
        role: 'model',
        text: answer,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: Message = {
        id: 'err_' + Date.now(),
        role: 'model',
        text: 'Unable to connect to the advisor service right now. Please verify your connection or try asking again.',
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner: AI Credit Advisor Overview */}
      <div className="bg-white border border-indigo-100/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Your AI Credit Advisor</h2>
            <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
              Gemini Powered
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Objective, algorithmic guidance calibrated to Indian credit bureaus and banking FOIR guidelines.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleRefreshAnalysis}
          isLoading={isAnalyzing}
          leftIcon={<RefreshCw className="w-3.5 h-3.5 text-indigo-400" />}
          className="z-10"
        >
          Re-Analyze Financial Profile
        </Button>
      </div>

      {/* Diagnostic Baseline Summary */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Current Profile Baseline
          </h3>
          <HealthStatusBadge status={analysis.health_status} size="sm" />
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
          <p className="text-sm text-slate-800 font-medium leading-relaxed">
            "{analysis.summary}"
          </p>
        </div>

        {/* 3 Key Diagnostic Findings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
          {analysis.key_findings.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400">0{idx + 1}.</span>
                <HealthStatusBadge
                  status={item.severity === 'high' ? 'High Impact' : item.severity === 'medium' ? 'Moderate' : 'Low Impact'}
                  variant={item.severity === 'high' ? 'rose' : item.severity === 'medium' ? 'amber' : 'emerald'}
                  size="sm"
                />
              </div>
              <h4 className="text-xs font-bold text-slate-900 leading-snug">{item.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5-Step Action Roadmap */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Personalized 5-Step Action Roadmap
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Check off items as you complete them to track your disciplined progress.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono font-bold">
            {analysis.action_plan.length} Steps
          </span>
        </div>

        <ActionPlan steps={analysis.action_plan} />
      </div>

      {/* Strategic Questions to Consider */}
      {analysis.questions_to_consider && analysis.questions_to_consider.length > 0 && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Strategic Questions for Your Financial Roadmap
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {analysis.questions_to_consider.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(q)}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50/50 hover:border-indigo-200 text-left text-xs font-medium text-slate-700 transition-colors cursor-pointer"
              >
                "{q}"
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Interactive AI Chat Console */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-none">
                Interactive Credit Advisor Q&A
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Ask about Indian credit bureaus, loan prepayments, or credit card limits
              </p>
            </div>
          </div>
        </div>

        {/* Suggested Quick Question Chips */}
        <div className="p-3 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-semibold uppercase text-[10px] shrink-0">
            Suggested:
          </span>
          {suggestedQuestions.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(sq)}
              className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium whitespace-nowrap cursor-pointer transition-colors"
            >
              {sq}
            </button>
          ))}
        </div>

        {/* Messages Scroll Area */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[420px] overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'model' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-xl rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#0F172A] text-white'
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isChatLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
              <span>Advisor is preparing guidance…</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3.5 border-t border-slate-100 bg-white flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask a question about credit health, EMIs, or loan approvals…"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            disabled={isChatLoading}
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-slate-800 focus:bg-white"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!inputQuestion.trim() || isChatLoading}
            isLoading={isChatLoading}
            rightIcon={<Send className="w-4 h-4" />}
          >
            Ask
          </Button>
        </form>
      </div>

      {/* Safety Disclaimer */}
      <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start gap-2.5 text-xs text-slate-500">
        <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p>
          {analysis.disclaimer ||
            'Credit Assistant provides educational insights based on information entered by the user. It does not replace official credit reports or professional financial advice.'}
        </p>
      </div>
    </div>
  );
};
