import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { MobileNavigation } from './MobileNavigation';
import { QuickUpdateModal } from '../dashboard/QuickUpdateModal';

interface AppLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  pageTitle?: string;
  pageSubtitle?: string;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentPath,
  onNavigate,
  pageTitle,
  pageSubtitle,
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickUpdateOpen, setQuickUpdateOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-[#0F172A]">
      {/* Desktop & Mobile Sidebar */}
      <Sidebar
        currentPath={currentPath}
        onNavigate={onNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Sticky Header */}
        <Navbar
          onOpenSidebar={() => setSidebarOpen(true)}
          onOpenQuickUpdate={() => setQuickUpdateOpen(true)}
          onNavigate={onNavigate}
          title={pageTitle}
          subtitle={pageSubtitle}
        />

        {/* Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-[1280px] w-full mx-auto pb-24 lg:pb-12">
          {children}
        </main>

        {/* Global Safety Footer */}
        <footer className="hidden lg:block border-t border-slate-200/60 py-4 px-8 text-center text-xs text-slate-400 bg-white/40">
          <p>
            Credit Assistant provides educational insights based on information entered by the user. It does not replace official credit reports from CIBIL, Experian, CRIF, Equifax, or professional financial advice.
          </p>
        </footer>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNavigation currentPath={currentPath} onNavigate={onNavigate} />

      {/* Quick Financial Update Modal */}
      <QuickUpdateModal
        isOpen={quickUpdateOpen}
        onClose={() => setQuickUpdateOpen(false)}
      />
    </div>
  );
};
