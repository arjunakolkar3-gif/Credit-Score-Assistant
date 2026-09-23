import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Shield + Upward Graph Icon */}
      <div
        className={`${iconSizes[size]} rounded-xl bg-[#0F172A] flex items-center justify-center text-white shadow-xs shrink-0 relative overflow-hidden`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          {/* Shield Outline */}
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="text-slate-200" />
          {/* Upward Trend Line */}
          <path d="m8 14 3-3 2 2 4-4" className="text-emerald-400 stroke-[2.4]" />
          <path d="M14 9h3v3" className="text-emerald-400 stroke-[2.4]" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold tracking-tight text-[#0F172A] leading-tight ${textSizes[size]}`}>
            Credit Assistant
          </span>
        </div>
      )}
    </div>
  );
};
