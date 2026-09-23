import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 bg-white border border-slate-200/80 rounded-2xl ${className}`}
    >
      {icon && (
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 mb-4">
          {icon}
        </div>
      )}
      <h4 className="text-base font-semibold text-slate-900 mb-1.5">{title}</h4>
      <p className="text-xs text-slate-500 max-w-sm leading-relaxed mb-5">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
