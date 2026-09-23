import React, { useState } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';

interface WebsiteHeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isAuthenticated?: boolean;
}

export const WebsiteHeader: React.FC<WebsiteHeaderProps> = ({
  currentPath,
  onNavigate,
  isAuthenticated = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Features', path: '/features' },
    { label: 'Free Calculator', path: '/tools' },
    { label: 'Knowledge Base', path: '/guides' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'About & Trust', path: '/about' },
    { label: 'FAQ', path: '/faq' },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 lg:px-12 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Zone 1: Single element Brand Wordmark */}
        <div
          onClick={() => handleNavClick('/')}
          className="cursor-pointer"
        >
          <Logo size="md" />
        </div>

        {/* Zone 2: 4-6 Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`transition-colors text-sm py-1 cursor-pointer ${
                  isActive
                    ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('/login')}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleNavClick('/dashboard')}
            rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
          >
            Launch Demo App
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => handleNavClick('/dashboard')}
            className="sm:hidden px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg"
          >
            App
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 mt-3 pt-4 pb-5 space-y-3">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleNavClick('/')}
              className={`text-left px-3 py-2 text-sm font-medium rounded-lg ${
                currentPath === '/' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`text-left px-3 py-2 text-sm font-medium rounded-lg ${
                  currentPath === link.path
                    ? 'bg-slate-100 text-slate-900 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('/login')}
              className="w-full text-center py-2 text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              Sign In
            </button>
            <button
              onClick={() => handleNavClick('/dashboard')}
              className="w-full text-center py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
            >
              Launch Demo App
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
