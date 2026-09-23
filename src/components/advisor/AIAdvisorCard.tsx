import React, { useState } from 'react';
import { Sparkles, Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { AIAnalysisResult } from '../../types/credit';
import { Button } from '../common/Button';
import { ActionPlan } from './ActionPlan';
import { HealthStatusBadge } from '../common/HealthStatusBadge';

interface AIAdvisorCardProps {
  analysis: AIAnalysisResult | null;
  isLoading: boolean;
  onAnalyze: () => void;
  compact?: boolean;
  onViewFullAdvisor?: () => void;
}

export const AIAdvisorCard: React.FC<AIAdvisorCardProps> = ({
  analysis,
  isLoading,
  onAnalyze,
  compact = false,
  onViewFullAdvisor,
}) => {
  return (
    <div className="bg-white border border-indigo-100/80 rounded-2xl p-6 shadow-xs relative overflow-hidden">
      {/* Decorative subtle accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 leading-tight">
                Your AI Credit Advisor
              </h3>
              <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                Gemini Powered
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Personalized insights based on your financial profile & debt commitments
            </p>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="primary"
          size="sm"
          onClick={onAnalyze}
          isLoading={isLoading}
          leftIcon={<Sparkles className="w-3.5 h-3.5 text-indigo-400" />}
          className="self-start sm:self-auto"
        >
          {analysis ? 'Refresh AI Analysis' : 'Analyze My Credit Health'}
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="py-10 flex flex-col items-center justify-center text-center">
          <div className="relative mb-3">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 absolute -top-1 -right-1" />
          </div>
          <p className="text-sm font-semibold text-slate-800">
            Analyzing your financial profile…
          </p>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            Evaluating reported score, revolving credit card ratios, active loan EMIs, and bureau benchmarks.
          </p>
        </div>
      )}

      {/* Analysis Loaded State */}
      {!isLoading && analysis && (
        <div className="space-y-6">
          {/* Summary Box */}
          <div className="p-4 bg-indigo-50/40 border border-indigo-100/90 rounded-xl">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-900">
                AI Summary
              </span>
              <HealthStatusBadge status={analysis.health_status} size="sm" />
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              "{analysis.summary}"
            </p>
          </div>

          {/* Key Findings */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Key Diagnostic Findings
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {analysis.key_findings.map((kf, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/60"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xs font-mono font-bold text-slate-400">0{i + 1}.</span>
                    <h5 className="text-xs font-bold text-slate-900 truncate">
                      {kf.title}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {kf.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Plan (Full or compact) */}
          {!compact ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Recommended Action Roadmap
                </h4>
                <span className="text-xs text-slate-400 font-medium">
                  {analysis.action_plan.length} Steps Identified
                </span>
              </div>
              <ActionPlan steps={analysis.action_plan} />
            </div>
          ) : (
            onViewFullAdvisor && (
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {analysis.action_plan.length} personalized action steps ready
                </span>
                <button
                  onClick={onViewFullAdvisor}
                  className="text-xs font-bold text-indigo-700 hover:text-indigo-900 underline"
                >
                  View 5-Step Action Plan →
                </button>
              </div>
            )
          )}

          {/* Mandatory Safety Disclaimer */}
          <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500 leading-normal">
            <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              {analysis.disclaimer ||
                'Credit Assistant provides educational insights based on information entered by the user. It does not replace official credit reports or professional financial advice.'}
            </span>
          </div>
        </div>
      )}

      {/* Empty State (Not yet analyzed) */}
      {!isLoading && !analysis && (
        <div className="py-8 text-center">
          <p className="text-sm font-semibold text-slate-700 mb-1">
            No analysis generated yet
          </p>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
            Click 'Analyze My Credit Health' to generate a tailored report based on your income, revolving card usage, and EMI commitments.
          </p>
          <Button variant="primary" size="sm" onClick={onAnalyze}>
            Analyze My Credit Health
          </Button>
        </div>
      )}
    </div>
  );
};
