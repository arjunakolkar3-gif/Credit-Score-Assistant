import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  color?: 'emerald' | 'amber' | 'rose' | 'navy' | 'indigo';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  thresholds?: { value: number; label: string }[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = 'emerald',
  size = 'md',
  showLabel = false,
  label,
  thresholds,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colorStyles = {
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    navy: 'bg-[#0F172A]',
    indigo: 'bg-indigo-600',
  };

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
          <span>{label}</span>
          <span className="font-mono tabular-nums">{Math.round(percentage)}%</span>
        </div>
      )}

      <div className={`relative w-full bg-slate-100 rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className={`h-full transition-all duration-300 ease-out rounded-full ${colorStyles[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {thresholds && thresholds.length > 0 && (
        <div className="relative mt-2 flex justify-between text-[11px] text-slate-400 font-medium">
          {thresholds.map((th) => (
            <span key={th.value} className="select-none">
              {th.label} ({th.value}%)
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
