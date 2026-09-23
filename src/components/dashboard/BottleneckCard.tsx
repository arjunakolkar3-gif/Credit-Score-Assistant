import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Bottleneck } from '../../types/credit';

interface BottleneckCardProps {
  bottleneck: Bottleneck;
  onActionClick?: (bottleneck: Bottleneck) => void;
}

export const BottleneckCard: React.FC<BottleneckCardProps> = ({
  bottleneck,
  onActionClick,
}) => {
  const isHigh = bottleneck.severity === 'high';
  const isMedium = bottleneck.severity === 'medium';
  const isLow = bottleneck.severity === 'low';

  const severityBadge = {
    high: {
      text: 'Attention Needed',
      badge: 'text-rose-700 bg-rose-50 border-rose-200',
      icon: AlertCircle,
      iconColor: 'text-rose-600',
    },
    medium: {
      text: 'Moderate Impact',
      badge: 'text-amber-700 bg-amber-50 border-amber-200',
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
    },
    low: {
      text: 'Healthy / On Track',
      badge: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
    },
  }[bottleneck.severity];

  const Icon = severityBadge.icon;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 shrink-0 ${severityBadge.iconColor}`} />
            <h4 className="text-sm font-bold text-slate-900 leading-tight">
              {bottleneck.title}
            </h4>
          </div>
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${severityBadge.badge}`}
          >
            {severityBadge.text}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed mb-3">
          {bottleneck.description}
        </p>

        {/* Recommendation Snippet */}
        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700">
          <span className="font-semibold text-slate-900 block mb-0.5">Recommendation:</span>
          {bottleneck.actionRecommendation}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-400 italic">
          {bottleneck.impactStatement}
        </span>
        {onActionClick && (
          <button
            onClick={() => onActionClick(bottleneck)}
            className="inline-flex items-center gap-1 font-semibold text-slate-800 hover:text-emerald-700 transition-colors shrink-0"
          >
            <span>{isLow ? 'Learn More' : 'See Actions'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
