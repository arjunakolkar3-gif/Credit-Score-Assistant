import React from 'react';
import { formatCurrency, formatPercentage, getDTIRating } from '../../utils/calculations';
import { HealthStatusBadge } from '../common/HealthStatusBadge';
import { ProgressBar } from '../common/ProgressBar';

interface DTICardProps {
  monthlyDebt: number;
  monthlyIncome: number;
  maxHealthyThreshold?: number; // default 35%
}

export const DTICard: React.FC<DTICardProps> = ({
  monthlyDebt,
  monthlyIncome,
  maxHealthyThreshold = 35,
}) => {
  const dti = monthlyIncome > 0 ? (monthlyDebt / monthlyIncome) * 100 : 0;
  const rating = getDTIRating(dti);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Debt-to-Income (DTI / FOIR)
          </span>
          <HealthStatusBadge status={rating.status} variant="emerald" size="sm" />
        </div>

        {/* Big percentage & context */}
        <div className="flex items-baseline justify-between mt-3 mb-2">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900 font-mono tabular-nums">
            {formatPercentage(dti)}
          </span>
          <span className="text-xs text-slate-500">
            Comfort range &le; {maxHealthyThreshold}%
          </span>
        </div>

        {/* Horizontal Progress Bar */}
        <div className="my-3">
          <ProgressBar
            value={dti}
            max={70}
            color={dti <= 35 ? 'emerald' : dti <= 50 ? 'amber' : 'rose'}
            size="md"
          />
        </div>

        <p className="text-xs text-slate-500 leading-normal">
          {rating.description}
        </p>
      </div>

      {/* Monthly Breakdown */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-slate-500 block mb-0.5">Monthly Debt EMIs</span>
          <span className="font-mono font-bold text-slate-900 tabular-nums">
            {formatCurrency(monthlyDebt)}
          </span>
        </div>

        <div>
          <span className="text-slate-500 block mb-0.5">Monthly Gross Salary</span>
          <span className="font-mono font-bold text-slate-900 tabular-nums">
            {formatCurrency(monthlyIncome)}
          </span>
        </div>
      </div>
    </div>
  );
};
