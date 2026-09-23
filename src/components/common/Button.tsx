import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'emerald' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none rounded-xl active:scale-[0.99] whitespace-nowrap shrink-0';

  const widthStyle = fullWidth ? 'w-full' : '';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 min-h-[34px] gap-1.5',
    md: 'text-sm px-4 py-2.5 min-h-[42px] gap-2',
    lg: 'text-base px-5 py-3 min-h-[48px] gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#0F172A] text-white hover:bg-slate-800 focus-visible:ring-slate-900 shadow-sm border border-slate-900',
    emerald:
      'bg-[#10B981] text-white hover:bg-emerald-600 focus-visible:ring-emerald-500 shadow-sm border border-emerald-600',
    secondary:
      'bg-slate-100 text-slate-800 hover:bg-slate-200 focus-visible:ring-slate-400 border border-slate-200/80',
    outline:
      'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 focus-visible:ring-slate-400 shadow-sm',
    ghost:
      'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 focus-visible:ring-slate-400',
    danger:
      'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 focus-visible:ring-rose-400',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
