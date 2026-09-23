import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { FinancialDataProvider } from './context/FinancialDataContext';

import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { LearnPage } from './pages/LearnPage';
import { PricingPage } from './pages/PricingPage';
import { SecurityPage } from './pages/SecurityPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreditHealthPage } from './pages/CreditHealthPage';
import { AIAdvisorPage } from './pages/AIAdvisorPage';
import { ProgressPage } from './pages/ProgressPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  // Sync router with browser pathname with fallback to state
  const getInitialPath = () => {
    try {
      const path = window.location.pathname;
      return path && path !== '' ? path : '/';
    } catch {
      return '/';
    }
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath());

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    try {
      if (window.location.pathname !== path) {
        window.history.pushState({}, '', path);
      }
    } catch {
      // Ignore if iframe restricts pushState
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route metadata
  const getPageInfo = (path: string): { title: string; subtitle: string } => {
    switch (path) {
      case '/dashboard':
        return {
          title: 'Financial Overview',
          subtitle: 'Real-time diagnostic summary of your credit health and ratios',
        };
      case '/credit-health':
        return {
          title: 'Credit Health & Factors',
          subtitle: 'Inspection of the 5 core Indian credit bureau scoring pillars',
        };
      case '/ai-advisor':
        return {
          title: 'AI Credit Advisor',
          subtitle: 'Gemini-powered financial roadmap and interactive bureau consultation',
        };
      case '/progress':
        return {
          title: 'Progress & Milestones',
          subtitle: 'Historical score trajectories, DTI milestones, and logged snapshots',
        };
      case '/simulator':
        return {
          title: 'What-If Credit Simulator',
          subtitle: 'Forecast the impact of debt prepayments and card limit enhancements',
        };
      case '/profile':
        return {
          title: 'My Profile',
          subtitle: 'Account details, financial goals, and recorded bank institutions',
        };
      case '/settings':
        return {
          title: 'Settings & Preferences',
          subtitle: 'Custom DTI thresholds, statement reminders, and bureau FAQs',
        };
      default:
        return {
          title: 'Overview',
          subtitle: 'Credit Assistant',
        };
    }
  };

  // Render non-layout pages (Landing, Website Pages, Login, Register, Onboarding)
  const renderStandalonePage = () => {
    if (currentPath === '/') {
      return <LandingPage onNavigate={navigate} />;
    }
    if (currentPath === '/calculators') {
      return <CalculatorsPage onNavigate={navigate} />;
    }
    if (currentPath === '/learn') {
      return <LearnPage onNavigate={navigate} />;
    }
    if (currentPath === '/pricing') {
      return <PricingPage onNavigate={navigate} />;
    }
    if (currentPath === '/security') {
      return <SecurityPage onNavigate={navigate} />;
    }
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (currentPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }
    if (currentPath === '/login') {
      return <LoginPage onNavigate={navigate} />;
    }
    if (currentPath === '/register') {
      return <RegisterPage onNavigate={navigate} />;
    }
    if (currentPath === '/onboarding') {
      return <OnboardingPage onNavigate={navigate} />;
    }
    return null;
  };

  const standalonePage = renderStandalonePage();

  // Render dashboard layout pages
  const renderDashboardContent = () => {
    switch (currentPath) {
      case '/credit-health':
        return <CreditHealthPage onNavigate={navigate} />;
      case '/ai-advisor':
        return <AIAdvisorPage />;
      case '/progress':
        return <ProgressPage />;
      case '/simulator':
        return <SimulatorPage />;
      case '/profile':
        return <ProfilePage />;
      case '/settings':
        return <SettingsPage />;
      case '/dashboard':
      default:
        return <DashboardPage onNavigate={navigate} />;
    }
  };

  const pageInfo = getPageInfo(currentPath);

  return (
    <ToastProvider>
      <AuthProvider>
        <FinancialDataProvider>
          {standalonePage ? (
            standalonePage
          ) : (
            <AppLayout
              currentPath={currentPath}
              onNavigate={navigate}
              pageTitle={pageInfo.title}
              pageSubtitle={pageInfo.subtitle}
            >
              {renderDashboardContent()}
            </AppLayout>
          )}
        </FinancialDataProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
