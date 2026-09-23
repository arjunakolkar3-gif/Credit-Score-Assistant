import React from 'react';

export const CardSkeleton: React.FC<{ className?: string }> = ({ className = 'h-36' }) => (
  <div className={`w-full bg-white border border-slate-200/80 rounded-2xl p-5 animate-pulse ${className}`}>
    <div className="flex items-center justify-between mb-4">
      <div className="h-4 w-28 bg-slate-200 rounded-md" />
      <div className="h-4 w-12 bg-slate-100 rounded-md" />
    </div>
    <div className="h-8 w-24 bg-slate-200 rounded-md mb-3" />
    <div className="h-3.5 w-3/4 bg-slate-100 rounded-md" />
  </div>
);

export const ChartSkeleton: React.FC<{ height?: string }> = ({ height = 'h-64' }) => (
  <div className={`w-full bg-white border border-slate-200/80 rounded-2xl p-6 animate-pulse ${height} flex flex-col justify-between`}>
    <div className="flex items-center justify-between">
      <div className="h-5 w-40 bg-slate-200 rounded-md" />
      <div className="h-4 w-20 bg-slate-100 rounded-md" />
    </div>
    <div className="flex items-end justify-between gap-3 h-40 pt-6">
      <div className="w-full bg-slate-100 rounded-t-md h-3/5" />
      <div className="w-full bg-slate-200 rounded-t-md h-4/5" />
      <div className="w-full bg-slate-100 rounded-t-md h-2/5" />
      <div className="w-full bg-slate-200 rounded-t-md h-full" />
      <div className="w-full bg-slate-100 rounded-t-md h-4/5" />
      <div className="w-full bg-slate-200 rounded-t-md h-5/6" />
    </div>
  </div>
);

export const AISkeleton: React.FC = () => (
  <div className="w-full bg-white border border-indigo-100 rounded-2xl p-6 animate-pulse shadow-xs">
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 rounded-xl bg-indigo-100 shrink-0" />
      <div className="space-y-1.5 flex-1">
        <div className="h-4 w-44 bg-indigo-100 rounded-md" />
        <div className="h-3 w-64 bg-slate-100 rounded-md" />
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-4 w-full bg-slate-100 rounded-md" />
      <div className="h-4 w-5/6 bg-slate-100 rounded-md" />
      <div className="h-4 w-4/6 bg-slate-100 rounded-md" />
    </div>
  </div>
);
