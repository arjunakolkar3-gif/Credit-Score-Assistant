import React from 'react';
import {
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  User,
} from 'lucide-react';

interface MobileNavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  currentPath,
  onNavigate,
}) => {
  const tabs = [
    { label: 'Home', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Health', path: '/credit-health', icon: ShieldCheck },
    { label: 'AI', path: '/ai-advisor', icon: Sparkles, highlight: true },
    { label: 'Progress', path: '/progress', icon: TrendingUp },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 lg:hidden px-2 py-1.5 flex items-center justify-around"
      aria-label="Mobile navigation"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentPath === tab.path;

        return (
          <button
            key={tab.path}
            onClick={() => onNavigate(tab.path)}
            className={`flex flex-col items-center justify-center min-h-[44px] min-w-[54px] px-2 py-1 rounded-xl transition-all cursor-pointer ${
              isActive
                ? 'text-emerald-700 font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive
                    ? 'scale-110 text-emerald-600'
                    : tab.highlight
                    ? 'text-indigo-600'
                    : 'text-slate-400'
                }`}
              />
              {tab.highlight && !isActive && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-indigo-600" />
              )}
            </div>
            <span className="text-[11px] mt-0.5 tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
