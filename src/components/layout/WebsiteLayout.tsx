import React from 'react';
import { WebsiteHeader } from './WebsiteHeader';
import { WebsiteFooter } from './WebsiteFooter';

interface WebsiteLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const WebsiteLayout: React.FC<WebsiteLayoutProps> = ({
  currentPath,
  onNavigate,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col antialiased">
      <WebsiteHeader currentPath={currentPath} onNavigate={onNavigate} />
      <main className="flex-1">{children}</main>
      <WebsiteFooter onNavigate={onNavigate} />
    </div>
  );
};
