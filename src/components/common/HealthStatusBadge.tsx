import React from 'react';

interface HealthStatusBadgeProps {
  status: string;
  variant?: 'emerald' | 'amber' | 'rose' | 'slate' | 'indigo';
  size?: 'sm' | 'md';
}

export const HealthStatusBadge: React.FC<HealthStatusBadgeProps> = ({
  status,
  variant,
  size = 'md',
}) => {
  // Infer variant from text if not provided
  let activeVariant = variant;
  if (!activeVariant) {
    const s = status.toLowerCase();
    if (s.includes('excellent') || s.includes('good') || s.includes('healthy') || s.includes('on track') || s.includes('optimal') || s.includes('better')) {
      activeVariant = 'emerald';
    } else if (s.includes('fair') || s.includes('moderate') || s.includes('elevated') || s.includes('attention')) {
      activeVariant = 'amber';
    } else if (s.includes('poor') || s.includes('critical') || s.includes('danger') || s.includes('concern')) {
      activeVariant = 'rose';
    } else {
      activeVariant = 'slate';
    }
  }

  const styles = {
    emerald: 'text-emerald-700 bg-emerald-50/80 border-emerald-200/80',
    amber: 'text-amber-700 bg-amber-50/80 border-amber-200/80',
    rose: 'text-rose-700 bg-rose-50/80 border-rose-200/80',
    slate: 'text-slate-700 bg-slate-100 border-slate-200',
    indigo: 'text-indigo-700 bg-indigo-50/80 border-indigo-200/80',
  };

  const dotColors = {
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    slate: 'bg-slate-400',
    indigo: 'bg-indigo-500',
  };

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-md border ${styles[activeVariant]} ${sizeClasses[size]} select-none`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[activeVariant]} shrink-0`} />
      <span>{status}</span>
    </span>
  );
};
