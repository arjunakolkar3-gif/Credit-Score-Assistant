import React, { useState } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  Calculator,
  BookOpen,
  Shield,
  Layers,
  Sparkles,
  HelpCircle,
  PhoneCall,
  Lock,
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';

interface PublicHeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const navLinks = [
    { label: 'Features', path: '/#features', isAnchor: true },
    { label: 'Calculators', path: '/calculators', isAnchor: false, badge: 'Free' },
    { label: 'Credit Guide', path: '/learn', isAnchor: false },
    { label: 'Pricing', path: '/pricing', isAnchor: false },
    { label: 'Security', path: '/security', isAnchor: false },
    { label: 'About', path: '/about', isAnchor: false },
    { label: 'Contact', path: '/contact', isAnchor: false },
  ];

  const handleLinkClick = (link: typeof navLinks[0]) => {
    setMobileMenuOpen(false);
    if (link.isAnchor) {
      if (currentPath !== '/') {
        onNavigate('/');
        setTimeout(() => {
          const id = link.path.replace('/#', '');
          const elem = document.getElementById(id);
          elem?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const id = link.path.replace('/#', '');
        const elem = document.getElementById(id);
        elem?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate(link.path);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <div className="cursor-pointer" onClick={() => onNavigate('/')}>
            <Logo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = !link.isAnchor && currentPath === link.path;
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link)}
                  className={`text-sm font-medium transition-colors relative py-1 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-emerald-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-full">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right CTA / Action Zone */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 hidden md:inline">
                Signed in as <strong className="text-slate-800">{user.name.split(' ')[0]}</strong>
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate('/dashboard')}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Go to Dashboard
              </Button>
            </div>
          ) : (
            <>
              <button
                onClick={() => onNavigate('/login')}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate('/onboarding')}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Check Free Score
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => onNavigate(user ? '/dashboard' : '/onboarding')}
            className="sm:hidden px-3 py-1.5 text-xs font-semibold bg-emerald-600 text-white rounded-lg"
          >
            {user ? 'Dashboard' : 'Start'}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = !link.isAnchor && currentPath === link.path;
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/dashboard');
                }}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('/onboarding');
                  }}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Check Credit Health Free
                </Button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('/login');
                  }}
                  className="w-full text-center py-2 text-xs font-semibold text-slate-700 hover:text-slate-900"
                >
                  Already have an account? Sign In
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
