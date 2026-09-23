import React from 'react';
import {
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  SlidersHorizontal,
  User,
  Settings,
  HelpCircle,
  LogOut,
  X,
  RefreshCw,
  Calculator,
  BookOpen,
  Globe,
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useAuth } from '../../context/AuthContext';
import { useFinancialData } from '../../context/FinancialDataContext';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  isOpen = false,
  onClose,
}) => {
  const { logout, user } = useAuth();
  const { resetToDemoData } = useFinancialData();

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Credit Health', path: '/credit-health', icon: ShieldCheck },
    { label: 'AI Advisor', path: '/ai-advisor', icon: Sparkles, highlight: true },
    { label: 'Progress', path: '/progress', icon: TrendingUp },
    { label: 'What-If Simulator', path: '/simulator', icon: SlidersHorizontal },
    { label: 'Free Calculators', path: '/calculators', icon: Calculator },
    { label: 'Credit Guide', path: '/learn', icon: BookOpen },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top: Logo & Close */}
        <div>
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
            <button
              onClick={() => handleNavClick('/')}
              className="text-left focus:outline-none"
            >
              <Logo size="md" />
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-slate-700 lg:hidden rounded-lg hover:bg-slate-100"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-3.5 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50/90 text-emerald-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive
                          ? 'text-emerald-600'
                          : item.highlight
                          ? 'text-indigo-600'
                          : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.highlight && !isActive && (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100/80 px-1.5 py-0.5 rounded-sm">
                      AI
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions & User Profile */}
        <div className="p-3.5 border-t border-slate-100 space-y-2">
          {/* View Website */}
          <button
            onClick={() => handleNavClick('/')}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>Public Website Home</span>
          </button>

          {/* Quick Demo Reset Helper */}
          <button
            onClick={resetToDemoData}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Demo Records</span>
          </button>

          <button
            onClick={() => handleNavClick('/settings')}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Help & FAQ</span>
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>

          {/* User Preview */}
          {user && (
            <div
              onClick={() => handleNavClick('/profile')}
              className="mt-2 pt-2 border-t border-slate-100/80 flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                {user.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-900 truncate">{user.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
