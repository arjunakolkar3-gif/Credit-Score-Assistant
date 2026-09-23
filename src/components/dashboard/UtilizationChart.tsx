import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency, formatPercentage, getUtilizationRating } from '../../utils/calculations';
import { HealthStatusBadge } from '../common/HealthStatusBadge';

interface UtilizationChartProps {
  usedAmount: number;
  totalLimit: number;
}

export const UtilizationChart: React.FC<UtilizationChartProps> = ({
  usedAmount,
  totalLimit,
}) => {
  const availableAmount = Math.max(0, totalLimit - usedAmount);
  const utilization = totalLimit > 0 ? (usedAmount / totalLimit) * 100 : 0;
  const rating = getUtilizationRating(utilization);

  const chartData = [
    { name: 'Used', value: usedAmount, color: rating.color },
    { name: 'Available', value: availableAmount, color: '#E2E8F0' },
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Revolving Credit Utilization
        </span>
        <HealthStatusBadge status={rating.status} variant="emerald" size="sm" />
      </div>

      {/* Donut and Center Text */}
      <div className="relative h-44 w-full flex items-center justify-center my-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={70}
              startAngle={90}
              endAngle={-270}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Ratio Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-black text-slate-900 font-mono tabular-nums leading-none">
            {formatPercentage(utilization)}
          </span>
          <span className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">
            Utilized
          </span>
        </div>
      </div>

      {/* Legend & Breakdown */}
      <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
        <div>
          <div className="flex items-center gap-1.5 text-slate-500 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span>Used Balance</span>
          </div>
          <span className="font-mono font-bold text-slate-900 tabular-nums">
            {formatCurrency(usedAmount)}
          </span>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-slate-500 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
            <span>Available Limit</span>
          </div>
          <span className="font-mono font-bold text-slate-900 tabular-nums">
            {formatCurrency(availableAmount)}
          </span>
        </div>
      </div>
    </div>
  );
};
