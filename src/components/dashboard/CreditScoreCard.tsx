import React from 'react';
import { ArrowUpRight, Info } from 'lucide-react';
import { HealthStatusBadge } from '../common/HealthStatusBadge';
import { getScoreTier } from '../../utils/calculations';

interface CreditScoreCardProps {
  score: number;
  scoreSource: string;
  scoreDate: string;
  pointsChange?: number;
  onViewDetails?: () => void;
}

export const CreditScoreCard: React.FC<CreditScoreCardProps> = ({
  score,
  scoreSource,
  scoreDate,
  pointsChange = 18,
  onViewDetails,
}) => {
  const tier = getScoreTier(score);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
      {/* Top Bar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Reported Credit Score
            </span>
            <span className="text-[11px] text-slate-400 font-medium">({scoreSource})</span>
          </div>
          <HealthStatusBadge status={tier.tier} variant="emerald" size="sm" />
        </div>

        {/* Big Score Display */}
        <div className="flex items-baseline gap-3 my-2">
          <span className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 font-mono tabular-nums">
            {score}
          </span>
          <span className="text-sm font-semibold text-slate-400">/ 900</span>
        </div>

        {/* Change indicator */}
        <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium mt-1">
          <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          <span>+{pointsChange} points over tracked period</span>
        </div>
      </div>

      {/* Bottom Metadata */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <span>Updated:</span>
          <strong className="text-slate-700 font-semibold">{scoreDate}</strong>
        </span>
        {onViewDetails && (
          <button
            onClick={onViewDetails}
            className="text-slate-700 hover:text-slate-900 font-medium hover:underline text-xs"
          >
            Score Factors →
          </button>
        )}
      </div>
    </div>
  );
};
