import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  prefixText?: string;
  suffixText?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, prefixText, suffixText, leftIcon, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            {label}
            {props.required && <span className="text-rose-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative flex items-center rounded-xl bg-white border border-slate-200 transition-all focus-within:border-slate-800 focus-within:ring-2 focus-within:ring-slate-900/10 shadow-xs overflow-hidden">
          {leftIcon && (
            <div className="pl-3.5 text-slate-400 shrink-0 pointer-events-none">{leftIcon}</div>
          )}
          {prefixText && (
            <span className="pl-3.5 text-sm font-medium text-slate-500 select-none shrink-0">
              {prefixText}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full bg-transparent px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400 ${
              prefixText ? 'pl-2' : ''
            } ${suffixText ? 'pr-2' : ''} ${className}`}
            {...props}
          />
          {suffixText && (
            <span className="pr-3.5 text-sm font-medium text-slate-500 select-none shrink-0">
              {suffixText}
            </span>
          )}
        </div>

        {error ? (
          <p className="mt-1 text-xs text-rose-600 font-medium">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-xs text-slate-500 leading-normal">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
