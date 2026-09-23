import React, { useState } from 'react';
import {
  Bell,
  Lock,
  Sliders,
  HelpCircle,
  Shield,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import { useFinancialData } from '../context/FinancialDataContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Select } from '../components/common/Select';

export const SettingsPage: React.FC = () => {
  const { resetToDemoData } = useFinancialData();
  const { showSuccess } = useToast();

  const [dtiThreshold, setDtiThreshold] = useState('35');
  const [notifyStatement, setNotifyStatement] = useState(true);
  const [notifyThreshold, setNotifyThreshold] = useState(true);

  const handleSavePreferences = () => {
    showSuccess('Settings updated', 'Your preferences have been saved successfully.');
  };

  const faqs = [
    {
      q: 'Does using Credit Assistant impact my credit score?',
      a: 'No. Credit Assistant operates on self-reported and user-entered financial information. No hard inquiries are made against your bureau files.',
    },
    {
      q: 'How frequently do Indian banks report to CIBIL / Experian?',
      a: 'Indian credit institutions typically submit updated records once every 30 to 45 days. Repayments made today will appear in the next bureau cycle.',
    },
    {
      q: 'What is the difference between DTI and FOIR?',
      a: 'They are virtually identical terms in Indian banking. FOIR (Fixed Obligation to Income Ratio) is the metric underwriters calculate to ensure your total monthly loan EMIs do not exceed 40-50% of your net monthly salary.',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900">Application Settings</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Customize your financial health thresholds, notifications, and review statutory credit FAQs.
        </p>
      </div>

      {/* Threshold Configuration */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            DTI / FOIR Safety Thresholds
          </h3>
          <p className="text-xs text-slate-500">
            Set your target debt comfort ceiling. Banks generally benchmark 35% as comfortable and 50% as strict maximum.
          </p>
        </div>

        <div className="max-w-xs">
          <Select
            label="Comfort DTI Ceiling"
            value={dtiThreshold}
            onChange={(e) => setDtiThreshold(e.target.value)}
            options={[
              { value: '30', label: '30% (Conservative / High Savings)' },
              { value: '35', label: '35% (Recommended Banking Standard)' },
              { value: '40', label: '40% (Moderate Risk Band)' },
              { value: '50', label: '50% (Underwriting Ceiling)' },
            ]}
          />
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Notification Alerts</h3>
          <p className="text-xs text-slate-500">
            Manage your reminders for card statement cutoffs and utilization alerts.
          </p>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer">
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Pre-Statement Payment Reminder
              </span>
              <span className="text-[11px] text-slate-500">
                Receive alert 3 business days before card statement generation date.
              </span>
            </div>
            <input
              type="checkbox"
              checked={notifyStatement}
              onChange={(e) => setNotifyStatement(e.target.checked)}
              className="w-4 h-4 accent-emerald-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer">
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Utilization Ceiling Alerts
              </span>
              <span className="text-[11px] text-slate-500">
                Warn when card balances approach or exceed 30% of aggregate limit.
              </span>
            </div>
            <input
              type="checkbox"
              checked={notifyThreshold}
              onChange={(e) => setNotifyThreshold(e.target.checked)}
              className="w-4 h-4 accent-emerald-600 rounded"
            />
          </label>
        </div>

        <div className="pt-2">
          <Button variant="primary" size="sm" onClick={handleSavePreferences}>
            Save Preferences
          </Button>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/40 space-y-1">
              <h4 className="text-xs font-bold text-slate-900">{faq.q}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Data Management & Demo Reset */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Demo Records Management</h3>
        <p className="text-xs text-slate-500">
          Restore initial Rahul Sharma profile data and sample history points at any time.
        </p>

        <Button
          variant="outline"
          size="sm"
          onClick={resetToDemoData}
          leftIcon={<RefreshCw className="w-3.5 h-3.5 text-slate-600" />}
        >
          Reset All Records to Demo Baseline
        </Button>
      </div>
    </div>
  );
};
