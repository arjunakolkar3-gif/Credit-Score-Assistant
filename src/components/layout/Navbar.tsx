import React from 'react';
import { Menu, Plus, Sparkles, User, RefreshCw } from 'lucide-react';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../common/Logo';

interface NavbarProps {
  onOpenSidebar: () => void;
  onOpenQuickUpdate: () => void;
  onNavigate: (path: string) => void;
  title?: string;
  subtitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSidebar,
  onOpenQuickUpdate,
  onNavigate,
  title = 'Overview',
  subtitle,
}) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 flex items-center justify-between transition-colors">
      {/* Zone 1: Mobile toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 lg:hidden cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="lg:hidden">
          <Logo size="sm" showText={false} />
        </div>

        <div className="flex flex-col">
          <h1 className="text-base md:text-lg font-bold text-slate-900 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-500 hidden sm:block leading-none mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Zone 2: Context indicator (Center / Desktop) */}
      <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100/80 border border-slate-200/60 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Indian Bureau Context · INR (₹)
        </span>
      </div>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenQuickUpdate}
          leftIcon={<Plus className="w-3.5 h-3.5 text-emerald-600" />}
          className="hidden sm:inline-flex"
        >
          Update Financials
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={() => onNavigate('/ai-advisor')}
          leftIcon={<Sparkles className="w-3.5 h-3.5 text-indigo-400" />}
        >
          AI Advisor
        </Button>

        {user && (
          <button
            onClick={() => onNavigate('/profile')}
            className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer ml-1"
            title="Profile"
          >
            {user.name.split(' ').map((n) => n[0]).join('')}
          </button>
        )}
      </div>
    </header>
  );
};
