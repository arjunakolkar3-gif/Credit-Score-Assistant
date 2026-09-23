import React, { useState } from 'react';
import { Check, Clock, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';
import { AIActionStep, Severity } from '../../types/credit';

interface ActionPlanProps {
  steps: {
    step: number;
    title: string;
    description: string;
    why_it_matters?: string;
    what_to_do?: string;
    priority: Severity;
  }[];
}

export const ActionPlan: React.FC<ActionPlanProps> = ({ steps }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber) ? prev.filter((s) => s !== stepNumber) : [...prev, stepNumber]
    );
  };

  const priorityStyles = {
    high: {
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
      label: 'High Priority',
    },
    medium: {
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
      label: 'Medium Priority',
    },
    low: {
      badge: 'bg-slate-100 text-slate-700 border-slate-200',
      label: 'Optimization',
    },
  };

  return (
    <div className="space-y-3.5">
      {steps.map((item) => {
        const isDone = completedSteps.includes(item.step);
        const pStyle = priorityStyles[item.priority] || priorityStyles.medium;

        return (
          <div
            key={item.step}
            className={`border rounded-2xl p-4 sm:p-5 transition-all duration-150 ${
              isDone
                ? 'bg-slate-50/80 border-slate-200/80 opacity-75'
                : 'bg-white border-slate-200/90 shadow-xs hover:border-slate-300'
            }`}
          >
            {/* Step header */}
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleStep(item.step)}
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors shrink-0 mt-0.5 cursor-pointer ${
                    isDone
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 hover:border-slate-400 bg-white text-transparent'
                  }`}
                  aria-label={isDone ? `Mark step ${item.step} incomplete` : `Mark step ${item.step} complete`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </button>

                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      Step {item.step < 10 ? `0${item.step}` : item.step}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.2 rounded border ${pStyle.badge}`}
                    >
                      {pStyle.label}
                    </span>
                  </div>
                  <h4
                    className={`text-sm sm:text-base font-bold text-slate-900 leading-snug ${
                      isDone ? 'line-through text-slate-500' : ''
                    }`}
                  >
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-9 mb-3">
              {item.description}
            </p>

            {/* Why it matters & What to do structured grid */}
            {(item.why_it_matters || item.what_to_do) && (
              <div className="ml-9 grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2.5 border-t border-slate-100">
                {item.why_it_matters && (
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/90 text-xs">
                    <span className="font-semibold text-slate-900 block mb-0.5">
                      Why it matters:
                    </span>
                    <span className="text-slate-600">{item.why_it_matters}</span>
                  </div>
                )}

                {item.what_to_do && (
                  <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/70 text-xs">
                    <span className="font-semibold text-emerald-950 block mb-0.5">
                      Action plan:
                    </span>
                    <span className="text-emerald-900">{item.what_to_do}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
