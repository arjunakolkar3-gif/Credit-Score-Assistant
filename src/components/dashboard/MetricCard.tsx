import React from 'react';
import { HealthStatusBadge } from '../common/HealthStatusBadge';

interface MetricCardProps {
  title: string;
  value: string | number;
  statusText?: string;
  statusVariant?: 'emerald' | 'amber' | 'rose' | 'slate';
  deltaText?: string;
  deltaPositive?: boolean;
  subtitle?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  statusText,
  statusVariant,
  deltaText,
  deltaPositive,
  subtitle,
  icon,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs transition-all duration-150 ${
        onClick ? 'cursor-pointer hover:border-slate-300 hover:shadow-sm' : ''
      } ${className}`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        {icon && <span className="text-slate-400 shrink-0">{icon}</span>}
      </div>

      {/* Main Value & Status */}
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-mono tabular-nums">
          {value}
        </span>
        {statusText && (
          <HealthStatusBadge status={statusText} variant={statusVariant} size="sm" />
        )}
      </div>

      {/* Subtitle / Delta */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        {subtitle && <span className="truncate">{subtitle}</span>}
        {deltaText && (
          <span
            className={`font-semibold shrink-0 ml-auto ${
              deltaPositive ? 'text-emerald-700' : 'text-slate-600'
            }`}
          >
            {deltaText}
          </span>
        )}
      </div>
    </div>
  );
};
